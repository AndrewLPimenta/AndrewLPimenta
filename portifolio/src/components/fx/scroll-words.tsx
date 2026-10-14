"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useRef } from "react";

/**
 * Texto em que cada palavra acende conforme a página rola, no estilo das páginas de produto da Apple.
 * Com "reduzir movimento" ligado, o texto aparece inteiro.
 */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.45"] });
  const words = text.split(" ");

  // Espaços reais entre as palavras: o texto quebra naturalmente e copia certo.
  // Com "reduzir movimento", o CSS mostra tudo aceso (mesmo HTML no servidor e no cliente).
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {word}
          </Word>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="motion-reduce:!opacity-100">
      {children}
    </motion.span>
  );
}
