import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServicosSection } from "@/components/servicos-section";
import { EntregasGrid } from "@/components/entregas-grid";
import { CountUp } from "@/components/fx/count-up";
import { Reveal } from "@/components/fx/reveal";
import { ScrollWords } from "@/components/fx/scroll-words";
import { SpotlightCard } from "@/components/fx/spotlight-card";
import { Wallpaper } from "@/components/fx/wallpaper";
import { NichosGrid } from "@/components/nichos-grid";
import { Button } from "@/components/ui/button";
import { HeroPortrait } from "@/components/ui/hero-portrait";
import { LabTeaser } from "@/components/lab/lab-teaser";
import { StackSection } from "@/components/stack-section";
import { emConstrucao } from "@/data/projects";
import { site } from "@/data/site";

const pilares = [
  {
    titulo: "Levantamento",
    texto: "Converso com quem usa e com quem decide, e transformo a operação em regras e critérios de aceite.",
  },
  {
    titulo: "Desenvolvimento com agentes de IA",
    texto: "Construo banco, API e interface com agentes de IA trabalhando em paralelo. Cada entrega passa pelos testes e pela minha revisão.",
  },
  {
    titulo: "Produção",
    texto: "Faço o deploy, acompanho o uso real do sistema e ajusto o que a operação pedir.",
  },
];


export default function HomePage() {
  return (
    <>
      <HeroPortrait
        greeting="Engenheiro de Software"
        name={site.name}
        description="Resolver problemas foi o que me trouxe para a tecnologia. Desenvolvo aplicações e sistemas escaláveis, projetados a partir de casos de uso e histórias de usuário, com a orquestração de agentes de IA, RAG e MCP. O que mais me motiva é aprender todos os dias, com estudos, pesquisas e, principalmente, com as pessoas."
        photoSrc="/andrew.jpg"
        photoAlt={`Foto de ${site.name}`}
        primaryCta={{ label: "Falar sobre um projeto", href: "/contato" }}
        secondaryCta={{ label: "Baixar currículo", href: site.links.cv, download: site.links.cvArquivo }}
        facts={[
          { rotulo: "Entrego", valor: "Web, apps e automações" },
          { rotulo: "Stack principal", valor: "C# · .NET · Next.js" },
          { rotulo: "Desde", valor: "2021" },
        ]}
        links={{ github: site.links.github, linkedin: site.links.linkedin, email: site.email }}
      />

      {/* Sobre mim */}
      <section id="sobre-mim" aria-labelledby="t-sobre-mim" className="scroll-mt-16 py-24 sm:py-32">
        <div className="wrap grid gap-x-16 gap-y-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="flex flex-col gap-4">
            <p className="m-0 text-[17px] font-semibold text-azul">Sobre mim</p>
            <h2 id="t-sobre-mim" className="display-2">
              Prazer, e muito obrigado por visitar meu portfólio.
            </h2>
          </Reveal>
          <Reveal className="flex flex-col gap-5 text-[19px] leading-[1.55] text-ink-2">
            <p className="m-0">
              Sou engenheiro de software do Rio de Janeiro e desenvolvo desde 2021. Comecei com sites simples para pequenos
              negócios, passei a sites mais completos, a sistemas com banco de dados e regras de negócio e, depois, a sistemas
              orientados a eventos. Hoje faço parte do time de uma empresa de tecnologia do Rio de Janeiro e desenvolvo
              projetos para clientes e projetos próprios, da API à interface.
            </p>
            <div>
              <Link href="/sobre" className="pill pill-blue gap-2">
                Ler minha biografia <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <StackSection />

      {/* Manifesto que acende com a rolagem */}
      <section id="manifesto" className="scroll-mt-14 py-32 sm:py-44">
        <div className="wrap max-w-[980px] text-center">
          <ScrollWords
            className="m-0 text-[clamp(1.75rem,4.2vw,3.25rem)] leading-[1.18] font-semibold tracking-[-0.03em]"
            text="Há cinco anos desenvolvo soluções de software todos os dias. Sistemas web, aplicativos, integrações e automações para empresas de diferentes portes e segmentos."
          />
        </div>
      </section>

      {/* O que eu entrego */}
      <section aria-labelledby="t-entregas" className="pb-32">
        <div className="wrap">
          <Reveal className="mb-14 flex flex-col items-center gap-4 text-center">
            <h2 id="t-entregas" className="display-2 max-w-[860px]">
              O que eu desenvolvo.
            </h2>
            <p className="lead max-w-[660px]">
              Um pouco dos produtos e soluções digitais que já criei, desenvolvi e mantive em produção.
            </p>
          </Reveal>
          <EntregasGrid />
        </div>
      </section>

      {/* Projetos: os três com o mesmo tamanho e a mesma hierarquia */}
      <section id="projetos" aria-labelledby="t-conquistas" className="scroll-mt-16 pb-32">
        <div className="wrap max-w-[1240px]">
          <Reveal className="mb-14 flex flex-col items-center gap-4 text-center">
            <h2 id="t-conquistas" className="display-2 max-w-[820px]">
              Soluções por nicho.
            </h2>
            <p className="lead max-w-[700px]">
              Escolha um nicho para ver os projetos de que participei em cada um.
            </p>
          </Reveal>
          <NichosGrid />
          <div className="mt-10 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/projetos">Ver todos os projetos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Em números */}
      <section aria-labelledby="t-numeros" className="relative overflow-hidden py-32 sm:py-40">
        <Wallpaper variant="soft" fade="both" className="opacity-70" />
        <div className="wrap relative z-10">
          <Reveal className="mb-14 flex flex-col items-center gap-4 text-center">
            <h2 id="t-numeros" className="display-2 max-w-[760px]">
              Cinco anos entregando sistemas completos.
            </h2>
          </Reveal>
          <div className="grid gap-3 md:grid-cols-6">
            <SpotlightCard className="flex flex-col justify-between gap-10 rounded-[28px] p-8 md:col-span-3 md:row-span-2 md:p-10">
              <p className="m-0 text-[19px] text-muted">Projetos entregues</p>
              <div>
                <span className="text-shine block w-fit pr-[0.14em] pb-[0.06em] text-[clamp(4rem,10vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.06em]">
                  Dezenas
                </span>
                <p className="mt-4 mb-0 max-w-[420px] text-[21px] leading-[1.35] tracking-[-0.01em]">
                  de landing pages, sites, sistemas e automações para empresas de diferentes portes.
                </p>
              </div>
            </SpotlightCard>
            <SpotlightCard className="flex flex-col gap-2 rounded-[28px] p-7 md:col-span-3">
              <CountUp value={5} suffix=" anos" className="text-shine text-[56px] leading-none font-semibold tracking-[-0.05em]" />
              <span className="text-[17px] text-muted">desenvolvendo software para empresas de diferentes segmentos</span>
            </SpotlightCard>
            <SpotlightCard className="flex flex-col gap-5 rounded-[28px] p-7 md:col-span-3">
              <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0" aria-label="Camadas que eu construo">
                {["Banco de dados", "API", "Interface", "Deploy"].map((c) => (
                  <li key={c}>
                    <span className="rounded-full bg-surface-2 px-3.5 py-1.5 text-[15px] font-semibold tracking-[-0.01em]">{c}</span>
                  </li>
                ))}
              </ol>
              <span className="text-[17px] text-muted">Assumo o projeto inteiro, da modelagem ao deploy, com testes automatizados em cada etapa.</span>
            </SpotlightCard>
          </div>
        </div>
      </section>

      <LabTeaser />

      {/* Serviços para negócios, um por aba */}
      <ServicosSection />

      {/* Em construção */}
      <section aria-labelledby="t-construindo" className="pb-32">
        <div className="wrap">
          <Reveal className="mb-12 flex flex-col items-center gap-4 text-center">
            <h2 id="t-construindo" className="display-2 max-w-[760px]">
              Produtos em desenvolvimento.
            </h2>
            <p className="lead max-w-[680px]">Produtos para dores que o mercado brasileiro tem agora: a NFS-e no padrão nacional, o fechamento contábil do mês e o atendimento pelo WhatsApp.</p>
          </Reveal>
          <div className="grid gap-3 md:grid-cols-3">
            {emConstrucao.map((p) => (
              <SpotlightCard key={p.slug} className="flex flex-col gap-4 rounded-[28px] p-8">
                <p className="m-0 text-[13px] font-semibold tracking-[0.14em] text-muted uppercase">{p.tipo}</p>
                <p className="m-0 -mt-2 text-[17px] font-semibold text-azul">Para {p.nicho}</p>
                <h3 className="m-0 text-[22px] leading-[1.25] font-semibold tracking-[-0.02em]">{p.tagline}</h3>
                <ul className="m-0 mt-auto flex list-none flex-wrap gap-1.5 p-0 pt-2">
                  {p.stack.slice(0, 4).map((s) => (
                    <li key={s} className="rounded-full bg-surface-2 px-3 py-1 text-sm text-chip-ink">
                      {s}
                    </li>
                  ))}
                </ul>
                <Link href={`/projetos/${p.slug}`} className="inline-flex items-center gap-1 text-base font-medium">
                  Ver o projeto <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </SpotlightCard>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button size="lg" variant="outline" asChild>
              <Link href="/explorar/erps">Explorar sistemas e ERPs</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/explorar/automacoes">Explorar automações e agentes de IA</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Como eu trabalho */}
      <section className="pb-32">
        <div className="wrap flex flex-col gap-14">
          <Reveal className="flex flex-col items-center gap-5 text-center">
            <h2 className="display-2 max-w-[760px]">Como funciona um projeto comigo.</h2>
            <p className="lead max-w-[640px]">
              Um único responsável do levantamento ao sistema em produção.
            </p>
          </Reveal>
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-3">
            {pilares.map((p) => (
              <div key={p.titulo} className="flex flex-col gap-2.5 border-t border-line pt-6">
                <h3 className="m-0 text-[21px] font-semibold tracking-[-0.015em]">{p.titulo}</h3>
                <p className="m-0 text-muted">{p.texto}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/abordagem">Ver o processo completo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Chamada final */}
      <div className="wide pb-3">
        <section aria-labelledby="t-contato" className="tile relative bg-marinho text-center text-white">
          <Wallpaper variant="navy" />
          <div className="relative z-10 flex flex-col items-center gap-6 px-5 py-28 sm:px-8 sm:py-36">
            <h2 id="t-contato" className="display-1 max-w-[880px] text-white">
              Algo aqui despertou o seu interesse?
            </h2>
            <p className="lead max-w-[560px] text-dark-text">
              Estou aberto a conversar sobre projetos, carreira ou até um simples café.
            </p>
            <Button size="lg" asChild className="bg-white text-marinho hover:bg-[#e9eef7] hover:text-marinho">
              <Link href="/contato">Entre em contato</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
