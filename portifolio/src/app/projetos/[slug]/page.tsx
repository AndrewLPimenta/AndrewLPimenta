import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyBody } from "@/components/case-study";
import { DeviceReveal } from "@/components/fx/device-reveal";
import { Wallpaper } from "@/components/fx/wallpaper";
import { ProjectVisual } from "@/components/project-visual";
import { getProject, visibleProjects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return visibleProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.nome,
    description: project.resumo,
    openGraph: { title: project.nome, description: project.resumo },
  };
}

export default async function ProjetoPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = visibleProjects.findIndex((p) => p.slug === slug);
  const anterior = visibleProjects[i - 1];
  const proximo = visibleProjects[i + 1];

  return (
    <article className="pb-24">
      <header className="relative overflow-hidden pt-20 pb-16 text-center sm:pt-28">
        <Wallpaper variant="hero" fade="bottom" />
        <div className="wrap relative z-10 flex flex-col items-center gap-5">
          <Link href="/projetos" className="text-[15px]">
            Todos os projetos
          </Link>
          {project.onde && <p className="m-0 text-[17px] font-semibold text-muted">{project.onde}</p>}
          <h1 className="display-1">{project.nome}</h1>
          <p className="lead max-w-[720px]">{project.tagline}</p>
        </div>
        {project.mock && (
          <div className="wrap relative z-10 mt-16 max-w-[1040px]">
            <DeviceReveal>
              <ProjectVisual mock={project.mock} inteira />
            </DeviceReveal>
          </div>
        )}
      </header>

      <div className="wrap mt-10 max-w-[860px]">
        <p className="mt-0 mb-14 text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.45] tracking-[-0.01em]">{project.resumo}</p>
        <CaseStudyBody project={project} />

        <nav aria-label="Outros projetos" className="mt-20 flex flex-wrap justify-between gap-4 border-t border-line pt-8">
          {anterior ? (
            <Link href={`/projetos/${anterior.slug}`} className="flex flex-col">
              <span className="text-sm text-muted">Projeto anterior</span>
              <span className="text-[19px] font-semibold">{anterior.nome}</span>
            </Link>
          ) : (
            <span />
          )}
          {proximo && (
            <Link href={`/projetos/${proximo.slug}`} className="flex flex-col text-right">
              <span className="text-sm text-muted">Próximo projeto</span>
              <span className="text-[19px] font-semibold">{proximo.nome}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
