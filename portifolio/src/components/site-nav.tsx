"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, site } from "@/data/site";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="glass-nav sticky top-0 z-30 border-b border-ink/8">
      <nav aria-label="Principal" className="wrap flex h-14 items-center justify-between gap-6">
        <Link href="/" onClick={close} className="flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.01em] text-ink hover:text-ink hover:no-underline">
          <Logo className="h-[22px] w-auto" />
          {site.name}
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm hover:text-ink hover:no-underline ${active ? "font-semibold text-ink" : "text-ink-2"}`}
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle />
          <a className="pill pill-blue pill-sm" href={site.links.cv} download={site.links.cvArquivo}>
            Baixar currículo
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex min-h-11 cursor-pointer items-center px-1 text-[15px] font-medium text-ink"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Fechar" : "Menu"}
          </button>
        </div>
      </nav>

      {open && (
        <div id="menu-mobile" className="wrap pb-6 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className="block border-b border-ink/8 py-3.5 text-2xl font-semibold tracking-[-0.02em] text-ink hover:text-azul hover:no-underline"
            >
              {item.label}
            </Link>
          ))}
          <a className="pill pill-blue mt-5 w-full" href={site.links.cv} download={site.links.cvArquivo}>
            Baixar currículo
          </a>
        </div>
      )}
    </header>
  );
}
