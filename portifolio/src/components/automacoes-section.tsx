import Link from "next/link";
import {
  CalendarCheck,
  Funnel,
  Gauge,
  MapPin,
  MessageCircle,
  Plug,
  ReceiptText,
  Search,
  type LucideIcon,
} from "lucide-react";
import { automacoes, funil, type IconeAutomacao } from "@/data/automacoes";
import { Reveal } from "./fx/reveal";
import { SpotlightCard } from "./fx/spotlight-card";
import { Wallpaper } from "./fx/wallpaper";
import { Button } from "./ui/button";

const icones: Record<IconeAutomacao, LucideIcon> = {
  leads: Search,
  whatsapp: MessageCircle,
  funil: Funnel,
  cobranca: ReceiptText,
  agenda: CalendarCheck,
  integracao: Plug,
  google: MapPin,
  relatorio: Gauge,
};

/** Seção de automações para negócios: vendas, leads, funis e WhatsApp. */
export function AutomacoesSection() {
  return (
    <div id="automacoes" className="wide scroll-mt-16 pb-32">
      <section aria-labelledby="t-automacoes" className="tile relative bg-marinho text-white">
        <Wallpaper variant="navy" />
        <div className="relative z-10 mx-auto flex max-w-[1180px] flex-col gap-16 px-5 py-16 sm:px-12 sm:py-24">
          <div className="grid items-center gap-x-16 gap-y-14 lg:grid-cols-[1.05fr_1fr]">
            <Reveal className="flex flex-col gap-6">
              <p className="m-0 text-[17px] font-semibold text-ouro">Automações para negócios</p>
              <h2 id="t-automacoes" className="display-2 text-white">
                Automação de vendas e atendimento para pequenas e médias empresas.
              </h2>
              <p className="lead text-dark-text">
                Sua equipe recebe o lead já qualificado, com o primeiro contato feito no WhatsApp e o follow-up agendado. A cobrança
                e os lembretes saem na data certa.
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <Button size="lg" asChild className="bg-white text-marinho hover:bg-[#e9eef7] hover:text-marinho">
                  <Link href="/contato">Conversar sobre automação</Link>
                </Button>
              </div>
            </Reveal>

            {/* Funil com um pulso de luz percorrendo as etapas */}
            <ol aria-label="Exemplo de funil de vendas automatizado" className="relative m-0 flex list-none flex-col gap-3 p-0 pl-10">
              <span
                aria-hidden="true"
                className="absolute top-6 bottom-6 left-[15px] w-px bg-gradient-to-b from-azul/60 via-white/20 to-ouro/80"
              />
              <span
                aria-hidden="true"
                className="absolute left-[11px] size-[9px] rounded-full bg-white shadow-[0_0_14px_4px_rgb(143_179_255/0.9)] [animation:funil-pulso_4.5s_cubic-bezier(.45,0,.55,1)_infinite]"
              />
              {funil.map((etapa, i) => {
                const ultima = i === funil.length - 1;
                return (
                  <li key={etapa.titulo} className="relative">
                    <span
                      aria-hidden="true"
                      className={`absolute top-1/2 -left-[31px] size-3 -translate-y-1/2 rounded-full border-2 border-marinho ${
                        ultima ? "bg-ouro shadow-[0_0_16px_rgb(216_184_103/0.9)]" : "bg-azul"
                      }`}
                    />
                    <div
                      className={`flex flex-col gap-0.5 rounded-2xl px-5 py-4 ${
                        ultima
                          ? "bg-ouro/14 shadow-[inset_0_0_0_1px_rgb(216_184_103/0.6),0_0_40px_-10px_rgb(216_184_103/0.6)]"
                          : "glass-dark"
                      }`}
                    >
                      <span className={`text-[17px] font-semibold ${ultima ? "text-[#f1dfae]" : ""}`}>{etapa.titulo}</span>
                      <span className="text-[15px] text-dark-soft">{etapa.texto}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {automacoes.map((a) => {
              const Icone = icones[a.icone];
              return (
                <SpotlightCard key={a.titulo} tone="dark" className="flex flex-col gap-4 rounded-[24px] p-7">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-azul/40 to-ouro/30 text-white">
                    <Icone className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="m-0 text-[19px] font-semibold tracking-[-0.015em]">{a.titulo}</h3>
                    <p className="m-0 text-[15px] leading-[1.5] text-dark-body">{a.texto}</p>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
