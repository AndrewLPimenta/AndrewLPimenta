"use client";

import Link from "next/link";
import { AnimatePresence, motion, useDragControls, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import { CaseStudyBody } from "./case-study";

/** Projeção de momento usada pela Apple: para onde o gesto iria se continuasse. */
function projetar(velocidade: number, desaceleracao = 0.998) {
  return ((velocidade / 1000) * desaceleracao) / (1 - desaceleracao);
}

const FECHAR_A_PARTIR_DE = 220;

export function ProjectSheet({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const controls = useDragControls();
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  const sheetTransition = reduce ? { duration: 0 } : { type: "spring" as const, bounce: 0, duration: 0.45 };

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="scrim"
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-marinho/35 backdrop-blur-[8px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            className="fixed inset-x-0 bottom-0 z-[60] mx-auto flex h-[94vh] w-full max-w-[860px] flex-col rounded-t-[22px] bg-surface shadow-[0_-20px_60px_-20px_rgba(15,30,54,.35)] sm:h-[min(90vh,980px)] sm:rounded-t-[28px]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={sheetTransition}
            drag={reduce ? false : "y"}
            dragControls={controls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.04, bottom: 1 }}
            onDragEnd={(_, info) => {
              if (info.offset.y + projetar(info.velocity.y) > FECHAR_A_PARTIR_DE) onClose();
            }}
          >
            <div
              aria-hidden="true"
              onPointerDown={(e) => controls.start(e)}
              className="flex h-8 flex-none cursor-grab touch-none items-center justify-center active:cursor-grabbing"
            >
              <span className="h-[5px] w-10 rounded-full bg-grabber" />
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-2 pb-12 sm:px-12 sm:pb-16">
              <div className="flex items-center justify-between gap-4">
                <p className="m-0 text-[15px] font-semibold text-muted">{project.onde ?? "Em construção"}</p>
                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Fechar estudo de caso"
                  onClick={onClose}
                  className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-surface-3 text-ink hover:bg-mist-2"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <h2
                id="sheet-title"
                className="mt-5 mb-0 text-[clamp(2.375rem,5vw,3.5rem)] leading-[1.04] font-semibold tracking-[-0.04em]"
              >
                {project.nome}
              </h2>
              <p className="mt-3 mb-10 text-[21px] leading-[1.4] tracking-[-0.01em] text-muted">{project.tagline}</p>

              <CaseStudyBody project={project} />

              <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-hairline pt-7">
                <Link className="pill pill-blue" href={`/projetos/${project.slug}`}>
                  Abrir página do projeto
                </Link>
                <button type="button" className="pill pill-line" onClick={onClose}>
                  Voltar aos projetos
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
