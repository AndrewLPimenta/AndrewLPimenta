"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Card com luz que acompanha o ponteiro e borda que acende onde o mouse está.
 * Em telas de toque, fica como um card de vidro comum.
 */
export function SpotlightCard({
  children,
  className,
  tone = "light",
  glass = true,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
  glass?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        "spotlight",
        tone === "dark" && "spotlight-dark",
        glass && (tone === "dark" ? "glass-dark" : "glass"),
        className,
      )}
    >
      {children}
    </div>
  );
}
