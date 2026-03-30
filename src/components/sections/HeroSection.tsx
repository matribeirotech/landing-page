import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { ArrowRight, CheckCircle2, Play } from "lucide-react"
import { motion } from "motion/react"
import { trackEvent } from "@/services/analytics"
import { BrandMark } from "@/components/common/BrandMark"

const heroHighlights = [
  "DBX-V3 para organizar desenhos técnicos, DXF, PDF e relatórios de produção.",
  "Automação sob medida para engenharia, preparação e operação industrial.",
  "Versão web em evolução para ampliar acesso, escala e colaboração.",
]

const previewCards = [
  {
    title: "Menos retrabalho na engenharia",
    description: "Padronize tarefas repetitivas, reduza variações e ganhe consistência no dia a dia.",
  },
  {
    title: "Mais ritmo entre setores",
    description: "Acelere a passagem de informação entre engenharia, preparação e produção.",
  },
  {
    title: "Evolução com direção clara",
    description: "Comece com uma versão desktop operacional e avance para uma camada web SaaS.",
  },
]

export function HeroSection() {
  const navigate = useNavigate()

  function handleCta(label: string) {
    void trackEvent({
      eventName: "hero_cta_click",
      category: "conversion",
      label,
    }).catch((error) => {
      console.error("Não foi possível rastrear o CTA do hero", error)
    })
  }

  function goTo(path: string, label: string) {
    handleCta(label)
    navigate(path)
  }

  return (
    <section className="relative w-full overflow-hidden bg-primary py-24 text-surface md:py-32 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(43,219,218,0.35),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(12,45,73,0.32))]" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="space-y-5">
              <BrandMark className="text-surface" titleClassName="text-surface" />
              <div className="inline-flex rounded-full border border-surface/15 bg-surface/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Software e automação para a indústria
              </div>
              <h1 className="max-w-[12ch] text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-7xl">
                Reduza retrabalho industrial e avance para fluxos mais{" "}
                <span className="text-secondary">claros, rápidos e escaláveis</span>
              </h1>
              <p className="max-w-[640px] text-base leading-relaxed text-neutral/90 md:text-xl">
                A Lypsyos desenvolve software próprio e automações sob medida para transformar rotinas
                técnicas em processos mais confiáveis, com ganho prático para engenharia, preparação e
                produção.
              </p>
            </div>
            <ul className="grid gap-3 text-sm text-surface/92 md:text-base">
              {heroHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button size="lg" onClick={() => goTo("/contato", "hero_demo")}>
                Agendar uma apresentação
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-surface/20 bg-surface/5 text-surface hover:bg-surface/10 hover:text-surface"
                onClick={() => goTo("/produtos/dbx-v3", "hero_product")}
              >
                <Play className="h-5 w-5" />
                Conhecer o DBX-V3
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto flex w-full max-w-[540px] items-center justify-center lg:max-w-none"
          >
            <div className="w-full rounded-[32px] border border-surface/10 bg-surface/6 p-6 shadow-2xl backdrop-blur-sm">
              <div className="rounded-[26px] border border-surface/10 bg-surface/95 p-6 text-primary shadow-xl">
                <div className="flex items-center justify-between gap-4 border-b border-neutral/20 pb-5">
                  <BrandMark className="text-primary" />
                  <button
                    type="button"
                    onClick={() => goTo("/produtos/dbx-v3", "hero_preview")}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary shadow-lg transition-transform hover:scale-105"
                    aria-label="Abrir detalhes do DBX-V3"
                  >
                    <Play className="ml-1 h-8 w-8" />
                  </button>
                </div>
                <div className="grid gap-4 py-6">
                  {previewCards.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-neutral/20 bg-background px-5 py-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-neutral-700">{item.description}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl bg-primary px-5 py-5 text-surface">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Ponto de partida</p>
                  <p className="mt-2 text-sm leading-6 text-surface/80">
                    O DBX-V3 já opera em versão desktop e está evoluindo para uma experiência web SaaS,
                    ampliando a automação com mais acesso, colaboração e escala.
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
