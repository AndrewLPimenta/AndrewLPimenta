/**
 * Serviços da página inicial, cada um numa aba da mesma seção.
 * - `motivos`: por que contratar ou desenvolver aquele serviço.
 * - `fluxo`: o caminho do cliente, desenhado como um funil com um pulso de luz.
 * - `itens`: o que entra no serviço.
 */

export type IconeServico =
  | "leads"
  | "whatsapp"
  | "funil"
  | "cobranca"
  | "agenda"
  | "integracao"
  | "google"
  | "relatorio"
  | "texto"
  | "velocidade"
  | "metricas"
  | "painel"
  | "celular"
  | "dominio"
  | "estoque"
  | "financeiro"
  | "nota"
  | "seguranca"
  | "api"
  | "notificacao"
  | "loja"
  | "dados"
  | "atualizacao";

export type Servico = {
  slug: string;
  aba: string;
  titulo: string;
  lead: string;
  motivos: string[];
  cta: string;
  fluxoRotulo: string;
  fluxo: { titulo: string; texto: string }[];
  itens: { icone: IconeServico; titulo: string; texto: string }[];
};

export const servicos: Servico[] = [
  {
    slug: "automacoes",
    aba: "Automações",
    titulo: "Automação de vendas e atendimento para pequenas e médias empresas.",
    lead: "Sua equipe recebe o lead já qualificado, com o primeiro contato feito no WhatsApp e o follow-up agendado. A cobrança e os lembretes saem na data certa.",
    motivos: [
      "A equipe deixa de repetir tarefas e passa o tempo vendendo e atendendo.",
      "Nenhum contato fica sem resposta, mesmo fora do horário comercial.",
      "Cobranças e lembretes saem sozinhos, na data certa.",
    ],
    cta: "Conversar sobre automação",
    fluxoRotulo: "Exemplo de funil de vendas automatizado",
    fluxo: [
      { titulo: "Lead qualificado encontrado", texto: "Empresas com o perfil certo, já filtradas e com contato." },
      { titulo: "Primeira mensagem no WhatsApp", texto: "Abordagem personalizada, enviada na hora certa." },
      { titulo: "Follow-up automático", texto: "Quem não respondeu recebe um lembrete no prazo definido." },
      { titulo: "Proposta enviada", texto: "Orçamento gerado e acompanhado até a resposta." },
      { titulo: "Venda fechada", texto: "Cliente no sistema, cobrança agendada e pós-venda começando." },
    ],
    itens: [
      {
        icone: "leads",
        titulo: "Busca de leads qualificados",
        texto: "Listas de empresas com o perfil do seu cliente ideal, como boas avaliações no Google e pouca presença digital, prontas para contato.",
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
      { icone: "integracao", titulo: "Integrações", texto: "WhatsApp, planilhas, CRM, e-mail e sistemas trocando dados automaticamente." },
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
    ],
  },
  {
    slug: "landing-pages",
    aba: "Landing pages",
    titulo: "Landing pages que transformam visitas em contatos e vendas.",
    lead: "Uma página com um único objetivo: levar quem chegou pelo anúncio, pelo Google ou pelas redes sociais até o WhatsApp, o formulário ou o checkout.",
    motivos: [
      "O dinheiro investido em anúncios rende mais quando o clique cai numa página feita para converter.",
      "Carregamento rápido, que segura quem chega pelo celular.",
      "Cada clique medido, para você saber qual campanha traz cliente.",
    ],
    cta: "Conversar sobre uma landing page",
    fluxoRotulo: "Caminho do visitante numa landing page",
    fluxo: [
      { titulo: "O visitante chega", texto: "Pelo anúncio, pela busca no Google ou pelas redes sociais." },
      { titulo: "Entende a oferta em segundos", texto: "Título claro, benefícios e o que ele ganha ao contratar." },
      { titulo: "Tira as dúvidas", texto: "Perguntas frequentes, depoimentos e garantias na mesma página." },
      { titulo: "Clica no botão", texto: "WhatsApp, formulário ou checkout, sem distração no caminho." },
      { titulo: "Vira contato", texto: "Lead registrado e avisado na hora para a sua equipe." },
    ],
    itens: [
      { icone: "texto", titulo: "Texto que converte", texto: "Copy escrita a partir da dor do seu cliente, conduzindo até a ação." },
      { icone: "velocidade", titulo: "Performance", texto: "Páginas leves, com nota alta no PageSpeed e boa experiência no celular." },
      { icone: "metricas", titulo: "Métricas e pixels", texto: "Google Analytics, Meta Pixel e eventos de conversão configurados." },
      { icone: "whatsapp", titulo: "WhatsApp e CRM", texto: "Cada contato vai direto para o WhatsApp da equipe ou para o seu CRM." },
    ],
  },
  {
    slug: "sites",
    aba: "Sites",
    titulo: "Sites institucionais que passam confiança e aparecem no Google.",
    lead: "O site é onde o cliente confirma se a sua empresa é séria. Ele precisa ser encontrado, carregar rápido e deixar claro como falar com você.",
    motivos: [
      "Quem pesquisa o nome da sua empresa encontra um site profissional, além das redes sociais.",
      "SEO local para aparecer quando alguém procura o seu serviço na sua cidade.",
      "Painel simples para a sua equipe atualizar textos, fotos e novidades.",
    ],
    cta: "Conversar sobre um site",
    fluxoRotulo: "Caminho do cliente até o contato pelo site",
    fluxo: [
      { titulo: "Pesquisa no Google", texto: "O cliente procura o serviço ou o nome da sua empresa." },
      { titulo: "Encontra o seu site", texto: "Bem posicionado na busca e no Google Maps." },
      { titulo: "Conhece a empresa", texto: "Serviços, equipe e trabalhos apresentados com clareza." },
      { titulo: "Confia", texto: "Depoimentos, endereço e dados de contato à vista." },
      { titulo: "Entra em contato", texto: "Pelo WhatsApp, por telefone ou pelo formulário." },
    ],
    itens: [
      { icone: "google", titulo: "SEO técnico e local", texto: "Estrutura, velocidade e Perfil da Empresa no Google para ser encontrado." },
      { icone: "painel", titulo: "Painel de conteúdo", texto: "Sua equipe edita páginas, fotos e notícias sem depender de programador." },
      { icone: "celular", titulo: "Design responsivo", texto: "Leitura confortável no celular, no tablet e no computador." },
      { icone: "dominio", titulo: "Domínio e publicação", texto: "Hospedagem, domínio, e-mail profissional e certificado de segurança." },
    ],
  },
  {
    slug: "sistemas",
    aba: "Sistemas e ERPs",
    titulo: "Sistemas web e ERPs sob medida para organizar a operação.",
    lead: "Quando a empresa cresce, planilhas e ferramentas soltas geram retrabalho e erro. Um sistema próprio reúne vendas, estoque, financeiro e fiscal com as regras do seu negócio.",
    motivos: [
      "A informação fica num só lugar, sem copiar dados entre planilhas.",
      "As regras do negócio são aplicadas pelo sistema, com menos erro manual.",
      "Acesso por perfil e histórico de quem alterou cada registro.",
    ],
    cta: "Conversar sobre um sistema",
    fluxoRotulo: "Exemplo de fluxo de uma venda dentro de um ERP",
    fluxo: [
      { titulo: "Venda registrada", texto: "No balcão, no site ou pela equipe comercial." },
      { titulo: "Estoque atualizado", texto: "Baixa automática e alerta quando um item está acabando." },
      { titulo: "Nota fiscal emitida", texto: "NF-e ou NFS-e gerada e enviada ao cliente." },
      { titulo: "Financeiro conciliado", texto: "Recebimento conferido com o extrato do banco." },
      { titulo: "Relatório pronto", texto: "Vendas, margem e caixa atualizados para o fechamento." },
    ],
    itens: [
      { icone: "estoque", titulo: "Vendas e estoque", texto: "Pedidos, produtos e movimentações com baixa automática." },
      { icone: "financeiro", titulo: "Financeiro", texto: "Contas a pagar e a receber, fluxo de caixa e conciliação bancária." },
      { icone: "nota", titulo: "Notas fiscais", texto: "Emissão de NF-e e NFS-e no padrão nacional, integrada às vendas." },
      { icone: "seguranca", titulo: "Permissões e auditoria", texto: "Cada pessoa vê o que precisa, e toda alteração fica registrada." },
      { icone: "integracao", titulo: "Integrações", texto: "Bancos, marketplaces, meios de pagamento e outros sistemas via API." },
      { icone: "relatorio", titulo: "Relatórios", texto: "Indicadores de vendas, estoque e financeiro prontos para exportar." },
    ],
  },
  {
    slug: "aplicativos",
    aba: "Aplicativos",
    titulo: "Aplicativos para iOS e Android que o seu cliente usa todos os dias.",
    lead: "Um aplicativo coloca a sua empresa no celular do cliente, com acesso rápido, notificações e uma experiência pensada para a tela pequena.",
    motivos: [
      "Notificações trazem o cliente de volta sem depender de anúncio.",
      "Login, pagamentos e dados conectados à mesma API do seu sistema web.",
      "Publicação na App Store e no Google Play acompanhada do início ao fim.",
    ],
    cta: "Conversar sobre um aplicativo",
    fluxoRotulo: "Jornada do cliente num aplicativo",
    fluxo: [
      { titulo: "Download", texto: "Direto da App Store ou do Google Play." },
      { titulo: "Cadastro em segundos", texto: "Login com Google ou Apple, sem formulário longo." },
      { titulo: "Uso no dia a dia", texto: "Pedidos, agendamentos ou conteúdo a um toque." },
      { titulo: "Notificação na hora certa", texto: "Lembretes e novidades que trazem o cliente de volta." },
      { titulo: "Cliente fiel", texto: "Mais recompra e um canal direto com a sua empresa." },
    ],
    itens: [
      { icone: "celular", titulo: "iOS e Android", texto: "Interfaces que seguem o padrão de cada plataforma." },
      { icone: "api", titulo: "API própria", texto: "Back-end em .NET com regras, login e dados protegidos." },
      { icone: "notificacao", titulo: "Notificações push", texto: "Avisos segmentados para cada perfil de cliente." },
      { icone: "loja", titulo: "Publicação nas lojas", texto: "Preparação, envio e acompanhamento da revisão da Apple e do Google." },
    ],
  },
  {
    slug: "dashboards",
    aba: "Dashboards",
    titulo: "Dashboards que mostram a saúde do negócio em uma tela.",
    lead: "Os dados já existem no seu sistema, nas planilhas e nas ferramentas que você usa. O dashboard reúne tudo e mostra o que importa para cada decisão.",
    motivos: [
      "Indicadores sempre atualizados, sem montar relatório à mão.",
      "Cada área acompanha os números que importam para ela.",
      "Problemas aparecem cedo, enquanto ainda dá tempo de agir.",
    ],
    cta: "Conversar sobre um dashboard",
    fluxoRotulo: "Como os dados chegam até a decisão",
    fluxo: [
      { titulo: "Dados reunidos", texto: "Do sistema, das planilhas e de outras ferramentas via API." },
      { titulo: "Dados organizados", texto: "Tratados e validados num só lugar." },
      { titulo: "Indicadores calculados", texto: "As métricas que a sua gestão realmente acompanha." },
      { titulo: "Painel por área", texto: "Diretoria, vendas e financeiro com a própria visão." },
      { titulo: "Decisão tomada", texto: "Com os números na mão, no momento certo." },
    ],
    itens: [
      { icone: "dados", titulo: "Integração de fontes", texto: "Banco de dados, planilhas e APIs reunidos num só painel." },
      { icone: "metricas", titulo: "Indicadores sob medida", texto: "Métricas definidas junto com quem vai usar o painel." },
      { icone: "atualizacao", titulo: "Atualização automática", texto: "Os números se atualizam sozinhos, sem exportar planilha." },
      { icone: "seguranca", titulo: "Acesso por perfil", texto: "Cada pessoa vê só os dados da sua área." },
    ],
  },
];
