"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { corToken, realcar } from "@/lib/lab/highlight";
import { arquivos } from "@/lib/lab/snippets";
import type { Operacao } from "@/lib/lab/tipos";

type Linha = { texto: string; ops: Operacao[] };

function linhasDe(i: number): Linha[] {
  return arquivos[i].blocos.flatMap((b) => {
    const linhas = b.codigo.split("\n");
    if (linhas.length > 1 && linhas.at(-1) === "") linhas.pop(); // quebra final do bloco
    // A linha em branco que separa um bloco do anterior não acende.
    return linhas.map((texto, n) => ({ texto, ops: n === 0 && texto === "" ? [] : (b.ops ?? []) }));
  });
}

/** Editor somente leitura com abas; o trecho que respondeu à última requisição acende. */
export function CodeViewer({ ativa }: { ativa: Operacao | null }) {
  const [aba, setAba] = useState(0);
  const [copiado, setCopiado] = useState(false);
  const area = useRef<HTMLDivElement>(null);
  const arquivo = arquivos[aba];
  const linhas = useMemo(() => linhasDe(aba), [aba]);

  // Leva o trecho aceso para a vista, sem rolar a página inteira.
  useEffect(() => {
    const el = area.current;
    const alvo = el?.querySelector<HTMLElement>("[data-acesa='true']");
    if (el && alvo) el.scrollTo({ top: alvo.offsetTop - 48, behavior: "smooth" });
  }, [ativa, aba]);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(arquivo.blocos.map((b) => b.codigo).join(""));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1600);
    } catch {
      /* área de transferência indisponível */
    }
  }

  return (
    <div className="overflow-hidden rounded-[22px] bg-[#0b1220] text-[#dbe2ec] ring-1 ring-white/10">
      <div role="tablist" aria-label="Arquivos" className="flex gap-1 overflow-x-auto border-b border-white/10 px-2 pt-2 [scrollbar-width:none]">
        {arquivos.map((a, i) => {
          const temAtiva = !!ativa && a.blocos.some((b) => b.ops?.includes(ativa));
          return (
            <button
              key={a.nome}
              role="tab"
              type="button"
              id={`aba-${i}`}
              aria-selected={aba === i}
              aria-controls="painel-codigo"
              onClick={() => setAba(i)}
              className={`relative flex shrink-0 items-center gap-2 rounded-t-lg px-3.5 py-2.5 font-mono text-[12.5px] transition-colors ${
                aba === i ? "bg-white/[0.07] text-white" : "text-[#8a97ab] hover:text-white"
              }`}
            >
              {a.nome}
              {temAtiva && <span className="size-1.5 rounded-full bg-[#e2c27a]" aria-label="contém o trecho da última requisição" />}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-2.5">
        <p className="m-0 text-[13px] text-[#a9b6c9]">{arquivo.descricao}</p>
        <button
          type="button"
          onClick={copiar}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-medium text-[#a9b6c9] hover:bg-white/10 hover:text-white"
        >
          {copiado ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
          {copiado ? "Copiado" : "Copiar"}
        </button>
      </div>

      <div
        ref={area}
        id="painel-codigo"
        role="tabpanel"
        aria-labelledby={`aba-${aba}`}
        tabIndex={0}
        className="relative max-h-[560px] overflow-auto py-3 font-mono text-[12.5px] leading-[1.7]"
      >
        <pre className="m-0 min-w-max">
          {linhas.map((l, n) => {
            const acesa = !!ativa && l.ops.includes(ativa);
            return (
              <div
                key={n}
                data-acesa={acesa}
                className={`flex border-l-2 pr-6 transition-colors duration-500 ${
                  acesa ? "border-[#e2c27a] bg-[#7fa8ff]/[0.09]" : "border-transparent"
                }`}
              >
                <span aria-hidden="true" className="w-12 shrink-0 pr-4 text-right text-[#4b5870] select-none">
                  {n + 1}
                </span>
                <code>
                  {realcar(l.texto, arquivo.lang).map((t, k) => (
                    <span key={k} className={corToken[t.k]}>
                      {t.t}
                    </span>
                  ))}
                  {l.texto === "" ? " " : null}
                </code>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
