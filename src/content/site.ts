export const WHATSAPP_NUMBER = "5517996261525"
export const WHATSAPP_MESSAGE = "Olá! Vim do site da Lypsyos e gostaria de saber mais sobre os sistemas para a minha loja."
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export const LINKEDIN_URL = "https://www.linkedin.com/company/lypsyos"

/** Âncoras das seções da home, usadas pela navbar e pelo rodapé. */
export const homeSections = {
  why: "por-que-lypsyos",
  solutions: "solucoes",
  audience: "para-quem-e",
} as const
