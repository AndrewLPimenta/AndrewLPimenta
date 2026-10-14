"use client";

import { RotateCcw, Search } from "lucide-react";
import type { Cobranca } from "@/lib/lab/tipos";
import { CobrancaForm, deCobranca, type Rascunho } from "./cobranca-form";
import { CobrancaList } from "./cobranca-list";
import type { CobrancasApi, FiltroStatus } from "./use-cobrancas";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const filtros: { valor: FiltroStatus; rotulo: string }[] = [
  { valor: "", rotulo: "Todas" },
  { valor: "Pendente", rotulo: "Pendentes" },
  { valor: "Paga", rotulo: "Pagas" },
];

type Props = {
  api: CobrancasApi;
  editando: Cobranca | null;
  setEditando: (c: Cobranca | null) => void;
  preenchimento: Rascunho | null;
  setPreenchimento: (r: Rascunho | null) => void;
};

/** O app de cobranças: resumo, formulário, filtros e lista. */
export function CobrancasApp({ api, editando, setEditando, preenchimento, setPreenchimento }: Props) {
  const numeros = [
    { rotulo: "A receber", valor: brl.format(api.resumo.aReceber) },
    { rotulo: "Vencidas", valor: String(api.resumo.vencidas) },
    { rotulo: "Recebido", valor: brl.format(api.resumo.recebido) },
  ];

  return (
    <div className="overflow-hidden rounded-[22px] bg-surface ring-1 ring-black/5 dark:ring-white/10">
      <div aria-hidden="true" className="flex h-9 items-center gap-[7px] bg-frame-bar px-4">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
      </div>

      <div className="flex flex-col gap-6 p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="m-0 text-[24px] font-semibold tracking-[-0.025em]">Cobranças</h3>
            <p className="m-0 text-[14px] text-muted">Use à vontade. Os dados ficam só no seu navegador.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditando(null);
              void api.restaurar();
            }}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium text-muted hover:bg-surface-2 hover:text-ink"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" /> Recomeçar
          </button>
        </div>

        <dl className="m-0 grid grid-cols-3 divide-x divide-hairline rounded-2xl border border-hairline">
          {numeros.map((n) => (
            <div key={n.rotulo} className="flex flex-col gap-0.5 px-4 py-3">
              <dt className="text-[13px] text-muted">{n.rotulo}</dt>
              <dd className="m-0 text-[clamp(1rem,2vw,1.25rem)] font-semibold tracking-[-0.02em] tabular-nums">{n.valor}</dd>
            </div>
          ))}
        </dl>

        <section aria-labelledby="t-form" className="rounded-2xl bg-surface-2 p-4 sm:p-5">
          <h4 id="t-form" className="m-0 mb-3 text-[15px] font-semibold">
            {editando ? `Editando a cobrança de ${editando.cliente}` : "Nova cobrança"}
          </h4>
          <CobrancaForm
            editando={editando}
            preenchimento={preenchimento}
            erros={api.erros}
            ocupado={api.ocupado === (editando?.id ?? "novo")}
            onSalvar={async (input) => {
              const ok = await api.salvar(input, editando?.id);
              if (ok) setEditando(null);
              return ok;
            }}
            onCancelar={() => {
              setEditando(null);
              api.limparErros();
            }}
          />
        </section>

        {api.aviso && (
          <p
            role="status"
            className={`m-0 rounded-xl px-4 py-2.5 text-[14px] font-medium ${
              api.aviso.tipo === "ok"
                ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
                : "bg-[#c0392b]/10 text-[#a93226] dark:text-[#ff8a80]"
            }`}
          >
            {api.aviso.texto}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <label className="relative min-w-[200px] flex-1">
              <span className="sr-only">Buscar por cliente</span>
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                type="search"
                value={api.busca}
                onChange={(e) => api.setBusca(e.target.value)}
                placeholder="Buscar por cliente"
                className="min-h-10 w-full rounded-full border border-line bg-surface pr-4 pl-9 text-[14px] outline-none focus:border-azul"
              />
            </label>
            <div role="group" aria-label="Filtrar por status" className="flex rounded-full bg-track p-1">
              {filtros.map((f) => (
                <button
                  key={f.rotulo}
                  type="button"
                  aria-pressed={api.status === f.valor}
                  onClick={() => api.setStatus(f.valor)}
                  className={`rounded-full px-3 py-1.5 text-[13px] font-medium ${
                    api.status === f.valor ? "bg-seg-on text-ink shadow-sm" : "text-muted hover:text-ink"
                  }`}
                >
                  {f.rotulo}
                </button>
              ))}
            </div>
          </div>

          <CobrancaList
            itens={api.itens}
            carregando={api.carregando}
            ocupado={api.ocupado}
            editandoId={editando?.id}
            onEditar={(c) => {
              api.limparErros();
              setEditando(c);
              setPreenchimento(deCobranca(c));
            }}
            onPagar={api.pagar}
            onExcluir={api.excluir}
          />
        </div>
      </div>
    </div>
  );
}
