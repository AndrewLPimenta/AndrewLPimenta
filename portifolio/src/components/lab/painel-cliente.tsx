"use client";

import Link from "next/link";
import { ArrowUpRight, Ban, Check, Code2 } from "lucide-react";
import { descrever } from "@/lib/lab/descrever";
import type { Operacao, Registro } from "@/lib/lab/tipos";

export type MissaoId = "criar" | "invalido" | "pagar" | "excluirPaga";

const missoes: { id: MissaoId; titulo: string; porque: string; atalho?: string; feita: (r: Registro) => boolean }[] = [
  {
    id: "criar",
    titulo: "Cadastre uma cobrança",
    porque: "Os dados são conferidos no servidor antes de entrar no sistema.",
    feita: (r) => r.op === "criar" && r.status === 201,
  },
  {
    id: "invalido",
    titulo: "Tente cadastrar com um CPF inválido",
    porque: "A regra fica no servidor, não só na tela. Nenhum atalho deixa um documento inválido entrar.",
    atalho: "Testar agora",
    feita: (r) => (r.op === "criar" || r.op === "atualizar") && r.status === 400,
  },
  {
    id: "pagar",
    titulo: "Marque uma cobrança como paga",
    porque: "Uma cobrança paga não pode ser paga de novo nem editada. A própria cobrança recusa.",
    feita: (r) => r.op === "pagar" && r.status === 200,
  },
  {
    id: "excluirPaga",
    titulo: "Tente excluir uma cobrança paga",
    porque: "Histórico financeiro não some. O sistema bloqueia e explica o motivo.",
    atalho: "Testar agora",
    feita: (r) => r.op === "excluir" && r.status === 409,
  },
];

type Props = {
  registros: Registro[];
  onAtalho: (id: MissaoId) => void;
  onVerCodigo: (op: Operacao) => void;
};

/** Visão do cliente: um roteiro curto e o histórico em linguagem simples. */
export function PainelCliente({ registros, onAtalho, onVerCodigo }: Props) {
  const feitas = missoes.filter((m) => registros.some(m.feita)).length;
  const acoes = registros.filter((r) => r.op !== "listar");

  return (
    <div className="flex flex-col gap-3">
      <section aria-labelledby="t-roteiro" className="rounded-[22px] bg-surface p-6 ring-1 ring-black/5 dark:ring-white/10">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h3 id="t-roteiro" className="m-0 text-[19px] font-semibold tracking-[-0.015em]">
            Teste em 1 minuto
          </h3>
          <span className="text-[14px] text-muted tabular-nums">
            {feitas} de {missoes.length}
          </span>
        </div>
        <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-track" aria-hidden="true">
          <div className="h-full rounded-full bg-azul transition-[width] duration-500" style={{ width: `${(feitas / missoes.length) * 100}%` }} />
        </div>
        <ol className="m-0 flex list-none flex-col gap-4 p-0">
          {missoes.map((m, i) => {
            const feita = registros.some(m.feita);
            return (
              <li key={m.id} className="flex gap-3">
                <span
                  className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold ${
                    feita ? "bg-emerald-600 text-white" : "bg-surface-2 text-muted"
                  }`}
                >
                  {feita ? <Check className="size-3.5" aria-label="Feito" /> : i + 1}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[15px] font-medium">{m.titulo}</span>
                    {m.atalho && !feita && (
                      <button
                        type="button"
                        onClick={() => onAtalho(m.id)}
                        className="rounded-full px-2.5 py-1 text-[13px] font-medium text-azul hover:bg-azul/10"
                      >
                        {m.atalho}
                      </button>
                    )}
                  </div>
                  {feita && <p className="m-0 text-[14px] text-muted">{m.porque}</p>}
                </div>
              </li>
            );
          })}
        </ol>
        {feitas === missoes.length && (
          <div role="status" className="mt-5 rounded-2xl bg-azul/8 p-4">
            <p className="m-0 text-[15px] font-semibold">Pronto. É assim que eu construo sistemas maiores.</p>
            <p className="m-0 mt-1 text-[14px] text-muted">
              Regras protegidas no servidor, erros que explicam o que fazer e um teste automático para cada regra.
            </p>
            <Link href="/contato" className="mt-3 inline-flex items-center gap-1 text-[14px] font-medium">
              Vamos conversar <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </section>

      <section aria-labelledby="t-historico" className="flex min-h-[200px] flex-1 flex-col rounded-[22px] bg-surface p-6 ring-1 ring-black/5 dark:ring-white/10">
        <h3 id="t-historico" className="m-0 mb-4 text-[19px] font-semibold tracking-[-0.015em]">
          O que aconteceu
        </h3>
        {acoes.length === 0 ? (
          <p className="m-0 text-[15px] text-muted">Suas ações aparecem aqui, explicadas em português.</p>
        ) : (
          <ol className="m-0 flex max-h-[320px] list-none flex-col gap-3 overflow-y-auto p-0" aria-live="polite">
            {acoes.slice(0, 8).map((r) => {
              const d = descrever(r);
              return (
                <li key={r.id} className="flex gap-3">
                  <span
                    className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${
                      d.ok ? "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300" : "bg-[#c0392b]/10 text-[#c0392b] dark:text-[#ff8a80]"
                    }`}
                  >
                    {d.ok ? <Check className="size-3.5" aria-label="Concluído" /> : <Ban className="size-3.5" aria-label="Bloqueado" />}
                  </span>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[15px]">{d.texto}</span>
                    <button
                      type="button"
                      onClick={() => onVerCodigo(r.op)}
                      className="inline-flex w-fit items-center gap-1 text-[13px] text-muted hover:text-azul"
                    >
                      <Code2 className="size-3.5" aria-hidden="true" />
                      Ver como funciona por dentro
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </div>
  );
}
