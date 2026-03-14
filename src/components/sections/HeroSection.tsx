import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { ArrowRight, CheckCircle2, Play } from "lucide-react"
import { motion } from "motion/react"
import { trackEvent } from "@/services/analytics"
import { BrandMark } from "@/components/common/BrandMark"

const heroHighlights = [
  "DBX-V2 para geracao tecnica DXF/PDF em lote",
  "Automacoes sob medida para fluxos industriais",
  "Entrega consultiva com foco em operacao real",
]

export function HeroSection() {
  const navigate = useNavigate()

  function handleCta(label: string) {
    void trackEvent({
      eventName: "hero_cta_click",
      category: "conversion",
      label,
    }).catch((error) => {
      console.error("Nao foi possivel rastrear CTA do hero", error)
    })
  }

  function goTo(path: string, label: string) {
    handleCta(label)
    navigate(path)
  }

  return (
    <section className="relative w-full overflow-hidden bg-primary py-24 text-surface md:py-32 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(43,219,218,0.35),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(12,45,73,0.25))]" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="space-y-4">
              <BrandMark className="text-surface" titleClassName="text-surface" />
              <div className="inline-flex rounded-full border border-surface/15 bg-surface/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Software e automacao para a industria
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Transforme gargalos industriais em <span className="text-secondary">fluxos mais rapidos, padronizados e escalaveis</span>
              </h1>
              <p className="max-w-[600px] text-neutral/90 md:text-xl leading-relaxed">
                A Lypsyos desenvolve ferramentas proprias, como o DBX-V2, e tambem cria solucoes sob medida
                para automatizar etapas criticas da engenharia e da operacao industrial.
              </p>
            </div>
            <ul className="grid gap-3 text-sm text-surface/90 md:text-base">
              {heroHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button size="lg" className="h-12 bg-secondary px-8 font-semibold text-primary hover:bg-secondary/90" onClick={() => goTo("/contato", "hero_demo")}>
                Quero uma conversa tecnica <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 border-surface/20 px-8 text-surface hover:bg-surface/10" onClick={() => goTo("/produtos/dbx-v2", "hero_video")}>
                <Play className="mr-2 h-5 w-5" /> Ver o DBX-V2
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto flex w-full max-w-[500px] items-center justify-center lg:max-w-none"
          >
            <div className="w-full rounded-[32px] border border-surface/10 bg-surface/6 p-6 shadow-2xl backdrop-blur-sm">
              <div className="rounded-[24px] border border-surface/10 bg-surface/95 p-6 text-primary shadow-xl">
                <div className="flex items-center justify-between gap-4 border-b border-neutral/20 pb-5">
                  <BrandMark className="text-primary" />
                  <button
                    type="button"
                    onClick={() => goTo("/produtos/dbx-v2", "hero_preview")}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary shadow-lg transition-transform hover:scale-105"
                    aria-label="Abrir detalhes do DBX-V2"
                  >
                    <Play className="ml-1 h-7 w-7" />
                  </button>
                </div>
                <div className="grid gap-4 py-6">
                  {[
                    {
                      title: "Menos retrabalho",
                      description: "Padronize tarefas repetitivas e reduza variacoes manuais na engenharia.",
                    },
                    {
                      title: "Mais velocidade",
                      description: "Acelere preparo tecnico, organizacao de arquivos e passagem para a operacao.",
                    },
                    {
                      title: "Mais clareza de evolucao",
                      description: "Estruture automacoes com roadmap e ganho visivel para a equipe e para a producao.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-neutral/20 bg-background px-5 py-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">{item.title}</p>
                      <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl bg-primary px-5 py-4 text-surface">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Ponto de partida</p>
                  <p className="mt-2 text-sm text-surface/80">
                    O DBX-V2 e uma das frentes da Lypsyos para automatizar preparacao tecnica e abrir caminho
                    para uma operacao industrial mais conectada.
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
