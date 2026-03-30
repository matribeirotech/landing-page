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
      label: "showcase_dbx_v3",
    }).catch((error) => {
      console.error("Não foi possível rastrear o CTA do produto", error)
    })
  }

  function goToProductPage() {
    handleProductCta()
    navigate("/produtos/dbx-v3")
  }

  return (
    <section id="produto-principal" className="w-full py-24 md:py-32 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 items-center lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
                Produto em destaque
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-primary">
                Conheça o DBX-V3
              </h2>
              <p className="max-w-[620px] text-neutral-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                O DBX-V3 organiza o fluxo técnico desde a entrada das peças até a geração de documentos,
                DXFs e relatórios de aproveitamento, com foco em padronização e velocidade.
              </p>
            </div>
            <ul className="grid gap-4">
              {[
                "Versão desktop já operacional para implantação assistida.",
                "Importa dados por planilha, DXF e JSON.",
                "Gera DXF, PDF técnico e relatórios com mais padronização.",
                "Ajuda a reduzir retrabalho entre engenharia, preparo e produção.",
                "Preparado para evoluir para uma experiência web SaaS.",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-secondary" />
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="secondary" onClick={goToProductPage}>
                Ver detalhes do DBX-V3 <ArrowRight className="h-5 w-5" />
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
                    Produto em evolução
                  </div>
                </div>
              </div>
              <div className="space-y-4 p-6">
                {[
                  "Recebe diferentes formatos de entrada para acelerar o início do trabalho.",
                  "Organiza peças, códigos, furos, aproveitamento e exportações em um fluxo único.",
                  "Entrega mais clareza para engenharia, programação e produção.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-neutral/20 bg-surface p-4">
                    <div className="mt-1 rounded-full bg-accent/10 p-2.5 text-accent">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-neutral-700">{item}</p>
                  </div>
                ))}
                <div className="rounded-2xl bg-accent/10 px-5 py-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Versão atual</p>
                  <p className="mt-2 text-sm text-neutral-700">
                    Hoje o DBX-V3 já opera em desktop. A próxima camada em desenvolvimento é a versão web,
                    pensada para ampliar acesso, escala e continuidade como SaaS.
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
