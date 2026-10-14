"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  Cog,
  Database,
  Landmark,
  ListOrdered,
  Monitor,
  Play,
  Radio,
  Server,
  ShieldCheck,
  TriangleAlert,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { CodeBlock } from "./code-block";

/* Coordenadas no espaço do desenho (viewBox 1100 x 640). */
type NoId =
  | "cliente"
  | "gateway"
  | "api"
  | "cache"
  | "banco"
  | "fila"
  | "worker"
  | "externo"
  | "hub"
  | "dlq";

type No = {
  x: number;
  y: number;
  nome: string;
  tec: string;
  Icone: LucideIcon;
  papel: string;
  seCair: string;
  arquivo?: string;
  codigo?: string;
};

const nos: Record<NoId, No> = {
  cliente: {
    x: 100,
    y: 300,
    nome: "Cliente",
    tec: "Next.js · iOS",
    Icone: Monitor,
    papel:
      "A tela do usuário. Chama a API por HTTPS e recebe avisos em tempo real.",
    seCair:
      "É o lado do usuário: a API não depende dele para manter os dados consistentes.",
  },
  gateway: {
    x: 280,
    y: 300,
    nome: "Gateway",
    tec: "YARP",
    Icone: ShieldCheck,
    papel:
      "Porta de entrada única: valida o token, aplica limite de requisições e encaminha para o serviço certo.",
    seCair: "Duas instâncias atrás do balanceador. Se uma cai, a outra assume.",
    arquivo: "Gateway/Program.cs",
    codigo: `builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("Rotas"));

app.UseAuthentication();
app.UseRateLimiter();          // 5 requisições/s por cliente
app.MapReverseProxy();`,
  },
  api: {
    x: 470,
    y: 300,
    nome: "API",
    tec: "ASP.NET Core",
    Icone: Server,
    papel:
      "Onde moram as regras de negócio. Valida, grava e responde. Não guarda estado entre requisições.",
    seCair:
      "Instâncias sem estado: o orquestrador sobe outra em segundos e o balanceador redistribui.",
    arquivo: "Pagamentos/Confirmar.cs",
    codigo: `var resultado = pedido.ConfirmarPagamento(relogio.GetUtcNow());
if (resultado.Falhou)
    return resultado.Erro.ParaProblemDetails();

await db.SaveChangesAsync(ct);   // pedido + evento, mesma transação
return TypedResults.Accepted($"/api/pedidos/{pedido.Id}");`,
  },
  cache: {
    x: 470,
    y: 115,
    nome: "Cache",
    tec: "Redis",
    Icone: Zap,
    papel:
      "Guarda por 30 segundos as consultas mais pedidas, para o banco não responder a mesma coisa mil vezes.",
    seCair: "A API lê direto do banco. Fica mais lenta, mas não para.",
    arquivo: "Pedidos/ObterPedido.cs",
    codigo: `var pedido = await cache.GetOrCreateAsync($"pedido:{id}",
    async ct => await db.Pedidos.AsNoTracking()
        .FirstOrDefaultAsync(p => p.Id == id, ct),
    new() { Expiration = TimeSpan.FromSeconds(30) }, ct);`,
  },
  banco: {
    x: 670,
    y: 300,
    nome: "Banco",
    tec: "SQL Server",
    Icone: Database,
    papel:
      "A fonte da verdade. Índices pensados para as consultas reais e a tabela de outbox para os eventos.",
    seCair: "Réplica de leitura e backup com restauração testada todo mês.",
    arquivo: "migracao.sql",
    codigo: `CREATE INDEX ix_pedidos_cliente_status
    ON pedidos (cliente_id, status) INCLUDE (total);

CREATE TABLE outbox (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    tipo NVARCHAR(200), conteudo NVARCHAR(MAX),
    publicado_em DATETIMEOFFSET NULL);`,
  },
  fila: {
    x: 670,
    y: 480,
    nome: "Fila",
    tec: "RabbitMQ",
    Icone: ListOrdered,
    papel:
      "Guarda o trabalho demorado até alguém processar. Quem publica não espera quem consome.",
    seCair:
      "O outbox segura os eventos no banco e publica tudo quando a fila voltar.",
  },
  worker: {
    x: 845,
    y: 480,
    nome: "Worker fiscal",
    tec: ".NET Worker",
    Icone: Cog,
    papel:
      "Consome os eventos de pagamento e emite a nota fiscal. A mesma venda nunca gera duas notas.",
    seCair:
      "As mensagens esperam na fila. Quando o worker volta, continua de onde parou.",
    arquivo: "Fiscal/EmitirNotaConsumer.cs",
    codigo: `public async Task Consume(ConsumeContext<VendaConfirmada> ctx)
{
    // Idempotência: a mesma venda pode chegar duas vezes. A nota, nunca.
    if (await db.Notas.AnyAsync(n => n.VendaId == ctx.Message.VendaId))
        return;

    await emissor.EmitirAsync(ctx.Message, ctx.CancellationToken);
}`,
  },
  externo: {
    x: 1012,
    y: 480,
    nome: "NFS-e nacional",
    tec: "Governo",
    Icone: Landmark,
    papel:
      "Serviço externo que autoriza a nota. Fora do nosso controle, então tratado como algo que vai falhar.",
    seCair:
      "Retry com espera crescente, circuit breaker e, depois de 3 falhas, a fila de mortas.",
    arquivo: "Program.cs",
    codigo: `services.AddHttpClient<IAmbienteNacional, AmbienteNacionalClient>()
    .AddResilienceHandler("nfse", p =>
    {
        p.AddRetry(new() { MaxRetryAttempts = 3, BackoffType = DelayBackoffType.Exponential });
        p.AddCircuitBreaker(new() { FailureRatio = 0.5 });
    });`,
  },
  hub: {
    x: 845,
    y: 115,
    nome: "Tempo real",
    tec: "SignalR",
    Icone: Radio,
    papel:
      "Avisa a tela do cliente na hora em que algo muda, por WebSocket, sem ele precisar recarregar.",
    seCair: "A tela volta a consultar a API por REST a cada poucos segundos.",
  },
  dlq: {
    x: 845,
    y: 600,
    nome: "Fila de mortas",
    tec: "Alerta",
    Icone: TriangleAlert,
    papel:
      "Mensagens que falharam 3 vezes. Ficam guardadas e o time recebe um alerta para agir.",
    seCair:
      "Nada se perde: depois de corrigir, as mensagens voltam para a fila com um clique.",
  },
};

const arestas: { id: string; de: NoId; para: NoId; d: string }[] = [
  { id: "c-g", de: "cliente", para: "gateway", d: "M100 300 L280 300" },
  { id: "g-a", de: "gateway", para: "api", d: "M280 300 L470 300" },
  { id: "a-c", de: "api", para: "cache", d: "M470 300 L470 115" },
  { id: "a-b", de: "api", para: "banco", d: "M470 300 L670 300" },
  { id: "b-f", de: "banco", para: "fila", d: "M670 300 L670 480" },
  { id: "f-w", de: "fila", para: "worker", d: "M670 480 L845 480" },
  { id: "w-e", de: "worker", para: "externo", d: "M845 480 L1012 480" },
  { id: "w-h", de: "worker", para: "hub", d: "M845 480 L845 115" },
  {
    id: "h-c",
    de: "hub",
    para: "cliente",
    d: "M845 115 C 680 20, 260 20, 100 300",
  },
  { id: "w-d", de: "worker", para: "dlq", d: "M845 480 L845 600" },
];

type Passo = {
  de?: NoId;
  para?: NoId;
  texto: string;
  ms?: number;
  erro?: boolean;
  espera?: number;
};

const cenarios: {
  id: string;
  rotulo: string;
  resumo: string;
  passos: Passo[];
}[] = [
  {
    id: "consulta",
    rotulo: "Consultar um pedido",
    resumo:
      "REST com cache: a resposta mais rápida é a que nem chega ao banco.",
    passos: [
      { de: "cliente", para: "gateway", texto: "GET /api/pedidos/42", ms: 1 },
      {
        de: "gateway",
        para: "api",
        texto: "Token válido, rota autorizada",
        ms: 2,
      },
      { de: "api", para: "cache", texto: "Cache: não encontrado", ms: 1 },
      {
        de: "api",
        para: "banco",
        texto: "SELECT pelo índice cliente_id + status",
        ms: 3,
      },
      { de: "banco", para: "api", texto: "1 linha encontrada", ms: 1 },
      { de: "api", para: "cache", texto: "Resultado guardado por 30 s", ms: 1 },
      { de: "api", para: "gateway", texto: "200 OK", ms: 1 },
      {
        de: "gateway",
        para: "cliente",
        texto: "Resposta na tela · total 12 ms",
        ms: 2,
      },
    ],
  },
  {
    id: "pagamento",
    rotulo: "Pagar e emitir a nota",
    resumo:
      "Responde rápido ao usuário e deixa o trabalho demorado para a fila.",
    passos: [
      { de: "cliente", para: "gateway", texto: "POST /api/pagamentos", ms: 1 },
      { de: "gateway", para: "api", texto: "Limite de requisições ok", ms: 2 },
      {
        de: "api",
        para: "banco",
        texto: "Pagamento + evento na mesma transação (outbox)",
        ms: 9,
      },
      { de: "api", para: "gateway", texto: "202 Accepted", ms: 1 },
      {
        de: "gateway",
        para: "cliente",
        texto: "Usuário liberado em 14 ms",
        ms: 1,
      },
      {
        de: "banco",
        para: "fila",
        texto: "Relay publica VendaConfirmada",
        ms: 40,
      },
      { de: "fila", para: "worker", texto: "Worker consome a mensagem", ms: 3 },
      {
        de: "worker",
        para: "externo",
        texto: "Emite a NFS-e no padrão nacional",
        ms: 820,
      },
      { de: "externo", para: "worker", texto: "Nota autorizada", ms: 1 },
      { de: "worker", para: "hub", texto: "Avisa o tempo real", ms: 2 },
      {
        de: "hub",
        para: "cliente",
        texto: "WebSocket: “Sua nota foi emitida”",
        ms: 30,
      },
    ],
  },
  {
    id: "falha",
    rotulo: "Governo fora do ar",
    resumo: "O serviço externo cai e nada se perde: o cliente nem percebe.",
    passos: [
      {
        de: "fila",
        para: "worker",
        texto: "Worker consome VendaConfirmada #918",
        ms: 3,
      },
      {
        de: "worker",
        para: "externo",
        texto: "Timeout depois de 10 s",
        erro: true,
      },
      { texto: "Nova tentativa em 2 s", espera: 900 },
      {
        de: "worker",
        para: "externo",
        texto: "503 Service Unavailable",
        erro: true,
      },
      { texto: "Nova tentativa em 4 s", espera: 900 },
      {
        de: "worker",
        para: "externo",
        texto: "Timeout depois de 10 s",
        erro: true,
      },
      {
        de: "worker",
        para: "dlq",
        texto: "3 falhas: fila de mortas e alerta para o time",
        erro: true,
      },
      { texto: "O pagamento do cliente continua confirmado", espera: 600 },
    ],
  },
  {
    id: "robo",
    rotulo: "Robô atacando a API",
    resumo: "O gateway barra o excesso antes de chegar na regra de negócio.",
    passos: [
      {
        de: "cliente",
        para: "gateway",
        texto: "Requisição 1 de 100 em 1 s",
        ms: 1,
      },
      { de: "gateway", para: "api", texto: "Dentro do limite", ms: 2 },
      { de: "cliente", para: "gateway", texto: "Requisição 6 de 100", ms: 1 },
      {
        de: "gateway",
        para: "cliente",
        texto: "429 Too Many Requests · Retry-After: 1",
        erro: true,
      },
      { texto: "API e banco seguem atendendo os outros clientes", espera: 700 },
    ],
  },
];

const W = 1100;
const H = 650;

function aresta(de: NoId, para: NoId) {
  const direta = arestas.find((a) => a.de === de && a.para === para);
  if (direta) return { id: direta.id, inverso: false };
  const volta = arestas.find((a) => a.de === para && a.para === de);
  return volta ? { id: volta.id, inverso: true } : null;
}

/** Diagrama de arquitetura com uma requisição percorrendo o sistema. */
export function BeDiagrama() {
  const [cenario, setCenario] = useState(0);
  const [passo, setPasso] = useState(-1);
  const [log, setLog] = useState<(Passo & { n: number })[]>([]);
  const [selecionado, setSelecionado] = useState<NoId>("api");
  const [ponto, setPonto] = useState<{
    x: number;
    y: number;
    erro?: boolean;
  } | null>(null);
  const svg = useRef<SVGSVGElement>(null);
  const caixa = useRef<HTMLDivElement>(null);
  const visivel = useInView(caixa, { once: true, amount: 0.4 });
  const calmo = useReducedMotion();
  const atual = cenarios[cenario];
  const p = passo >= 0 ? atual.passos[passo] : null;

  const rodar = useCallback((i: number) => {
    setCenario(i);
    setLog([]);
    setPonto(null);
    setPasso(0);
  }, []);

  // Começa sozinho quando o diagrama aparece na tela.
  useEffect(() => {
    if (visivel && passo === -1 && log.length === 0) rodar(0);
  }, [visivel, passo, log.length, rodar]);

  useEffect(() => {
    if (passo < 0) return;
    const passos = cenarios[cenario].passos;
    if (passo >= passos.length) {
      setPonto(null);
      return;
    }
    const atualPasso = passos[passo];
    let cancelado = false;
    let quadro = 0;
    const concluir = () => {
      if (cancelado) return;
      setLog((l) => [...l, { ...atualPasso, n: l.length + 1 }]);
      setPasso((n) => n + 1);
    };

    if (!atualPasso.de || !atualPasso.para) {
      const t = setTimeout(concluir, calmo ? 200 : (atualPasso.espera ?? 800));
      return () => {
        cancelado = true;
        clearTimeout(t);
      };
    }

    const a = aresta(atualPasso.de, atualPasso.para);
    const caminho = a
      ? svg.current?.querySelector<SVGPathElement>(`#aresta-${a.id}`)
      : null;
    if (!a || !caminho || calmo) {
      const t = setTimeout(concluir, 250);
      return () => {
        cancelado = true;
        clearTimeout(t);
      };
    }
    const total = caminho.getTotalLength();
    const duracao = Math.min(1100, 350 + total * 0.9);
    const inicio = performance.now();
    const quadroFn = (agora: number) => {
      if (cancelado) return;
      const t = Math.min(1, (agora - inicio) / duracao);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const pt = caminho.getPointAtLength((a.inverso ? 1 - e : e) * total);
      setPonto({ x: pt.x, y: pt.y, erro: atualPasso.erro && t > 0.7 });
      if (t < 1) quadro = requestAnimationFrame(quadroFn);
      else setTimeout(concluir, 220);
    };
    quadro = requestAnimationFrame(quadroFn);
    return () => {
      cancelado = true;
      cancelAnimationFrame(quadro);
    };
  }, [passo, cenario, calmo]);

  const arestaAtiva = p?.de && p?.para ? aresta(p.de, p.para)?.id : null;
  const nosAtivos = new Set<NoId>(p?.de && p?.para ? [p.de, p.para] : []);
  const nosComErro = new Set<NoId>(
    log.filter((l) => l.erro && l.para).map((l) => l.para!),
  );
  const terminou = passo >= atual.passos.length;
  const msTotal = log.reduce((s, l) => s + (l.ms ?? 0), 0);
  const no = nos[selecionado];

  return (
    <div ref={caixa} className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {cenarios.map((c, i) => (
          <button
            key={c.id}
            type="button"
            onClick={() => rodar(i)}
            aria-pressed={cenario === i}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
              cenario === i
                ? "bg-ink text-paper"
                : "bg-surface-2 text-ink hover:bg-mist-2"
            }`}
          >
            <Play className="size-3.5" aria-hidden="true" />
            {c.rotulo}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="overflow-hidden rounded-[24px] bg-surface shadow-[inset_0_0_0_1px_var(--line)]">
          <div className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-3">
            <p className="m-0 text-[14px] text-muted">{atual.resumo}</p>
            <span className="hidden font-mono text-[12.5px] text-muted sm:block">
              clique numa caixa para ver os detalhes
            </span>
          </div>
          <div className="overflow-x-auto">
            <div
              className="relative min-w-[980px] bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:22px_22px]"
              style={{ aspectRatio: `${W} / ${H}` }}
            >
              <svg
                ref={svg}
                viewBox={`0 0 ${W} ${H}`}
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                {arestas.map((a) => {
                  const ativa = arestaAtiva === a.id;
                  return (
                    <path
                      key={a.id}
                      id={`aresta-${a.id}`}
                      d={a.d}
                      fill="none"
                      stroke={
                        ativa
                          ? p?.erro
                            ? "#e5484d"
                            : "var(--azul)"
                          : "var(--line)"
                      }
                      strokeWidth={ativa ? 2.5 : 1.6}
                      strokeDasharray={
                        a.id === "h-c" || a.id === "w-d" ? "6 6" : undefined
                      }
                      style={{ transition: "stroke .25s" }}
                    />
                  );
                })}
                {ponto && (
                  <g>
                    <circle
                      cx={ponto.x}
                      cy={ponto.y}
                      r="14"
                      fill={ponto.erro ? "#e5484d" : "var(--azul)"}
                      opacity=".18"
                    />
                    <circle
                      cx={ponto.x}
                      cy={ponto.y}
                      r="6.5"
                      fill={ponto.erro ? "#e5484d" : "var(--azul)"}
                    />
                  </g>
                )}
              </svg>

              {(Object.keys(nos) as NoId[]).map((id) => {
                const n = nos[id];
                const ativo = nosAtivos.has(id);
                const erro =
                  nosComErro.has(id) &&
                  (id === "externo" || id === "dlq" || id === "cliente") &&
                  cenario !== 0;
                const sel = selecionado === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelecionado(id)}
                    aria-pressed={sel}
                    style={{
                      left: `${(n.x / W) * 100}%`,
                      top: `${(n.y / H) * 100}%`,
                    }}
                    className={`absolute z-10 flex w-[168px] -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-2xl bg-surface px-3 py-2.5 text-left transition-[box-shadow,transform] duration-200 hover:-translate-y-[calc(50%+2px)] ${
                      erro
                        ? "shadow-[inset_0_0_0_2px_#e5484d,0_10px_24px_-14px_rgb(229_72_77/0.6)]"
                        : ativo
                          ? "shadow-[inset_0_0_0_2px_var(--azul),0_10px_24px_-12px_rgb(47_107_224/0.5)]"
                          : sel
                            ? "shadow-[inset_0_0_0_1.5px_var(--ink),0_8px_20px_-14px_rgb(15_30_54/0.5)]"
                            : "shadow-[inset_0_0_0_1px_var(--line),0_6px_16px_-12px_rgb(15_30_54/0.35)]"
                    }`}
                  >
                    <span
                      className={`flex size-8 flex-none items-center justify-center rounded-lg ${
                        erro
                          ? "bg-[#e5484d]/12 text-[#e5484d]"
                          : ativo
                            ? "bg-azul/15 text-azul"
                            : "bg-surface-2 text-ink-2"
                      }`}
                    >
                      <n.Icone className="size-4" aria-hidden="true" />
                    </span>
                    <span className="flex min-w-0 flex-col leading-tight">
                      <span className="truncate text-[13px] font-semibold">
                        {n.nome}
                      </span>
                      <span className="truncate font-mono text-[11px] text-muted">
                        {n.tec}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="rounded-[24px] bg-surface px-5 py-4 shadow-[inset_0_0_0_1px_var(--line)]">
            <div className="mb-2 flex items-center justify-between font-mono text-[12px] text-muted">
              <span>registro da requisição</span>
              {terminou && msTotal > 0 && <span>{msTotal} ms no total</span>}
            </div>
            <ol
              className="m-0 flex h-[196px] list-none flex-col-reverse justify-end gap-1 overflow-hidden p-0 font-mono text-[12.5px]"
              aria-live="polite"
            >
              <AnimatePresence initial={false}>
                {[...log]
                  .reverse()
                  .slice(0, 8)
                  .map((l) => (
                    <motion.li
                      key={`${cenario}-${l.n}`}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${l.erro ? "text-[#c9373d] dark:text-[#ff9ea1]" : "text-ink-2"}`}
                    >
                      <span className="w-6 text-muted">
                        {String(l.n).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        {l.de && l.para
                          ? `${nos[l.de].nome} → ${nos[l.para].nome}: `
                          : "· "}
                        {l.texto}
                      </span>
                      {l.ms !== undefined && (
                        <span className="text-muted">{l.ms} ms</span>
                      )}
                    </motion.li>
                  ))}
              </AnimatePresence>
            </ol>
          </div>

          <aside
            className="flex min-w-0 flex-col gap-4 rounded-[24px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--line)]"
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-surface-2 text-ink">
                <no.Icone className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="m-0 text-[17px] font-semibold">{no.nome}</p>
                <p className="m-0 font-mono text-[12px] text-muted">{no.tec}</p>
              </div>
            </div>
            <p className="m-0 text-[14.5px] leading-[1.55]">{no.papel}</p>
            <div className="rounded-xl bg-surface-2 p-3.5">
              <p className="m-0 font-mono text-[11.5px] font-semibold tracking-wide text-muted uppercase">
                Se cair
              </p>
              <p className="m-0 mt-1 text-[14px] leading-[1.5]">{no.seCair}</p>
            </div>
            {no.codigo && (
              <CodeBlock
                key={selecionado}
                arquivo={no.arquivo}
                codigo={no.codigo}
                className="text-[11.5px]"
              />
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
