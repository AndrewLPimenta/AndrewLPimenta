import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CheckList } from "@/components/check-list";
import { EntregasGrid } from "@/components/entregas-grid";
import { Reveal } from "@/components/fx/reveal";
import { NichoGaleria } from "@/components/nicho-galeria";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { getCategoria } from "@/data/categorias";
import { nichos } from "@/data/nichos";
import { projetosDaCategoria } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Dashboards, sistemas e ERPs, aplicativos, landing pages e automações: projetos de que participei, em diferentes nichos.",
};

export default function ProjetosPage() {
  return (
    <>
      <PageHeader
        title="Projetos"
        lead="Organizados por tipo de solução, com os projetos de que participei em cada um."
      >
        <nav aria-label="Nichos" className="mt-2 flex flex-wrap justify-center gap-2">
          {nichos.map((n) => (
            <a
              key={n.slug}
              href={`#${n.slug}`}
              className="glass rounded-full px-4 py-2 text-[15px] font-medium text-ink hover:text-ink hover:no-underline"
            >
              {n.titulo.replace(".", "")}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="flex flex-col gap-28 pb-32 sm:gap-40">
        {nichos.map((n, i) => {
          const invertido = i % 2 === 1;
          const categoria = getCategoria(n.slug);
          const emConstrucao = projetosDaCategoria(n.slug).filter((p) => p.fase === "construcao");
          return (
            <section key={n.slug} id={n.slug} aria-labelledby={`t-${n.slug}`} className="wrap max-w-[1200px] scroll-mt-20">
              <div
                className={`grid items-center gap-x-16 gap-y-12 lg:grid-cols-[0.9fr_1.1fr] ${
                  invertido ? "lg:grid-cols-[1.1fr_0.9fr] lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal className="flex flex-col gap-5">
                  <h2 id={`t-${n.slug}`} className="display-2">
                    {n.titulo}
                  </h2>
                  {n.texto.map((t) => (
                    <p key={t} className="m-0 text-[18px] leading-[1.55] text-muted">
                      {t}
                    </p>
                  ))}
                  <div className="mt-1 text-[17px]">
                    <CheckList items={n.aplicacoes} />
                  </div>
                  {emConstrucao.length > 0 && (
                    <p className="m-0 text-[15px] text-muted">
                      Em construção:{" "}
                      {emConstrucao.map((p, k) => (
                        <span key={p.slug}>
                          <Link href={`/projetos/${p.slug}`} className="font-medium">
                            {p.tipo.charAt(0).toLowerCase() + p.tipo.slice(1)}
                          </Link>
                          {k < emConstrucao.length - 1 ? ", " : "."}
                        </span>
                      ))}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {categoria && (
                      <Button size="lg" asChild>
                        <Link href={`/explorar/${categoria.slug}`}>
                          {categoria.botao}
                          <ArrowUpRight className="size-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    )}
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/contato">{n.contato}</Link>
                    </Button>
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <NichoGaleria itens={n.galeria} nome={n.titulo.replace(".", "")} />
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      <section aria-labelledby="t-entregas" className="pb-28">
        <div className="wrap">
          <Reveal className="mb-12 flex flex-col items-center gap-4 text-center">
            <h2 id="t-entregas" className="display-2 max-w-[860px]">
              E dezenas de outros projetos.
            </h2>
            <p className="lead max-w-[640px]">Landing pages, sites, sistemas e integrações entregues desde 2021.</p>
            <p className="m-0 max-w-[640px] text-[14px] text-muted">
              A maior parte dos projetos em produção foi desenvolvida em equipe, e cada estudo de caso mostra a minha participação.
              Por confidencialidade com os clientes, algumas telas foram recriadas com outra marca e dados de exemplo.
            </p>
          </Reveal>
          <EntregasGrid />
        </div>
      </section>
    </>
  );
}
