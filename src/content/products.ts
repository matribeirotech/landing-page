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
    name: "Robô Atendente no WhatsApp 24h",
    tagline: "Enquanto você atende uma cliente, o Zenda agenda as próximas cinco.",
    description:
      "Conecta no seu próprio WhatsApp em menos de 2 minutos. Ele responde suas clientes no mesmo segundo, mostra apenas os horários livres e confirma o agendamento sozinho — dia e noite.",
    category: "Atendimento Automático",
    icon: Bot,
    tone: "brand",
    mockup: "whatsapp-bot",
    benefit:
      "Nunca mais perca cliente por demorar a responder no WhatsApp. Sua agenda continua marcando clientes mesmo à noite e aos domingos.",
    highlights: [
      "Menu simples por números ou letras: qualquer cliente agenda sozinha em menos de 1 minuto",
      "Sem risco de marcar duas clientes no mesmo horário: horários ocupados somem na hora",
      "Não incomoda amigos e familiares: responde apenas clientes buscando atendimento",
      "Salva o nome e o telefone certinho da cliente direto na sua lista",
    ],
  },
  {
    slug: "painel-crm",
    name: "Agenda Inteligente e Controle de Caixa",
    tagline: "Diga adeus ao caderno. Veja seus horários e seu faturamento direto no celular.",
    description:
      "Acompanhe todos os compromissos do dia, saiba exatamente quanto vai entrar no caixa e chame qualquer cliente no WhatsApp com apenas 1 toque.",
    category: "Agenda & Financeiro",
    icon: CalendarCheck2,
    tone: "growth",
    mockup: "dashboard-crm",
    benefit:
      "Acabe com as anotações rasuradas no papel ou mensagens perdidas no WhatsApp. Tenha a visão exata do seu dinheiro e do seu dia.",
    highlights: [
      "Escolha como prefere ver sua agenda: em Cartões, Lista por Horário ou Tabela",
      "Botão para chamar a cliente no WhatsApp com 1 toque, sem precisar salvar o contato antes",
      "Faturamento previsto hoje e na semana calculado automaticamente para você",
      "Histórico de cada cliente com os serviços que ela mais faz e quando veio pela última vez",
    ],
  },
  {
    slug: "app-pwa",
    name: "Aplicativo Direto no Celular (1 Clique)",
    tagline: "Instalação direta no iPhone ou Android com 1 clique, sem taxas nem burocracia de App Store.",
    description:
      "Use o Zenda como um aplicativo rápido na tela inicial do seu celular. Não ocupa a memória do aparelho, abre no mesmo segundo e funciona em qualquer iPhone ou Android.",
    category: "Aplicativo no Celular",
    icon: Smartphone,
    tone: "brand",
    mockup: "pwa-mobile",
    benefit:
      "Seu salão ou barbearia na palma da mão. Abra sua agenda com 1 toque de onde estiver, sem travar o celular.",
    highlights: [
      "Instalação direta no iPhone ou Android com 1 clique, sem taxas nem burocracia de App Store",
      "Abre em tela cheia igual a um aplicativo comum, rápido e fácil de mexer",
      "Super leve: não lota a memória do seu telefone e quase não gasta sua internet",
      "Acesso rápido na tela inicial para ver a agenda do dia e o faturamento",
    ],
  },
  {
    slug: "notificacoes-agenda",
    name: "Avisos no Celular & Google Agenda",
    tagline: "O Zenda avisa você antes mesmo de você abrir a agenda.",
    description:
      "Receba todo dia de manhã um resumo na tela do seu celular dizendo quantas clientes você vai atender e quanto vai faturar no dia.",
    category: "Lembretes & Avisos",
    icon: BellRing,
    tone: "growth",
    mockup: "push-calendar",
    benefit:
      "Comece o dia sabendo exatamente quem você vai atender e quanto vai ganhar, direto na tela do celular.",
    highlights: [
      "Resumo toda manhã na tela do celular com seus horários e faturamento previsto do dia",
      "Aviso no mesmo segundo sempre que uma cliente nova marcar horário pelo WhatsApp",
      "Conecta com a agenda do seu celular (Google Agenda) para tocar alarme antes do atendimento",
      "Disparo fácil de lembretes para a cliente confirmar presença e não faltar",
    ],
  },
  {
    slug: "catalogo-multi-nicho",
    name: "Serviços Prontos para o Seu Ramo",
    tagline: "Feito sob medida para manicures, barbearias, salões e estética.",
    description:
      "Já vem com lista de serviços pronta para a sua profissão. Coloque sua foto ou logo, ajuste seus preços e cadastre sua chave PIX para receber sinal das clientes.",
    category: "Seu Espaço do Seu Jeito",
    icon: Palette,
    tone: "brand",
    mockup: "catalog-custom",
    benefit:
      "Tudo pronto em 2 minutos: você não perde tempo cadastrando serviço por serviço do zero.",
    highlights: [
      "Modelos prontos para Manicures, Barbearias, Cabeleireiros, Estética, Massagem e Estúdios",
      "Visual claro ou escuro para você usar como achar mais confortável no celular",
      "Coloque o nome do seu espaço, sua foto e seus horários de trabalho com facilidade",
      "Deixe sua chave PIX pronta para cobrar sinal e evitar que a cliente falte",
    ],
  },
  {
    slug: "seguranca-multitenant",
    name: "Proteção e Segurança Total dos Seus Dados",
    tagline: "Sua lista de clientes e seu faturamento 100% protegidos e salvos na nuvem.",
    description:
      "Seus agendamentos, telefones de clientes e valores ficam guardados com segurança total. Se você trocar ou perder o aparelho celular, basta entrar com sua senha e está tudo lá.",
    category: "Segurança & Confiança",
    icon: ShieldCheck,
    tone: "growth",
    mockup: "security-guard",
    benefit:
      "Segurança total dos seus dados: diferentemente do caderno de papel, sua agenda nunca se perde.",
    highlights: [
      "Segurança total dos seus dados: somente você tem acesso à sua agenda e ao seu caixa",
      "Salvo automaticamente: se o celular quebrar ou acabar a bateria, você não perde nenhum horário",
      "Proteção contra mensagens falsas para manter seu WhatsApp funcionando redondo",
      "Acesso exclusivo protegido pela sua senha pessoal",
    ],
  },
]

export function getProductBySlug(slug: string | undefined): Product | undefined {
  return products.find((product) => product.slug === slug)
}
