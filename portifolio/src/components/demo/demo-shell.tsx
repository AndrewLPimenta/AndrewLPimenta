"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Wallpaper } from "@/components/fx/wallpaper";
import { BackEndPanel } from "./back-end-panel";
import { FrontEndPanel } from "./front-end-panel";

type Lado = "front-end" | "back-end";

const lados: { id: Lado; titulo: string; texto: string; tags: string[]; acao: string }[] = [
  {
    id: "front-end",
    titulo: "Front-end",
    texto: "Interfaces com animação, acessibilidade e estado, do componente à página inteira.",
    tags: ["React", "Next.js", "Motion"],
    acao: "Ver componentes",
  },
  {
    id: "back-end",
    titulo: "Back-end",
    texto: "Arquitetura, filas, contêineres, testes e deploy, com uma requisição atravessando o sistema.",
    tags: [".NET", "RabbitMQ", "Docker"],
    acao: "Ver arquitetura",
  },
];

/** Miniatura do lado Front-end: uma janela com componentes e o cursor. */
function ArteFront() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[16px] bg-gradient-to-br from-[#e8efff] to-[#f6f2ff] dark:from-[#1a2440] dark:to-[#221c38]">
      <div className="absolute inset-x-5 top-5 bottom-0 rounded-t-[12px] bg-white/90 p-3 shadow-[0_10px_30px_-12px_rgb(47_107_224/0.45)] dark:bg-[#0f1520]/90">
        <div className="flex gap-1">
          <span className="size-1.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-1.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-1.5 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="mt-3 grid grid-cols-[1.4fr_1fr] gap-2">
          <div className="flex flex-col gap-1.5">
            <span className="h-2 w-[70%] rounded-full bg-ink/80" />
            <span className="h-1.5 w-[90%] rounded-full bg-ink/15" />
            <span className="h-1.5 w-[60%] rounded-full bg-ink/15" />
            <span className="mt-1 h-4 w-14 rounded-full bg-azul" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="relative h-4 w-7 rounded-full bg-[#30a46c]">
              <span className="absolute top-0.5 right-0.5 size-3 rounded-full bg-white" />
            </span>
            <span className="h-8 w-full rounded-lg bg-gradient-to-br from-azul/30 to-[#8b5cf6]/30" />
          </div>
        </div>
      </div>
      <svg viewBox="0 0 24 24" className="absolute right-6 bottom-3 size-6 drop-shadow transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-1" aria-hidden="true">
        <path d="M4 2 L4 19 L8.5 14.5 L11.5 21 L14 20 L11 13.5 L17 13.5 Z" fill="#111" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Miniatura do lado Back-end: um terminal e serviços ligados por uma fila. */
function ArteBack() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[16px] bg-[#0b1220]">
      <div className="absolute top-4 left-4 flex flex-col gap-1.5 font-mono text-[10px] leading-none">
        <span className="text-[#8fb3ff]">$ dotnet test</span>
        <span className="text-[#8fe0b5]">✓ 126 aprovados</span>
        <span className="text-[#6f7d92]">$ docker compose up</span>
        <span className="flex items-center gap-1 text-[#8fe0b5]">
          ✓ api, worker, fila
          <span className="inline-block h-2.5 w-1.5 animate-pulse bg-[#8fb3ff]" />
        </span>
      </div>
      <svg viewBox="0 0 160 90" className="absolute right-3 bottom-2 h-[78%] w-[52%]" aria-hidden="true">
        <path d="M22 22 L80 22 L80 68 L138 68" fill="none" stroke="#2a3a55" strokeWidth="2" />
        <path d="M80 22 L138 22" fill="none" stroke="#2a3a55" strokeWidth="2" strokeDasharray="4 4" />
        <circle r="3.5" fill="#8fb3ff">
          <animateMotion dur="3s" repeatCount="indefinite" path="M22 22 L80 22 L80 68 L138 68" />
        </circle>
        {[
          [22, 22, "#8fb3ff"],
          [80, 22, "#8fb3ff"],
          [138, 22, "#6f7d92"],
          [80, 68, "#e2c27a"],
          [138, 68, "#8fe0b5"],
        ].map(([x, y, c]) => (
          <g key={`${x}-${y}`}>
            <rect x={(x as number) - 13} y={(y as number) - 9} width="26" height="18" rx="5" fill="#131c2e" stroke={c as string} strokeWidth="1.4" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Página Dev: o visitante escolhe ver o front-end ou o back-end. A escolha fica no endereço (#front-end ou #back-end). */
export function DemoShell() {
  const [lado, setLado] = useState<Lado>("front-end");

  useEffect(() => {
    const ler = () => {
      const h = window.location.hash.replace("#", "");
      if (h === "front-end" || h === "back-end") setLado(h);
    };
    ler();
    window.addEventListener("hashchange", ler);
    return () => window.removeEventListener("hashchange", ler);
  }, []);

  function escolher(id: Lado) {
    setLado(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-20 text-center sm:pt-36 sm:pb-24">
        <Wallpaper variant="hero" fade="bottom" />
        <div className="wrap relative z-10 flex flex-col items-center gap-6">
          <h1 className="display-1">Desenvolvimento.</h1>
          <p className="lead max-w-[640px]">
            Escolha um lado e veja na prática como eu trabalho: as interfaces que construo e as decisões de arquitetura por trás
            delas.
          </p>
          <div role="tablist" aria-label="Escolha o lado" className="mt-4 grid w-full max-w-[780px] gap-4 sm:grid-cols-2">
            {lados.map(({ id, titulo, texto, tags, acao }) => {
              const ativo = lado === id;
              return (
                <button
                  key={id}
                  role="tab"
                  type="button"
                  id={`aba-${id}`}
                  aria-selected={ativo}
                  aria-controls={`painel-${id}`}
                  onClick={() => escolher(id)}
                  className={`group relative flex flex-col gap-4 rounded-[28px] border-2 bg-surface p-3 pb-5 text-left transition-all duration-300 ${
                    ativo
                      ? "border-azul shadow-[0_30px_70px_-34px_rgb(47_107_224/0.6)]"
                      : "border-transparent shadow-[0_0_0_1px_var(--line),0_20px_50px_-36px_rgb(15_30_54/0.5)] hover:-translate-y-1"
                  }`}
                >
                  <span className="block h-[132px]">{id === "front-end" ? <ArteFront /> : <ArteBack />}</span>
                  <span className="flex flex-col gap-1.5 px-3">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-[23px] font-semibold tracking-[-0.025em]">{titulo}</span>
                      {ativo && (
                        <span className="flex items-center gap-1 rounded-full bg-azul px-2.5 py-0.5 text-[12px] font-semibold text-white">
                          <Check className="size-3.5" aria-hidden="true" />
                          Vendo agora
                        </span>
                      )}
                    </span>
                    <span className="text-[15px] leading-[1.5] text-muted">{texto}</span>
                  </span>
                  <span className="flex items-center justify-between gap-3 px-3">
                    <span className="flex flex-wrap gap-1.5">
                      {tags.map((t) => (
                        <span key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 font-mono text-[12px] text-chip-ink">
                          {t}
                        </span>
                      ))}
                    </span>
                    <span
                      className={`flex flex-none items-center gap-1 text-[14px] font-semibold transition-colors ${
                        ativo ? "text-azul" : "text-ink group-hover:text-azul"
                      }`}
                    >
                      {acao}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div
        key={lado}
        role="tabpanel"
        id={`painel-${lado}`}
        aria-labelledby={`aba-${lado}`}
        className="animate-[servico-entra_.45s_ease-out]"
      >
        {lado === "front-end" ? <FrontEndPanel /> : <BackEndPanel />}
      </div>
    </>
  );
}
