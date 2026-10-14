/** O que você já entregou ao longo de 5 anos, além dos projetos em destaque. */
export const entregas = [
  {
    icone: "landing",
    titulo: "Landing pages",
    texto: "Páginas de venda e de lançamento com carregamento rápido e foco em conversão.",
  },
  {
    icone: "site",
    titulo: "Sites institucionais",
    texto: "Sites para empresas, com SEO, boa performance e painel para editar o conteúdo.",
  },
  {
    icone: "sistema",
    titulo: "Sistemas web",
    texto: "Painéis, ferramentas internas e sistemas de gestão, dos mais simples aos mais complexos.",
  },
  {
    icone: "saas",
    titulo: "Produtos SaaS",
    texto: "Do primeiro protótipo à apresentação e à implantação no cliente.",
  },
  {
    icone: "api",
    titulo: "APIs e integrações",
    texto: "APIs REST em .NET e Node.js, integrações bancárias via Open Finance e com serviços de terceiros.",
  },
  {
    icone: "automacao",
    titulo: "Automações",
    texto: "Rotinas que tiram horas de trabalho manual de equipes inteiras.",
  },
  {
    icone: "app",
    titulo: "Apps",
    texto: "Apps mobile que conversam com a mesma API do produto web.",
  },
  {
    icone: "erp",
    titulo: "ERPs",
    texto: "Sistemas de gestão que integram vendas, estoque, financeiro e fiscal, com emissão de notas e relatórios.",
  },
  {
    icone: "dashboard",
    titulo: "Dashboards",
    texto: "Dados espalhados transformados em uma tela que ajuda a decidir.",
  },
] as const;

export type IconeEntrega = (typeof entregas)[number]["icone"];
