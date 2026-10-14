"use client";

import { useEffect, useId, useMemo, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CalendarCheck,
  ChevronDown,
  CornerDownLeft,
  FileText,
  LayoutDashboard,
  Mail,
  Receipt,
  Search,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { Wallpaper } from "@/components/fx/wallpaper";
import { Logo } from "@/components/logo";
import { GaleriaArco, GaleriaElastica } from "@/components/ui/galerias";
import { GlassCard } from "@/components/ui/glass-card";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { Reveal } from "@/components/fx/reveal";
import { cn } from "@/lib/utils";

/** Painel Front-end da página Demo: uma vitrine de componentes interativos. */
export function FrontEndPanel() {
  return (
    <section aria-labelledby="t-front" className="pb-10">
      <div className="wrap max-w-[1240px]">
        <Reveal className="mb-12 flex flex-col items-center gap-4 text-center">
          <h2 id="t-front" className="display-2 max-w-[820px]">
            Interfaces que respondem a cada gesto.
          </h2>
          <p className="lead max-w-[680px]">
            Os detalhes que deixam um produto claro e agradável de usar. Feitos com React, Tailwind CSS e Motion, todos
            funcionam com teclado e leitor de tela e respeitam quem prefere menos movimento.
          </p>
        </Reveal>

        <div className="grid gap-3 lg:grid-cols-6">
          <Vitrine titulo="Texto rotativo" tags={["Motion", "Hero"]} className="lg:col-span-4">
            <TextoRotativo />
          </Vitrine>
          <Vitrine titulo="Cartão de status" tags={["Estado", "Tempo real"]} className="lg:col-span-2">
            <CartaoStatus />
          </Vitrine>
          <Vitrine titulo="Paleta de comandos" tags={["Teclado", "Busca", "ARIA"]} className="lg:col-span-3">
            <PaletaComandos />
          </Vitrine>
          <Vitrine titulo="Cartão de vidro" tags={["Hover", "Glassmorphism"]} className="lg:col-span-3">
            <GlassCard
              titulo="Delivery próprio sem taxa de marketplace"
              resumo="Como um app próprio devolve ao restaurante o pedido, o cliente e a margem."
              imagem="/conceitos/app-delivery.webp"
              autor="Andrew Pimenta"
              data="14 out. 2026"
              leitura="5 min"
              tags={["Apps", "Delivery"]}
            />
          </Vitrine>
          <Vitrine titulo="Galeria em arco" tags={["Motion", "Leque"]} className="lg:col-span-6">
            <GaleriaArco itens={telas.slice(0, 9)} />
          </Vitrine>
          <Vitrine titulo="Galeria elástica" tags={["Arrastar", "Mola"]} className="lg:col-span-6">
            <GaleriaElastica itens={telas} />
          </Vitrine>
          <Vitrine titulo="Gráfico ao vivo" tags={["SVG", "Dados em tempo real"]} className="lg:col-span-4">
            <GraficoAoVivo />
          </Vitrine>
          <Vitrine titulo="Órbita de tecnologias" tags={["CSS", "Animação"]} className="lg:col-span-2">
            <Orbita />
          </Vitrine>
          <Vitrine titulo="Botões e controles" tags={["Micro-interação", "Acessibilidade"]} className="lg:col-span-3">
            <Controles />
          </Vitrine>
          <Vitrine titulo="Perguntas frequentes" tags={["Acordeão", "Altura animada"]} className="lg:col-span-3">
            <Acordeao />
          </Vitrine>
        </div>
      </div>
      <HeroParallax
        products={telas.map((t) => ({ title: t.titulo, link: "/projetos", thumbnail: t.imagem }))}
        titulo="Vitrine com paralaxe."
        texto="Role a página: as telas se inclinam e deslizam em fileiras opostas. Ótimo para apresentar portfólio, catálogo ou cases."
      />
      <div className="wide pt-10 pb-3">
        <div className="tile relative overflow-hidden bg-marinho text-center text-white">
          <Wallpaper variant="navy" />
          <div className="relative z-10 flex flex-col items-center gap-6 px-5 py-24 sm:py-28">
            <h2 className="display-2 max-w-[760px] text-white">Gostou do que viu? Vamos construir a interface do seu produto.</h2>
            <p className="lead max-w-[560px] text-dark-text">Conte o que você precisa e eu respondo com os próximos passos.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contato" className="pill gap-2 bg-white text-marinho hover:text-marinho hover:no-underline">
                Entrar em contato
              </Link>
              <Link href="/projetos" className="pill gap-2 text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.35)] hover:text-white hover:no-underline">
                Ver projetos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const telas = [
  { titulo: "Gestão financeira", imagem: "/conceitos/dash-financeiro.webp" },
  { titulo: "Painel fiscal", imagem: "/conceitos/dash-fiscal.webp" },
  { titulo: "Clínica de estética", imagem: "/conceitos/lp-clinica.webp" },
  { titulo: "Central de atendimento", imagem: "/conceitos/dash-atendimento.webp" },
  { titulo: "Hamburgueria", imagem: "/conceitos/lp-burger.webp" },
  { titulo: "Frente de caixa", imagem: "/conceitos/sis-pdv.webp" },
  { titulo: "Delivery próprio", imagem: "/conceitos/app-delivery.webp" },
  { titulo: "Agenda de clínica", imagem: "/conceitos/sis-agenda.webp" },
  { titulo: "Contabilidade", imagem: "/conceitos/lp-contabil.webp" },
  { titulo: "Funil de vendas", imagem: "/conceitos/sis-crm.webp" },
  { titulo: "Carteira NFC", imagem: "/conceitos/app-nfc.webp" },
  { titulo: "Dashboard Tático", imagem: "/conceitos/tatico-claro.webp" },
  { titulo: "Product analytics", imagem: "/conceitos/saas-analytics.webp" },
  { titulo: "Planos e preços", imagem: "/conceitos/saas-precos.webp" },
  { titulo: "Montador de álbuns", imagem: "/conceitos/app-albuns.webp" },
];

function Vitrine({ titulo, tags, className, children }: { titulo: string; tags: string[]; className?: string; children: ReactNode }) {
  return (
    <div className={cn("glass flex min-w-0 flex-col gap-5 rounded-[28px] p-6 sm:p-7", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="m-0 text-[17px] font-semibold tracking-[-0.01em]">{titulo}</h3>
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {tags.map((t) => (
            <li key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[12.5px] text-chip-ink">
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-1 flex-col justify-center">{children}</div>
    </div>
  );
}

/* ---------- Texto rotativo ---------- */

const palavras = ["vendem", "organizam", "automatizam", "escalam"];

function TextoRotativo() {
  const [i, setI] = useState(0);
  const calmo = useReducedMotion();
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % palavras.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <p className="m-0 py-6 text-center text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-semibold tracking-[-0.04em]">
      Sistemas que{" "}
      <span className="relative inline-flex h-[1.15em] overflow-hidden align-bottom">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={palavras[i]}
            initial={calmo ? { opacity: 0 } : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={calmo ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="text-shine inline-block"
          >
            {palavras[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">
        {palavras[i]}
      </span>
    </p>
  );
}

/* ---------- Cartão de status ---------- */

function CartaoStatus() {
  const [incidente, setIncidente] = useState(false);
  const servicos = [
    { nome: "API", ms: incidente ? 840 : 42, ok: !incidente },
    { nome: "Fila de mensagens", ms: incidente ? 0 : 3, ok: true },
    { nome: "Banco de dados", ms: incidente ? 12 : 9, ok: true },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <span className="relative flex size-2.5">
          <span
            className={`absolute inline-flex size-full animate-ping rounded-full opacity-60 ${incidente ? "bg-[#e5484d]" : "bg-[#30a46c]"}`}
          />
          <span className={`relative inline-flex size-2.5 rounded-full ${incidente ? "bg-[#e5484d]" : "bg-[#30a46c]"}`} />
        </span>
        <p className="m-0 text-[15px] font-semibold" aria-live="polite">
          {incidente ? "Lentidão na API" : "Todos os sistemas operando"}
        </p>
      </div>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {servicos.map((s) => (
          <li key={s.nome} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[14px]">
              <span>{s.nome}</span>
              <span className="font-mono text-muted">{s.ms} ms</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-track">
              <motion.div
                className={`h-full rounded-full ${s.ok ? "bg-azul" : "bg-[#e5484d]"}`}
                animate={{ width: `${Math.min(100, Math.max(6, s.ms / 9))}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setIncidente((v) => !v)}
        className="mt-1 self-start rounded-full bg-surface-2 px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:bg-mist-2"
      >
        {incidente ? "Resolver incidente" : "Simular incidente"}
      </button>
    </div>
  );
}

/* ---------- Paleta de comandos ---------- */

const comandos = [
  { nome: "Abrir painel", grupo: "Navegação", Icone: LayoutDashboard },
  { nome: "Clientes", grupo: "Navegação", Icone: Users },
  { nome: "Nova cobrança", grupo: "Ações", Icone: Receipt },
  { nome: "Emitir nota fiscal", grupo: "Ações", Icone: FileText },
  { nome: "Agendar horário", grupo: "Ações", Icone: CalendarCheck },
  { nome: "Conciliar extrato", grupo: "Financeiro", Icone: Wallet },
  { nome: "Enviar lembrete por e-mail", grupo: "Financeiro", Icone: Mail },
  { nome: "Configurações", grupo: "Sistema", Icone: Settings },
];

function semAcento(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function PaletaComandos() {
  const [busca, setBusca] = useState("");
  const [ativo, setAtivo] = useState(0);
  const [escolhido, setEscolhido] = useState<string | null>(null);
  const id = useId();
  const filtrados = useMemo(() => comandos.filter((c) => semAcento(c.nome).includes(semAcento(busca))), [busca]);

  function teclado(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setAtivo((a) => Math.min(a + 1, filtrados.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setAtivo((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && filtrados[ativo]) {
      setEscolhido(filtrados[ativo].nome);
    }
  }

  return (
    <div className="overflow-hidden rounded-[20px] bg-surface shadow-[inset_0_0_0_1px_var(--line)]">
      <div className="flex items-center gap-3 border-b border-hairline px-4">
        <Search className="size-4 flex-none text-muted" aria-hidden="true" />
        <input
          role="combobox"
          aria-expanded="true"
          aria-controls={`${id}-lista`}
          aria-activedescendant={filtrados[ativo] ? `${id}-${ativo}` : undefined}
          aria-label="Buscar um comando"
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setAtivo(0);
            setEscolhido(null);
          }}
          onKeyDown={teclado}
          placeholder="Busque um comando, como “nota”…"
          className="h-12 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
        />
        <kbd className="hidden rounded-md bg-surface-2 px-1.5 py-0.5 font-sans text-[12px] text-muted sm:block">⌘K</kbd>
      </div>
      <ul id={`${id}-lista`} role="listbox" aria-label="Comandos" className="m-0 h-[212px] list-none overflow-y-auto p-2">
        {filtrados.length === 0 && <li className="px-3 py-6 text-center text-[14px] text-muted">Nenhum comando encontrado.</li>}
        {filtrados.map((c, i) => (
          <li
            key={c.nome}
            id={`${id}-${i}`}
            role="option"
            aria-selected={i === ativo}
            onMouseEnter={() => setAtivo(i)}
            onClick={() => setEscolhido(c.nome)}
            className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[14.5px] ${
              i === ativo ? "bg-surface-2 text-ink" : "text-ink-2"
            }`}
          >
            <c.Icone className="size-4 text-muted" aria-hidden="true" />
            <span className="flex-1">{c.nome}</span>
            <span className="text-[12.5px] text-muted">{c.grupo}</span>
            {i === ativo && <CornerDownLeft className="size-3.5 text-muted" aria-hidden="true" />}
          </li>
        ))}
      </ul>
      <p className="m-0 border-t border-hairline px-4 py-2.5 text-[13px] text-muted" aria-live="polite">
        {escolhido ? `Executando: ${escolhido}` : "Use ↑ ↓ para navegar e Enter para executar."}
      </p>
    </div>
  );
}

/* ---------- Gráfico ao vivo ---------- */

function proximoPonto(ultimo: number, sorteio = Math.random()) {
  return Math.max(18, Math.min(92, ultimo + (sorteio - 0.45) * 14));
}

/** Série inicial fixa: o servidor e o navegador desenham o mesmo gráfico antes de ele começar a se mexer. */
function serieInicial() {
  const p = [40];
  let semente = 7;
  for (let i = 1; i < 30; i++) {
    semente = (semente * 9301 + 49297) % 233280;
    p.push(proximoPonto(p[i - 1], semente / 233280));
  }
  return p;
}

function GraficoAoVivo() {
  const [pontos, setPontos] = useState<number[]>(serieInicial);
  const [pausado, setPausado] = useState(false);
  useEffect(() => {
    if (pausado) return;
    const t = setInterval(() => setPontos((p) => [...p.slice(1), proximoPonto(p[p.length - 1])]), 900);
    return () => clearInterval(t);
  }, [pausado]);

  const w = 600;
  const h = 180;
  const passo = w / (pontos.length - 1);
  const linha = pontos.map((v, i) => `${i === 0 ? "M" : "L"}${(i * passo).toFixed(1)} ${(h - (v / 100) * h).toFixed(1)}`).join(" ");
  const area = `${linha} L${w} ${h} L0 ${h} Z`;
  const atual = Math.round(pontos[pontos.length - 1] * 12);
  const anterior = Math.round(pontos[pontos.length - 2] * 12);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="m-0 text-[13px] text-muted">Pedidos por minuto</p>
          <p className="m-0 font-mono text-[34px] leading-none font-semibold tracking-[-0.03em]">{atual}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-[14px] font-semibold ${atual >= anterior ? "text-[#30a46c]" : "text-[#e5484d]"}`}>
            {atual >= anterior ? "▲" : "▼"} {Math.abs(atual - anterior)}
          </span>
          <button
            type="button"
            aria-pressed={pausado}
            onClick={() => setPausado((v) => !v)}
            className="rounded-full bg-surface-2 px-3.5 py-1.5 text-[13px] font-medium hover:bg-mist-2"
          >
            {pausado ? "Retomar" : "Pausar"}
          </button>
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-[180px] w-full" preserveAspectRatio="none" role="img" aria-label={`Gráfico ao vivo, valor atual ${atual}`}>
        <defs>
          <linearGradient id="grad-ao-vivo" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--azul)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--azul)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((y) => (
          <line key={y} x1="0" x2={w} y1={h * y} y2={h * y} stroke="var(--hairline)" strokeDasharray="4 6" />
        ))}
        <path d={area} fill="url(#grad-ao-vivo)" style={{ transition: "d .8s ease" }} />
        <path d={linha} fill="none" stroke="var(--azul)" strokeWidth="2.5" strokeLinejoin="round" style={{ transition: "d .8s ease" }} />
        <circle cx={w} cy={h - (pontos[pontos.length - 1] / 100) * h} r="5" fill="var(--azul)" style={{ transition: "cy .8s ease" }} />
      </svg>
    </div>
  );
}

/* ---------- Órbita ---------- */

const anelInterno = ["csharp", "dotnet", "nextjs", "react"];
const anelExterno = ["typescript", "docker", "azure", "rabbitmq", "sqlserver", "tailwind"];

function Orbita() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[260px]" aria-label="Tecnologias que eu uso" role="img">
      <div className="absolute inset-0 rounded-full border border-dashed border-line" />
      <div className="absolute inset-[22%] rounded-full border border-dashed border-line" />
      <div className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-2xl bg-ink text-paper shadow-lg">
        <Logo className="h-6 w-auto" />
      </div>
      <Anel icones={anelInterno} raio={28} duracao={22} />
      <Anel icones={anelExterno} raio={50} duracao={34} reverso />
    </div>
  );
}

function Anel({ icones, raio, duracao, reverso }: { icones: string[]; raio: number; duracao: number; reverso?: boolean }) {
  return (
    <div
      className="absolute inset-0 motion-safe:[animation:orbita-gira_var(--d)_linear_infinite]"
      style={{ ["--d" as string]: `${duracao}s`, animationDirection: reverso ? "reverse" : "normal" }}
    >
      {icones.map((ic, i) => {
        const ang = (i / icones.length) * Math.PI * 2;
        return (
          <span
            key={ic}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${50 + raio * Math.cos(ang)}%`, top: `${50 + raio * Math.sin(ang)}%` }}
          >
            {/* Gira no sentido contrário do anel para o ícone ficar sempre em pé */}
            <span
              className="flex size-10 items-center justify-center rounded-xl bg-surface shadow-[inset_0_0_0_1px_var(--line),0_8px_20px_-10px_rgb(15_30_54/0.4)] motion-safe:[animation:orbita-gira_var(--d)_linear_infinite]"
              style={{ animationDirection: reverso ? "normal" : "reverse" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/stack/${ic}.svg`} alt="" className={`size-5 ${ic === "nextjs" ? "dark:invert" : ""}`} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

/* ---------- Botões e controles ---------- */

function Controles() {
  const [notificacoes, setNotificacoes] = useState(true);
  const [plano, setPlano] = useState<"Mensal" | "Anual">("Anual");
  const [enviando, setEnviando] = useState<"" | "enviando" | "ok">("");

  function enviar() {
    if (enviando) return;
    setEnviando("enviando");
    setTimeout(() => setEnviando("ok"), 1200);
    setTimeout(() => setEnviando(""), 2800);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="relative overflow-hidden rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-paper transition-transform active:scale-[0.97]"
        >
          <span className="relative z-10">Botão com brilho</span>
          <span
            aria-hidden="true"
            className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent motion-safe:[animation:brilho-passa_2.6s_ease-in-out_infinite]"
          />
        </button>
        <button
          type="button"
          onClick={enviar}
          aria-live="polite"
          className="glass min-w-[150px] rounded-full px-6 py-3 text-[15px] font-semibold text-ink transition-transform active:scale-[0.97]"
        >
          {enviando === "enviando" ? "Enviando…" : enviando === "ok" ? "Enviado ✓" : "Botão de vidro"}
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <span id="rotulo-notif" className="text-[15px]">
          Notificações por WhatsApp
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={notificacoes}
          aria-labelledby="rotulo-notif"
          onClick={() => setNotificacoes((v) => !v)}
          className={`relative h-[30px] w-[52px] flex-none rounded-full transition-colors ${notificacoes ? "bg-[#30a46c]" : "bg-track"}`}
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className={`absolute top-[3px] size-6 rounded-full bg-white shadow ${notificacoes ? "right-[3px]" : "left-[3px]"}`}
          />
        </button>
      </div>

      <div role="radiogroup" aria-label="Plano" className="relative flex rounded-full bg-track p-1">
        {(["Mensal", "Anual"] as const).map((p) => (
          <button
            key={p}
            type="button"
            role="radio"
            aria-checked={plano === p}
            onClick={() => setPlano(p)}
            className="relative z-10 flex-1 rounded-full py-2 text-[14.5px] font-medium"
          >
            {plano === p && (
              <motion.span
                layoutId="plano-ativo"
                className="absolute inset-0 -z-10 rounded-full bg-seg-on shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            {p}
            {p === "Anual" && <span className="ml-1.5 text-[12px] font-semibold text-[#30a46c]">−20%</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Acordeão ---------- */

const perguntas = [
  {
    p: "Quanto tempo leva um projeto?",
    r: "Depende do escopo. Uma landing page costuma levar poucas semanas; um sistema sob medida é dividido em entregas menores, para você usar partes dele antes do fim.",
  },
  {
    p: "Você cuida da publicação?",
    r: "Sim. Configuro domínio, hospedagem, banco de dados e o processo de deploy, e acompanho o sistema depois que ele entra no ar.",
  },
  {
    p: "Dá para integrar com o que eu já uso?",
    r: "Na maioria dos casos, sim: WhatsApp, planilhas, ERPs, meios de pagamento e qualquer serviço com API.",
  },
];

function Acordeao() {
  const [aberto, setAberto] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="flex flex-col divide-y divide-hairline">
      {perguntas.map((q, i) => {
        const estaAberto = aberto === i;
        return (
          <div key={q.p}>
            <h4 className="m-0">
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={estaAberto}
                aria-controls={`${id}-p${i}`}
                onClick={() => setAberto(estaAberto ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-[16px] font-semibold"
              >
                {q.p}
                <ChevronDown
                  className={`size-4 flex-none text-muted transition-transform duration-300 ${estaAberto ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </h4>
            <AnimatePresence initial={false}>
              {estaAberto && (
                <motion.div
                  id={`${id}-p${i}`}
                  role="region"
                  aria-labelledby={`${id}-b${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="m-0 pb-4 text-[15px] leading-[1.55] text-muted">{q.r}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
