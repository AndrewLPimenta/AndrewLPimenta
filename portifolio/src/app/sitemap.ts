import type { MetadataRoute } from "next";
import { categorias } from "@/data/categorias";
import { visibleProjects } from "@/data/projects";
import { navItems, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = navItems.map((item) => ({ url: new URL(item.href, site.url).toString() }));
  const cases = visibleProjects.map((p) => ({ url: new URL(`/projetos/${p.slug}`, site.url).toString() }));
  const explorar = categorias.map((c) => ({ url: new URL(`/explorar/${c.slug}`, site.url).toString() }));
  return [...pages, ...cases, ...explorar];
}
