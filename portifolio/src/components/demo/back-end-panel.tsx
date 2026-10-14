"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/fx/reveal";
import { LabDemo } from "@/components/lab/lab-demo";
import { BeAdrs } from "./be-adrs";
import { BeDiagrama } from "./be-diagrama";
import { Conteineres, Pastas, Pipeline, Rastreamento, Terminal, Vitrine } from "./be-vitrines";

/** Painel Back-end da página Dev: diagrama vivo, ferramentas do dia a dia, decisões e uma API funcionando. */
export function BackEndPanel() {
  return (
    <div className="pb-28">
      <div className="wrap flex max-w-[1240px] flex-col gap-24">
        <section aria-labelledby="t-arquitetura" className="flex flex-col gap-8">
          <Cabecalho id="t-arquitetura" titulo="Como uma requisição atravessa o sistema.">
            Escolha um cenário e acompanhe cada etapa. Clique em qualquer caixa para ver o que ela faz, o que acontece se cair e o
            código.
          </Cabecalho>
          <BeDiagrama />
        </section>

        <section aria-labelledby="t-dia" className="flex flex-col gap-8">
          <Cabecalho id="t-dia" titulo="O dia a dia de um back-end.">
            Testes, contêineres, estrutura de pastas, pipeline e observabilidade. As ferramentas que mantêm o sistema de pé.
          </Cabecalho>
          <div className="grid gap-3 lg:grid-cols-6">
            <Vitrine titulo="Terminal" tags={["xUnit", "Docker", "HTTP"]} className="lg:col-span-3">
              <Terminal />
            </Vitrine>
            <Vitrine titulo="Estrutura de pastas" tags={["Clean Architecture"]} className="lg:col-span-3">
              <Pastas />
            </Vitrine>
            <Vitrine titulo="Contêineres" tags={["Docker", "Alta disponibilidade"]} className="lg:col-span-3">
              <Conteineres />
            </Vitrine>
            <Vitrine titulo="Rastreamento de uma requisição" tags={["OpenTelemetry"]} className="lg:col-span-3">
              <Rastreamento />
            </Vitrine>
            <Vitrine titulo="Pipeline de entrega" tags={["CI/CD", "Azure DevOps"]} className="lg:col-span-6">
              <Pipeline />
            </Vitrine>
          </div>
        </section>

        <section aria-labelledby="t-adr" className="flex flex-col gap-8">
          <Cabecalho id="t-adr" titulo="Decisões registradas.">
            Cada escolha importante vira um registro curto: o contexto, a decisão e o preço que ela cobra.
          </Cabecalho>
          <BeAdrs />
        </section>

        <section aria-labelledby="t-api" className="flex flex-col gap-8">
          <Cabecalho id="t-api" titulo="Uma API funcionando, para você testar.">
            Um sistema de cobranças com as mesmas regras, rotas e respostas do código C#. Use como cliente ou troque para a visão
            técnica.
          </Cabecalho>
          <div>
            <LabDemo />
            <p className="m-0 mt-5 text-center text-[14px] text-muted">
              A API desta demonstração roda no seu navegador. Nada é enviado a um servidor.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function Cabecalho({ id, titulo, children }: { id: string; titulo: string; children: ReactNode }) {
  return (
    <Reveal className="flex flex-col gap-3">
      <h2 id={id} className="m-0 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.035em]">
        {titulo}
      </h2>
      <p className="m-0 max-w-[720px] text-[18px] leading-[1.5] text-muted">{children}</p>
    </Reveal>
  );
}
