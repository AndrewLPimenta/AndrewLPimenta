"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { BookOpen, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/** Cartão de vidro (adaptado do Glass Blog Card do 21st.dev): imagem com zoom, etiquetas e ação no hover. */
export function GlassCard({
  titulo,
  resumo,
  imagem,
  autor,
  data,
  leitura,
  tags,
  className,
}: {
  titulo: string;
  resumo: string;
  imagem: string;
  autor: string;
  data: string;
  leitura: string;
  tags: string[];
  className?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn("w-full", className)}
    >
      <div className="group relative h-full overflow-hidden rounded-2xl bg-surface/40 shadow-[inset_0_0_0_1px_var(--line)] backdrop-blur-md transition-all duration-300 hover:shadow-[inset_0_0_0_1px_var(--spot-border),0_20px_50px_-25px_rgb(47_107_224/0.45)]">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image src={imagem} alt={titulo} fill sizes="560px" className="object-cover object-top transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
          <div className="absolute bottom-3 left-3 flex gap-2">
            {tags.map((t) => (
              <span key={t} className="rounded-full bg-paper/60 px-2.5 py-0.5 text-[12px] font-semibold text-ink backdrop-blur-sm">
                {t}
              </span>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-paper/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-azul-solid px-6 py-2.5 text-sm font-medium text-white shadow-lg"
            >
              <BookOpen className="size-4" aria-hidden="true" />
              Ler estudo de caso
            </motion.button>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-2">
            <h4 className="m-0 text-[19px] leading-tight font-semibold tracking-tight transition-colors group-hover:text-azul">{titulo}</h4>
            <p className="m-0 line-clamp-2 text-[14px] text-muted">{resumo}</p>
          </div>
          <div className="flex items-center justify-between border-t border-hairline pt-4">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-ink text-[12px] font-bold text-paper">{autor[0]}</span>
              <div className="flex flex-col text-[12px]">
                <span className="font-medium">{autor}</span>
                <span className="text-muted">{data}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[12px] text-muted">
              <Clock className="size-3" aria-hidden="true" />
              {leitura}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
