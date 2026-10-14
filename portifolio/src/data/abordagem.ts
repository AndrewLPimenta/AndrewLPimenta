export const processo = [
  { titulo: "Entender", texto: "Converso com quem usa e transformo a rotina em casos de uso e histórias com critérios de aceite." },
  { titulo: "Modelar", texto: "Desenho dados, estados e telas juntos, para que o estado inválido não caiba no modelo nem apareça na interface." },
  { titulo: "Proteger", texto: "Coloco as regras onde é mais difícil burlar: banco, API e testes, além da tela." },
  { titulo: "Entregar", texto: "Coloco em produção cedo, com pipeline, contêiner e um caminho seguro para voltar atrás." },
  { titulo: "Medir", texto: "Só chamo de pronto o que melhorou um número real para quem usa." },
];

/**
 * Exemplo ilustrativo de backlog (não é de um cliente real):
 * o agendamento online de uma clínica, do caso de uso às features priorizadas.
 */
export const casoDeUso = {
  titulo: "Agendar um horário",
  ator: "Cliente da clínica",
  passos: [
    "Escolhe o serviço e o profissional.",
    "Vê só os horários realmente livres na agenda.",
    "Confirma e paga o sinal por Pix.",
    "Recebe a confirmação na hora e um lembrete na véspera pelo WhatsApp.",
  ],
  alternativo: "Se o Pix não for pago em 15 minutos, a reserva expira e o horário volta para a agenda.",
};

export const historia = {
  texto: "Como recepcionista, quero que o cliente agende sozinho pelo celular, para parar de marcar horário um a um no WhatsApp.",
  criterios: [
    "Dois clientes nunca conseguem reservar o mesmo horário.",
    "A reserva só é confirmada depois que o Pix é compensado.",
    "O cliente remarca sozinho até 24 horas antes do horário.",
  ],
};

export type Nivel = "Alto" | "Médio" | "Baixo";

export const features: {
  itens: { prioridade: "P1" | "P2" | "P3"; titulo: string; porque: string; valor: Nivel; esforco: Nivel }[];
  foraPorEnquanto: string;
} = {
  itens: [
    { prioridade: "P1", titulo: "Agenda com reserva", porque: "Sem ela não existe produto.", valor: "Alto", esforco: "Médio" },
    { prioridade: "P1", titulo: "Sinal por Pix", porque: "Reduz faltas desde o primeiro dia.", valor: "Alto", esforco: "Médio" },
    { prioridade: "P2", titulo: "Lembrete no WhatsApp", porque: "Muito valor com pouco esforço.", valor: "Alto", esforco: "Baixo" },
    { prioridade: "P3", titulo: "Remarcação pelo cliente", porque: "Alivia a recepção, mas pode esperar.", valor: "Médio", esforco: "Médio" },
  ],
  foraPorEnquanto: "Programa de fidelidade e app nativo. Entram quando os dados de uso mostrarem que valem o esforço.",
};

export const fluxoIA = [
  { titulo: "Especificação", texto: "Eu escrevo as regras, as histórias e os critérios de aceite" },
  { titulo: "Contexto", texto: "RAG entrega aos agentes o código e a documentação do projeto" },
  { titulo: "Execução em paralelo", texto: "Agentes modelam, implementam e documentam ao mesmo tempo" },
  { titulo: "Verificação", texto: "Agentes de revisão e de QA rodam os testes e apontam riscos" },
  { titulo: "Aprovação", texto: "Eu reviso e decido o que vai para produção", humano: true },
];

/** Como a IA entra no trabalho: ferramentas e práticas. */
export const ferramentasIA = [
  {
    titulo: "Agentes com funções definidas",
    texto:
      "Arquiteto de dados, revisor de código e auditor de QA trabalham em paralelo, cada um com instruções escritas para o projeto.",
  },
  {
    titulo: "RAG sobre o código e a documentação",
    texto:
      "Antes de propor uma mudança, os agentes consultam o código, as regras de negócio e a documentação do próprio projeto.",
  },
  {
    titulo: "MCP para conectar as ferramentas",
    texto:
      "Banco de dados, repositório, navegador e documentação ficam acessíveis aos agentes por servidores MCP, com permissões controladas.",
  },
  {
    titulo: "Skills com as regras do time",
    texto:
      "Procedimentos que se repetem viram skills reutilizáveis, como diagnosticar antes de corrigir e medir antes de concluir.",
  },
];

/** Onde a IA fica de fora, de propósito. */
export const iaLimite =
  "No simulador clínico, a decisão foi manter a IA fora do conteúdo: cada caso é escrito por uma médica e revisado por outra.";

export const principios = [
  {
    titulo: "Produto antes do código.",
    texto:
      "Bug caro nasce de regra mal entendida, não de código mal escrito. Antes de modelar, defino com quem usa o que nunca pode acontecer e o que pode esperar.",
  },
  {
    titulo: "A regra mora onde é difícil burlar.",
    texto:
      "Validação só na tela é sugestão. O que importa vira restrição no banco e verificação na API, e os testes tentam quebrar de propósito.",
  },
  {
    titulo: "Dados que não mentem.",
    texto:
      "Escolho representações que tornam o erro impossível. A mesma entrada gera sempre a mesma saída, e o resultado pode ser reproduzido.",
  },
  {
    titulo: "Contratos claros.",
    texto:
      "Cada camada sabe só o que precisa. Um contrato estável entre banco, API e interface vale mais do que uma integração esperta.",
  },
  {
    titulo: "A complexidade certa.",
    texto:
      "Começo pelo mais simples que aguenta o problema. Filas, microsserviços e cache entram quando volume, desacoplamento ou resiliência pedem.",
  },
  {
    titulo: "Pensar no que dá errado.",
    texto:
      "Integração falha, mensagem chega duas vezes, serviço cai no meio. Idempotência, reprocessamento e logs que contam a história entram desde o início.",
  },
  {
    titulo: "Medir antes de dizer que está pronto.",
    texto:
      "Defino como medir antes de mudar. Mudança que piora o número volta atrás, por melhor que pareça no código.",
  },
  {
    titulo: "Saber o que não construir.",
    texto: "Menos funcionalidades, feitas direito, valem mais do que muitas feitas pela metade.",
  },
  {
    titulo: "A interface também é regra.",
    texto:
      "O que a tela mostra, esconde e em que ordem também protege o produto, e decide se a pessoa usa o sistema todo dia ou volta para a planilha.",
  },
];
