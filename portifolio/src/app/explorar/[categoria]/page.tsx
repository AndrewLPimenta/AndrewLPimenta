import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { CheckList } from "@/components/check-list";
import { DeviceReveal } from "@/components/fx/device-reveal";
import { Reveal } from "@/components/fx/reveal";
import { SpotlightCard } from "@/components/fx/spotlight-card";
import { Wallpaper } from "@/components/fx/wallpaper";
import { PageHeader } from "@/components/page-header";
import { ProjectVisual } from "@/components/project-visual";
import { Button } from "@/components/ui/button";
import { categorias, getCategoria } from "@/data/categorias";
import { getNicho } from "@/data/nichos";
import { projetosDaCategoria } from "@/data/projects";

type Props = { params: Promise<{ categoria: string }> };

export function generateStaticParams() {
  return categorias.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const c = getCategoria(categoria);
  if (!c) return {};
  return { title: c.titulo, description: c.descricao };
}

export default async function ExplorarPage({ params }: Props) {
  const { categoria } = await params;
  const c = getCategoria(categoria);
  if (!c) notFound();
  const projetos = projetosDaCategoria(c.slug);
  const conceitos = (getNicho(c.slug)?.galeria ?? []).filter((g) => g.recriada && g.imagem);
  const outras = categorias.filter((o) => o.slug !== c.slug);

  return (
    <>
      <PageHeader title={c.titulo} lead={c.descricao}>
        <nav aria-label="Outras categorias" className="mt-2 flex flex-wrap justify-center gap-2">
          {outras.map((o) => (
            <Link
              key={o.slug}
              href={`/explorar/${o.slug}`}
              className="glass rounded-full px-4 py-2 text-[15px] font-medium text-ink hover:text-ink hover:no-underline"
            >
              {o.titulo}
            </Link>
          ))}
        </nav>
      </PageHeader>

      <div className="flex flex-col gap-24 pb-28 sm:gap-32">
        {projetos.map((p, i) => {
          const invertido = i % 2 === 1;
          const emConstrucao = p.fase === "construcao";
          return (
            <section key={p.slug} aria-labelledby={`t-${p.slug}`} className="wrap max-w-[1200px]">
              <div
                className={`grid items-center gap-x-16 gap-y-12 ${p.mock ? "lg:grid-cols-2" : ""} ${
                  invertido && p.mock ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal className="flex flex-col gap-5">
                  <p className="m-0 flex flex-wrap items-center gap-2 text-[15px] font-semibold text-muted">
                    {p.tipo}
                    {p.onde && <span aria-hidden="true">·</span>}
                    {p.onde}
                    {emConstrucao && (
                      <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[13px] text-chip-ink">Em construção</span>
                    )}
                  </p>
                  <h2 id={`t-${p.slug}`} className="display-2">
                    {p.nome}
                  </h2>
                  <p className="m-0 -mt-2 text-[19px] font-semibold text-azul">Para {p.nicho}</p>
                  <p className="m-0 text-[clamp(1.25rem,2.2vw,1.625rem)] leading-[1.3] font-medium tracking-[-0.02em]">
                    {p.tagline}
                  </p>
                  <p className="m-0 max-w-[620px] text-muted">{p.resumo}</p>
                  <div className="mt-1 max-w-[620px] text-[17px]">
                    <CheckList items={p.conquistas.slice(0, 3)} />
                  </div>
                  <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                    {p.stack.map((s) => (
                      <li key={s} className="rounded-full bg-surface-2 px-3 py-1 text-sm text-chip-ink">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2">
                    <Button size="lg" asChild className="bg-ink text-paper hover:bg-ink/85 hover:text-paper">
                      <Link href={`/projetos/${p.slug}`}>
                        Ver estudo de caso
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </Reveal>
                {p.mock && (
                  <DeviceReveal>
                    <ProjectVisual mock={p.mock} inteira />
                  </DeviceReveal>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {conceitos.length > 0 && (
        <section aria-labelledby="t-conceitos" className="wrap max-w-[1200px] pb-28">
          <Reveal className="mb-8 flex flex-col gap-3">
            <h2 id="t-conceitos" className="display-2">
              Outros projetos do nicho.
            </h2>
            <p className="m-0 max-w-[680px] text-[18px] leading-[1.5] text-muted">
              Projetos de que participei, em Node.js e .NET. Por confidencialidade com os clientes, as telas foram recriadas com outra marca e dados de exemplo.
            </p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {conceitos.map((c) => (
              <figure key={c.titulo} className="m-0 flex flex-col gap-3">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] shadow-[0_30px_70px_-40px_rgba(15,30,54,.55)] ring-1 ring-black/5 dark:ring-white/10">
                  <Image src={c.imagem!} alt={`${c.titulo}: tela recriada do projeto`} fill sizes="(min-width: 768px) 580px, 100vw" className="object-cover object-top" />
                </div>
                <figcaption className="flex flex-col px-1">
                  <span className="text-[17px] font-semibold tracking-[-0.01em]">{c.titulo}</span>
                  <span className="text-[15px] text-muted">Para {c.para.charAt(0).toLowerCase() + c.para.slice(1)}</span>
                  {c.detalhes && (
                    <>
                      <span className="mt-2 text-[15.5px] leading-[1.5] text-ink-2">{c.detalhes.fiz}</span>
                      <span className="mt-2 text-[13.5px] text-muted">{c.detalhes.stack.join(" · ")}</span>
                    </>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="t-outras" className="wrap pb-28">
        <h2 id="t-outras" className="m-0 mb-6 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.025em]">
          Explore também
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {outras.map((o) => (
            <Link key={o.slug} href={`/explorar/${o.slug}`} className="group text-ink hover:text-ink hover:no-underline">
              <SpotlightCard className="flex h-full flex-col gap-2 rounded-[24px] p-7">
                <span className="flex items-center justify-between gap-3 text-[20px] font-semibold tracking-[-0.015em]">
                  {o.titulo}
                  <ArrowUpRight
                    className="size-5 flex-none text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-base text-muted">{o.descricao}</span>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </section>

      <div className="wide pb-3">
        <section className="tile relative bg-marinho text-center text-white">
          <Wallpaper variant="navy" />
          <div className="relative z-10 flex flex-col items-center gap-6 px-5 py-24 sm:py-28">
            <p className="display-2 max-w-[760px] text-white">{c.chamada}</p>
            <Button size="lg" asChild className="bg-white text-marinho hover:bg-[#e9eef7] hover:text-marinho">
              <Link href="/contato">Vamos conversar</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
