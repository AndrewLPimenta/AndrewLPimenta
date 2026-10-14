import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/brand-icons";
import { CopyEmail } from "@/components/copy-email";
import { SpotlightCard } from "@/components/fx/spotlight-card";
import { Wallpaper } from "@/components/fx/wallpaper";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com Andrew Pimenta sobre vagas, projetos sob medida ou automação para o seu negócio.",
};

export default function ContatoPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-28 text-center sm:pt-40">
        <Wallpaper variant="hero" fade="bottom" />
        <div className="wrap relative z-10 flex flex-col items-center gap-6">
          <h1 className="display-1 max-w-[860px]">Fale comigo.</h1>
          <p className="lead max-w-[600px]">
            Para vagas, projetos sob medida ou automação do seu negócio. Escreva o que você precisa e eu respondo com os próximos
            passos.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 text-[clamp(1.375rem,3.4vw,2.5rem)] font-semibold tracking-[-0.03em] break-all text-ink hover:text-azul hover:no-underline"
          >
            {site.email}
          </a>
          <div className="flex flex-wrap justify-center gap-3">
            <CopyEmail email={site.email} />
            <Button size="lg" variant="outline" asChild className="glass border-transparent">
              <a href={site.links.cv} download={site.links.cvArquivo}>
                Baixar currículo
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section aria-label="Outros canais" className="wrap pb-32">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { titulo: "WhatsApp", texto: "Contato mais rápido.", href: site.links.whatsapp, Icone: WhatsAppIcon },
            { titulo: "LinkedIn", texto: "Trajetória completa e recomendações.", href: site.links.linkedin, Icone: LinkedInIcon },
            { titulo: "GitHub", texto: "Código dos projetos públicos.", href: site.links.github, Icone: GitHubIcon },
          ].map(({ titulo, texto, href, Icone }) => (
            <a key={titulo} href={href} target="_blank" rel="noopener noreferrer" className="group text-ink hover:text-ink hover:no-underline">
              <SpotlightCard className="flex h-full flex-col gap-4 rounded-[24px] p-7">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-azul/15 to-ouro/20 text-azul">
                  <Icone className="size-5" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-1">
                  <h2 className="m-0 flex items-center gap-1 text-[20px] font-semibold">
                    {titulo}
                    <ArrowUpRight
                      className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </h2>
                  <p className="m-0 text-base text-muted">{texto}</p>
                </div>
              </SpotlightCard>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
