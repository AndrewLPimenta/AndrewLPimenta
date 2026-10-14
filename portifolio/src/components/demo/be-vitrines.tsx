"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, ChevronRight, FileCode2, Folder, FolderOpen, Loader, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- moldura comum ---------- */

export function Vitrine({ titulo, tags, className, children }: { titulo: string; tags: string[]; className?: string; children: ReactNode }) {
  return (
    <div className={cn("glass flex min-w-0 flex-col gap-5 rounded-[28px] p-6 sm:p-7", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="m-0 text-[17px] font-semibold tracking-[-0.01em]">{titulo}</h4>
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {tags.map((t) => (
            <li key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[12.5px] text-chip-ink">
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}

function Janela({ titulo, children, acao }: { titulo: string; children: ReactNode; acao?: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-[16px] bg-[#0b1220] text-[#dbe2ec] ring-1 ring-white/10">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </span>
        <span className="ml-2 flex-1 truncate font-mono text-[12px] text-[#8a97ab]">{titulo}</span>
        {acao}
      </div>
      {children}
    </div>
  );
}

/* ---------- Terminal ---------- */

type Linha = { t: string; c?: "cmd" | "ok" | "erro" | "fraco" | "json" };

const sessoes: Record<string, Linha[]> = {
  testes: [
    { t: "$ dotnet test", c: "cmd" },
    { t: "  Determinando projetos para restaurar…", c: "fraco" },
    { t: "  Loja.Domain.Tests → bin/Debug/net9.0", c: "fraco" },
    { t: "  ✓ Nao_permite_pagar_uma_cobranca_ja_paga", c: "ok" },
    { t: "  ✓ Mesma_venda_nunca_gera_duas_notas", c: "ok" },
    { t: "  ✓ Cnpj_alfanumerico_valida_digito_verificador", c: "ok" },
    { t: "  ✓ Reserva_expira_sem_pagamento_em_15_minutos", c: "ok" },
    { t: "" },
    { t: "Aprovado!  126 aprovados, 0 com falha · 2,1 s", c: "ok" },
  ],
  docker: [
    { t: "$ docker compose up -d", c: "cmd" },
    { t: "[+] Running 6/6", c: "fraco" },
    { t: " ✔ Network loja_default      Created", c: "ok" },
    { t: " ✔ Container loja-sqlserver  Healthy", c: "ok" },
    { t: " ✔ Container loja-rabbitmq   Healthy", c: "ok" },
    { t: " ✔ Container loja-redis      Started", c: "ok" },
    { t: " ✔ Container loja-api        Started", c: "ok" },
    { t: " ✔ Container loja-worker     Started", c: "ok" },
  ],
  http: [
    { t: "$ curl -X POST localhost:8080/api/cobrancas \\", c: "cmd" },
    { t: '    -d \'{"cliente":"Oficina Duas Rodas","documento":"123.456.789-00"}\'', c: "cmd" },
    { t: "HTTP/1.1 400 Bad Request", c: "erro" },
    { t: "Content-Type: application/problem+json", c: "fraco" },
    { t: "{", c: "json" },
    { t: '  "title": "Dados inválidos",', c: "json" },
    { t: '  "errors": { "documento": ["CPF inválido: dígito verificador não confere."] }', c: "json" },
    { t: "}", c: "json" },
  ],
};

const corLinha: Record<NonNullable<Linha["c"]>, string> = {
  cmd: "text-white",
  ok: "text-[#8fe0b5]",
  erro: "text-[#ff9ea1]",
  fraco: "text-[#6f7d92]",
  json: "text-[#e2c27a]",
};

export function Terminal() {
  const [aba, setAba] = useState<keyof typeof sessoes>("testes");
  const [n, setN] = useState(0);
  const [rodada, setRodada] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const visivel = useInView(ref, { once: true, amount: 0.4 });
  const calmo = useReducedMotion();
  const linhas = sessoes[aba];

  useEffect(() => {
    if (!visivel) return;
    if (calmo) {
      setN(linhas.length);
      return;
    }
    setN(0);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setN(i);
      if (i >= linhas.length) clearInterval(t);
    }, 260);
    return () => clearInterval(t);
  }, [aba, rodada, visivel, calmo, linhas.length]);

  return (
    <div ref={ref} className="flex flex-1 flex-col gap-3">
      <div role="tablist" aria-label="Sessões do terminal" className="flex gap-1.5">
        {(Object.keys(sessoes) as (keyof typeof sessoes)[]).map((s) => (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={aba === s}
            onClick={() => setAba(s)}
            className={`rounded-full px-3.5 py-1.5 font-mono text-[12.5px] transition-colors ${
              aba === s ? "bg-ink text-paper" : "bg-surface-2 text-ink-2 hover:bg-mist-2"
            }`}
          >
            {s === "testes" ? "testes" : s === "docker" ? "docker" : "requisição"}
          </button>
        ))}
      </div>
      <Janela
        titulo="andrew@dev: ~/loja"
        acao={
          <button type="button" onClick={() => setRodada((r) => r + 1)} className="text-[#8a97ab] hover:text-white" aria-label="Rodar de novo">
            <RotateCcw className="size-3.5" />
          </button>
        }
      >
        <pre className="m-0 min-h-[236px] overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.75]">
          {linhas.slice(0, n).map((l, i) => (
            <div key={`${aba}-${rodada}-${i}`} className={l.c ? corLinha[l.c] : ""}>
              {l.t || " "}
            </div>
          ))}
          {n < linhas.length && <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[#8fb3ff]" />}
        </pre>
      </Janela>
    </div>
  );
}

/* ---------- Árvore de pastas ---------- */

type Item = { nome: string; desc: string; filhos?: Item[]; camada?: string };

const arvore: Item[] = [
  {
    nome: "src",
    desc: "O código da aplicação, separado em camadas.",
    filhos: [
      {
        nome: "Loja.Domain",
        camada: "Domínio",
        desc: "Entidades e regras de negócio. Não depende de nenhuma outra camada, nem de banco, nem de framework.",
        filhos: [
          { nome: "Cobrancas/Cobranca.cs", desc: "A entidade decide se pode ser paga, cancelada ou editada." },
          { nome: "Comum/Resultado.cs", desc: "Sucesso ou erro explícito, sem exceção para fluxo de negócio." },
        ],
      },
      {
        nome: "Loja.Application",
        camada: "Aplicação",
        desc: "Casos de uso. Orquestra o domínio e define as interfaces que a infraestrutura implementa.",
        filhos: [{ nome: "Cobrancas/PagarCobranca.cs", desc: "Um caso de uso por arquivo: fácil de achar e de testar." }],
      },
      {
        nome: "Loja.Infrastructure",
        camada: "Infraestrutura",
        desc: "Banco, fila, e-mail e serviços externos. Tudo que pode ser trocado sem mexer na regra.",
        filhos: [
          { nome: "Persistencia/AppDb.cs", desc: "EF Core com mapeamentos explícitos, sem anotações no domínio." },
          { nome: "Outbox/OutboxInterceptor.cs", desc: "Grava os eventos na mesma transação do dado." },
        ],
      },
      { nome: "Loja.Api", camada: "Entrada", desc: "Endpoints HTTP. Só traduz HTTP para caso de uso e de volta.", filhos: [{ nome: "Program.cs", desc: "Configuração, autenticação, limite de requisições e saúde." }] },
      { nome: "Loja.Worker", camada: "Entrada", desc: "Consumidores da fila. Mesma regra, outra porta de entrada.", filhos: [{ nome: "EmitirNotaConsumer.cs", desc: "Idempotente: reprocessar não duplica nota." }] },
    ],
  },
  {
    nome: "tests",
    desc: "Testes de unidade do domínio e de integração com banco e fila reais em contêiner.",
    filhos: [
      { nome: "Loja.Domain.Tests", desc: "Rápidos, sem banco: testam as regras." },
      { nome: "Loja.Api.Tests", desc: "Sobem SQL Server e RabbitMQ com Testcontainers." },
    ],
  },
  { nome: "docker-compose.yml", desc: "Ambiente completo local com um comando." },
  { nome: "azure-pipelines.yml", desc: "Build, testes, imagem e deploy a cada merge." },
];

function NoArvore({ item, nivel, sel, setSel }: { item: Item; nivel: number; sel: Item; setSel: (i: Item) => void }) {
  const [aberto, setAberto] = useState(nivel < 1 || item.nome === "Loja.Domain");
  const pasta = !!item.filhos;
  const ativo = sel === item;
  return (
    <li>
      <button
        type="button"
        onClick={() => {
          setSel(item);
          if (pasta) setAberto((a) => !a);
        }}
        aria-expanded={pasta ? aberto : undefined}
        className={`flex w-full items-center gap-1.5 rounded-md py-1 pr-2 text-left font-mono text-[12.5px] transition-colors ${
          ativo ? "bg-white/10 text-white" : "text-[#b8c3d4] hover:bg-white/5"
        }`}
        style={{ paddingLeft: 8 + nivel * 16 }}
      >
        {pasta ? (
          <ChevronRight className={`size-3 flex-none transition-transform ${aberto ? "rotate-90" : ""}`} aria-hidden="true" />
        ) : (
          <span className="w-3 flex-none" />
        )}
        {pasta ? (
          aberto ? (
            <FolderOpen className="size-3.5 flex-none text-[#e2c27a]" aria-hidden="true" />
          ) : (
            <Folder className="size-3.5 flex-none text-[#e2c27a]" aria-hidden="true" />
          )
        ) : (
          <FileCode2 className="size-3.5 flex-none text-[#8fb3ff]" aria-hidden="true" />
        )}
        <span className="truncate">{item.nome}</span>
        {item.camada && <span className="ml-auto rounded bg-white/10 px-1.5 text-[10.5px] text-[#a9b6c9]">{item.camada}</span>}
      </button>
      {pasta && aberto && (
        <ul className="m-0 list-none p-0">
          {item.filhos!.map((f) => (
            <NoArvore key={f.nome} item={f} nivel={nivel + 1} sel={sel} setSel={setSel} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Pastas() {
  const [sel, setSel] = useState<Item>(arvore[0].filhos![0]);
  return (
    <div className="flex flex-1 flex-col gap-3">
      <Janela titulo="loja · Clean Architecture">
        <ul className="m-0 h-[276px] list-none overflow-y-auto p-2">
          {arvore.map((i) => (
            <NoArvore key={i.nome} item={i} nivel={0} sel={sel} setSel={setSel} />
          ))}
        </ul>
      </Janela>
      <p className="m-0 min-h-[48px] text-[14px] leading-[1.5] text-ink-2" aria-live="polite">
        <strong className="font-mono text-[13px] font-semibold">{sel.nome}</strong> · {sel.desc}
      </p>
    </div>
  );
}

/* ---------- Contêineres ---------- */

type Estado = "rodando" | "parado" | "subindo";
const baseConteineres = [
  { nome: "loja-api-1", imagem: "loja/api:1.8.2", porta: "8080", cpu: 12 },
  { nome: "loja-api-2", imagem: "loja/api:1.8.2", porta: "8081", cpu: 10 },
  { nome: "loja-worker", imagem: "loja/worker:1.8.2", porta: "·", cpu: 6 },
  { nome: "sqlserver", imagem: "mssql/server:2022", porta: "1433", cpu: 18 },
  { nome: "rabbitmq", imagem: "rabbitmq:3-management", porta: "5672", cpu: 4 },
  { nome: "redis", imagem: "redis:7-alpine", porta: "6379", cpu: 2 },
];

export function Conteineres() {
  const [estado, setEstado] = useState<Record<string, Estado>>({});
  const [tique, setTique] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTique((x) => x + 1), 1200);
    return () => clearInterval(t);
  }, []);

  function derrubar() {
    setEstado((e) => ({ ...e, "loja-api-2": "parado" }));
    setTimeout(() => setEstado((e) => ({ ...e, "loja-api-2": "subindo" })), 1400);
    setTimeout(() => setEstado((e) => ({ ...e, "loja-api-2": "rodando" })), 3600);
  }

  const api2 = estado["loja-api-2"] ?? "rodando";
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="overflow-x-auto rounded-[16px] bg-surface shadow-[inset_0_0_0_1px_var(--line)]">
        <table className="w-full min-w-[460px] border-collapse text-[13px]">
          <thead>
            <tr className="text-left text-[11.5px] text-muted">
              <th className="px-4 py-2.5 font-medium">Contêiner</th>
              <th className="py-2.5 font-medium">Status</th>
              <th className="py-2.5 text-right font-medium">CPU</th>
              <th className="px-4 py-2.5 text-right font-medium">Porta</th>
            </tr>
          </thead>
          <tbody>
            {baseConteineres.map((c, i) => {
              const s = estado[c.nome] ?? "rodando";
              const cpu = s === "rodando" ? Math.max(1, c.cpu + Math.round(Math.sin(tique + i * 1.7) * 3) + (c.nome === "loja-api-1" && api2 !== "rodando" ? 9 : 0)) : 0;
              return (
                <tr key={c.nome} className="border-t border-hairline">
                  <td className="px-4 py-2.5">
                    <div className="font-mono font-medium">{c.nome}</div>
                    <div className="font-mono text-[11px] text-muted">{c.imagem}</div>
                  </td>
                  <td className="py-2.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11.5px] font-semibold ${
                        s === "rodando"
                          ? "bg-[#30a46c]/12 text-[#1f7a4f] dark:text-[#8fe0b5]"
                          : s === "subindo"
                            ? "bg-[#d8b867]/20 text-ouro-ink dark:text-[#e2c27a]"
                            : "bg-[#e5484d]/12 text-[#c9373d] dark:text-[#ff9ea1]"
                      }`}
                    >
                      {s === "subindo" ? <Loader className="size-3 animate-spin" aria-hidden="true" /> : <span className="size-1.5 rounded-full bg-current" />}
                      {s === "rodando" ? "saudável" : s === "subindo" ? "reiniciando" : "parado"}
                    </span>
                  </td>
                  <td className="py-2.5 text-right font-mono tabular-nums">{cpu}%</td>
                  <td className="px-4 py-2.5 text-right font-mono text-muted">{c.porta}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="m-0 max-w-[360px] text-[13.5px] text-muted" aria-live="polite">
          {api2 === "rodando"
            ? "Duas instâncias da API atrás do balanceador."
            : api2 === "parado"
              ? "api-2 caiu: a api-1 assume todo o tráfego."
              : "O orquestrador está subindo uma nova api-2."}
        </p>
        <button
          type="button"
          onClick={derrubar}
          disabled={api2 !== "rodando"}
          className="rounded-full bg-ink px-4 py-2 text-[13.5px] font-semibold text-paper disabled:opacity-40"
        >
          Derrubar api-2
        </button>
      </div>
    </div>
  );
}

/* ---------- Pipeline ---------- */

const etapas = [
  { nome: "Build", s: 1.2 },
  { nome: "Testes", s: 2.0 },
  { nome: "Análise", s: 1.0 },
  { nome: "Imagem", s: 1.4 },
  { nome: "Homologação", s: 1.2 },
  { nome: "Produção", s: 1.0, aprovacao: true },
];

export function Pipeline() {
  const [atual, setAtual] = useState(-1);
  const [aguardando, setAguardando] = useState(false);
  const calmo = useReducedMotion();

  useEffect(() => {
    if (atual < 0 || atual >= etapas.length) return;
    const e = etapas[atual];
    if (e.aprovacao && !aguardando) {
      setAguardando(true);
      return;
    }
    if (aguardando) return;
    const t = setTimeout(() => setAtual((a) => a + 1), calmo ? 150 : e.s * 1000);
    return () => clearTimeout(t);
  }, [atual, aguardando, calmo]);

  const concluido = atual >= etapas.length;
  return (
    <div className="flex flex-1 flex-col gap-4">
      <ol className="m-0 grid list-none grid-cols-3 gap-2 p-0 sm:grid-cols-6">
        {etapas.map((e, i) => {
          const feito = i < atual || concluido;
          const rodando = i === atual && !concluido;
          return (
            <li key={e.nome} className="flex flex-col gap-2">
              <div className="h-1.5 overflow-hidden rounded-full bg-track">
                <motion.div
                  className={`h-full rounded-full ${feito ? "bg-[#30a46c]" : "bg-azul"}`}
                  initial={false}
                  animate={{ width: feito ? "100%" : rodando && !aguardando ? "100%" : "0%" }}
                  transition={{ duration: rodando && !aguardando ? e.s : 0.2, ease: "linear" }}
                />
              </div>
              <span className={`flex items-center gap-1 text-[12.5px] font-medium ${feito ? "text-ink" : rodando ? "text-azul" : "text-muted"}`}>
                {feito && <Check className="size-3.5 text-[#30a46c]" aria-hidden="true" />}
                {e.nome}
              </span>
            </li>
          );
        })}
      </ol>
      <div className="flex min-h-[64px] items-center justify-between gap-3 rounded-[16px] bg-surface-2 px-4 py-3" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p key={`${atual}-${aguardando}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="m-0 text-[14px]">
            {atual < 0
              ? "Cada merge na main passa por estas etapas antes de chegar ao cliente."
              : concluido
                ? "Versão 1.8.3 em produção. Se algo der errado, volto para a anterior com um clique."
                : aguardando
                  ? "Homologação aprovada pelos testes. Produção espera um aprovador humano."
                  : `${etapas[atual].nome} em andamento…`}
          </motion.p>
        </AnimatePresence>
        {aguardando ? (
          <button
            type="button"
            onClick={() => {
              setAguardando(false);
              setAtual((a) => a + 1);
            }}
            className="flex-none rounded-full bg-[#30a46c] px-4 py-2 text-[13.5px] font-semibold text-white"
          >
            Aprovar deploy
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setAguardando(false);
              setAtual(0);
            }}
            disabled={atual >= 0 && !concluido}
            className="flex-none rounded-full bg-ink px-4 py-2 text-[13.5px] font-semibold text-paper disabled:opacity-40"
          >
            {concluido ? "Rodar de novo" : "Rodar pipeline"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- Rastreamento (trace) ---------- */

const spans = [
  { nome: "POST /api/pagamentos", ini: 0, dur: 14, nivel: 0, tipo: "http" },
  { nome: "autenticar token", ini: 0.5, dur: 1.2, nivel: 1, tipo: "auth" },
  { nome: "validar pedido", ini: 1.8, dur: 0.8, nivel: 1, tipo: "app" },
  { nome: "SELECT pedidos", ini: 2.8, dur: 2.6, nivel: 1, tipo: "db" },
  { nome: "INSERT pagamentos + outbox", ini: 5.6, dur: 6.4, nivel: 1, tipo: "db" },
  { nome: "COMMIT", ini: 12.1, dur: 1.4, nivel: 1, tipo: "db" },
];
const corSpan: Record<string, string> = { http: "bg-azul", auth: "bg-[#8b5cf6]", app: "bg-[#0ea5a4]", db: "bg-[#d8b867]" };

export function Rastreamento() {
  const ref = useRef<HTMLDivElement>(null);
  const visivel = useInView(ref, { once: true, amount: 0.5 });
  const [foco, setFoco] = useState<number | null>(4);
  const total = 14;
  return (
    <div ref={ref} className="flex flex-1 flex-col gap-3">
      <div className="flex flex-col gap-1.5 rounded-[16px] bg-surface p-4 shadow-[inset_0_0_0_1px_var(--line)]">
        <div className="mb-1 flex justify-between font-mono text-[11px] text-muted">
          <span>0 ms</span>
          <span>7 ms</span>
          <span>14 ms</span>
        </div>
        {spans.map((s, i) => (
          <button
            key={s.nome}
            type="button"
            onMouseEnter={() => setFoco(i)}
            onFocus={() => setFoco(i)}
            className={`grid grid-cols-[150px_1fr] items-center gap-3 rounded-md py-1 text-left ${foco === i ? "bg-surface-2" : ""}`}
          >
            <span className="truncate font-mono text-[11.5px]" style={{ paddingLeft: s.nivel * 12 }}>
              {s.nome}
            </span>
            <span className="relative h-3.5">
              <motion.span
                className={`absolute top-0 h-full rounded ${corSpan[s.tipo]}`}
                style={{ left: `${(s.ini / total) * 100}%` }}
                initial={{ width: 0 }}
                animate={{ width: visivel ? `${(s.dur / total) * 100}%` : 0 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              />
            </span>
          </button>
        ))}
      </div>
      <p className="m-0 min-h-[44px] text-[13.5px] leading-[1.5] text-ink-2" aria-live="polite">
        {foco !== null && (
          <>
            <strong className="font-mono text-[12.5px] font-semibold">{spans[foco].nome}</strong> · {spans[foco].dur} ms.{" "}
            {foco === 4 ? "O trecho mais lento: é aqui que eu olharia primeiro para otimizar." : "Cada etapa medida com OpenTelemetry, do gateway ao banco."}
          </>
        )}
      </p>
    </div>
  );
}
