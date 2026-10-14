"use client";

import { useRef, useState } from "react";
import type { Cobranca, Operacao } from "@/lib/lab/tipos";
import { CobrancasApp } from "./cobrancas-app";
import type { Rascunho } from "./cobranca-form";
import { CodeViewer } from "./code-viewer";
import { PainelCliente, type MissaoId } from "./painel-cliente";
import { RequestLog } from "./request-log";
import { useCobrancas } from "./use-cobrancas";

type Modo = "cliente" | "tecnico";

const modos: { id: Modo; rotulo: string; texto: string }[] = [
  { id: "cliente", rotulo: "Como cliente", texto: "Use o sistema e veja as regras funcionando." },
  { id: "tecnico", rotulo: "Visão técnica", texto: "Veja a API e o código C# por trás de cada clique." },
];

function emDias(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** O laboratório: o mesmo app, visto como cliente ou por dentro. */
export function LabDemo() {
  const api = useCobrancas();
  const [modo, setModo] = useState<Modo>("cliente");
  const [editando, setEditando] = useState<Cobranca | null>(null);
  const [preenchimento, setPreenchimento] = useState<Rascunho | null>(null);
  const codigo = useRef<HTMLDivElement>(null);

  function atalho(id: MissaoId) {
    if (id === "invalido") {
      const r = { cliente: "Oficina Duas Rodas", documento: "123.456.789-00", valor: "250,00", vencimento: emDias(10) };
      setEditando(null);
      setPreenchimento(r);
      void api.salvar({ ...r, valor: 250 });
    }
    if (id === "excluirPaga") {
      const paga = api.itens.find((c) => c.status === "Paga");
      if (paga) void api.excluir(paga.id);
      else api.setAviso({ tipo: "erro", texto: "Marque uma cobrança como paga primeiro." });
    }
  }

  function verCodigo(op: Operacao) {
    api.destacar(op);
    setModo("tecnico");
    requestAnimationFrame(() => codigo.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-center gap-3 pb-4">
        <div role="group" aria-label="Modo de visualização" className="flex rounded-full bg-track p-1">
          {modos.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={modo === m.id}
              onClick={() => setModo(m.id)}
              className={`rounded-full px-5 py-2 text-[15px] font-medium transition-colors ${
                modo === m.id ? "bg-seg-on text-ink shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              {m.rotulo}
            </button>
          ))}
        </div>
        <p className="m-0 text-[15px] text-muted">{modos.find((m) => m.id === modo)?.texto}</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <CobrancasApp
          api={api}
          editando={editando}
          setEditando={setEditando}
          preenchimento={preenchimento}
          setPreenchimento={setPreenchimento}
        />
        {modo === "cliente" ? (
          <PainelCliente registros={api.registros} onAtalho={atalho} onVerCodigo={verCodigo} />
        ) : (
          <RequestLog registros={api.registros} onLimpar={api.limparRegistros} />
        )}
      </div>

      {modo === "tecnico" && (
        <div ref={codigo} className="scroll-mt-20">
          <CodeViewer ativa={api.ultimaOp} />
        </div>
      )}
    </div>
  );
}
