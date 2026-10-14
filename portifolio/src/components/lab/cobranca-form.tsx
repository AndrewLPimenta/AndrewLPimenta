"use client";

import { useId, useState } from "react";
import { formatarDocumento } from "@/lib/lab/documento";
import type { Cobranca, CobrancaInput } from "@/lib/lab/tipos";

export type Rascunho = { cliente: string; documento: string; valor: string; vencimento: string };

export const rascunhoVazio: Rascunho = { cliente: "", documento: "", valor: "", vencimento: "" };

export function deCobranca(c: Cobranca): Rascunho {
  return {
    cliente: c.cliente,
    documento: formatarDocumento(c.documento),
    valor: c.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
    vencimento: c.vencimento,
  };
}

/** "1.234,56" → 1234.56. Texto inválido vira NaN e a API responde 400. */
function lerValor(texto: string): number {
  const limpo = texto.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
  return limpo ? Number(limpo) : NaN;
}

type Props = {
  editando: Cobranca | null;
  preenchimento: Rascunho | null;
  erros: Record<string, string>;
  ocupado: boolean;
  onSalvar: (input: CobrancaInput) => Promise<boolean>;
  onCancelar: () => void;
};

export function CobrancaForm({ editando, preenchimento, erros, ocupado, onSalvar, onCancelar }: Props) {
  const [r, setR] = useState<Rascunho>(rascunhoVazio);
  const uid = useId();

  // Quando o pai manda um novo preenchimento (editar ou cenário), o formulário adota.
  const [origem, setOrigem] = useState<Rascunho | null>(null);
  if (preenchimento !== origem) {
    setOrigem(preenchimento);
    if (preenchimento) setR(preenchimento);
  }

  const set = (campo: keyof Rascunho) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setR((atual) => ({ ...atual, [campo]: e.target.value }));

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    const ok = await onSalvar({
      cliente: r.cliente,
      documento: r.documento,
      valor: lerValor(r.valor),
      vencimento: r.vencimento,
    });
    if (ok) setR(rascunhoVazio);
  }

  const campos: { nome: keyof Rascunho; rotulo: string; tipo?: string; dica?: string; extra?: object }[] = [
    { nome: "cliente", rotulo: "Cliente", extra: { autoComplete: "off" } },
    { nome: "documento", rotulo: "CPF ou CNPJ", dica: "Aceita CNPJ alfanumérico", extra: { autoComplete: "off" } },
    { nome: "valor", rotulo: "Valor (R$)", extra: { inputMode: "decimal", placeholder: "0,00" } },
    { nome: "vencimento", rotulo: "Vencimento", tipo: "date" },
  ];

  return (
    <form onSubmit={enviar} noValidate className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {campos.map((c) => {
          const id = `${uid}-${c.nome}`;
          const erro = erros[c.nome];
          return (
            <div key={c.nome} className="flex flex-col gap-1.5">
              <label htmlFor={id} className="text-[13px] font-semibold text-ink-2">
                {c.rotulo}
              </label>
              <input
                id={id}
                type={c.tipo ?? "text"}
                value={r[c.nome]}
                onChange={set(c.nome)}
                onBlur={c.nome === "documento" ? () => setR((a) => ({ ...a, documento: formatarDocumento(a.documento) })) : undefined}
                aria-invalid={erro ? true : undefined}
                aria-describedby={erro ? `${id}-erro` : c.dica ? `${id}-dica` : undefined}
                className={`min-h-11 rounded-xl border bg-surface px-3.5 text-[15px] text-ink outline-none transition-colors focus:border-azul ${
                  erro ? "border-[#d9534f]" : "border-line"
                }`}
                {...c.extra}
              />
              {erro ? (
                <p id={`${id}-erro`} className="m-0 text-[13px] text-[#c0392b] dark:text-[#ff8a80]">
                  {erro}
                </p>
              ) : (
                c.dica && (
                  <p id={`${id}-dica`} className="m-0 text-[13px] text-muted">
                    {c.dica}
                  </p>
                )
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="submit" disabled={ocupado} className="pill pill-blue pill-sm disabled:opacity-60">
          {ocupado ? "Enviando…" : editando ? "Salvar alterações" : "Criar cobrança"}
        </button>
        {editando && (
          <button
            type="button"
            onClick={() => {
              setR(rascunhoVazio);
              onCancelar();
            }}
            className="pill pill-sm text-ink shadow-[inset_0_0_0_1px_var(--line)]"
          >
            Cancelar edição
          </button>
        )}
      </div>
    </form>
  );
}
