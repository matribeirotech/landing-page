import { motion } from "motion/react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { DbxImageCarousel } from "@/components/common/DbxImageCarousel"
import { DemoVideoSection } from "@/components/sections/DemoVideoSection"
import { DbxMemberAccessSection } from "@/components/sections/DbxMemberAccessSection"
import { DbxTechnicalDocsSection } from "@/components/sections/DbxTechnicalDocsSection"
import { getProductBySlug, productStatusLabel } from "@/content/products"
import { trackEvent } from "@/services/analytics"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"
import { cn } from "@/utils/cn"

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const product = getProductBySlug(slug)

  useDocumentMetadata(
    product ? `${product.name} | Lypsyos` : "Produto | Lypsyos",
    product?.description ??
      "Conheça os produtos da Lypsyos para orçamento, engenharia e produção industrial.",
  )

  if (!product) {
    return <Navigate to="/produtos" replace />
  }

  const isAvailable = product.status === "disponivel"
  const primaryCtaLabel = isAvailable ? "Solicitar uma demonstração" : "Quero saber mais"
  const secondaryCtaLabel = isAvailable ? "Falar sobre implantação" : "Falar com a equipe"
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
    <main className="bg-background pb-16 pt-0 md:pb-20">
      <section className="relative overflow-hidden bg-[#020814] py-16 text-surface md:py-20">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#030815_0%,#071427_55%,#07111d_100%)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(28,140,140,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(28,140,140,0.11) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />
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
                  <div className="inline-flex rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-secondary">
                    {product.category}
                  </div>
                  <div
                    className={cn(
                      "inline-flex rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]",
                      isAvailable
                        ? "border-secondary/30 bg-secondary/10 text-secondary"
                        : "border-surface/20 bg-surface/5 text-surface/70",
                    )}
                  >
                    {productStatusLabel[product.status]}
                  </div>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-surface sm:text-5xl">
                  {product.name}: <span className="text-secondary">{product.tagline}</span>
                </h1>
                <p className="max-w-[620px] text-[15px] leading-7 text-surface/78 md:text-lg">
                  {product.description}
                </p>
              </div>

              <ul className="grid gap-2.5">
                {product.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-surface/8 bg-surface/[0.03] px-3.5 py-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                    <span className="text-sm leading-7 text-surface/86 md:text-[15px]">{item}</span>
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
              <div className="relative w-full overflow-hidden rounded-[32px] border border-secondary/18 bg-[linear-gradient(180deg,rgba(8,24,43,0.85),rgba(3,12,24,0.96))] p-6 shadow-[0_26px_70px_rgba(0,0,0,0.4)] md:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-secondary/25 bg-secondary/10 text-secondary">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-surface">{product.name}</p>
                    <p className="text-xs uppercase tracking-[0.24em] text-surface/60">{product.category}</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3">
                  {product.highlights.slice(0, 3).map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-secondary/15 bg-surface/[0.04] px-4 py-3.5 text-sm leading-6 text-surface/80"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {product.detail?.visualSlides ? (
        <section className="mt-16 md:mt-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Tour visual do produto</p>
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                  Veja a interface e as saídas técnicas do {product.name}
                </h2>
                <p className="text-base leading-7 text-neutral-700 md:text-lg">
                  Esta visão reúne exemplos reais de tela e documentação para mostrar como o {product.name} organiza
                  o fluxo técnico na prática.
                </p>
              </div>
              <div>
                <DbxImageCarousel slides={product.detail.visualSlides} />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {product.detail?.showDemoVideo ? <DemoVideoSection /> : null}
      {product.detail?.showTechnicalDocs ? <DbxTechnicalDocsSection /> : null}
      {product.detail?.showMemberAccess ? <DbxMemberAccessSection /> : null}

      <section className="mt-16 md:mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-[28px] bg-primary px-6 py-10 text-center text-surface shadow-xl md:px-10 md:py-14">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">Próximo passo</p>
            <h2 className="mx-auto mt-3 max-w-[36ch] text-2xl font-bold tracking-tight sm:text-3xl">
              Vamos conversar sobre o {product.name} na sua operação?
            </h2>
            <p className="mx-auto mt-3 max-w-[620px] text-sm leading-7 text-surface/78 md:text-base">
              Conte um pouco do seu processo atual e avaliamos juntos onde o {product.name} pode gerar mais ganho.
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
