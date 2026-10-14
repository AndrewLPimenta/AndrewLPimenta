import Link from "next/link";
import { navItems, site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-ink/8">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-7 pb-10">
        <p className="m-0 text-[13px] text-muted">© {new Date().getFullYear()} {site.name}</p>
        <nav aria-label="Rodapé" className="flex flex-wrap gap-x-6 gap-y-2">
          {navItems.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className="text-[13px] text-muted hover:text-ink">
              {item.label}
            </Link>
          ))}
          <a href={site.links.github} className="text-[13px] text-muted hover:text-ink">
            GitHub
          </a>
          <a href={site.links.linkedin} className="text-[13px] text-muted hover:text-ink">
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
