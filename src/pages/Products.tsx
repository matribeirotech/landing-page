import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { products } from "@/content/products"
import { trackEvent } from "@/services/analytics"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"
import { useNavigate } from "react-router-dom"

export function Products() {
  const navigate = useNavigate()

  useDocumentMetadata(
    "Soluções | Lypsyos",
    "Conheça os módulos da Lypsyos: Controle de Estoque, Fluxo de Caixa e Ferramentas de Marketing para o seu comércio.",
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
    <main className="flex min-h-screen flex-col py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand">Soluções modulares</p>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl text-ink">
              Tudo para sua loja <span className="text-growth-text">crescer e lucrar</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-ink-soft md:text-lg">
              Conheça as ferramentas da Lypsyos desenvolvidas para simplificar o seu estoque,
              dar previsibilidade ao seu caixa e trazer mais clientes.
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
              <Card className="flex h-full w-full flex-col overflow-hidden border-line bg-canvas shadow-md transition-shadow hover:shadow-xl">
                <div className="flex items-center justify-between gap-3 border-b border-line bg-white px-6 py-5">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-brand/20 bg-brand-soft text-brand">
                    <product.icon className="h-6 w-6" />
                  </div>
                </div>
                <CardHeader>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">{product.category}</p>
                  <CardTitle className="text-2xl text-ink">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-[15px] leading-relaxed text-ink-soft">{product.description}</p>
                </CardContent>
                <div className="border-t border-line p-6 pt-4">
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
