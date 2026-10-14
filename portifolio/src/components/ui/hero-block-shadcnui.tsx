"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, BriefcaseBusiness, FolderGit2, Mail, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Wallpaper } from "@/components/fx/wallpaper";

/**
 * Hero do 21st.dev (hero-block-shadcnui), adaptado para o portfólio:
 * - wallpaper de luz e aura girando atrás do avatar;
 * - ao rolar, o conteúdo afasta e some, e o fundo se move mais devagar (paralaxe);
 * - textos e links por props; avatar com a sua foto ou as iniciais;
 * - respeita "reduzir movimento" (MotionConfig reducedMotion="user").
 * Usa "motion/react", o nome atual do framer-motion (mesma API).
 */

type HeroSocial = { label: string; href: string; icon: LucideIcon };

type HeroBlockProps = {
  name: string;
  role: string;
  title: string;
  description: string;
  initials: string;
  avatarSrc?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  links?: { github?: string; linkedin?: string; email?: string };
  scrollTarget?: string;
};

function buildSocials(links: HeroBlockProps["links"] = {}): HeroSocial[] {
  const out: HeroSocial[] = [];
  if (links.github) out.push({ label: "GitHub", href: links.github, icon: FolderGit2 });
  if (links.linkedin) out.push({ label: "LinkedIn", href: links.linkedin, icon: BriefcaseBusiness });
  if (links.email) out.push({ label: "E-mail", href: `mailto:${links.email}`, icon: Mail });
  return out;
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { delay, duration: 0.8, ease: [0.22, 0.61, 0.36, 1] as const },
});

export function HeroBlock({
  name,
  role,
  title,
  description,
  initials,
  avatarSrc,
  primaryCta,
  secondaryCta,
  links,
  scrollTarget,
}: HeroBlockProps) {
  const socials = buildSocials(links);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        className="relative flex min-h-[calc(100svh-3.5rem)] w-full items-center justify-center overflow-hidden bg-background px-4 py-24"
      >
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <Wallpaper variant="hero" fade="bottom" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808014_1px,transparent_1px),linear-gradient(to_bottom,#80808014_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
          />
        </motion.div>

        <motion.div
          style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
          className="relative z-10 mx-auto max-w-5xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", bounce: 0.3, duration: 0.7 }}
            className="relative mb-7 inline-block"
          >
            <span aria-hidden="true" className="aura" />
            <div className="relative mx-auto flex size-24 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-surface text-2xl font-semibold tracking-[-0.02em] text-foreground shadow-lg">
              {avatarSrc ? (
                <Image src={avatarSrc} alt={`Foto de ${name}`} fill sizes="96px" className="object-cover" priority />
              ) : (
                <span aria-hidden="true">{initials}</span>
              )}
            </div>
          </motion.div>

          <motion.p {...rise(0.25)} className="mb-4 text-lg font-semibold tracking-[-0.01em] text-foreground md:text-[21px]">
            {name}, {role.toLowerCase()}
          </motion.p>

          <motion.h1
            {...rise(0.32)}
            className="mb-6 text-5xl leading-[1.02] font-semibold tracking-[-0.045em] text-balance text-foreground md:text-7xl lg:text-[92px]"
          >
            {title}
          </motion.h1>

          <motion.p
            {...rise(0.42)}
            className="mx-auto mb-9 max-w-3xl text-xl leading-[1.42] tracking-[-0.01em] text-pretty text-muted-foreground md:text-2xl"
          >
            {description}
          </motion.p>

          <motion.div {...rise(0.52)} className="mb-12 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="shadow-[0_10px_30px_-10px_rgb(47_107_224/0.7)]">
              <Link href={primaryCta.href}>
                <Mail className="size-4" aria-hidden="true" />
                {primaryCta.label}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="glass border-transparent">
              <Link href={secondaryCta.href}>
                {secondaryCta.label}
                <ArrowDown className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>

          {socials.length > 0 && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="m-0 flex list-none justify-center gap-4 p-0"
            >
              {socials.map((social) => (
                <li key={social.label}>
                  <motion.a
                    href={social.href}
                    aria-label={social.label}
                    title={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass flex size-12 items-center justify-center rounded-full text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:no-underline"
                  >
                    <social.icon className="size-5" aria-hidden="true" />
                  </motion.a>
                </li>
              ))}
            </motion.ul>
          )}
        </motion.div>

        {scrollTarget && (
          <motion.a
            href={scrollTarget}
            aria-label="Rolar para baixo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { delay: 1, duration: 0.6 },
              y: { delay: 1.5, duration: 1.6, repeat: Infinity },
            }}
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground hover:text-foreground"
          >
            <ArrowDown className="size-6" aria-hidden="true" />
          </motion.a>
        )}
      </section>
    </MotionConfig>
  );
}
