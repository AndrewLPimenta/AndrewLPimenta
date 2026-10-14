import type { Metadata } from "next";
import Link from "next/link";
import { CheckList } from "@/components/check-list";
import { Reveal } from "@/components/fx/reveal";
import { ScrollWords } from "@/components/fx/scroll-words";
import { SpotlightCard } from "@/components/fx/spotlight-card";
import { Wallpaper } from "@/components/fx/wallpaper";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { casoDeUso, ferramentasIA, features, fluxoIA, historia, iaLimite, principios, processo } from "@/data/abordagem";

export const metadata: Metadata = {
  title: "Abordagem",
  description:
    "Como eu penso um sistema: do problema ao backlog, IA no processo com papel e limite, e os princípios por trás de cada entrega.",
};

const artefato = "flex flex-col gap-4 rounded-[24px] p-7";
const rotulo = "m-0 text-sm font-semibold text-ouro-ink";

export default function AbordagemPage() {
  return (
    <>
      <PageHeader
        title="Como eu penso um sistema."
        lead="Todo projeto começa pelas regras que o sistema precisa garantir. Depois vêm o modelo de dados, a API, a interface e o deploy, com testes em cada etapa."
      />

      <section aria-labelledby="t-processo" className="wrap pb-32">
        <Reveal>
          <h2 id="t-processo" className="display-2 mb-10">
            Do problema à produção.
          </h2>
        </Reveal>
        <ol className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-5">
          {processo.map((etapa, i) => (
            <li key={etapa.titulo} className="contents">
              <SpotlightCard className="flex flex-col gap-2.5 rounded-[24px] px-6 pt-7 pb-8">
                <span aria-hidden="true" className="text-[44px] leading-none font-medium tracking-[-0.05em] text-ouro-num">
                  {i + 1}
                </span>
                <h3 className="m-0 text-[21px] font-semibold tracking-[-0.015em]">{etapa.titulo}</h3>
                <p className="m-0 text-base text-muted">{etapa.texto}</p>
              </SpotlightCard>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-28 sm:py-36">
        <div className="wrap max-w-[980px] text-center">
          <ScrollWords
            className="m-0 text-[clamp(1.75rem,4vw,3rem)] leading-[1.18] font-semibold tracking-[-0.03em]"
            text="Antes da primeira linha de código, a conversa com quem usa vira casos de uso, histórias com critérios de aceite e uma lista de features em ordem de valor."
          />
        </div>
      </section>

      <section aria-labelledby="t-backlog" className="relative mb-32 overflow-hidden bg-mist py-28">
        <Wallpaper variant="soft" className="opacity-70" />
        <div className="wrap relative z-10">
          <Reveal>
            <h2 id="t-backlog" className="display-2 max-w-[760px]">
              Do problema ao backlog.
            </h2>
            <p className="lead mt-4 mb-12 max-w-[680px]">
              Um exemplo ilustrativo, o agendamento online de uma clínica, para mostrar como eu decido o que entra primeiro.
            </p>
          </Reveal>
          <div className="grid items-start gap-3 lg:grid-cols-3">
            <SpotlightCard className={artefato}>
              <p className={rotulo}>Caso de uso</p>
              <h3 className="m-0 text-[22px] leading-[1.2] font-semibold tracking-[-0.02em]">{casoDeUso.titulo}</h3>
              <p className="m-0 text-base text-muted">Ator: {casoDeUso.ator.toLowerCase()}</p>
              <ol className="m-0 flex flex-col gap-2 pl-5 text-base">
                {casoDeUso.passos.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
              <p className="m-0 border-t border-hairline pt-3 text-base text-muted">
                Fluxo alternativo: {casoDeUso.alternativo.charAt(0).toLowerCase() + casoDeUso.alternativo.slice(1)}
              </p>
            </SpotlightCard>

            <SpotlightCard className={artefato}>
              <p className={rotulo}>História de usuário</p>
              <p className="m-0 text-[21px] leading-[1.35] font-medium tracking-[-0.015em]">{historia.texto}</p>
              <p className="mt-1 mb-0 text-base font-semibold">Critérios de aceite</p>
              <div className="text-base">
                <CheckList items={historia.criterios} />
              </div>
            </SpotlightCard>

            <SpotlightCard className={artefato}>
              <p className={rotulo}>Backlog priorizado</p>
              <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
                {features.itens.map((f) => (
                  <li key={f.titulo} className="flex flex-col gap-1.5 rounded-2xl bg-surface-2 p-3.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-md px-1.5 py-0.5 font-mono text-[12px] font-semibold ${
                          f.prioridade === "P1" ? "bg-azul text-white" : f.prioridade === "P2" ? "bg-azul/20 text-azul" : "bg-track text-muted"
                        }`}
                      >
                        {f.prioridade}
                      </span>
                      <strong className="text-[16px] font-semibold">{f.titulo}</strong>
                    </div>
                    <p className="m-0 text-[14.5px] text-muted">{f.porque}</p>
                    <p className="m-0 text-[13px] text-muted">
                      Valor <span className="font-semibold text-ink">{f.valor.toLowerCase()}</span> · Esforço{" "}
                      <span className="font-semibold text-ink">{f.esforco.toLowerCase()}</span>
                    </p>
                  </li>
                ))}
              </ol>
              <p className="m-0 border-t border-hairline pt-3 text-base text-muted">
                Fora por enquanto: {features.foraPorEnquanto.charAt(0).toLowerCase() + features.foraPorEnquanto.slice(1)}
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      <div id="ia" className="wide scroll-mt-16 pb-32">
        <section aria-labelledby="t-ia" className="tile relative bg-marinho text-white">
          <Wallpaper variant="navy" />
          <div className="relative z-10 mx-auto flex max-w-[1180px] flex-col gap-12 px-5 py-16 sm:px-14 sm:py-28">
            <Reveal className="flex max-w-[800px] flex-col gap-5">
              <p className="m-0 text-[15px] font-semibold tracking-[0.14em] text-ouro uppercase">IA no desenvolvimento</p>
              <h2 id="t-ia" className="display-2 text-white">
                Desenvolvo com agentes de IA, e cada entrega passa por teste e revisão.
              </h2>
              <p className="lead text-dark-text">
                Quando os agentes de código ficaram maduros, reorganizei meu fluxo de trabalho em torno deles. Hoje cada projeto
                tem agentes com funções definidas, contexto do próprio código via RAG e acesso às ferramentas por MCP. Com isso
                eu assumo mais escopo sozinho, do banco de dados ao deploy, e mantenho testes e revisão humana em cada entrega.
              </p>
            </Reveal>

            <div className="grid gap-3 sm:grid-cols-2">
              {ferramentasIA.map((item) => (
                <SpotlightCard key={item.titulo} tone="dark" className="flex flex-col gap-2 rounded-[24px] p-7">
                  <h3 className="m-0 text-[19px] font-semibold text-white">{item.titulo}</h3>
                  <p className="m-0 text-[17px] text-dark-body">{item.texto}</p>
                </SpotlightCard>
              ))}
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="m-0 text-[17px] font-semibold text-ouro">Como uma entrega acontece</h3>
              <ol aria-label="Fluxo de trabalho com agentes" className="m-0 flex list-none flex-col items-stretch p-0 lg:flex-row">
                {fluxoIA.map((n, i) => (
                  <li key={n.titulo} className="flex flex-col items-center lg:flex-1 lg:flex-row">
                    {i > 0 && (
                      <span
                        aria-hidden="true"
                        className="h-[18px] w-px bg-gradient-to-b from-ouro/20 to-ouro lg:h-px lg:w-6 lg:flex-none lg:bg-gradient-to-r"
                      />
                    )}
                    <div
                      className={`flex w-full flex-col gap-1.5 rounded-2xl px-4 py-[18px] lg:h-full ${
                        n.humano
                          ? "bg-ouro/14 shadow-[inset_0_0_0_1px_rgb(216_184_103/0.6),0_0_40px_-8px_rgb(216_184_103/0.5)]"
                          : "glass-dark"
                      }`}
                    >
                      <span className={`text-base font-semibold ${n.humano ? "text-[#f1dfae]" : ""}`}>{n.titulo}</span>
                      <span className="text-sm leading-[1.45] text-dark-soft">{n.texto}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <p className="m-0 max-w-[760px] border-t border-white/14 pt-8 text-[17px] text-dark-body">{iaLimite}</p>
          </div>
        </section>
      </div>

      <section aria-labelledby="t-principios" className="wrap pb-32">
        <Reveal>
          <h2 id="t-principios" className="display-2 max-w-[720px]">
            Os princípios por trás de cada entrega.
          </h2>
          <p className="lead mt-4 mb-12 max-w-[640px]">O que guia cada decisão, do modelo de dados ao último pixel.</p>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {principios.map((p) => (
            <SpotlightCard key={p.titulo} className="flex flex-col gap-3 rounded-[24px] p-7">
              <h3 className="m-0 text-[22px] leading-[1.2] font-semibold tracking-[-0.02em]">{p.titulo}</h3>
              <p className="m-0 text-base text-muted">{p.texto}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <div className="wide pb-3">
        <section className="tile relative bg-marinho text-center text-white">
          <Wallpaper variant="navy" />
          <div className="relative z-10 flex flex-col items-center gap-7 px-5 py-28 sm:px-8 sm:py-32">
            <p className="display-2 max-w-[820px] text-white">
              Quer aplicar esse processo ao seu projeto?
            </p>
            <Button size="lg" asChild className="bg-white text-marinho hover:bg-[#e9eef7] hover:text-marinho">
              <Link href="/contato">Falar sobre um projeto</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
