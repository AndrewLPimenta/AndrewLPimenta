/**
 * Stack exibida na página inicial.
 * Ícones em public/stack (Devicon, licença MIT).
 * `inverter: true` para logos pretos, que precisam clarear no tema escuro.
 */
export type Tech = { nome: string; icone: string; inverter?: boolean };

export const stackGrupos: { grupo: string; descricao: string; itens: Tech[] }[] = [
  {
    grupo: "Back-end",
    descricao: "APIs, regras de negócio e integrações",
    itens: [
      { nome: "C#", icone: "csharp" },
      { nome: ".NET", icone: "dotnet" },
      { nome: "ASP.NET Core", icone: "aspnet" },
      { nome: "Node.js", icone: "nodejs" },
      { nome: "Swagger / OpenAPI", icone: "swagger" },
    ],
  },
  {
    grupo: "Front-end",
    descricao: "Interfaces rápidas, acessíveis e tipadas",
    itens: [
      { nome: "TypeScript", icone: "typescript" },
      { nome: "React", icone: "react" },
      { nome: "Next.js", icone: "nextjs", inverter: true },
      { nome: "Tailwind CSS", icone: "tailwind" },
    ],
  },
  {
    grupo: "Dados",
    descricao: "Modelagem, consultas e regras no banco",
    itens: [
      { nome: "SQL Server", icone: "sqlserver" },
      { nome: "Entity Framework Core", icone: "efcore" },
      { nome: "Prisma", icone: "prisma", inverter: true },
    ],
  },
  {
    grupo: "Infra e entrega",
    descricao: "Mensageria, contêineres, nuvem e CI/CD",
    itens: [
      { nome: "Docker", icone: "docker" },
      { nome: "RabbitMQ", icone: "rabbitmq" },
      { nome: "Azure", icone: "azure" },
      { nome: "Azure DevOps", icone: "azuredevops" },
      { nome: "Git", icone: "git" },
      { nome: "GitHub", icone: "github", inverter: true },
    ],
  },
];
