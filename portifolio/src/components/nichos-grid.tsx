import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { nichos } from "@/data/nichos";
import { SpotlightCard } from "./fx/spotlight-card";

/** Cards da página inicial: um por nicho, com os públicos atendidos e um botão para o nicho em Projetos. */
export function NichosGrid() {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {nichos.map((n) => {
        const capa = n.galeria.find((g) => g.imagem) ?? n.galeria[0];
        const nome = n.titulo.replace(/\.$/, "");
        return (
          <SpotlightCard key={n.slug} className="flex flex-col overflow-hidden rounded-[28px]">
            <div className="relative h-[220px] overflow-hidden bg-gradient-to-b from-mist to-surface-2">
              {capa?.imagem && (
                <div className="absolute inset-x-6 top-7 bottom-0 overflow-hidden rounded-t-[14px] shadow-[0_20px_40px_-24px_rgba(15,30,54,.6)] ring-1 ring-black/5 dark:ring-white/10">
                  <Image
                    src={capa.imagem}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                    className={`object-cover object-top ${capa.imagemEscura ? "dark:hidden" : ""}`}
                  />
                  {capa.imagemEscura && (
                    <Image src={capa.imagemEscura} alt="" fill sizes="380px" className="hidden object-cover object-top dark:block" />
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-4 p-7">
              <h3 className="m-0 text-[28px] leading-[1.05] font-semibold tracking-[-0.035em]">{nome}</h3>
              <p className="m-0 text-[17px] leading-[1.45] text-ink-2">{n.resumo}</p>
              <div className="flex flex-col gap-2">
                <span className="text-[12.5px] font-semibold tracking-[0.08em] text-muted uppercase">Para</span>
                <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                  {n.publicos.map((p) => (
                    <li key={p} className="rounded-full bg-surface-2 px-3 py-1 text-sm font-medium text-chip-ink">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={`/projetos#${n.slug}`}
                className="group mt-auto flex min-h-12 items-center justify-between gap-3 rounded-full bg-surface-2 py-2 pr-2 pl-5 text-[16px] font-semibold text-ink transition-colors hover:bg-mist-2 hover:text-ink hover:no-underline"
              >
                {n.ver}
                <span className="flex size-9 items-center justify-center rounded-full bg-surface text-ink shadow-[inset_0_0_0_1px_var(--ring)] transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </SpotlightCard>
        );
      })}
    </div>
  );
}
