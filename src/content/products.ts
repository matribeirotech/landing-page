import { ArrowLeftRight, Boxes, Megaphone, type LucideIcon } from "lucide-react"

export type SolutionMockup = "stock" | "cashflow" | "marketing"
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
}

export const products: Product[] = [
  {
    slug: "controle-de-estoque",
    name: "Controle de Estoque Inteligente",
    tagline: "Pare de perder dinheiro na prateleira.",
    description:
      "Saiba exatamente o que entra, o que sai e o que está parado. A Lypsyos acompanha seu estoque em tempo real e avisa a hora certa de repor — antes que o cliente encontre a prateleira vazia.",
    category: "Estoque",
    icon: Boxes,
    tone: "brand",
    mockup: "stock",
    highlights: [
      "Alertas automáticos de estoque mínimo e de validade",
      "Sugestão de reposição com base no histórico de vendas",
      "Relatório de produtos parados e de maior giro",
      "Inventário rápido pelo celular, com leitor de código de barras",
    ],
  },
  {
    slug: "entrada-e-saida",
    name: "Gestão de Entrada e Saída",
    tagline: "Cada centavo no lugar certo.",
    description:
      "Da sangria do caixa ao fechamento do mês, tenha controle preciso de tudo o que movimenta sua loja. Funciona para varejo, conveniência, distribuidora ou loja de bairro — você configura do seu jeito.",
    category: "Fluxo de caixa",
    icon: ArrowLeftRight,
    tone: "growth",
    mockup: "cashflow",
    highlights: [
      "Registro de vendas, compras e despesas em poucos toques",
      "Fechamento de caixa diário sem planilha",
      "Contas a pagar e a receber com lembretes de vencimento",
      "Visão de lucro real por período, produto ou categoria",
    ],
  },
  {
    slug: "marketing-e-fidelizacao",
    name: "Estratégias e Ferramentas de Marketing",
    tagline: "Atraia novos clientes. Faça os antigos voltarem.",
    description:
      "Transforme o histórico de vendas em campanhas que funcionam. Crie programas de fidelidade, envie ofertas certeiras e descubra quem são seus melhores clientes — sem precisar ser especialista em marketing.",
    category: "Marketing",
    icon: Megaphone,
    tone: "brand",
    mockup: "marketing",
    highlights: [
      "Programa de pontos e cashback para fidelizar clientes",
      "Cupons e promoções segmentadas por perfil de compra",
      "Campanhas para WhatsApp e redes sociais a partir dos seus dados",
      "Relatórios de retorno: saiba qual ação realmente vendeu",
    ],
  },
]

export function getProductBySlug(slug: string | undefined): Product | undefined {
  return products.find((product) => product.slug === slug)
}
