import {
  Sparkles,
  Scissors,
  Heart,
  Eye,
  Activity,
  PenTool,
  Clock,
  Smartphone,
  ShieldCheck,
  Bot,
} from "lucide-react"
import { motion } from "motion/react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { homeSections } from "@/content/site"

const segments = [
  {
    title: "Manicures & Nail Designers",
    text: "Alongamento em Gel, Esmaltação em Gel, Banho de Gel e Spa dos Pés com duração e valores configurados.",
    icon: Sparkles,
  },
  {
    title: "Barbearias Modernas",
    text: "Corte degradê, barba, barboterapia, pigmentação e selagem com agendamento ágil para homens práticos.",
    icon: Scissors,
  },
  {
    title: "Salões de Beleza & Cabelo",
    text: "Escovas, coloração, mechas, hidratações e penteados com intervalo automático entre químicas.",
    icon: Heart,
  },
  {
    title: "Estética Facial & Corporal",
    text: "Limpeza de pele, drenagem, peeling e procedimentos estéticos com histórico detalhado da cliente.",
    icon: Eye,
  },
  {
    title: "Massoterapia & Spas",
    text: "Massagens relaxantes, ventosaterapia e terapias integrativas com controle rígido de salas e horários.",
    icon: Activity,
  },
  {
    title: "Tatuadores & Piercers",
    text: "Sessões por hora, avaliações prévias e cobrança facilitada de sinal de reserva via PIX.",
    icon: PenTool,
  },
]

const reasons = [
  {
    title: "Atendimento no WhatsApp 24/7",
    text: "O robô não para quando você fecha a porta. Sua agenda recebe clientes até aos domingos e de madrugada.",
    icon: Bot,
  },
  {
    title: "App Instalável sem App Store",
    text: "Instale direto no seu iPhone ou Android em 1 toque. Não ocupa espaço e abre em milissegundos.",
    icon: Smartphone,
  },
  {
    title: "Faturamento e agenda sob controle",
    text: "Resumo matinal diário na tela do celular e cálculo automático de faturamento previsto.",
    icon: ShieldCheck,
  },
]

export function AudienceSection() {
  return (
    <section id={homeSections.audience} aria-labelledby="audience-title" className="w-full bg-canvas py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          titleId="audience-title"
          eyebrow="Multi-Nicho"
          title={
            <>
              Feito sob medida para quem vive de <span className="text-brand">agenda e atendimento</span>
            </>
          }
          description="Seja você autônoma ou dona de um espaço movimentado, o Lypsyos se adapta instantaneamente ao seu catálogo de serviços."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {segments.map((segment, index) => (
            <motion.li
              key={segment.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group flex flex-col gap-3 rounded-card border border-line bg-white p-6 shadow-soft transition-[translate,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <segment.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold text-ink">{segment.title}</h3>
              <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{segment.text}</p>
            </motion.li>
          ))}
        </ul>

        {/* Por que profissionais escolhem a Lypsyos */}
        <div className="mt-14 rounded-card border border-line bg-white p-6 md:p-10 shadow-soft">
          <h3 className="text-center text-xl font-bold md:text-2xl text-ink">
            Por que profissionais da beleza escolhem a Lypsyos
          </h3>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {reasons.map((reason) => (
              <li key={reason.title} className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-growth-soft text-growth-text">
                  <reason.icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-bold text-ink">{reason.title}</p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">{reason.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
