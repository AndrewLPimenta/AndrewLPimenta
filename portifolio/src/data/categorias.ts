/**
 * Categorias de projeto. Cada uma tem uma página em /explorar/<slug>
 * com todos os projetos daquela categoria.
 */
export const categorias = [
  {
    slug: "dashboards",
    titulo: "Dashboards",
    botao: "Explorar dashboards",
    descricao: "Dados espalhados transformados em uma tela que ajuda a decidir, de painéis de gestão a indicadores em tempo real.",
    chamada: "Precisa enxergar a sua operação numa tela só?",
  },
  {
    slug: "aplicativos",
    titulo: "Aplicativos mobile",
    botao: "Explorar aplicativos",
    descricao: "Apps para iOS e Android que conversam com a mesma API do produto web, com login, regras no back-end e cuidado com cada tela.",
    chamada: "Tem uma ideia de aplicativo?",
  },
  {
    slug: "automacoes",
    titulo: "Automações e agentes de IA",
    botao: "Explorar automações",
    descricao: "Rotinas que tiram horas de trabalho manual de equipes inteiras, e agentes de IA que atendem, agendam e cobram com regras claras.",
    chamada: "Qual tarefa da sua equipe deveria acontecer sozinha?",
  },
  {
    slug: "saas",
    titulo: "SaaS",
    botao: "Explorar SaaS",
    descricao: "Produtos vendidos por assinatura, com planos, cobrança recorrente, painel do cliente e métricas de uso.",
    chamada: "Tem uma ideia de produto por assinatura?",
  },
  {
    slug: "landing-pages",
    titulo: "Landing pages e sites",
    botao: "Explorar landing pages",
    descricao: "Páginas que transformam visita em contato: carregamento rápido, texto pensado para vender e cada clique medido.",
    chamada: "Seu site traz clientes ou só existe?",
  },
  {
    slug: "erps",
    titulo: "Sistemas e ERPs",
    botao: "Explorar sistemas",
    descricao: "Sistemas que integram vendas, financeiro e fiscal: emissão automática de notas fiscais, fechamento contábil e controle de custos.",
    chamada: "Sua gestão ainda depende de planilha?",
  },
] as const;

export type CategoriaSlug = (typeof categorias)[number]["slug"];

export function getCategoria(slug: string) {
  return categorias.find((c) => c.slug === slug);
}
