import type { Cobranca, ProblemDetails, Registro } from "./tipos";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** Traduz uma requisição em uma frase que qualquer pessoa entende. */
export function descrever(r: Registro): { ok: boolean; texto: string } {
  const c = r.resposta as Cobranca | null;
  const p = r.resposta as ProblemDetails | null;
  if (r.status === 400) {
    const primeiro = Object.values(p?.errors ?? {})[0]?.[0];
    return { ok: false, texto: `Recusado pelo sistema: ${primeiro ?? "dados inválidos"}` };
  }
  if (r.status === 409) return { ok: false, texto: `Bloqueado: ${p?.detail ?? "regra de negócio"}` };
  if (r.status === 404) return { ok: false, texto: "Cobrança não encontrada." };

  switch (r.op) {
    case "criar":
      return { ok: true, texto: `Cobrança de ${c?.cliente} cadastrada (${brl.format(c?.valor ?? 0)}).` };
    case "atualizar":
      return { ok: true, texto: `Cobrança de ${c?.cliente} atualizada.` };
    case "pagar":
      return { ok: true, texto: `Pagamento de ${brl.format(c?.valor ?? 0)} registrado para ${c?.cliente}.` };
    case "excluir":
      return { ok: true, texto: "Cobrança excluída." };
    default:
      return { ok: true, texto: "Lista atualizada." };
  }
}
