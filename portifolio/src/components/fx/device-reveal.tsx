"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A tela entra inclinada e menor, e se endireita conforme a página rola,
 * como nas apresentações de produto da Apple.
 */
export function DeviceReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.3"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  const rotateX = useTransform(p, [0, 1], [22, 0]);
  const scale = useTransform(p, [0, 1], [0.86, 1]);
  const y = useTransform(p, [0, 1], [60, 0]);
  const glow = useTransform(p, [0, 1], [0, 1]);

  // Com "reduzir movimento", o CSS anula a inclinação; o HTML é o mesmo no servidor e no cliente.
  return (
    <div ref={ref} className={cn("relative [perspective:1400px]", className)}>
      <motion.div
        aria-hidden="true"
        style={{ opacity: glow }}
        className="pointer-events-none absolute inset-x-[8%] -top-8 -bottom-10 -z-10 rounded-[40px] motion-reduce:hidden bg-[radial-gradient(closest-side,rgb(47_107_224/0.45),transparent)] blur-2xl"
      />
      <motion.div style={{ rotateX, scale, y, transformOrigin: "50% 100%" }} className="motion-reduce:!transform-none">
        {children}
      </motion.div>
    </div>
  );
}
