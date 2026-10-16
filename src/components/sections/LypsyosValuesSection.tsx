import { HeartHandshake, Lightbulb, Zap } from "lucide-react"
import { motion } from "motion/react"
import { LypsyosIconBadge, type LypsyosIconTone } from "@/components/ui/LypsyosIconBadge"

const values: {
  title: string
  desc: string
  icon: typeof Lightbulb
  tone: LypsyosIconTone
}[] = [
  {
    title: "Tecnologia Prática, Sem Burocracia",
    desc: "Não criamos sistemas cheios de menus complexos que ninguém usa. Nossas interfaces são desenhadas para serem aprendidas em minutos.",
    icon: Lightbulb,
    tone: "brand",
  },
  {
    title: "Foco na Experiência do Cliente Final",
    desc: "Seu cliente não precisa baixar apps pesados nem criar cadastros demorados. Ele agenda com 2 toques no WhatsApp em menos de 1 minuto.",
    icon: Zap,
    tone: "growth",
  },
  {
    title: "Suporte Próximo & Humanizado",
    desc: "Atendimento direto com quem desenvolve a tecnologia. Respostas rápidas e acompanhamento passo a passo na implantação.",
    icon: HeartHandshake,
    tone: "cyan",
  },
]

export function LypsyosValuesSection() {
  return (
    <section aria-labelledby="values-title" className="w-full overflow-hidden bg-canvas py-16 md:py-20 border-t border-line">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">Diferenciais Lypsyos</p>
          <h2 id="values-title" className="font-heading text-2xl font-bold text-ink sm:text-3xl">
            Por que empresas confiam na nossa tecnologia
          </h2>
          <p className="text-sm text-ink-soft sm:text-base">
            Combinamos engenharia de software avançada com a realidade de quem atende no dia a dia.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v, index) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group flex flex-col gap-3.5 rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift"
            >
              <LypsyosIconBadge icon={v.icon} tone={v.tone} size="md" />
              <h3 className="font-heading text-base font-bold text-ink">{v.title}</h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
