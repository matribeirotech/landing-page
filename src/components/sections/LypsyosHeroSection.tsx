import { Link } from "react-router-dom"
import { ArrowRight, Bot, Cpu, ShieldCheck, Sparkles, Zap, MessageCircle } from "lucide-react"
import { motion } from "motion/react"
import { buttonVariants } from "@/components/ui/Button"
import { WHATSAPP_URL } from "@/content/site"
import { trackEvent } from "@/services/analytics"

const guarantees = [
  "Tecnologia em nuvem de alta disponibilidade",
  "Isolamento multitenant de nível bancário",
  "Design humanizado pensado para o dia a dia",
]

export function LypsyosHeroSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white pb-16 pt-12 md:pb-24 md:pt-20">
      {/* Elementos visuais de fundo */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[36rem] rounded-full bg-brand/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 size-[32rem] rounded-full bg-growth/12 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
              <span className="size-2 rounded-full bg-growth animate-pulse" aria-hidden="true" />
              Tecnologia, Sistemas Inteligentes & Automação de Negócios
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl/tight">
              Aceleramos seu negócio com sistemas modernos e{" "}
              <span className="text-brand">automação inteligente.</span>
            </h1>

            <p className="max-w-2xl text-lg text-ink-soft md:text-xl leading-relaxed">
              A <strong>Lypsyos</strong> desenvolve plataformas digitais, automações de atendimento e CRMs sob medida para empresas que desejam eliminar tarefas manuais, atender clientes com rapidez e ter controle total do seu faturamento.
            </p>

            {/* Ações principais */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full sm:w-auto">
              <Link
                to="/zenda"
                className={buttonVariants({ size: "lg", className: "w-full sm:w-auto shadow-lg shadow-brand/25 gap-2 font-bold" })}
                onClick={() => {
                  void trackEvent({
                    eventName: "home_hero_zenda_click",
                    category: "navigation",
                    label: "lypsyos_hero",
                  })
                }}
              >
                <Sparkles className="size-5 text-growth" /> Conhecer o Produto Zenda
                <ArrowRight className="size-5" />
              </Link>
              <Link
                to="/contato"
                className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto" })}
              >
                Fale com Nossos Especialistas
              </Link>
            </div>

            {/* Garantias institucionais */}
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 pt-4 text-xs sm:text-sm text-ink-soft">
              {guarantees.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <ShieldCheck className="size-4.5 text-growth shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

