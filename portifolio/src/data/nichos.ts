import type { CategoriaSlug } from "./categorias";
import type { Mock } from "./projects";

/**
 * Nichos da página Projetos. Cada nicho mostra projetos de que o Andrew participou.
 * - "Em produção" e "Em construção": projetos reais, com estudo de caso.
 * - `recriada`: projeto de cliente sob confidencialidade; a tela foi recriada com outra marca e dados de exemplo.
 * - `detalhes`: stack, participação, contexto e desafio, contados pelo Andrew.
 */

export type DetalhesProjeto = {
  stack: string[];
  fiz: string;
  contexto: string;
  desafio: string;
};

export type ItemGaleria = {
  titulo: string;
  para: string;
  status: "Em produção" | "Em construção";
  /** "web" usa moldura de navegador; "cena" é uma imagem já composta (apps). */
  formato: "web" | "cena" | "mock";
  imagem?: string;
  /** Versão para o tema escuro, quando existir. */
  imagemEscura?: string;
  mock?: Mock;
  projeto?: string;
  /** Tela refeita com outra marca e dados de exemplo, por confidencialidade com o cliente. */
  recriada?: boolean;
  detalhes?: DetalhesProjeto;
};

export type Nicho = {
  slug: CategoriaSlug;
  titulo: string;
  /** Uma frase para o card da página inicial. */
  resumo: string;
  /** Públicos e usuários atendidos, mostrados no card da página inicial. */
  publicos: string[];
  /** Texto do botão do card da página inicial. */
  ver: string;
  texto: string[];
  aplicacoes: string[];
  contato: string;
  galeria: ItemGaleria[];
};

export const nichos: Nicho[] = [
  {
    slug: "dashboards",
    titulo: "Dashboards.",
    resumo: "Os números da operação reunidos num só painel, atualizados sem planilha.",
    publicos: ["Clubes e parques", "Pequenas e médias empresas", "Financeiro", "Atendimento"],
    ver: "Ver dashboards",
    texto: [
      "Todo negócio gera dados o dia inteiro: vendas, atendimentos, notas fiscais, estoque, acessos. Quando eles ficam espalhados em sistemas e planilhas, a decisão é tomada no escuro.",
      "Um dashboard organiza e estrutura esses dados num só lugar e transforma números soltos em controle. O mesmo princípio serve à diretoria de um clube, ao financeiro de uma pequena empresa e ao gestor de uma central de atendimento, em operações B2B ou B2C.",
    ],
    aplicacoes: [
      "Gestão financeira e fluxo de caixa",
      "Painel fiscal com notas emitidas e tributos",
      "Atendimento, tempo de resposta e satisfação",
      "Receita, vendas e metas por unidade",
    ],
    contato: "Falar sobre um dashboard",
    galeria: [
      {
        titulo: "Gestão de clubes e parques",
        para: "Diretoria de grandes clubes",
        status: "Em produção",
        formato: "web",
        imagem: "/conceitos/tatico-claro.webp",
        imagemEscura: "/conceitos/tatico-escuro.webp",
        projeto: "dashboard-tatico",
      },
      { titulo: "Gestão financeira", para: "Pequenas e médias empresas", status: "Em produção", formato: "web", imagem: "/conceitos/dash-financeiro.webp",
        recriada: true,
        detalhes: { stack: ["C#", ".NET", "PostgreSQL", "Redis", "Mensageria", "Next.js", "Tailwind CSS"], fiz: "Desenvolvi os serviços de conciliação bancária, com filas em segundo plano para processar extratos OFX em lote, e o dashboard de fluxo de caixa.", contexto: "Sistema para pequenas e médias empresas do estado do Rio. Em produção.", desafio: "As consultas do DRE deixavam o painel principal lento. Com índices parciais no PostgreSQL e cache no Redis, ele passou a abrir praticamente na hora." },
      },
      { titulo: "Painel fiscal", para: "Empresas e contadores", status: "Em produção", formato: "web", imagem: "/conceitos/dash-fiscal.webp",
        recriada: true,
        detalhes: { stack: ["C#", ".NET", "SQL Server", "Next.js", "TypeScript"], fiz: "Construí o módulo de emissão e validação de NF-e e NFS-e e a importação de XMLs para escritórios de contabilidade.", contexto: "Plataforma B2B usada por contadores da região metropolitana do Rio. Em produção.", desafio: "No fechamento do mês, o volume de requisições disparava. Filas assíncronas, novas tentativas automáticas e circuit breaker na comunicação com a SEFAZ evitaram que a interface travasse." },
      },
      { titulo: "Central de atendimento", para: "Equipes de WhatsApp e vendas", status: "Em produção", formato: "web", imagem: "/conceitos/dash-atendimento.webp",
        recriada: true,
        detalhes: { stack: ["Node.js", "TypeScript", "Next.js", "Redis", "PostgreSQL", "WebSockets"], fiz: "Desenvolvi o back-end de distribuição de leads e o painel de atendimento integrado à API oficial do WhatsApp Business.", contexto: "Para times de vendas de médio porte no Rio. Em produção.", desafio: "Vários atendentes trabalhando ao mesmo tempo sem perder mensagens: o estado das conversas fica no Redis e as atualizações chegam em tempo real por WebSockets." },
      },
    ],
  },
  {
    slug: "erps",
    titulo: "Sistemas e ERPs.",
    resumo: "Vendas, estoque, agenda, financeiro e fiscal com as regras do seu negócio.",
    publicos: ["Varejo", "Clínicas", "Restaurantes", "Prestadores de serviço"],
    ver: "Ver sistemas",
    texto: [
      "Quando a empresa cresce, planilhas e ferramentas soltas viram retrabalho: o mesmo dado digitado três vezes, o estoque que não bate, a nota que ninguém emitiu.",
      "Um sistema sob medida reúne vendas, estoque, financeiro, agenda e fiscal com as regras do seu negócio, e cada pessoa vê o que precisa. Pode ser um ERP completo ou uma ferramenta enxuta para um processo que hoje trava a operação.",
    ],
    aplicacoes: [
      "Frente de caixa com estoque e NFC-e",
      "Agenda, confirmações e prontuário",
      "Emissão automática de notas fiscais",
      "Portais para clientes e fornecedores",
    ],
    contato: "Falar sobre um sistema",
    galeria: [
      { titulo: "Frente de caixa e estoque", para: "Cafés, padarias e varejo", status: "Em produção", formato: "web", imagem: "/conceitos/sis-pdv.webp",
        recriada: true,
        detalhes: { stack: ["C#", ".NET", "WPF", "SQLite", "Next.js"], fiz: "Criei o PDV com funcionamento offline e sincronização automática em segundo plano, além do controle de estoque e inventário.", contexto: "Implantado em cafés e padarias de bairro. Em produção.", desafio: "A loja precisava continuar vendendo sem internet. As vendas ficam salvas localmente e sincronizam com a nuvem quando a conexão volta, sem conflito de estoque." },
      },
      { titulo: "Agenda de clínica", para: "Clínicas e consultórios", status: "Em produção", formato: "web", imagem: "/conceitos/sis-agenda.webp",
        recriada: true,
        detalhes: { stack: ["TypeScript", "Next.js", "PostgreSQL", "Prisma", "Redis"], fiz: "Desenvolvi o sistema de agendamento com prevenção de conflito por profissional e sala e lembretes automáticos pelo WhatsApp.", contexto: "Usado por clínicas médicas e odontológicas. Em produção.", desafio: "Recepcionistas marcando o mesmo horário ao mesmo tempo. Resolvi com controle de concorrência otimista e transações isoladas no banco." },
      },
    ],
  },
  {
    slug: "aplicativos",
    titulo: "Aplicativos.",
    resumo: "Um canal direto com o cliente, no celular, com notificações e pagamento.",
    publicos: ["Restaurantes", "Clubes e eventos", "Educação", "Saúde"],
    ver: "Ver aplicativos",
    texto: [
      "Um aplicativo coloca a sua empresa no celular do cliente. É o canal direto que não depende de anúncio nem de marketplace, com notificações que trazem o cliente de volta.",
      "Pode ser o delivery próprio de um restaurante, sem taxa de app, a carteira digital de um clube que dispensa dinheiro e fila, ou uma ferramenta de treino e estudo. Sempre conectado à mesma API do sistema web.",
    ],
    aplicacoes: [
      "Delivery próprio com rastreio e Pix",
      "Pagamento por aproximação (NFC) em clubes e eventos",
      "Educação e treino com acompanhamento",
      "Fidelidade, cashback e agendamento",
    ],
    contato: "Falar sobre um aplicativo",
    galeria: [
      { titulo: "Simulador clínico", para: "Estudantes de Medicina", status: "Em produção", formato: "cena", imagem: "/conceitos/app-praxis.webp", projeto: "praxis" },
      { titulo: "Delivery próprio", para: "Restaurantes e hamburguerias", status: "Em produção", formato: "cena", imagem: "/conceitos/app-delivery.webp",
        recriada: true,
        detalhes: { stack: ["Node.js", "TypeScript", "Next.js", "PostgreSQL", "Redis", "Docker"], fiz: "Desenvolvi a API de pedidos, o painel da cozinha (KDS) e o cardápio digital white-label, pensado para o celular.", contexto: "Rede de hamburguerias artesanais na região metropolitana. Em produção.", desafio: "Os picos de acesso no jantar de sexta e sábado derrubavam o catálogo. Cache no Redis e o back-end em contêineres seguraram o volume." },
      },
      { titulo: "Carteira NFC", para: "Clubes, parques e eventos", status: "Em produção", formato: "cena", imagem: "/conceitos/app-nfc.webp",
        recriada: true,
        detalhes: { stack: ["C#", ".NET", "PostgreSQL", "React Native", "TypeScript"], fiz: "Implementei a API de créditos e a validação de consumo por aproximação (NFC) em pulseiras e cartões de acesso.", contexto: "Usada em eventos e clubes recreativos. Em produção.", desafio: "A leitura no terminal precisava ser rápida mesmo com a internet instável do evento. Otimizei os endpoints de consulta de saldo para responder sem espera perceptível." },
      },
    ],
  },
  {
    slug: "saas",
    titulo: "SaaS.",
    resumo: "Produtos por assinatura, com planos, cobrança recorrente e métricas de uso.",
    publicos: ["Startups", "Empresas B2B", "Software houses"],
    ver: "Ver SaaS",
    texto: [
      "Um SaaS transforma um processo que muitas empresas repetem em um produto vendido por assinatura. Cada cliente paga todo mês, entra pelo navegador e recebe as melhorias sem instalar nada.",
      "Construir um SaaS vai além das telas: planos e cobrança recorrente, isolamento dos dados de cada cliente, permissões, métricas de uso e uma página de preços que converte. Já apresentei e implantei produtos SaaS, do primeiro contato ao sistema rodando no cliente.",
    ],
    aplicacoes: [
      "Planos, cobrança recorrente e recuperação de pagamento",
      "Multiempresa, com os dados de cada cliente isolados",
      "Métricas de uso, retenção e funil de conversão",
      "Página de preços, teste grátis e onboarding",
    ],
    contato: "Falar sobre um SaaS",
    galeria: [
      { titulo: "Product analytics", para: "Times de produto", status: "Em produção", formato: "web", imagem: "/conceitos/saas-analytics.webp",
        recriada: true,
        detalhes: { stack: ["TypeScript", "Next.js", "ClickHouse", "PostgreSQL", "Redis"], fiz: "Criei o pipeline de ingestão de eventos de uso e as telas de funil de conversão e retenção.", contexto: "Começou como ferramenta interna e virou produto para startups. Em produção.", desafio: "O volume de eventos de clique e navegação é alto. A ingestão assíncrona evita que o rastreio deixe lenta a aplicação monitorada." },
      },
      { titulo: "Gestão de assinaturas", para: "Empresas com receita recorrente", status: "Em produção", formato: "web", imagem: "/conceitos/saas-assinaturas.webp",
        recriada: true,
        detalhes: { stack: ["C#", ".NET", "SQL Server", "Next.js", "Stripe"], fiz: "Desenvolvi o motor de cobrança recorrente: faturamento automático, inadimplência e novas tentativas de pagamento.", contexto: "SaaS B2B com assinantes ativos. Em produção.", desafio: "Tratar falhas de cartão e trocas de plano no meio do ciclo sem erro no valor cobrado." },
      },
      { titulo: "E-mail marketing", para: "Lojas e e-commerces", status: "Em produção", formato: "web", imagem: "/conceitos/saas-campanhas.webp",
        recriada: true,
        detalhes: { stack: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "RabbitMQ"], fiz: "Construí o motor de disparos segmentados e o painel de campanhas automáticas, como carrinho abandonado e pós-compra.", contexto: "Integrado a e-commerces de médio porte. Em produção.", desafio: "Manter os e-mails fora do spam: rotação de servidores SMTP e limite de envios por minuto controlado por filas." },
      },
      { titulo: "Planos e preços", para: "Cardápio digital para restaurantes", status: "Em produção", formato: "web", imagem: "/conceitos/saas-precos.webp",
        recriada: true,
        detalhes: { stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"], fiz: "Criei o construtor de cardápios digitais por QR Code, em que o próprio restaurante muda tema, preços e categorias.", contexto: "Usado por quiosques e restaurantes da orla do Rio. Em produção.", desafio: "O cardápio precisava abrir na hora no celular de quem está na mesa. Páginas geradas no servidor (SSR e SSG) resolveram." },
      },
    ],
  },
  {
    slug: "landing-pages",
    titulo: "Landing pages e sites.",
    resumo: "Páginas rápidas, feitas para transformar visita em contato.",
    publicos: ["Clínicas", "Restaurantes", "Escritórios", "Lançamentos"],
    ver: "Ver landing pages",
    texto: [
      "O site é onde o cliente decide se confia na sua empresa. A landing page é onde ele decide se vai chamar você agora ou fechar a aba.",
      "Cada página tem um objetivo só e é construída em volta dele: texto que fala da dor de quem lê, prova social, carregamento rápido no celular e cada clique medido. Serve tanto para a clínica que vende para pessoas quanto para o escritório que vende para empresas.",
    ],
    aplicacoes: [
      "Captação de pacientes e agendamento",
      "Cardápio e pedido direto, sem marketplace",
      "Sites institucionais B2B com área do cliente",
      "SEO local para aparecer no Google",
    ],
    contato: "Falar sobre uma landing page",
    galeria: [
      { titulo: "Clínica de estética", para: "Saúde e beleza", status: "Em produção", formato: "web", imagem: "/conceitos/lp-clinica.webp",
        recriada: true,
        detalhes: { stack: ["Next.js", "TypeScript", "Tailwind CSS"], fiz: "Desenvolvi a landing page de captação de pacientes, com agendamento rápido pelo WhatsApp.", contexto: "No ar.", desafio: "Animações e visual refinado sem perder velocidade no celular nem pontuação de SEO." },
      },
      { titulo: "Hamburgueria com delivery", para: "Restaurantes", status: "Em produção", formato: "web", imagem: "/conceitos/lp-burger.webp",
        recriada: true,
        detalhes: { stack: ["Next.js", "TypeScript", "Tailwind CSS"], fiz: "Criei o site institucional e a vitrine de produtos, levando o cliente direto para o pedido no WhatsApp ou no app da marca.", contexto: "No ar.", desafio: "Fotos pesadas de cardápio num layout escuro e imersivo, carregando rápido no celular." },
      },
      { titulo: "Escritório de contabilidade", para: "Serviços B2B", status: "Em produção", formato: "web", imagem: "/conceitos/lp-contabil.webp",
        recriada: true,
        detalhes: { stack: ["Next.js", "TypeScript", "Tailwind CSS"], fiz: "Desenvolvi o site institucional com um simulador de abertura de empresa e estimativa de impostos.", contexto: "No ar, voltado a atrair novos clientes empresariais.", desafio: "Explicar termos contábeis de forma simples para quem decide, sem perder precisão." },
      },
    ],
  },
  {
    slug: "automacoes",
    titulo: "Automações e IA.",
    resumo: "Rotinas e agentes de IA que tiram horas de trabalho manual da equipe.",
    publicos: ["Comercial", "Atendimento", "Operações"],
    ver: "Ver automações",
    texto: [
      "Boa parte do dia de uma equipe vai para tarefas repetitivas: responder as mesmas perguntas, cobrar, lembrar, copiar dados de um sistema para outro.",
      "Automações e agentes de IA assumem esse trabalho com regras claras, do lead que chega qualificado ao follow-up que sai no dia certo, e devolvem esse tempo para o que gera resultado.",
    ],
    aplicacoes: [
      "Funil de vendas com prospecção automática",
      "Agente de IA no WhatsApp para atender e agendar",
      "Tratamento de fotos e diagramação em lote",
      "Rotinas internas que levavam dias",
      "Integração entre sistemas, planilhas e CRM",
    ],
    contato: "Falar sobre automação",
    galeria: [
      { titulo: "Funil de vendas com IA", para: "Equipes comerciais", status: "Em produção", formato: "web", imagem: "/conceitos/sis-crm.webp",
        recriada: true,
        detalhes: { stack: ["Python", "Node.js", "TypeScript", "OpenAI API", "Next.js", "PostgreSQL"], fiz: "Construí o agente integrado ao CRM que lê o histórico de conversa com o lead, qualifica o contato e sugere o próximo passo ao vendedor.", contexto: "Usado por times comerciais. Em produção.", desafio: "Leads esfriando no topo do funil. Os resumos automáticos encurtaram o tempo de resposta e deixaram claro quem precisava de atenção." },
      },
      {
        titulo: "Kazz: álbuns de formatura",
        para: "Empresas de formatura",
        status: "Em produção",
        formato: "web",
        imagem: "/conceitos/app-albuns.webp",
        projeto: "montador-de-albuns",
        detalhes: {
          stack: ["Python", "Processamento de imagens", "Pixellu SmartAlbums"],
          fiz: "Automatizei, em Python, o tratamento das fotos e a diagramação dos álbuns, incluindo a escolha da foto de cada página.",
          contexto: "Kazz, empresa de álbuns de formatura. Em produção.",
          desafio: "Montar centenas de álbuns à mão levava dias. Cada regra nova é medida contra um gabarito de álbuns montados pela equipe antes de entrar em produção.",
        },
      },
    ],
  },
];

export function getNicho(slug: string) {
  return nichos.find((n) => n.slug === slug);
}
