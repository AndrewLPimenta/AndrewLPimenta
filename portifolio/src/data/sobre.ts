export const pessoas = [
  {
    titulo: "Com gestores",
    texto:
      "Na Multiclubes, traduzo a pergunta de quem decide num painel que responde, e explico decisões técnicas sem jargão.",
  },
  {
    titulo: "Com especialistas",
    texto: "Num simulador clínico, trabalho com médicas para transformar protocolo clínico em regra que o sistema consegue verificar.",
  },
  {
    titulo: "Com quem opera",
    texto:
      "Na automação de álbuns, ouço a equipe que monta e meço o que ela considera certo, em vez de impor o que eu acho.",
  },
  {
    titulo: "Com clientes",
    texto: "Já apresentei e implantei produtos SaaS, do primeiro contato ao sistema funcionando no dia a dia do cliente.",
  },
];

export const softSkills = [
  {
    titulo: "Comunicação clara",
    texto: "Escrevo e falo para quem vai ler: tecnicamente com o time, em linguagem de negócio com quem decide.",
  },
  { titulo: "Dono do problema", texto: "Acompanho o que entreguei depois do deploy. Se quebrou, é meu até estar resolvido." },
  { titulo: "Prioridade e foco", texto: "Sei dizer não, ou ainda não, para entregar primeiro o que tem mais valor." },
  {
    titulo: "Feedback nos dois sentidos",
    texto: "Peço revisão cedo, recebo crítica sem levar para o pessoal e dou retorno com respeito e exemplo concreto.",
  },
  {
    titulo: "Aprendizado rápido",
    texto: "Entro em domínios novos, como saúde, fiscal ou gestão de clubes, e aprendo o vocabulário de quem trabalha neles.",
  },
  {
    titulo: "Visão de negócio",
    texto: "Antes da solução técnica, pergunto quanto aquela dor custa, para quem e quantas vezes por mês.",
  },
];

export type Skill = { nome: string };

export const hardSkills: { grupo: string; itens: Skill[] }[] = [
  {
    grupo: "Back-end",
    itens: [
      { nome: "C#" },
      { nome: ".NET" },
      { nome: "ASP.NET Core" },
      { nome: "Entity Framework Core" },
      { nome: "LINQ" },
      { nome: "Node.js" },
      { nome: "TypeScript" },
    ],
  },
  {
    grupo: "Front-end",
    itens: [
      { nome: "React" },
      { nome: "Next.js" },
      { nome: "Tailwind CSS" },
      { nome: "shadcn/ui" },
      { nome: "Acessibilidade" },
    ],
  },
  { grupo: "Mobile", itens: [{ nome: "Apps iOS" }, { nome: "TestFlight" }, { nome: "Login com Google e Apple" }] },
  {
    grupo: "Dados",
    itens: [
      { nome: "SQL Server" },
      { nome: "PostgreSQL" },
      { nome: "Modelagem de dados" },
      { nome: "Índices e otimização de consultas" },
      { nome: "Supabase" },
    ],
  },
  {
    grupo: "Integrações e mensageria",
    itens: [
      { nome: "APIs REST" },
      { nome: "RabbitMQ" },
      { nome: "Arquitetura orientada a eventos" },
      { nome: "Open Finance" },
      { nome: "Autenticação com JWT" },
    ],
  },
  {
    grupo: "Infra e entrega",
    itens: [
      { nome: "Docker" },
      { nome: "Azure" },
      { nome: "Azure DevOps" },
      { nome: "CI/CD" },
      { nome: "Microsserviços" },
    ],
  },
  {
    grupo: "Qualidade",
    itens: [
      { nome: "Testes automatizados" },
      { nome: "Testes de regra de negócio no banco" },
      { nome: "Code review" },
      { nome: "SonarQube" },
    ],
  },
  {
    grupo: "Processo",
    itens: [
      { nome: "Casos de uso" },
      { nome: "Histórias de usuário" },
      { nome: "Critérios de aceite" },
      { nome: "Scrum" },
      { nome: "Orquestração de agentes de IA" },
    ],
  },
];

/**
 * Trajetória: o amadurecimento técnico, do primeiro site ao trabalho de hoje.
 * `stack` mostra o que entrou em cada fase; `frentes` aparece só no momento atual.
 */
export const trajetoria: {
  marco: string;
  titulo: string;
  texto: string;
  stack?: string[];
  frentes?: { onde: string; texto: string }[];
  atual?: boolean;
}[] = [
  {
    marco: "2021",
    titulo: "Sites simples",
    texto:
      "Primeiras páginas para negócios locais e conhecidos, que eu fazia do início ao fim. Aprendi a publicar, a cumprir prazo e, principalmente, a ouvir o que o cliente precisava.",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    marco: "Sites completos",
    titulo: "Sites e landing pages mais complexos",
    texto:
      "Participei de sites institucionais e landing pages com painel para editar conteúdo, SEO, formulários, métricas e integração com WhatsApp, já com componentes reutilizáveis.",
    stack: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    marco: "Primeiros sistemas",
    titulo: "Sistemas com CRUD",
    texto:
      "Participei dos primeiros sistemas com cadastros, login e banco de dados. Comecei a modelar tabelas, criar APIs REST e validar os dados no servidor, além da tela.",
    stack: ["Node.js", "C#", "SQL", "APIs REST"],
  },
  {
    marco: "Sistemas robustos",
    titulo: "Regras de negócio, testes e produtos SaaS",
    texto:
      "Regras no domínio, perfis de acesso, testes automatizados e deploy em contêiner. Participei de produtos SaaS com planos, cobrança e dados isolados por cliente e, na Kazz, do sistema de controle dos álbuns de formatura e da automação de montagem.",
    stack: [".NET", "Entity Framework Core", "PostgreSQL", "Docker", "Testes"],
  },
  {
    marco: "Arquitetura",
    titulo: "Sistemas orientados a eventos",
    texto:
      "Participo de sistemas com filas, outbox, idempotência e novas tentativas, que continuam funcionando quando uma parte falha, como a emissão automática de notas fiscais a cada pagamento.",
    stack: ["RabbitMQ", "Mensageria", "Observabilidade", "Azure"],
  },
  {
    marco: "Hoje",
    titulo: "Engenheiro de software",
    texto: "Atuo em três frentes, com o mesmo cuidado em todas.",
    frentes: [
      {
        onde: "Multiclubes",
        texto: "Faço parte do time que desenvolve e mantém soluções para diferentes áreas de um produto de gestão de clubes e parques, com C#/.NET, Next.js e SQL Server.",
      },
      {
        onde: "Projetos para clientes",
        texto: "Sistemas, sites, dashboards e automações sob medida para empresas que me contratam diretamente.",
      },
      {
        onde: "Projetos pessoais",
        texto: "Onde testo arquitetura e produto, como o simulador clínico Praxís e os produtos fiscais em construção.",
      },
    ],
    atual: true,
  },
];
