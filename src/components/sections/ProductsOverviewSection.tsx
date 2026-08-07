import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { products, productStatusLabel } from "@/content/products"
import { trackEvent } from "@/services/analytics"

export function ProductsOverviewSection() {
  const navigate = useNavigate()

  function goToProduct(slug: string, origin: string) {
    void trackEvent({
      eventName: "product_showcase_cta_click",
      category: "conversion",
      label: origin,
      metadata: { product: slug },
    }).catch((error) => {
      console.error("Não foi possível rastrear o CTA de produto", error)
    })
    navigate(`/produtos/${slug}`)
  }

  return (
    <section id="produtos" className="w-full bg-surface py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center justify-center space-y-3 text-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Nossos produtos</p>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Software próprio para orçamento, engenharia e produção
            </h2>
            <p className="mx-auto max-w-[760px] text-neutral-600 md:text-lg/relaxed">
              Cada produto ataca um gargalo específico do fluxo industrial, do orçamento comercial até a
              preparação técnica para produção.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Card className="flex h-full flex-col border-neutral/20 bg-background shadow-sm">
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-accent/10 text-accent">
                      {product.logo ? (
                        <img src={product.logo} alt={`Logo ${product.name}`} className="h-full w-full object-cover" />
                      ) : (
                        <product.icon className="h-6 w-6" />
                      )}
                    </div>
                    <span
                      className={
                        product.status === "disponivel"
                          ? "rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent"
                          : "rounded-full bg-neutral/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-600"
                      }
                    >
                      {productStatusLabel[product.status]}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-primary">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-5">
                  <p className="text-[15px] leading-7 text-neutral-700">{product.description}</p>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => goToProduct(product.slug, `home_products_overview_${product.slug}`)}
                  >
                    Ver detalhes <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => {
              void trackEvent({
                eventName: "product_showcase_cta_click",
                category: "conversion",
                label: "home_products_overview_ver_todos",
              }).catch((error) => {
                console.error("Não foi possível rastrear o CTA de produtos", error)
              })
              navigate("/produtos")
            }}
          >
            Ver todos os produtos <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
