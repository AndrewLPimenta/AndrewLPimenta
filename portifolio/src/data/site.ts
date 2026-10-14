/**
 * Dados gerais do site. Troque os valores entre colchetes pelos seus.
 */
export const site = {
  name: "Andrew Pimenta",
  role: "Engenheiro de Software",
  city: "Rio de Janeiro",
  description:
    "Engenheiro de Software (C#/.NET e Next.js) desde 2021. Sistemas web, aplicativos, integrações e automações, do banco de dados à interface.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "andrewpimenta.dev@gmail.com",
  links: {
    github: "https://github.com/AndrewLPimenta",
    linkedin: "https://www.linkedin.com/in/andrewpimenta/",
    whatsapp: "https://wa.me/5524998151263",
    cv: "/cv-andrew-pimenta.pdf",
    /** Nome com que o arquivo é salvo ao baixar. */
    cvArquivo: "Andrew-Pimenta-Desenvolvedor-Full-Stack-NET.pdf",
  },
} as const;

export const navItems = [
  { href: "/", label: "Início" },
  { href: "/projetos", label: "Projetos" },
  { href: "/dev", label: "Dev" },
  { href: "/abordagem", label: "Abordagem" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
] as const;
