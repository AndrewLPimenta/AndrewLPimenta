import { documentoValido, normalizarDocumento } from "./documento";
import type { Cobranca, CobrancaInput, Metodo, ProblemDetails, RespostaHttp } from "./tipos";

/**
 * API simulada no navegador, com as mesmas rotas, regras e respostas
 * do CobrancasEndpoints.cs. Os dados ficam só neste navegador.
 */

const CHAVE = "lab-cobrancas-v1";

const hoje = () => dataLocal(new Date());
function dataLocal(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}
function emDias(dias: number) {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return dataLocal(d);
}

/** Guid v7: ordenável pelo tempo, como o Guid.CreateVersion7() do .NET 9. */
function uuidV7() {
  const ts = Date.now().toString(16).padStart(12, "0");
  const r = Array.from(crypto.getRandomValues(new Uint8Array(10)), (b) => b.toString(16).padStart(2, "0")).join("");
  const variante = ((parseInt(r[3], 16) & 0x3) | 0x8).toString(16);
  return `${ts.slice(0, 8)}-${ts.slice(8)}-7${r.slice(0, 3)}-${variante}${r.slice(4, 7)}-${r.slice(7, 19)}`;
}

function sementes(): Cobranca[] {
  const agora = new Date().toISOString();
  const nova = (cliente: string, documento: string, valor: number, dias: number, paga = false): Cobranca => ({
    id: uuidV7(),
    cliente,
    documento,
    valor,
    vencimento: emDias(dias),
    status: paga ? "Paga" : "Pendente",
    criadaEm: agora,
    pagaEm: paga ? agora : null,
  });
  return [
    nova("Academia Ritmo", "45821376000103", 1890, 6),
    nova("Padaria Central", "27391458000175", 349.9, -12, true),
    nova("Studio Lumen", "6A2B7C91000136", 720, -3),
    nova("Marina Duarte", "31847592619", 180, 15),
  ];
}

function carregar(): Cobranca[] {
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo) return JSON.parse(salvo) as Cobranca[];
  } catch {
    /* sem armazenamento: segue com as sementes */
  }
  return sementes();
}

let banco: Cobranca[] | null = null;
const db = () => (banco ??= carregar());
function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(db()));
  } catch {
    /* modo privado ou armazenamento bloqueado: os dados vivem só na memória */
  }
}

export type Resumo = { aReceber: number; vencidas: number; recebido: number };

/** Números do topo do app. Leitura direta, sem passar pela "rede". */
export function resumoAtual(): Resumo {
  const h = hoje();
  const lista = db();
  const pendentes = lista.filter((c) => c.status === "Pendente");
  return {
    aReceber: pendentes.reduce((t, c) => t + c.valor, 0),
    vencidas: pendentes.filter((c) => c.vencimento < h).length,
    recebido: lista.filter((c) => c.status === "Paga").reduce((t, c) => t + c.valor, 0),
  };
}

export function restaurarDados() {
  banco = sementes();
  salvar();
}

const RFC = "https://tools.ietf.org/html/rfc9110#section-15.5.";
const problema = (status: number, title: string, extra: Partial<ProblemDetails> = {}): RespostaHttp => ({
  status,
  headers: { "content-type": "application/problem+json" },
  body: { type: `${RFC}${{ 400: 1, 404: 5, 409: 10 }[status as 400 | 404 | 409]}`, title, status, ...extra },
});
const json = (status: number, body: unknown, headers: Record<string, string> = {}): RespostaHttp => ({
  status,
  headers: { "content-type": "application/json; charset=utf-8", ...headers },
  body,
});
const naoEncontrada = () => problema(404, "Not Found");
const conflito = (detail: string) => problema(409, "Regra de negócio violada", { detail });

/** Mesma regra do CobrancaRequest.Validar(hoje). */
function validar(req: Partial<CobrancaInput>): Record<string, string[]> {
  const erros: Record<string, string[]> = {};
  const cliente = (req.cliente ?? "").trim();
  if (cliente.length < 3 || cliente.length > 120) erros.Cliente = ["Informe o nome do cliente (3 a 120 caracteres)."];
  if (!documentoValido(req.documento ?? "")) erros.Documento = ["CPF ou CNPJ inválido."];
  const valor = Number(req.valor);
  if (!Number.isFinite(valor) || valor <= 0 || valor > 1_000_000) {
    erros.Valor = ["O valor deve ser maior que zero e até R$ 1.000.000,00."];
  }
  if (!req.vencimento || !/^\d{4}-\d{2}-\d{2}$/.test(req.vencimento)) erros.Vencimento = ["Informe o vencimento."];
  else if (req.vencimento < hoje()) erros.Vencimento = ["O vencimento não pode estar no passado."];
  return erros;
}

const erroDeValidacao = (errors: Record<string, string[]>) =>
  problema(400, "One or more validation errors occurred.", { errors });

function rotear(metodo: Metodo, url: string, body?: Partial<CobrancaInput>): RespostaHttp {
  const { pathname, searchParams } = new URL(url, "http://local");
  const [, , , id, acao] = pathname.split("/"); // /api/cobrancas/{id}/{acao}
  const lista = db();
  const achar = () => lista.find((c) => c.id === id);

  if (metodo === "GET" && !id) {
    const status = searchParams.get("status");
    const busca = searchParams.get("busca")?.toLowerCase();
    const itens = lista
      .filter((c) => !status || c.status === status)
      .filter((c) => !busca || c.cliente.toLowerCase().includes(busca))
      .sort((a, b) => a.vencimento.localeCompare(b.vencimento));
    return json(200, itens);
  }

  if (metodo === "POST" && !id) {
    const erros = validar(body ?? {});
    if (Object.keys(erros).length) return erroDeValidacao(erros);
    const nova: Cobranca = {
      id: uuidV7(),
      cliente: body!.cliente!.trim(),
      documento: normalizarDocumento(body!.documento!),
      valor: Number(body!.valor),
      vencimento: body!.vencimento!,
      status: "Pendente",
      criadaEm: new Date().toISOString(),
      pagaEm: null,
    };
    lista.push(nova);
    salvar();
    return json(201, nova, { location: `/api/cobrancas/${nova.id}` });
  }

  if (metodo === "PUT" && id && !acao) {
    const erros = validar(body ?? {});
    if (Object.keys(erros).length) return erroDeValidacao(erros);
    const c = achar();
    if (!c) return naoEncontrada();
    if (c.status !== "Pendente") return conflito("Só cobranças pendentes podem ser editadas.");
    Object.assign(c, {
      cliente: body!.cliente!.trim(),
      documento: normalizarDocumento(body!.documento!),
      valor: Number(body!.valor),
      vencimento: body!.vencimento!,
    });
    salvar();
    return json(200, c);
  }

  if (metodo === "POST" && id && acao === "pagar") {
    const c = achar();
    if (!c) return naoEncontrada();
    if (c.status === "Paga") return conflito("Esta cobrança já foi paga.");
    c.status = "Paga";
    c.pagaEm = new Date().toISOString();
    salvar();
    return json(200, c);
  }

  if (metodo === "DELETE" && id) {
    const c = achar();
    if (!c) return naoEncontrada();
    if (c.status === "Paga") {
      return conflito("Cobrança paga não pode ser excluída. Ela faz parte do histórico financeiro.");
    }
    banco = lista.filter((x) => x.id !== id);
    salvar();
    return { status: 204, headers: {}, body: null };
  }

  return problema(404, "Not Found");
}

/** "fetch" para a API simulada: devolve a resposta depois de uma latência de rede realista. */
export async function requisitar(metodo: Metodo, url: string, body?: unknown): Promise<RespostaHttp> {
  const latencia = 140 + Math.random() * 260;
  await new Promise((r) => setTimeout(r, latencia));
  // Clona para o chamador nunca segurar referência ao "banco".
  const resposta = rotear(metodo, url, body as Partial<CobrancaInput> | undefined);
  return { ...resposta, body: resposta.body === null ? null : structuredClone(resposta.body) };
}
