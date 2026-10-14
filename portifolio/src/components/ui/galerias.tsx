"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

export type ItemGaleriaUI = { titulo: string; imagem: string };

/** Galeria em arco (inspirada no Arc Gallery Hero do 21st.dev): as telas se abrem em leque. */
export function GaleriaArco({ itens }: { itens: ItemGaleriaUI[] }) {
  const [foco, setFoco] = useState<number | null>(null);
  const calmo = useReducedMotion();
  const n = itens.length;
  const abertura = 70; // graus do leque
  const caixa = useRef<HTMLDivElement>(null);
  // O leque abre quando a galeria entra na tela (os cartões ficam fora da área visível antes de girar).
  const visivel = useInView(caixa, { once: true, amount: 0.3 });
  return (
    <div ref={caixa} className="relative h-[360px] w-full overflow-hidden sm:h-[420px]" onMouseLeave={() => setFoco(null)}>
      <div className="absolute bottom-[-430px] left-1/2 h-[860px] w-0">
        {itens.map((it, i) => {
          const ang = -abertura / 2 + (abertura / (n - 1)) * i;
          const ativo = foco === i;
          return (
            <motion.button
              key={it.titulo}
              type="button"
              aria-label={it.titulo}
              onMouseEnter={() => setFoco(i)}
              onFocus={() => setFoco(i)}
              initial={calmo ? false : { rotate: 0, opacity: 0 }}
              animate={visivel ? { rotate: ang, opacity: 1 } : undefined}
              transition={{ type: "spring", stiffness: 70, damping: 16, delay: i * 0.05 }}
              style={{ transformOrigin: "50% 100%", zIndex: ativo ? 20 : i }}
              className="absolute bottom-0 left-[-90px] flex h-[740px] flex-col justify-start w-[180px] sm:left-[-110px] sm:w-[220px]"
            >
              <motion.span
                animate={{ y: ativo ? -26 : 0, scale: ativo ? 1.06 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl bg-surface shadow-[0_18px_40px_-18px_rgb(15_30_54/0.55)] ring-1 ring-black/5 dark:ring-white/10"
              >
                <Image src={it.imagem} alt="" fill sizes="220px" className="object-cover object-top" />
              </motion.span>
            </motion.button>
          );
        })}
      </div>
      <p className="pointer-events-none absolute inset-x-0 bottom-3 m-0 text-center text-[14px] font-semibold" aria-live="polite">
        {foco !== null ? itens[foco].titulo : "Passe o mouse pelas telas"}
      </p>
    </div>
  );
}

/** Galeria elástica (inspirada na Elastic Gallery do 21st.dev): arraste para os lados e ela volta com mola. */
export function GaleriaElastica({ itens }: { itens: ItemGaleriaUI[] }) {
  const area = useRef<HTMLDivElement>(null);
  return (
    <div ref={area} className="relative overflow-hidden rounded-[20px] py-2">
      <motion.div
        drag="x"
        dragConstraints={area}
        dragElastic={0.35}
        dragTransition={{ bounceStiffness: 260, bounceDamping: 18 }}
        className="flex w-max cursor-grab gap-4 px-1 active:cursor-grabbing"
      >
        {itens.map((it) => (
          <motion.figure
            key={it.titulo}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.97 }}
            className="m-0 flex w-[280px] flex-col gap-2 sm:w-[340px]"
          >
            <span className="pointer-events-none relative block aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10">
              <Image src={it.imagem} alt={it.titulo} fill sizes="340px" className="object-cover object-top" draggable={false} />
            </span>
            <figcaption className="px-1 text-[14px] font-medium">{it.titulo}</figcaption>
          </motion.figure>
        ))}
      </motion.div>
      <p className="m-0 mt-3 text-center text-[13px] text-muted">Arraste para os lados</p>
    </div>
  );
}
