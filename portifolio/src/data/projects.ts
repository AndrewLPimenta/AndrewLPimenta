import type { CategoriaSlug } from "./categorias";

/**
 * Projetos do portfólio.
 *
 * - fase "entregue": aparece como conquista (destaque na página inicial e em Projetos).
 * - fase "construcao": aparece em "O que estou construindo agora".
 * - `numeros` só recebe números reais.
 * - `visivel: false` guarda o projeto aqui sem publicá-lo.
 */

export type Numero = { valor: number; sufixo?: string; rotulo: string };

export type Mock = "dashboard" | "praxis" | "album";

export type Project = {
  slug: string;
  nome: string;
  /** Tipo de sistema, mostrado no lugar do nome nos cards da página inicial. */
  tipo: string;
  /** Categoria da página /explorar/<categoria>. */
  categoria: CategoriaSlug;
  /** Onde o produto roda, mostrado nos cards da página inicial. */
  plataforma: "Web" | "Mobile" | "Desktop" | "WhatsApp";
  /** Para quem o produto foi feito, em minúsculas: aparece como "Para <nicho>". */
  nicho: string;
  fase: "entregue" | "construcao";
  /** Empresa ou contexto em que o projeto roda. */
  onde?: string;
  tagline: string;
  /** Para quem esse tipo de sistema é ideal. Começa em minúscula: aparece depois de "Ideal para". */
  beneficio?: string;
  resumo: string;
  contexto?: string;
  clientes?: string[];
  desafio: string;
  solucao: string;
  conquistas: string[];
  numeros?: Numero[];
  decisoes?: string[];
  stack: string[];
  privado: boolean;
  visivel: boolean;
  mock?: Mock;
};

export const projects: Project[] = [
  {
    slug: "dashboard-tatico",
    nome: "Dashboard Tático",
    tipo: "Dashboard",
    categoria: "dashboards",
    plataforma: "Web",
    fase: "entregue",
    onde: "Multiclubes",
    nicho: "clubes, parques e associações",
    tagline: "Os indicadores do clube reunidos num único painel, para a diretoria acompanhar a operação e decidir.",
    beneficio: "quem cansou de se perder em planilhas e sente falta de enxergar, com clareza, os números que movem o próprio negócio.",
    resumo:
      "Painel de gestão em produção em grandes clubes e parques do país. Transformei 44 endpoints em views SQL que funcionam como contrato entre banco e interface, e construí sobre elas uma visão única da operação em Next.js.",
    clientes: ["Clube de Regatas do Flamengo", "Fluminense", "Grandes parques"],
    desafio:
      "Os dados de gestão estavam espalhados em dezenas de endpoints. Quem precisava decidir não tinha uma visão consolidada da operação.",
    solucao:
      "Mapeei 44 endpoints para views SQL que funcionam como contrato entre o banco e a interface, e construí em Next.js um painel único sobre esse contrato. Teste e produção se alternam por configuração, sem mudar uma linha de código.",
    conquistas: [
      "Usado por clientes como o Clube de Regatas do Flamengo, o Fluminense e grandes parques",
      "44 endpoints de gestão consolidados num painel único",
      "Ambiente local que espelha produção, para evoluir o painel sem depender da API",
    ],
    numeros: [
      { valor: 44, rotulo: "fontes de dados de gestão reunidas em um só painel" },
      { valor: 0, rotulo: "linhas de código para trocar entre teste e produção" },
    ],
    decisoes: [
      "Views SQL como contrato estável entre banco e front-end",
      "Endpoint único, com nomes de views configuráveis por ambiente",
      "Rota local de dados de teste para desenvolver sem depender da API",
    ],
    stack: ["Next.js", "React", "TypeScript", "SQL"],
    privado: true,
    visivel: true,
    mock: "dashboard",
  },
  {
    slug: "praxis",
    nome: "Praxís",
    tipo: "Aplicativo mobile",
    categoria: "aplicativos",
    plataforma: "Mobile",
    fase: "entregue",
    onde: "UniFOA",
    nicho: "estudantes de Medicina",
    tagline: "Estudantes de Medicina treinam o atendimento de emergência no celular e descobrem em qual competência estão fracos.",
    beneficio: "quem quer estar no bolso do cliente, com acesso rápido, notificações e uma experiência que faz ele voltar.",
    resumo:
      "Simulador de plantão de emergência para estudantes de Medicina. A nota é calculada por regra, sempre igual para o mesmo atendimento, e cada regra do produto é protegida por testes automáticos.",
    contexto:
      "Nasceu como Projeto Módulo V na UniFOA e começa pela Emergência. Todo o conteúdo clínico é escrito e revisado por médicas, com autora e revisora diferentes.",
    desafio:
      "Raciocinar diante de um paciente é o que o curso mais cobra e o que o aluno menos consegue treinar sozinho. E mesmo quem treina muito não sabe em que competência está fraco.",
    solucao:
      "Um atendimento completo no celular: perguntas com as próprias palavras, exame, exames com a demora real de um pronto-socorro e condutas que consomem o relógio. O paciente piora se nada for feito, e o diagnóstico só aparece depois que o aluno registra a hipótese.",
    conquistas: [
      "Funcionando de ponta a ponta, com o motor de lacunas rodando no próprio aparelho",
      "Regras do produto gravadas no banco e cobertas por 126 testes automáticos",
      "API em .NET validando o login e criando o perfil do aluno",
      "Interface pensada para o vidro do iOS 26",
    ],
    numeros: [
      { valor: 22, rotulo: "competências avaliadas em cada atendimento simulado" },
      { valor: 126, rotulo: "testes automáticos protegendo as regras do produto" },
      { valor: 35, sufixo: " dias", rotulo: "de reteste espaçado para o que ficou fraco" },
    ],
    decisoes: [
      "Conteúdo clínico sempre escrito por pessoas, nunca gerado por IA",
      "Nota calculada por regra: o mesmo atendimento recebe sempre a mesma nota",
      "Poucos casos revisados em vez de centenas sem revisão",
    ],
    stack: ["iOS", ".NET", "Supabase", "PostgreSQL", "Login com Google"],
    privado: false,
    visivel: true,
    mock: "praxis",
  },
  {
    slug: "montador-de-albuns",
    nome: "Montador de Álbuns",
    tipo: "Sistema de automação",
    categoria: "automacoes",
    plataforma: "Desktop",
    fase: "entregue",
    onde: "Kazz",
    nicho: "empresas de formatura",
    tagline: "Trata as fotos e monta os álbuns de formatura em Python, escolhendo a foto de cada página, um trabalho que a equipe fazia à mão por dias.",
    beneficio: "quem perde horas com tarefas repetitivas e quer que a equipe use esse tempo no que realmente gera resultado.",
    resumo:
      "Monta centenas de álbuns de formatura escolhendo a foto certa para cada página. Cada regra nova é medida contra um gabarito de 87 álbuns feitos à mão antes de entrar em produção.",
    desafio:
      "Montar centenas de álbuns à mão, escolhendo foto por foto para cada página, consumia dias de trabalho da equipe.",
    solucao:
      "Regras que escolhem a foto de cada lâmina e página na ordem narrativa certa, calibradas contra um gabarito de 87 álbuns montados à mão. Cada mudança passa por um placar de acerto, comparação página a página e folha de contato.",
    conquistas: [
      "Usado em produção na montagem de álbuns de formatura reais",
      "Calibrado contra um gabarito de 87 álbuns feitos à mão",
      "Nenhuma regra nova entra se piorar o placar",
    ],
    numeros: [{ valor: 87, rotulo: "álbuns de referência usados para validar a qualidade" }],
    stack: ["Python", "Processamento de imagens", "Pixellu SmartAlbums", "Métricas de qualidade"],
    privado: true,
    visivel: true,
    mock: "album",
  },
  {
    slug: "emissor",
    nome: "Emissor",
    tipo: "Emissão automática de notas fiscais",
    categoria: "erps",
    plataforma: "Web",
    fase: "construcao",
    nicho: "prestadores de serviço",
    tagline: "Cada pagamento confirmado gera a NFS-e no padrão nacional, já com CBS e IBS, e a nota segue para o cliente.",
    resumo:
      "Emite a NFS-e no padrão nacional a cada pagamento confirmado, já com os campos de CBS e IBS da Reforma Tributária, envia ao cliente e arquiva. A mesma venda nunca gera duas notas.",
    desafio:
      "Desde janeiro de 2026 a NFS-e segue o padrão nacional, e os campos de CBS e IBS passam a ser exigidos nas notas ao longo do ano. Quem ainda emite à mão no portal esquece nota, duplica nota e para de faturar quando o ambiente oscila.",
    solucao:
      "O pagamento confirmado grava um evento na mesma transação do pedido (outbox). Um worker publica na fila, emite a nota no ambiente nacional e guarda o resultado. Se o ambiente cair, a mensagem volta com espera crescente. Se a nota for rejeitada, o motivo aparece no painel para correção e reenvio.",
    conquistas: [
      "Outbox pattern: nenhum pagamento confirmado fica sem nota, mesmo se a fila cair",
      "Chave de idempotência por venda: reprocessar nunca gera nota em dobro",
      "Retry com backoff exponencial e fila de mensagens mortas para o que precisa de uma pessoa",
      "Versão do layout da nota como configuração, para acompanhar as Notas Técnicas sem novo deploy",
    ],
    decisoes: [
      "Consistência eventual entre pagamento e nota, com o outbox garantindo a entrega",
      "Painel de notas emitidas, pendentes e rejeitadas, com reenvio em um clique",
      "Logs e rastreamento por venda, para responder ao contador em minutos",
    ],
    stack: ["C#", "ASP.NET Core", "RabbitMQ", "PostgreSQL", "Docker", "Azure"],
    privado: false,
    visivel: true,
  },
  {
    slug: "fechamento",
    nome: "Fechamento",
    tipo: "Portal contábil",
    categoria: "erps",
    plataforma: "Web",
    fase: "construcao",
    nicho: "escritórios de contabilidade",
    tagline: "Coleta as notas e os extratos de cada cliente do escritório, cobra o que falta e entrega o mês conciliado ao contador.",
    resumo:
      "Portal para escritórios de contabilidade: coleta notas, extratos e comprovantes de cada cliente, concilia com o banco e cobra sozinho o que falta.",
    desafio:
      "Todo mês o escritório cobra cliente por cliente as notas, os extratos e os comprovantes, e recebe tudo atrasado e misturado pelo WhatsApp. O fechamento atrasa, e a equipe gasta o tempo correndo atrás de papel.",
    solucao:
      "Cada cliente do escritório tem um portal que reúne as notas emitidas e recebidas e os extratos, mostra o que falta e cobra automaticamente. O contador abre o mês e encontra tudo conciliado, separado por cliente.",
    conquistas: [
      "Leitura automática dos XMLs de NF-e e NFS-e",
      "Extração com IA de PDFs e comprovantes sem XML, sempre conferida por regras antes de entrar",
      "Conciliação com o extrato via agregador de Open Finance ou arquivo OFX",
      "Cada escritório isolado por tenant, com trilha de auditoria para a LGPD",
    ],
    stack: ["C#", "ASP.NET Core", "Entity Framework Core", "RabbitMQ", "PostgreSQL", "Azure"],
    privado: false,
    visivel: true,
  },
  {
    slug: "recepcao",
    nome: "Recepção",
    tipo: "Agente de IA para WhatsApp",
    categoria: "automacoes",
    plataforma: "WhatsApp",
    fase: "construcao",
    nicho: "clínicas, estúdios e salões",
    tagline: "Atende pelo WhatsApp, marca o horário na agenda, cobra o sinal por Pix e lembra o cliente na véspera.",
    resumo:
      "Para clínicas, estúdios e salões: responde no WhatsApp, marca o horário na agenda real, cobra o sinal por Pix e lembra o cliente na véspera.",
    desafio:
      "Em negócio de agenda, o WhatsApp toma o dia de quem atende, a resposta demora e o cliente marca com o concorrente. E cada falta é um horário perdido que ninguém paga.",
    solucao:
      "Um agente de IA conversa pelo WhatsApp Business, mas só age por ferramentas com regras no back-end: consultar horários livres, reservar, gerar o Pix e confirmar. Sinal pago confirma o horário. Sem pagamento, a reserva expira e o horário volta para a agenda.",
    conquistas: [
      "IA com ferramentas limitadas: o modelo conversa, quem reserva e cobra é a API, com validação",
      "Reserva com expiração e controle de concorrência: dois clientes nunca ficam com o mesmo horário",
      "Confirmação do Pix por webhook, com idempotência",
      "Lembretes dentro da janela de 24 horas do WhatsApp, quando a mensagem não é cobrada",
    ],
    stack: ["C#", "ASP.NET Core", "PostgreSQL", "WhatsApp Business API", "Pix", "IA com tool calling", "Next.js"],
    privado: false,
    visivel: true,
  },
  {
    slug: "ficha-tecnica",
    nome: "Ficha Técnica",
    tipo: "Sistema de gestão de custos",
    categoria: "erps",
    plataforma: "Web",
    fase: "construcao",
    nicho: "restaurantes",
    tagline: "Lê as notas dos fornecedores e recalcula o custo e a margem de cada prato do cardápio.",
    resumo:
      "Para restaurantes: a nota do fornecedor chega, o custo dos insumos e de cada prato é recalculado, e o dono vê a margem cair antes de perder dinheiro.",
    desafio:
      "O preço dos insumos muda toda semana, mas o custo de cada prato é calculado uma vez em planilha e esquecido. A margem some sem ninguém perceber.",
    solucao:
      "Lê os XMLs das notas dos fornecedores, atualiza o custo de cada insumo e recalcula em cascata o custo e a margem de cada prato do cardápio.",
    conquistas: [
      "Importação de notas fiscais por XML, ligando produtos do fornecedor aos insumos",
      "Recálculo em cascata de receitas e sub-receitas",
      "Alerta quando um prato cai abaixo da margem mínima",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    privado: false,
    // Guardado: saiu da vitrine para dar lugar à Recepção.
    visivel: false,
  },
];

export const visibleProjects = projects.filter((p) => p.visivel);
export const entregues = visibleProjects.filter((p) => p.fase === "entregue");
export const emConstrucao = visibleProjects.filter((p) => p.fase === "construcao");

export function projetosDaCategoria(categoria: CategoriaSlug) {
  return visibleProjects.filter((p) => p.categoria === categoria);
}

export function getProject(slug: string) {
  return visibleProjects.find((p) => p.slug === slug);
}
