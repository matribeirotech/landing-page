export const WHATSAPP_NUMBER = "5517996261525"
export const WHATSAPP_MESSAGE = "Olá! Vim pelo site da Lypsyos e gostaria de ver uma demonstração do robô de agendamentos no WhatsApp para o meu negócio."
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export const LINKEDIN_URL = "https://www.linkedin.com/company/lypsyos"

/** Âncoras das seções da home, usadas pela navbar e pelo rodapé. */
export const homeSections = {
  why: "por-que-lypsyos",
  solutions: "solucoes",
  comparison: "comparativo",
  pricing: "planos",
  audience: "para-quem-e",
} as const
