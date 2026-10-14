"use client";

import { Check, Clock, Pencil, Trash2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { formatarDocumento } from "@/lib/lab/documento";
import type { Cobranca } from "@/lib/lab/tipos";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const data = (iso: string) => iso.split("-").reverse().join("/");

function hojeLocal() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function Selo({ c }: { c: Cobranca }) {
  if (c.status === "Paga") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-2.5 py-1 text-[12px] font-semibold text-emerald-700 dark:text-emerald-300">
        <Check className="size-3.5" aria-hidden="true" /> Paga
      </span>
    );
  }
  if (c.vencimento < hojeLocal()) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/14 px-2.5 py-1 text-[12px] font-semibold text-amber-800 dark:text-amber-300">
        <TriangleAlert className="size-3.5" aria-hidden="true" /> Vencida
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-surface-3 px-2.5 py-1 text-[12px] font-semibold text-chip-ink">
      <Clock className="size-3.5" aria-hidden="true" /> Pendente
    </span>
  );
}

type Props = {
  itens: Cobranca[];
  carregando: boolean;
  ocupado: string | null;
  editandoId?: string;
  onEditar: (c: Cobranca) => void;
  onPagar: (id: string) => void;
  onExcluir: (id: string) => void;
};

export function CobrancaList({ itens, carregando, ocupado, editandoId, onEditar, onPagar, onExcluir }: Props) {
  const [confirmando, setConfirmando] = useState<string | null>(null);

  if (carregando) {
    return (
      <div className="flex flex-col gap-2" aria-busy="true" aria-label="Carregando cobranças">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[68px] animate-pulse rounded-2xl bg-surface-2" />
        ))}
      </div>
    );
  }

  if (itens.length === 0) {
    return (
      <div role="status" className="rounded-2xl border border-dashed border-line px-6 py-10 text-center">
        <p className="m-0 font-semibold">Nenhuma cobrança encontrada</p>
        <p className="m-0 mt-1 text-[15px] text-muted">Mude o filtro ou crie uma cobrança no formulário acima.</p>
      </div>
    );
  }

  const acao = "inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium transition-colors disabled:opacity-40";

  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0">
      {itens.map((c) => {
        const paga = c.status === "Paga";
        const travado = ocupado === c.id;
        return (
          <li
            key={c.id}
            className={`grid gap-3 rounded-2xl border px-4 py-3 transition-colors sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center ${
              editandoId === c.id ? "border-azul bg-azul/5" : "border-hairline bg-surface"
            } ${travado ? "opacity-60" : ""}`}
          >
            <div className="flex min-w-0 flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="truncate font-semibold">{c.cliente}</span>
                <Selo c={c} />
              </div>
              <span className="text-[13px] text-muted">
                {formatarDocumento(c.documento)} · vence {data(c.vencimento)} ·{" "}
                <span className="font-semibold text-ink tabular-nums">{brl.format(c.valor)}</span>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <button type="button" className={`${acao} hover:bg-surface-2`} disabled={paga || travado} onClick={() => onEditar(c)}>
                <Pencil className="size-3.5" aria-hidden="true" /> Editar
              </button>
              {!paga && (
                <button type="button" className={`${acao} hover:bg-surface-2`} disabled={travado} onClick={() => onPagar(c.id)}>
                  <Check className="size-3.5" aria-hidden="true" /> Marcar paga
                </button>
              )}
              {confirmando === c.id ? (
                <button
                  type="button"
                  className={`${acao} bg-[#c0392b] text-white hover:bg-[#a93226]`}
                  disabled={travado}
                  onClick={() => {
                    setConfirmando(null);
                    onExcluir(c.id);
                  }}
                  onBlur={() => setConfirmando(null)}
                  autoFocus
                >
                  <Trash2 className="size-3.5" aria-hidden="true" /> Confirmar exclusão
                </button>
              ) : (
                <button
                  type="button"
                  className={`${acao} text-[#c0392b] hover:bg-[#c0392b]/10 dark:text-[#ff8a80]`}
                  disabled={travado}
                  onClick={() => setConfirmando(c.id)}
                  aria-label={`Excluir cobrança de ${c.cliente}`}
                >
                  <Trash2 className="size-3.5" aria-hidden="true" /> Excluir
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
