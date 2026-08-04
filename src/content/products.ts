import { Calculator, Layers3, Ruler, type LucideIcon } from "lucide-react"
import { dbxVisualSlides } from "@/content/dbxVisuals"

export type ProductStatus = "disponivel" | "em-desenvolvimento"

export interface Product {
  slug: string
  name: string
  tagline: string
  description: string
  category: string
  status: ProductStatus
  icon: LucideIcon
  highlights: string[]
  detail?: {
    visualSlides?: typeof dbxVisualSlides
    showDemoVideo?: boolean
    showTechnicalDocs?: boolean
    showMemberAccess?: boolean
  }
}

export const productStatusLabel: Record<ProductStatus, string> = {
  disponivel: "Disponível",
  "em-desenvolvimento": "Em desenvolvimento",
}

export const products: Product[] = [
  {
    slug: "geoquote",
    name: "GeoQuote",
    tagline: "Orçamento de corte sem planilha",
    description:
      "Ferramenta web para gerar e registrar orçamentos de corte. Substitui a planilha que vai e volta entre o comercial e a produção por um fluxo único: entra a peça, sai o preço, fica o registro.",
    category: "Orçamento",
    status: "em-desenvolvimento",
    icon: Calculator,
    highlights: [
      "Fluxo único entre comercial e produção, sem planilha indo e voltando.",
      "Entrada da peça já direciona o cálculo do preço de corte.",
      "Registro do orçamento fica salvo para consulta e histórico.",
    ],
  },
  {
    slug: "editor-de-perfis",
    name: "Editor de Perfis",
    tagline: "Desenhos de perfis dobrados por dobradeira",
    description:
      "Ferramenta web para desenvolver desenhos de perfis dobrados seguindo a limitação de cada dobradeira, formando um ecossistema para gerar desenhos técnicos, corte do blank e aproveitamento de chapa.",
    category: "Engenharia",
    status: "em-desenvolvimento",
    icon: Ruler,
    highlights: [
      "Respeita a limitação de cada dobradeira no desenho do perfil.",
      "Gera desenho técnico, corte do blank e aproveitamento de chapa no mesmo ecossistema.",
      "Pensado para reduzir interpretação manual entre engenharia e produção.",
    ],
  },
  {
    slug: "dbx-v4",
    name: "DBX-V4",
    tagline: "Preparação técnica, DXF e peças dobradas",
    description:
      "O DBX-V4 concentra a preparação técnica em um fluxo mais claro, reduz tarefas repetitivas e entrega saídas úteis para engenharia, preparo e produção, incluindo peças dobradas.",
    category: "Produção",
    status: "disponivel",
    icon: Layers3,
    highlights: [
      "Importação por cadastro manual, planilha, DXF e JSON em um único fluxo.",
      "Geração de DXF, PDF técnico, relatórios e resumo em Excel com menos montagem manual.",
      "Nesting, perdas, sobras e histórico do projeto com mais clareza para revisão e produção.",
      "Peças dobradas com perfil final e blank desenvolvido para apoiar fabricação e conferência.",
    ],
    detail: {
      visualSlides: dbxVisualSlides,
      showDemoVideo: true,
      showTechnicalDocs: true,
      showMemberAccess: true,
    },
  },
]

export function getProductBySlug(slug: string | undefined): Product | undefined {
  return products.find((product) => product.slug === slug)
}
