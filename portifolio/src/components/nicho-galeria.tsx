"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ItemGaleria } from "@/data/nichos";
import { BrowserFrame } from "./frames";
import { ProjectVisual } from "./project-visual";

const corStatus: Record<ItemGaleria["status"], string> = {
  "Em produção": "bg-[#30a46c]/15 text-[#1f7a4f] dark:text-[#8fe0b5]",
  "Em construção": "bg-[#d8b867]/20 text-ouro-ink dark:text-[#e2c27a]",
};

/** Galeria de um nicho: abas com cada exemplo e a tela grande do exemplo escolhido. */
export function NichoGaleria({ itens, nome }: { itens: ItemGaleria[]; nome: string }) {
  const [ativo, setAtivo] = useState(0);
  const item = itens[ativo];

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div key={`${item.titulo}`} className="animate-[servico-entra_.45s_ease-out]">
        <Visual item={item} />
      </div>

      {itens.length > 1 && (
        <div role="tablist" aria-label={`Exemplos de ${nome}`} className="flex gap-2 overflow-x-auto py-1 [scrollbar-width:none]">
          {itens.map((it, i) => {
            const sel = i === ativo;
            return (
              <button
                key={it.titulo}
                type="button"
                role="tab"
                aria-selected={sel}
                onClick={() => setAtivo(i)}
                className={`h-[68px] w-[108px] flex-none rounded-[14px] border-2 p-[2px] transition-[opacity,border-color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul ${
                  sel ? "border-azul opacity-100" : "border-transparent opacity-55 hover:opacity-100"
                }`}
              >
                {/* A borda é do botão e a imagem fica recortada por dentro: nenhum navegador corta a borda */}
                <span className="relative block h-full w-full overflow-hidden rounded-[10px] bg-surface-2">
                  <Miniatura item={it} />
                </span>
                <span className="sr-only">{it.titulo}</span>
              </button>
            );
          })}
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex min-w-0 flex-col">
          <span className="flex flex-wrap items-center gap-2 text-[17px] font-semibold tracking-[-0.01em]">
            {item.titulo}
            <span className={`rounded-full px-2.5 py-0.5 text-[12.5px] font-semibold ${corStatus[item.status]}`}>{item.status}</span>
          </span>
          <span className="text-[15px] text-muted">Para {item.para.charAt(0).toLowerCase() + item.para.slice(1)}</span>
        </div>
        {item.projeto && (
          <Link href={`/projetos/${item.projeto}`} className="inline-flex items-center gap-1 text-[15px] font-medium">
            Ver estudo de caso <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        )}
      </div>


      {item.detalhes && (
        <div key={`d-${item.titulo}`} className="flex animate-[servico-entra_.45s_ease-out] flex-col gap-4 rounded-[20px] bg-surface-2/70 p-5 sm:p-6">
          <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0" aria-label="Stack">
            {item.detalhes.stack.map((t) => (
              <li key={t} className="rounded-full bg-paper px-3 py-1 text-[13.5px] text-chip-ink">
                {t}
              </li>
            ))}
          </ul>
          <dl className="m-0 grid gap-3.5 text-[15.5px] leading-[1.5]">
            {[
              ["O que eu fiz", item.detalhes.fiz],
              ["Contexto", item.detalhes.contexto],
              ["Desafio resolvido", item.detalhes.desafio],
            ].map(([rotulo, texto]) => (
              <div key={rotulo}>
                <dt className="text-[13px] font-semibold tracking-[0.02em] text-ink">{rotulo}</dt>
                <dd className="m-0 mt-0.5 text-muted">{texto}</dd>
              </div>
            ))}
          </dl>
          {item.recriada && (
            <p className="m-0 text-[13px] text-muted">Tela recriada com outra marca e dados de exemplo, por confidencialidade com o cliente.</p>
          )}
        </div>
      )}
    </div>
  );
}

function Visual({ item }: { item: ItemGaleria }) {
  const alt = `${item.titulo}: ${item.recriada ? "tela recriada do projeto" : "tela do projeto"}`;
  if (item.formato === "mock" && item.mock) {
    return (
      <div className="flex h-full items-center justify-center rounded-[20px] bg-gradient-to-b from-mist to-surface-2 p-6 sm:p-10">
        <ProjectVisual mock={item.mock} className={item.mock === "praxis" ? "scale-[0.92]" : "w-full"} />
      </div>
    );
  }
  if (item.formato === "cena" && item.imagem) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] shadow-[0_40px_90px_-40px_rgba(15,30,54,.55)] ring-1 ring-black/5 dark:ring-white/10">
        <Image src={item.imagem} alt={alt} fill sizes="(min-width: 1024px) 680px, 100vw" className="object-cover" />
      </div>
    );
  }
  return (
    <BrowserFrame aspecto="aspect-[16/10]">
      <div className="relative h-full w-full">
        <Image
          src={item.imagem!}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 680px, 100vw"
          className={`object-cover object-top ${item.imagemEscura ? "dark:hidden" : ""}`}
        />
        {item.imagemEscura && (
          <Image src={item.imagemEscura} alt={alt} fill sizes="(min-width: 1024px) 680px, 100vw" className="hidden object-cover object-top dark:block" />
        )}
      </div>
    </BrowserFrame>
  );
}

function Miniatura({ item }: { item: ItemGaleria }) {
  if (item.imagem) {
    return (
      <>
        <Image src={item.imagem} alt="" fill sizes="104px" className={`object-cover object-top ${item.imagemEscura ? "dark:hidden" : ""}`} />
        {item.imagemEscura && <Image src={item.imagemEscura} alt="" fill sizes="104px" className="hidden object-cover object-top dark:block" />}
      </>
    );
  }
  return (
    <span className="flex h-full w-full items-center justify-center bg-gradient-to-b from-mist to-surface-2 px-2 text-center text-[11px] leading-tight font-semibold text-ink-2">
      {item.titulo}
    </span>
  );
}
