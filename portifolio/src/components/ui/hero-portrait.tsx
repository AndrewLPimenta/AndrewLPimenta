"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Mail } from "lucide-react";
import { useRef } from "react";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";

/**
 * Hero sobre o mesmo fundo da página: claro no tema claro, escuro no tema escuro.
 * A foto se dissolve nesse fundo pelas bordas, sem caixa colorida atrás dos textos.
 */

type Social = { label: string; href: string; icon: React.ComponentType<{ className?: string }> };

type HeroPortraitProps = {
  greeting: string;
  name: string;
  description: string;
  photoSrc: string;
  photoAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string; download?: string };
  facts?: { rotulo: string; valor: string }[];
  links?: { github?: string; linkedin?: string; email?: string };
};

function buildSocials(links: HeroPortraitProps["links"] = {}): Social[] {
  const out: Social[] = [];
  if (links.github) out.push({ label: "GitHub", href: links.github, icon: GitHubIcon });
  if (links.linkedin) out.push({ label: "LinkedIn", href: links.linkedin, icon: LinkedInIcon });
  if (links.email) out.push({ label: "E-mail", href: `mailto:${links.email}`, icon: Mail });
  return out;
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { delay, duration: 0.8, ease: [0.22, 0.61, 0.36, 1] as const },
});

export function HeroPortrait({
  greeting,
  name,
  description,
  photoSrc,
  photoAlt,
  primaryCta,
  secondaryCta,
  facts = [],
  links,
}: HeroPortraitProps) {
  const socials = buildSocials(links);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} className="wide pt-3">
        <div className="tile relative isolate flex min-h-[clamp(620px,86svh,820px)] flex-col bg-background text-ink md:flex-row">

          {/* Foto: no celular fica em cima; no desktop ocupa a direita e se funde ao painel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 1.1 }}
            className="relative h-[420px] w-full shrink-0 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[56%]"
          >
            <motion.div style={{ scale: photoScale }} className="absolute inset-0">
              <Image
                src={photoSrc}
                alt={photoAlt}
                fill
                priority
                sizes="(min-width: 768px) 56vw, 100vw"
                className="object-cover object-[50%_30%] [-webkit-mask-composite:source-in] [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_60%,transparent),linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_38%,black_90%,transparent),linear-gradient(to_bottom,transparent,black_10%,black_86%,transparent)]"
              />
            </motion.div>
          </motion.div>

          {/* Texto */}
          <div className="relative z-10 flex flex-1 flex-col justify-end gap-7 px-6 pb-10 sm:px-12 sm:pb-14 md:max-w-[640px] md:justify-center md:py-20 lg:px-16">
            <motion.div {...rise(0.15)} className="flex flex-col gap-3">
              <p className="m-0 text-[17px] font-medium text-muted">{greeting}</p>
              <h1 className="m-0 text-[clamp(3rem,7.2vw,6.25rem)] leading-[0.98] font-semibold tracking-[-0.05em] text-ink">
                {name}
              </h1>
            </motion.div>

            <motion.p {...rise(0.28)} className="m-0 max-w-[500px] text-[18px] leading-[1.6] text-pretty text-ink-2 md:text-[19px]">
              {description}
            </motion.p>

            <motion.div {...rise(0.38)} className="flex flex-wrap items-center gap-3">
              <Link href={primaryCta.href} className="pill gap-2 bg-ink text-paper hover:bg-ink/85 hover:text-paper">
                {primaryCta.label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={secondaryCta.href}
                download={secondaryCta.download}
                className="pill gap-2 text-ink shadow-[inset_0_0_0_1px_var(--line)] hover:bg-mist hover:text-ink"
              >
                {secondaryCta.label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              {socials.length > 0 && (
                <ul className="m-0 ml-1 flex list-none gap-2 p-0">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        aria-label={s.label}
                        title={s.label}
                        target={s.href.startsWith("http") ? "_blank" : undefined}
                        rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                        className="flex size-11 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-mist hover:text-ink hover:no-underline"
                      >
                        <s.icon className="size-[18px]" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            {facts.length > 0 && (
              <motion.dl
                {...rise(0.48)}
                className="m-0 mt-2 grid max-w-[540px] grid-cols-3 gap-x-4 border-t border-line"
              >
                {facts.map((f) => (
                  <div key={f.rotulo} className="flex flex-col gap-1 pt-4">
                    <dt className="text-[13px] text-muted">{f.rotulo}</dt>
                    <dd className="m-0 text-[15px] font-medium text-ink">{f.valor}</dd>
                  </div>
                ))}
              </motion.dl>
            )}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
