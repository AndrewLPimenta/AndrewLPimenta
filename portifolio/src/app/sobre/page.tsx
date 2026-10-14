import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/fx/reveal";
import { SpotlightCard } from "@/components/fx/spotlight-card";
import { Wallpaper } from "@/components/fx/wallpaper";
import { Button } from "@/components/ui/button";
import { hardSkills, pessoas, softSkills, trajetoria } from "@/data/sobre";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Engenheiro de Software do Rio de Janeiro, desenvolvendo software desde 2021. Hoje na Multiclubes, com C#/.NET e Next.js, do banco de dados à interface.",
};

export default function SobrePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Wallpaper variant="hero" fade="bottom" />
        <div className="wrap relative z-10 flex flex-wrap items-center gap-x-18 gap-y-14 pt-28 pb-28 sm:pt-36">
          <div className="flex flex-[1_1_440px] flex-col gap-6">
            <h1 className="display-1">Sobre mim.</h1>
            <p className="lead text-ink">
              Sou {site.name}, engenheiro de software do {site.city}, e desenvolvo software desde 2021.
            </p>
            <div className="flex max-w-[600px] flex-col gap-4 text-[17px] leading-[1.6] text-muted">
              <p className="m-0">
                No começo, meu maior desafio foi aprender a aprender. Tive o privilégio de conviver com pessoas que já estavam na
                área havia anos, e delas ouvi que essa era a base para me tornar um profissional requisitado.
              </p>
              <p className="m-0">
                Meus primeiros projetos foram sites e landing pages para pequenos negócios locais e para conhecidos. Com o tempo,
                passei a construir sistemas cada vez maiores, e hoje desenvolvo soluções completas: APIs, servidores, bancos de
                dados e interfaces.
              </p>
              <p className="m-0">
                Atualmente trabalho numa empresa de tecnologia para gestão de clubes e parques, onde desenvolvo, mantenho e
                participo de soluções para diferentes áreas do produto.
              </p>
              <p className="m-0">
                Também curso o bacharelado em Sistemas de Informação, que me deu direção sobre o que estudar e como estudar para
                ser um bom desenvolvedor. Sigo aprendendo novas tecnologias, padrões de projeto e boas práticas, e aplico cada
                aprendizado nos projetos que desenvolvo.
              </p>
              <p className="m-0">
                Antes de escrever a primeira linha de código, procuro entender como o negócio funciona e conversar com quem vai
                usar o sistema no dia a dia.
              </p>
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] flex-[0_1_340px]">
            <span aria-hidden="true" className="aura !inset-[-10px] !rounded-[40px] !opacity-40" />
            <div className="glass relative h-full w-full overflow-hidden rounded-[32px]">
              <Image
                src="/andrew.jpg"
                alt={`Foto de ${site.name}`}
                fill
                sizes="(min-width: 768px) 360px, 90vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="wide pb-32">
        <section aria-labelledby="t-pessoas" className="tile relative bg-marinho text-white">
          <Wallpaper variant="navy" />
          <div className="relative z-10 mx-auto flex max-w-[1180px] flex-col gap-12 px-5 py-16 sm:px-14 sm:py-28">
            <Reveal className="flex max-w-[780px] flex-col gap-5">
              <p className="m-0 text-[17px] font-semibold text-ouro">Minha melhor qualidade</p>
              <h2 id="t-pessoas" className="text-[clamp(2.75rem,7vw,5.5rem)] leading-[1] font-semibold tracking-[-0.045em] text-white">
                Saber lidar com pessoas.
              </h2>
              <p className="lead text-dark-text">
                Passo tanto tempo entendendo pessoas quanto escrevendo código: quem usa, quem paga, quem opera e quem vai manter o
                sistema depois.
              </p>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {pessoas.map((p) => (
                <SpotlightCard key={p.titulo} tone="dark" className="flex flex-col gap-2 rounded-[24px] p-7">
                  <h3 className="m-0 text-[19px] font-semibold">{p.titulo}</h3>
                  <p className="m-0 text-[17px] text-dark-body">{p.texto}</p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section aria-labelledby="t-traj" className="wrap pb-32">
        <Reveal>
          <h2 id="t-traj" className="display-2">
            Trajetória.
          </h2>
          <p className="lead mt-4 mb-12 max-w-[640px]">Do primeiro site simples a sistemas orientados a eventos. Os primeiros projetos eu fazia sozinho; a maior parte do que vem depois foi construída em equipe, e em cada fase conto do que participei.</p>
        </Reveal>
        <ol className="relative m-0 list-none p-0 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-gradient-to-b before:from-azul/50 before:via-line before:to-ouro/70 md:before:left-[187px]">
          {trajetoria.map((t) => (
            <li key={t.titulo} className="relative grid gap-x-12 gap-y-2 py-7 pl-9 md:grid-cols-[160px_minmax(0,1fr)] md:pl-0">
              <span
                aria-hidden="true"
                className={`absolute top-[38px] left-0 size-[15px] rounded-full border-[3px] border-paper md:left-[180px] ${
                  t.atual ? "bg-ouro shadow-[0_0_0_6px_rgb(216_184_103/0.25),0_0_24px_rgb(216_184_103/0.8)]" : "bg-azul"
                }`}
              />
              <p className="m-0 pt-1 text-[17px] font-semibold text-ouro-num md:text-right md:pr-6">{t.marco}</p>
              <div className={t.atual ? "glass rounded-[24px] px-7 py-6 md:ml-10" : "md:ml-10"}>
                <h3 className="m-0 text-[24px] font-semibold tracking-[-0.02em]">{t.titulo}</h3>
                <p className="mt-2 mb-0 text-muted">{t.texto}</p>
                {t.stack && (
                  <ul className="m-0 mt-4 flex list-none flex-wrap gap-1.5 p-0">
                    {t.stack.map((s) => (
                      <li key={s} className="rounded-full bg-surface-2 px-3 py-1 text-[13.5px] text-chip-ink">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
                {t.frentes && (
                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {t.frentes.map((f) => (
                      <div key={f.onde} className="rounded-2xl bg-surface-2 p-4">
                        <p className="m-0 text-[16px] font-semibold">{f.onde}</p>
                        <p className="m-0 mt-1.5 text-[14.5px] leading-[1.5] text-muted">{f.texto}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="t-soft" className="wrap pb-32">
        <Reveal>
          <h2 id="t-soft" className="display-2">
            Como eu trabalho em time.
          </h2>
          <p className="lead mt-4 mb-12 max-w-[640px]">O que colegas, clientes e gestores podem esperar de mim.</p>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {softSkills.map((s) => (
            <SpotlightCard key={s.titulo} className="flex flex-col gap-2 rounded-[24px] p-7">
              <h3 className="m-0 text-[21px] font-semibold tracking-[-0.015em]">{s.titulo}</h3>
              <p className="m-0 text-base text-muted">{s.texto}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section aria-labelledby="t-hard" className="wrap pb-32">
        <Reveal>
          <h2 id="t-hard" className="display-2">
            Habilidades técnicas.
          </h2>
          <p className="lead mt-4 mb-10 max-w-[640px]">As tecnologias e práticas que uso no trabalho e nos meus projetos.</p>
        </Reveal>
        <div className="border-b border-line">
          {hardSkills.map((g) => (
            <div key={g.grupo} className="grid items-start gap-x-10 gap-y-3 border-t border-line py-7 md:grid-cols-[220px_minmax(0,1fr)]">
              <h3 className="m-0 text-[19px] font-semibold tracking-[-0.01em]">{g.grupo}</h3>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {g.itens.map((s) => (
                  <li
                    key={s.nome}
                    className="inline-flex min-h-[34px] items-center rounded-full bg-mist px-3.5 text-[15px] text-chip-ink"
                  >
                    {s.nome}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="wide pb-3">
        <section className="tile relative bg-marinho text-center text-white">
          <Wallpaper variant="navy" />
          <div className="relative z-10 flex flex-col items-center gap-6 px-5 py-28">
            <p className="display-2 max-w-[820px] text-white">Procurando um engenheiro de software .NET?</p>
            <p className="lead max-w-[560px] text-dark-text">
              Baixe o currículo ou mande uma mensagem com a vaga ou o projeto.
            </p>
            <Button size="lg" asChild className="bg-white text-marinho hover:bg-[#e9eef7] hover:text-marinho">
              <Link href="/contato">Enviar mensagem</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
