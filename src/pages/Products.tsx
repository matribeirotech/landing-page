import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { products, productStatusLabel } from "@/content/products"
import { trackEvent } from "@/services/analytics"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"
import { useNavigate } from "react-router-dom"

export function Products() {
  const navigate = useNavigate()

  useDocumentMetadata(
    "Produtos | Lypsyos",
    "Conheça o GeoQuote, o Editor de Perfis e o DBX-V4: produtos da Lypsyos para orçamento, engenharia e produção industrial.",
  )

  function goToProduct(slug: string) {
    void trackEvent({
      eventName: "product_link_clicked",
      category: "portfolio",
      label: slug,
      metadata: { product: slug },
    }).catch((error) => {
      console.error("Não foi possível rastrear o clique no produto", error)
    })
    navigate(`/produtos/${slug}`)
  }

  return (
    <main className="flex min-h-screen flex-col py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Nossos produtos</p>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl text-primary">
              Produtos para orçamento, <span className="text-secondary">engenharia e produção</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-neutral-600 md:text-lg">
              Software próprio da Lypsyos para reduzir retrabalho e organizar o fluxo entre comercial,
              engenharia e chão de fábrica.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex"
            >
              <Card className="flex h-full w-full flex-col overflow-hidden border-neutral/20 bg-surface shadow-md transition-shadow hover:shadow-xl">
                <div className="flex items-center justify-between gap-3 border-b border-neutral/10 bg-primary px-6 py-5 text-surface">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-secondary/25 bg-secondary/10 text-secondary">
                    <product.icon className="h-6 w-6" />
                  </div>
                  <span
                    className={
                      product.status === "disponivel"
                        ? "rounded-full bg-secondary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary"
                        : "rounded-full bg-surface/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-surface/70"
                    }
                  >
                    {productStatusLabel[product.status]}
                  </span>
                </div>
                <CardHeader>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{product.category}</p>
                  <CardTitle className="text-2xl text-primary">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-[15px] leading-relaxed text-neutral-700">{product.description}</p>
                </CardContent>
                <div className="border-t border-neutral/10 p-6 pt-4">
                  <Button variant="default" className="w-full gap-2" onClick={() => goToProduct(product.slug)}>
                    Ver detalhes <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
