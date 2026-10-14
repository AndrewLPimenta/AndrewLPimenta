"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";

export type ItemParallax = { title: string; link: string; thumbnail: string };

/**
 * Vitrine com paralaxe (adaptado do Hero Parallax do 21st.dev / Aceternity).
 * Três fileiras de telas que se inclinam e deslizam com a rolagem.
 */
export function HeroParallax({ products, titulo, texto }: { products: ItemParallax[]; titulo: string; texto: string }) {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = useRef<HTMLDivElement>(null);
  const calmo = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const mola = { stiffness: 300, damping: 30, bounce: 100 };
  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, calmo ? 0 : 700]), mola);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, calmo ? 0 : -700]), mola);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [calmo ? 0 : 15, 0]), mola);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [calmo ? 1 : 0.2, 1]), mola);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [calmo ? 0 : 20, 0]), mola);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [calmo ? 0 : -560, calmo ? 0 : 340]), mola);

  return (
    <div
      ref={ref}
      className="relative flex h-[230vh] flex-col self-auto overflow-hidden py-24 antialiased [perspective:1000px] [transform-style:preserve-3d]"
    >
      <div className="wrap relative z-10 w-full max-w-[1240px] py-10 md:py-20">
        <h2 className="display-2 max-w-[760px]">{titulo}</h2>
        <p className="lead mt-6 max-w-[620px]">{texto}</p>
      </div>
      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        <div className="mb-12 flex flex-row-reverse gap-12">
          {firstRow.map((p) => (
            <Card product={p} translate={translateX} key={p.title} />
          ))}
        </div>
        <div className="mb-12 flex flex-row gap-12">
          {secondRow.map((p) => (
            <Card product={p} translate={translateXReverse} key={p.title} />
          ))}
        </div>
        <div className="flex flex-row-reverse gap-12">
          {thirdRow.map((p) => (
            <Card product={p} translate={translateX} key={p.title} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Card({ product, translate }: { product: ItemParallax; translate: MotionValue<number> }) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product relative h-[18rem] w-[28.8rem] flex-shrink-0 overflow-hidden rounded-[18px] ring-1 ring-black/5 dark:ring-white/10"
    >
      <Link href={product.link} className="block group-hover/product:shadow-2xl">
        <Image src={product.thumbnail} height={600} width={960} className="absolute inset-0 h-full w-full object-cover object-left-top" alt={product.title} />
      </Link>
      <div className="pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity group-hover/product:opacity-70" />
      <h3 className="pointer-events-none absolute bottom-4 left-5 m-0 text-[17px] font-semibold text-white opacity-0 transition-opacity group-hover/product:opacity-100">
        {product.title}
      </h3>
    </motion.div>
  );
}
