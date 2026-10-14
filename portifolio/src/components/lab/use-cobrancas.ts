"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { requisitar, restaurarDados, resumoAtual, type Resumo } from "@/lib/lab/servidor";
import type { Cobranca, CobrancaInput, Metodo, Operacao, ProblemDetails, Registro, RespostaHttp } from "@/lib/lab/tipos";

export type FiltroStatus = "" | "Pendente" | "Paga";
export type Aviso = { tipo: "ok" | "erro"; texto: string } | null;

/** Estado e ações do CRUD de cobranças, com o registro de cada requisição. */
export function useCobrancas() {
  const [itens, setItens] = useState<Cobranca[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [ocupado, setOcupado] = useState<string | null>(null);
  const [status, setStatus] = useState<FiltroStatus>("");
  const [busca, setBusca] = useState("");
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [ultimaOp, setUltimaOp] = useState<Operacao | null>(null);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [aviso, setAviso] = useState<Aviso>(null);
  const [resumo, setResumo] = useState<Resumo>({ aReceber: 0, vencidas: 0, recebido: 0 });
  const seq = useRef(0);

  const chamar = useCallback(async (op: Operacao, metodo: Metodo, url: string, body?: unknown, destacar = true) => {
    const inicio = performance.now();
    const resposta: RespostaHttp = await requisitar(metodo, url, body);
    const registro: Registro = {
      id: ++seq.current,
      op,
      metodo,
      url,
      requisicao: body,
      status: resposta.status,
      headers: resposta.headers,
      resposta: resposta.body,
      ms: Math.round(performance.now() - inicio),
    };
    setRegistros((r) => [registro, ...r].slice(0, 30));
    setResumo(resumoAtual());
    if (destacar) setUltimaOp(op);
    return resposta;
  }, []);

  // Recarregar depois de uma alteração não tira o destaque do código da alteração.
  const listar = useCallback(async (destacar = true) => {
    const qs = new URLSearchParams();
    if (status) qs.set("status", status);
    if (busca.trim()) qs.set("busca", busca.trim());
    const url = `/api/cobrancas${qs.size ? `?${qs}` : ""}`;
    const r = await chamar("listar", "GET", url, undefined, destacar);
    if (r.status === 200) setItens(r.body as Cobranca[]);
    setCarregando(false);
  }, [busca, chamar, status]);

  // Recarrega quando o filtro muda; a busca espera o usuário parar de digitar.
  useEffect(() => {
    const t = setTimeout(() => void listar(), busca ? 320 : 0);
    return () => clearTimeout(t);
  }, [listar, busca]);

  function tratarErro(r: RespostaHttp) {
    const p = r.body as ProblemDetails | null;
    if (r.status === 400 && p?.errors) {
      setErros(Object.fromEntries(Object.entries(p.errors).map(([k, v]) => [k.toLowerCase(), v[0]])));
      setAviso({ tipo: "erro", texto: "A API recusou os dados. Veja os campos destacados." });
    } else {
      setAviso({ tipo: "erro", texto: p?.detail ?? p?.title ?? `Erro ${r.status}` });
    }
  }

  async function salvar(input: CobrancaInput, id?: string): Promise<boolean> {
    setOcupado(id ?? "novo");
    setErros({});
    const r = id
      ? await chamar("atualizar", "PUT", `/api/cobrancas/${id}`, input)
      : await chamar("criar", "POST", "/api/cobrancas", input);
    setOcupado(null);
    if (r.status === 200 || r.status === 201) {
      setAviso({ tipo: "ok", texto: id ? "Cobrança atualizada." : "Cobrança criada." });
      await listar(false);
      return true;
    }
    tratarErro(r);
    return false;
  }

  async function agir(op: "pagar" | "excluir", id: string) {
    setOcupado(id);
    const r =
      op === "pagar"
        ? await chamar("pagar", "POST", `/api/cobrancas/${id}/pagar`)
        : await chamar("excluir", "DELETE", `/api/cobrancas/${id}`);
    setOcupado(null);
    if (r.status === 200 || r.status === 204) {
      setAviso({ tipo: "ok", texto: op === "pagar" ? "Pagamento registrado." : "Cobrança excluída." });
      await listar(false);
    } else {
      tratarErro(r);
    }
  }

  async function restaurar() {
    restaurarDados();
    setErros({});
    setAviso({ tipo: "ok", texto: "Dados de exemplo restaurados." });
    await listar();
  }

  return {
    itens,
    carregando,
    ocupado,
    status,
    setStatus,
    busca,
    setBusca,
    registros,
    limparRegistros: () => setRegistros([]),
    ultimaOp,
    destacar: setUltimaOp,
    resumo,
    erros,
    limparErros: () => setErros({}),
    aviso,
    setAviso,
    salvar,
    pagar: (id: string) => agir("pagar", id),
    excluir: (id: string) => agir("excluir", id),
    restaurar,
  };
}

export type CobrancasApi = ReturnType<typeof useCobrancas>;
