import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Bot, CheckCircle2, Factory, Play, ShieldCheck, Workflow } from "lucide-react"
import { motion } from "motion/react"
import { trackEvent } from "@/services/analytics"

const heroHighlights = [
  "Automação industrial aplicada à rotina real da operação",
  "Fluxos de trabalho mais padronizados e previsíveis",
  "Menos retrabalho entre engenharia, preparo e produção",
  "Visão clara do processo de ponta a ponta",
]

const valueCards = [
  {
    title: "Automação industrial",
    description: "Integramos software, etapas técnicas e rotina de produção com mais consistência.",
    icon: Bot,
  },
  {
    title: "Fluxo de trabalho",
    description: "Conectamos atividades que hoje ficam soltas e consomem tempo da equipe.",
    icon: Workflow,
  },
  {
    title: "Menos retrabalho",
    description: "Padronização de saída, menos ajustes manuais e mais confiança no processo.",
    icon: ShieldCheck,
  },
  {
    title: "Economia na linha",
    description: "Mais previsibilidade operacional, menos perda e melhor ritmo de produção.",
    icon: Factory,
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
    <section className="relative w-full overflow-hidden bg-[#020814] py-16 text-surface md:py-20 lg:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#030815_0%,#071427_55%,#07111d_100%)]" />
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(rgba(28,140,140,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(28,140,140,0.12) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="space-y-4">
              <div className="inline-flex rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-secondary shadow-[0_0_18px_rgba(43,219,218,0.12)]">
                Lypsyos | Automação industrial aplicada
              </div>
              <h1 className="max-w-[12ch] text-4xl font-extrabold tracking-tight text-surface sm:text-5xl xl:text-6xl">
                Transformamos gargalos operacionais em{" "}
                <span className="text-secondary">fluxos mais claros, econômicos e escaláveis</span>
              </h1>
              <p className="max-w-[620px] text-[15px] leading-7 text-surface/78 md:text-lg">
                A Lypsyos atua com automação industrial, organização de fluxo de trabalho e soluções
                próprias para reduzir retrabalho, dar mais visibilidade ao processo e gerar ganho real
                na rotina de engenharia e produção.
              </p>
            </div>

            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button size="lg" onClick={() => goTo("/contato", "hero_demo_lypsyos")}>
                Solicitar uma demonstração
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-surface/18 bg-surface/5 text-surface hover:bg-surface/10 hover:text-surface"
                onClick={() => goTo("/produtos", "hero_products_entry")}
              >
                <Play className="h-5 w-5" />
                Ver produtos
              </Button>
            </div>

            <ul className="grid gap-2.5 text-sm text-surface/88 md:grid-cols-2">
              {heroHighlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-surface/8 bg-surface/[0.03] px-3.5 py-2.5 backdrop-blur-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-surface/8 bg-surface/[0.03] px-4 py-3 text-sm text-surface/70 backdrop-blur-sm">
              Entregamos <span className="font-semibold text-secondary">mais controle, menos perda e mais ritmo operacional</span> para equipes que precisam evoluir com segurança.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto flex w-full max-w-[700px] items-center justify-center lg:max-w-none"
          >
            <div className="relative w-full overflow-hidden rounded-[34px] border border-secondary/18 bg-[linear-gradient(180deg,rgba(8,24,43,0.82),rgba(3,12,24,0.95))] p-5 shadow-[0_26px_70px_rgba(0,0,0,0.45)]">
              <div
                className="absolute inset-0 opacity-45"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 52% 50%, rgba(43,219,218,0.25), transparent 26%), radial-gradient(circle at 84% 20%, rgba(43,219,218,0.14), transparent 16%), radial-gradient(circle at 18% 74%, rgba(43,219,218,0.12), transparent 20%)",
                }}
              />
              <div className="absolute left-10 top-20 h-px w-32 bg-gradient-to-r from-secondary/0 via-secondary/55 to-secondary/0" />
              <div className="absolute right-12 top-24 h-px w-40 bg-gradient-to-r from-secondary/0 via-secondary/55 to-secondary/0" />

              <div className="relative space-y-4">
                <div className="rounded-[24px] border border-secondary/16 bg-surface/[0.03] px-4 py-4 backdrop-blur-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">
                    O que a Lypsyos entrega
                  </p>
                  <p className="mt-2 text-lg font-semibold text-surface">
                    Visão mais clara do processo, menos retrabalho e mais economia operacional.
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {valueCards.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[22px] border border-secondary/18 bg-[linear-gradient(180deg,rgba(10,28,49,0.88),rgba(5,15,28,0.95))] px-4 py-4 shadow-[0_12px_24px_rgba(0,0,0,0.22)]"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-secondary/25 bg-secondary/10 text-secondary">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-surface/72">{item.description}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
