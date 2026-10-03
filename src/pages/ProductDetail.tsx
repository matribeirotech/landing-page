import { motion } from "motion/react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { getProductBySlug } from "@/content/products"
import { trackEvent } from "@/services/analytics"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"
import { SolutionMockupView } from "@/components/mockups/SolutionMockupView"
import { cn } from "@/utils/cn"

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const product = getProductBySlug(slug)

  useDocumentMetadata(
    product ? `${product.name} | Lypsyos` : "Soluções | Lypsyos",
    product?.description ??
      "Conheça as soluções da Lypsyos para gestão, caixa e marketing no varejo.",
  )

  if (!product) {
    return <Navigate to="/produtos" replace />
  }

  const primaryCtaLabel = "Solicitar uma demonstração"
  const secondaryCtaLabel = "Falar com a equipe"
  const Icon = product.icon

  function handleProductAction(label: string) {
    void trackEvent({
      eventName: "product_page_cta_click",
      category: "conversion",
      label,
      metadata: { product: product!.slug },
    }).catch((error) => {
      console.error("Não foi possível rastrear o CTA da página de produto", error)
    })
  }

  function goToContact(label: string) {
    handleProductAction(label)
    navigate("/contato")
  }

  return (
    <main className="bg-white pb-16 pt-0 md:pb-20">
      <section className="relative overflow-hidden bg-white py-16 text-ink md:py-20 border-b border-line">
        {/* Blobs de fundo */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[32rem] rounded-full bg-brand/10 blur-3xl" />
        
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="min-w-0 space-y-6"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className={cn("inline-flex rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em]", 
                    product.tone === "growth" ? "bg-growth-soft text-growth-text" : "bg-brand-soft text-brand")}>
                    {product.category}
                  </div>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                  {product.name}: <span className={product.tone === "growth" ? "text-growth-text" : "text-brand"}>{product.tagline}</span>
                </h1>
                <p className="max-w-[620px] text-[15px] leading-7 text-ink-soft md:text-lg">
                  {product.description}
                </p>
              </div>

              <ul className="grid gap-2.5">
                {product.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-line bg-canvas px-3.5 py-3"
                  >
                    <CheckCircle2 className={cn("mt-0.5 size-5 shrink-0", product.tone === "growth" ? "text-growth-text" : "text-brand")} />
                    <span className="text-sm leading-7 text-ink md:text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" onClick={() => goToContact(`${primaryCtaLabel}_${product.slug}`)}>
                  {primaryCtaLabel}
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => goToContact(`${secondaryCtaLabel}_${product.slug}`)}>
                  {secondaryCtaLabel}
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mx-auto w-full min-w-0 max-w-[560px] lg:max-w-none"
            >
              <div className="relative">
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-6 inset-y-10 -z-0 rounded-[2rem] blur-2xl",
                    product.tone === "growth" ? "bg-growth/15" : "bg-brand/12",
                  )}
                />
                <div className="relative border border-line rounded-3xl bg-canvas overflow-hidden shadow-sm">
                  <SolutionMockupView type={product.mockup} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mt-16 md:mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-[28px] border border-line bg-canvas px-6 py-10 text-center shadow-sm md:px-10 md:py-14">
            <p className={cn("text-sm font-semibold uppercase tracking-[0.28em]", product.tone === "growth" ? "text-growth-text" : "text-brand")}>Próximo passo</p>
            <h2 className="mx-auto mt-3 max-w-[36ch] text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Vamos conversar sobre {product.category.toLowerCase()} na sua loja?
            </h2>
            <p className="mx-auto mt-3 max-w-[620px] text-sm leading-7 text-ink-soft md:text-base">
              Conte um pouco da sua rotina atual e avaliamos juntos onde a Lypsyos pode gerar mais ganho.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" onClick={() => goToContact(`cta_final_${product.slug}`)}>
                {primaryCtaLabel}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
