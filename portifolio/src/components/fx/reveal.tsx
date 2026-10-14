"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Aparece suavemente quando entra na tela. Use com moderação. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      // Com "reduzir movimento", aparece direto (mesmo HTML no servidor e no cliente).
      className={cn("motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:!filter-none", className)}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
