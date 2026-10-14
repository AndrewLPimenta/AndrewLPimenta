"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import {
  Bell,
  Boxes,
  CalendarCheck,
  ChartColumn,
  Check,
  Database,
  FileText,
  Funnel,
  Gauge,
  Globe,
  MapPin,
  MessageCircle,
  PanelsTopLeft,
  PenLine,
  Plug,
  ReceiptText,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Store,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { servicos, type IconeServico } from "@/data/servicos";
import { SpotlightCard } from "./fx/spotlight-card";
import { Wallpaper } from "./fx/wallpaper";
import { Button } from "./ui/button";

const icones: Record<IconeServico, LucideIcon> = {
  leads: Search,
  whatsapp: MessageCircle,
  funil: Funnel,
  cobranca: ReceiptText,
  agenda: CalendarCheck,
  integracao: Plug,
  google: MapPin,
  relatorio: Gauge,
  texto: PenLine,
  velocidade: Zap,
  metricas: ChartColumn,
  painel: PanelsTopLeft,
  celular: Smartphone,
  dominio: Globe,
  estoque: Boxes,
  financeiro: Wallet,
  nota: FileText,
  seguranca: ShieldCheck,
  api: Server,
  notificacao: Bell,
  loja: Store,
  dados: Database,
  atualizacao: RefreshCw,
};

/** Serviços para negócios, um por aba: automações, landing pages, sites, sistemas, aplicativos e dashboards. */
export function ServicosSection() {
  const [ativo, setAtivo] = useState(0);
  const abas = useRef<(HTMLButtonElement | null)[]>([]);
  const s = servicos[ativo];

  function teclado(e: KeyboardEvent) {
    const passo = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!passo) return;
    e.preventDefault();
    const proximo = (ativo + passo + servicos.length) % servicos.length;
    setAtivo(proximo);
    abas.current[proximo]?.focus();
  }

  return (
    <div id="servicos" className="wide scroll-mt-16 pb-32">
      <span id="automacoes" className="block scroll-mt-16" aria-hidden="true" />
      <section aria-labelledby="t-servicos" className="tile relative bg-marinho text-white">
        <Wallpaper variant="navy" />
        <div className="relative z-10 mx-auto flex max-w-[1180px] flex-col gap-12 px-5 py-16 sm:px-12 sm:py-24">
          <div className="flex flex-col gap-6">
            <p id="t-servicos" className="m-0 text-[17px] font-semibold text-ouro">
              Serviços para o seu negócio
            </p>
            <div
              role="tablist"
              aria-label="Serviços"
              onKeyDown={teclado}
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
            >
              {servicos.map((sv, i) => {
                const selecionado = i === ativo;
                return (
                  <button
                    key={sv.slug}
                    ref={(el) => {
                      abas.current[i] = el;
                    }}
                    role="tab"
                    id={`aba-${sv.slug}`}
                    aria-selected={selecionado}
                    aria-controls={`painel-${sv.slug}`}
                    tabIndex={selecionado ? 0 : -1}
                    onClick={() => setAtivo(i)}
                    className={`flex-none rounded-full px-4 py-2 text-[15px] font-semibold whitespace-nowrap transition-colors ${
                      selecionado ? "bg-white text-marinho" : "glass-dark text-white/80 hover:text-white"
                    }`}
                  >
                    {sv.aba}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            key={s.slug}
            role="tabpanel"
            id={`painel-${s.slug}`}
            aria-labelledby={`aba-${s.slug}`}
            className="flex animate-[servico-entra_.45s_ease-out] flex-col gap-16"
          >
            <div className="grid items-center gap-x-16 gap-y-14 lg:grid-cols-[1.05fr_1fr]">
              <div className="flex flex-col gap-6">
                <h2 className="display-2 text-white">{s.titulo}</h2>
                <p className="lead text-dark-text">{s.lead}</p>
                <div className="flex flex-col gap-3">
                  <p className="m-0 text-[13px] font-semibold tracking-[0.08em] text-ouro uppercase">Por que investir</p>
                  <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                    {s.motivos.map((m) => (
                      <li key={m} className="flex items-start gap-3 text-[17px] leading-[1.45] text-dark-text">
                        <span className="mt-[3px] flex size-5 flex-none items-center justify-center rounded-full bg-ouro/20 text-ouro">
                          <Check className="size-3.5" aria-hidden="true" />
                        </span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2 flex flex-wrap gap-3">
                  <Button size="lg" asChild className="bg-white text-marinho hover:bg-[#e9eef7] hover:text-marinho">
                    <Link href="/contato">{s.cta}</Link>
                  </Button>
                </div>
              </div>

              {/* Fluxo com um pulso de luz percorrendo as etapas */}
              <ol aria-label={s.fluxoRotulo} className="relative m-0 flex list-none flex-col gap-3 p-0 pl-10">
                <span
                  aria-hidden="true"
                  className="absolute top-6 bottom-6 left-[15px] w-px bg-gradient-to-b from-azul/60 via-white/20 to-ouro/80"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-[11px] size-[9px] rounded-full bg-white shadow-[0_0_14px_4px_rgb(143_179_255/0.9)] [animation:funil-pulso_4.5s_cubic-bezier(.45,0,.55,1)_infinite]"
                />
                {s.fluxo.map((etapa, i) => {
                  const ultima = i === s.fluxo.length - 1;
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

            <div className={`grid gap-3 sm:grid-cols-2 ${s.itens.length % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
              {s.itens.map((a) => {
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
        </div>
      </section>
    </div>
  );
}
