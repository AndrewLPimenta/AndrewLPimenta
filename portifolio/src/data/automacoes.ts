/** Automações para negócios: vendas, leads, funis e WhatsApp. */

export const funil = [
  { titulo: "Lead qualificado encontrado", texto: "Empresas com o perfil certo, já filtradas e com contato." },
  { titulo: "Primeira mensagem no WhatsApp", texto: "Abordagem personalizada, enviada na hora certa." },
  { titulo: "Follow-up automático", texto: "Quem não respondeu recebe um lembrete no prazo definido." },
  { titulo: "Proposta enviada", texto: "Orçamento gerado e acompanhado até a resposta." },
  { titulo: "Venda fechada", texto: "Cliente no sistema, cobrança agendada e pós-venda começando." },
] as const;

export const automacoes = [
  {
    icone: "leads",
    titulo: "Busca de leads qualificados",
    texto:
      "Listas de empresas com o perfil do seu cliente ideal, como boas avaliações no Google e pouca presença digital, prontas para contato.",
  },
  {
    icone: "whatsapp",
    titulo: "Atendimento no WhatsApp",
    texto: "Respostas automáticas, triagem, envio de cardápio e catálogo, e atendimento fora do horário comercial.",
  },
  {
    icone: "funil",
    titulo: "Funis de vendas",
    texto: "Do primeiro contato ao fechamento, com sequências de mensagens e follow-ups que não deixam lead esfriar.",
  },
  {
    icone: "cobranca",
    titulo: "Pedidos e cobrança",
    texto: "Confirmação de pedido, lembrete de pagamento e cobrança automática no dia do vencimento.",
  },
  {
    icone: "agenda",
    titulo: "Agendamentos",
    texto: "Marcação, confirmação e lembrete de horários direto pelo WhatsApp, com menos faltas na agenda.",
  },
  {
    icone: "integracao",
    titulo: "Integrações",
    texto: "WhatsApp, planilhas, CRM, e-mail e sistemas trocando dados automaticamente.",
  },
  {
    icone: "google",
    titulo: "Presença no Google",
    texto: "Perfil da empresa, site e SEO local para ser encontrado por quem já está procurando o seu serviço.",
  },
  {
    icone: "relatorio",
    titulo: "Painel de vendas",
    texto: "Leads, conversas, propostas e vendas numa tela só, para saber o que está funcionando.",
  },
] as const;

export type IconeAutomacao = (typeof automacoes)[number]["icone"];
