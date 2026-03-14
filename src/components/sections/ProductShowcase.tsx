import { Button } from "@/components/ui/Button"
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react"
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"
import { trackEvent } from "@/services/analytics"
import { BrandMark } from "@/components/common/BrandMark"

export function ProductShowcase() {
  const navigate = useNavigate()

  function handleProductCta() {
    void trackEvent({
      eventName: "product_showcase_cta_click",
      category: "conversion",
      label: "showcase_dbx_v2",
    }).catch((error) => {
      console.error("Nao foi possivel rastrear CTA do produto", error)
    })
  }

  function goToProductPage() {
    handleProductCta()
    navigate("/produtos/dbx-v2")
  }

  return (
    <section id="produto-principal" className="w-full py-24 md:py-32 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm text-accent font-semibold">
                Produto Principal
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
                Conheça o DBX-V2
              </h2>
              <p className="max-w-[600px] text-neutral-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                O DBX-V2 nasceu para acelerar a geracao de entregaveis tecnicos e reduzir o trabalho repetitivo
                em rotinas de corte, nesting e preparacao de arquivos.
              </p>
            </div>
            <ul className="grid gap-4">
              {[
                "Geracao em lote de arquivos DXF e PDF.",
                "Mais padronizacao na entrega para o time de operacao.",
                "Fluxo tecnico mais rapido entre engenharia e corte.",
                "Base pronta para evoluir com novas automacoes.",
                "Implementacao orientada a processo, nao so a tela.",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-primary text-surface hover:bg-primary/90" onClick={goToProductPage}>
                Saiba mais sobre o DBX-V2 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto flex w-full max-w-[500px] items-center justify-center lg:max-w-none"
          >
            <div className="w-full overflow-hidden rounded-[28px] border border-neutral/20 bg-background shadow-xl">
              <div className="border-b border-neutral/20 bg-primary px-6 py-5 text-surface">
                <div className="flex items-center justify-between gap-4">
                  <BrandMark className="text-surface" titleClassName="text-surface" />
                  <div className="rounded-full bg-surface/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                    Fluxo tecnico
                  </div>
                </div>
              </div>
              <div className="space-y-4 p-6">
                {[
                  "Recebe entradas e reduz operacoes manuais repetitivas.",
                  "Organiza a geracao tecnica para acelerar preparo e execucao.",
                  "Abre caminho para novas etapas de automacao industrial.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-neutral/20 bg-surface p-4">
                    <div className="mt-1 rounded-full bg-accent/10 p-2 text-accent">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <p className="text-sm text-neutral-700">{item}</p>
                  </div>
                ))}
                <div className="rounded-2xl bg-accent/8 px-5 py-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Aplicacao pratica</p>
                  <p className="mt-2 text-sm text-neutral-700">
                    Ideal para operacoes que precisam ganhar velocidade, padrao e confiabilidade na preparacao de arquivos para corte.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
