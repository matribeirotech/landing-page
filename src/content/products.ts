import {
  Bot,
  CalendarCheck2,
  Smartphone,
  BellRing,
  Palette,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

export type SolutionMockup =
  | "whatsapp-bot"
  | "dashboard-crm"
  | "pwa-mobile"
  | "push-calendar"
  | "catalog-custom"
  | "security-guard"

export type SolutionTone = "brand" | "growth"

export interface Product {
  slug: string
  name: string
  /** Linha de impacto curta exibida abaixo do nome. */
  tagline: string
  description: string
  category: string
  icon: LucideIcon
  tone: SolutionTone
  mockup: SolutionMockup
  highlights: string[]
  benefit: string
}

export const products: Product[] = [
  {
    slug: "robo-whatsapp",
    name: "Robô Atendente WhatsApp 24/7",
    tagline: "Enquanto você atende uma cliente, o robô agenda as próximas cinco.",
    description:
      "Conecta seu WhatsApp com QR Code criptografado e assume o atendimento de ponta a ponta. Atende dia e noite, consulta horários livres em tempo real e nunca deixa uma cliente sem resposta.",
    category: "Automação WhatsApp",
    icon: Bot,
    tone: "brand",
    mockup: "whatsapp-bot",
    benefit:
      "Nunca mais perca uma cliente por demorar a responder no WhatsApp. Seu espaço aberto para marcações mesmo aos domingos e de madrugada.",
    highlights: [
      "Menu interativo inteligente por letras e números (URA rápida em menos de 1 minuto)",
      "Verificação de disponibilidade em tempo real sem conflito de horários (zero double booking)",
      "Filtro inteligente de contatos pessoais: não incomoda amigos e familiares",
      "Higienização automática de números telefônicos gravados diretamente no CRM",
    ],
  },
  {
    slug: "painel-crm",
    name: "Painel de Gestão & CRM de Agendamentos",
    tagline: "Diga adeus ao caderno. Tenha a visão do seu dia e faturamento na palma da mão.",
    description:
      "Central de comando visual com visualizações flexíveis (Cartões, Lista Cronológica ou Tabela Compacta), controle de faturamento em tempo real e disparo de WhatsApp com 1 clique.",
    category: "Gestão & CRM",
    icon: CalendarCheck2,
    tone: "growth",
    mockup: "dashboard-crm",
    benefit:
      "Diga adeus às anotações perdidas no caderno ou mensagens soltas no chat. Tenha a visão exata do seu faturamento e do seu dia.",
    highlights: [
      "Visualização 3-em-1 (Cartões, Lista Cronológica e Tabela Compacta) salva no navegador",
      "Disparo de WhatsApp com 1 clique (wa.me) sem precisar salvar o número na agenda",
      "Indicadores de faturamento acumulado, taxa de confirmação e horários livres",
      "Histórico completo da cliente com serviços realizados e frequência de visitas",
    ],
  },
  {
    slug: "app-pwa",
    name: "Aplicativo Móvel Instalável (PWA Nativo)",
    tagline: "Sem lojas de aplicativos ou downloads pesados. Instale com 1 toque.",
    description:
      "Transforme o Lypsyos em um aplicativo nativo no seu iPhone ou Android. Funciona em tela cheia (standalone), sem barras de navegador, com carregamento ultrarrápido e cache offline.",
    category: "Aplicativo Mobile",
    icon: Smartphone,
    tone: "brand",
    mockup: "pwa-mobile",
    benefit:
      "Seu sistema onde você estiver. Instale o Lypsyos no seu iPhone ou Android e gerencie seu salão de qualquer lugar.",
    highlights: [
      "Instalação direta com 1 clique na tela inicial (Add to Home Screen no iOS e Android)",
      "Experiência nativa de tela cheia sem barra de navegação (display: standalone)",
      "Carregamento em milissegundos via Service Worker e economia máxima de dados 4G/5G",
      "Atalhos diretos no ícone do celular para Ver Agenda, Robô e Perfil",
    ],
  },
  {
    slug: "notificacoes-agenda",
    name: "Notificações Proativas Push & Google Calendar",
    tagline: "O Lypsyos avisa você antes de você precisar abrir o sistema.",
    description:
      "Receba um resumo matinal diário na tela de bloqueio com seus agendamentos e faturamento previsto. Sincronize em tempo real com o Google Agenda para alarmes sonoros automáticos.",
    category: "Alertas & Notificações",
    icon: BellRing,
    tone: "growth",
    mockup: "push-calendar",
    benefit:
      "Comece seu dia sabendo exatamente sua rotina. Receba o resumo de quem você vai atender direto no visor do seu celular.",
    highlights: [
      "Resumo matinal diário programável na tela de bloqueio com clientes e faturamento",
      "Alerta instantâneo a cada nova reserva concluída pelo robô no WhatsApp",
      "Sincronização bidirecional em tempo real com o aplicativo Google Calendar",
      "Painel de controle de notificações com testes imediatos e ajuste de horários",
    ],
  },
  {
    slug: "catalogo-multi-nicho",
    name: "Catálogo Multi-Nicho & Customização Visual",
    tagline: "Pronto para manicures, barbearias, salões, estética e clínicas.",
    description:
      "Catálogos pré-configurados com 1 clique para os principais segmentos da beleza. Personalize com a cor da sua marca, foto de perfil otimizada, chave PIX e alterne entre Dark Mode e Light Mode.",
    category: "Catálogo & Identidade",
    icon: Palette,
    tone: "brand",
    mockup: "catalog-custom",
    benefit:
      "Um sistema com a cara do seu espaço. Adaptação instantânea para qualquer serviço por tempo e cobrança ágil de sinais via PIX.",
    highlights: [
      "Segmentos pré-configurados: Manicures, Barbearias, Cabeleireiros, Estética, Massoterapia e Tatuadores",
      "Modo Escuro (Dark Mode) de alto contraste e Modo Claro limpo e moderno",
      "Cores da marca personalizáveis e upload otimizado de logotipo/foto de perfil",
      "Chave PIX integrada no perfil para cobrança rápida de sinais e reservas",
    ],
  },
  {
    slug: "seguranca-multitenant",
    name: "Lypsyos Security Guard & Isolamento de Dados",
    tagline: "Segurança de nível bancário para blindar as informações do seu negócio.",
    description:
      "Isolamento multitenant rigoroso via Supabase Row-Level Security (RLS). Ninguém acessa seus dados, clientes ou faturamento. Proteção anti-bot, tokens criptografados e honeypots.",
    category: "Segurança & Privacidade",
    icon: ShieldCheck,
    tone: "growth",
    mockup: "security-guard",
    benefit:
      "Privacidade absoluta dos seus clientes e finanças com arquitetura em nuvem blindada.",
    highlights: [
      "Isolamento rigoroso Multitenant via Row-Level Security (RLS) no Supabase PostgreSQL",
      "Travas anti-bot e campos honeypot para impedir spam e ataques automatizados",
      "Criptografia ponta a ponta com tokens JWT e conexões TLS/SSL 100% seguras",
      "Gerador de senhas seguras integrado para máxima proteção das credenciais",
    ],
  },
]

export function getProductBySlug(slug: string | undefined): Product | undefined {
  return products.find((product) => product.slug === slug)
}
