import Link from "next/link";
import { ArrowRight, ArrowUpRight, Monitor, MessageCircle, Laptop, Smartphone } from "lucide-react";
import { getCategoria } from "@/data/categorias";
import type { Project } from "@/data/projects";
import { SpotlightCard } from "./fx/spotlight-card";
import { ProjectVisual } from "./project-visual";

/** Projetos entregues, todos com o mesmo tamanho e a mesma hierarquia. */
export function ProjetosGrid({ projetos }: { projetos: Project[] }) {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {projetos.map((p) => {
        const categoria = getCategoria(p.categoria);
        return (
          <SpotlightCard key={p.slug} className="flex flex-col overflow-hidden rounded-[28px]">
            <div className="relative flex h-[300px] items-end justify-center overflow-hidden bg-gradient-to-b from-mist to-surface-2 px-6 pt-8">
              <span
                aria-hidden="true"
                className="absolute inset-x-10 top-10 bottom-0 rounded-full bg-[radial-gradient(closest-side,rgb(47_107_224/0.28),transparent)] blur-2xl"
              />
              {p.mock === "praxis" ? (
                <div className="relative w-full translate-y-[38%]">
                  <ProjectVisual mock={p.mock} className="scale-[0.82]" />
                </div>
              ) : (
                /* A tela é desenhada em tamanho real e reduzida, como uma miniatura */
                <div className="absolute top-10 left-1/2 w-[150%] origin-top -translate-x-1/2 scale-[0.6667]">
                  <ProjectVisual mock={p.mock} />
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-4 p-7 sm:p-8">
              <p className="m-0 flex items-center gap-2 text-[15px] font-semibold text-muted">
                <PlataformaIcone plataforma={p.plataforma} />
                {p.plataforma}
              </p>
              <h3 className="m-0 text-[30px] leading-[1.05] font-semibold tracking-[-0.035em]">{p.tipo}</h3>
              <p className="m-0 -mt-2 text-[17px] font-semibold text-azul">Para {p.nicho}</p>
              <p className="m-0 text-[19px] leading-[1.4] tracking-[-0.01em]">{p.tagline}</p>
              {p.clientes && (
                <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                  {p.clientes.map((c) => (
                    <li key={c} className="rounded-full bg-surface-2 px-3 py-1 text-sm font-medium text-chip-ink">
                      {c}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto flex items-end justify-between gap-4 border-t border-hairline pt-5">
                {p.beneficio && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] font-semibold tracking-[0.08em] text-muted uppercase">Ideal para</span>
                    <p className="m-0 text-[16px] leading-[1.45] text-ink-2">{p.beneficio}</p>
                  </div>
                )}
                <Link
                  href={`/projetos/${p.slug}`}
                  aria-label={`Ver o projeto: ${p.tipo}`}
                  className="flex size-12 flex-none items-center justify-center rounded-full bg-ink text-paper transition-transform hover:scale-105 hover:text-paper hover:no-underline"
                >
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </Link>
              </div>
              {categoria && (
                <Link
                  href={`/explorar/${categoria.slug}`}
                  className="group flex min-h-12 items-center justify-between gap-3 rounded-full bg-surface-2 py-2 pr-2 pl-5 text-[16px] font-semibold text-ink transition-colors hover:bg-mist-2 hover:text-ink hover:no-underline"
                >
                  {categoria.botao}
                  <span className="flex size-9 items-center justify-center rounded-full bg-surface text-ink shadow-[inset_0_0_0_1px_var(--ring)] transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              )}
            </div>
          </SpotlightCard>
        );
      })}
    </div>
  );
}

function PlataformaIcone({ plataforma }: { plataforma: Project["plataforma"] }) {
  const Icone = { Web: Monitor, Mobile: Smartphone, Desktop: Laptop, WhatsApp: MessageCircle }[plataforma];
  return <Icone className="size-4" aria-hidden="true" />;
}
