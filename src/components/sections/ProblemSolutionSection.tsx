import {
  ArrowDown,
  ArrowRight,
  Bot,
  CalendarX2,
  CalendarCheck2,
  ClockAlert,
  Flame,
  MessageSquareWarning,
  Sparkles,
  Zap,
} from "lucide-react"
import { motion } from "motion/react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { homeSections } from "@/content/site"

const pairs = [
  {
    pain: {
      title: "Horas perdidas no WhatsApp",
      text: "Você interrompe o atendimento a cada 10 minutos para responder 'vou ver meu horário e te aviso', perdendo clientes que não querem esperar.",
      icon: MessageSquareWarning,
    },
    solution: {
      title: "Robô Atendente 24/7",
      text: "O robô responde em 2 segundos, consulta horários livres e fecha agendamentos sozinho — de madrugada ou no meio do seu atendimento.",
      icon: Bot,
    },
  },
  {
    pain: {
      title: "Caderno, papel e mensagens soltas",
      text: "Anotações rasuradas, horários perdidos e nenhuma previsibilidade de quanto você realmente vai faturar no fim do mês.",
      icon: CalendarX2,
    },
    solution: {
      title: "Central de Gestão & CRM 3-em-1",
      text: "Visualize seu dia em Cartões, Lista ou Tabela. Faturamento do dia e da semana calculados automaticamente na palma da sua mão.",
      icon: CalendarCheck2,
    },
  },
  {
    pain: {
      title: "Conflito de horários (Overbooking)",
      text: "Marcar duas clientes no mesmo horário por distração na correria do dia a dia, gerando constrangimento e atrasos.",
      icon: Flame,
    },
    solution: {
      title: "Zero risco de marcação dupla",
      text: "O robô consulta a agenda em milissegundos. Horários já ocupados somem das opções, garantindo 100% de precisão.",
      icon: Zap,
    },
  },
  {
    pain: {
      title: "Clientes que esquecem e faltam",
      text: "Cliente que não aparece, cadeira vazia de surpresa e você perdendo dinheiro sem tempo hábil para encaixar outra pessoa.",
      icon: ClockAlert,
    },
    solution: {
      title: "Lembretes & Google Agenda",
      text: "Resumo matinal diário no celular, alertas sonoros sincronizados com Google Calendar e disparo de confirmação no WhatsApp com 1 clique.",
      icon: Sparkles,
    },
  },
]

export function ProblemSolutionSection() {
  return (
    <section
      id={homeSections.why}
      aria-labelledby="problem-solution-title"
      className="w-full bg-canvas py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          titleId="problem-solution-title"
          eyebrow="Por que a Lypsyos"
          title={
            <>
              Sua agenda não precisa de mais papel. Precisa de <span className="text-brand">automação inteligente.</span>
            </>
          }
          description="Profissionais de beleza perdem até 4 horas por dia apenas respondendo mensagens sobre horários. Veja a diferença entre a rotina manual e a rotina com o Lypsyos."
        />

        <div className="mt-10 hidden grid-cols-[1fr_auto_1fr] items-center gap-x-6 px-1 text-sm font-semibold uppercase tracking-[0.08em] md:grid">
          <p className="text-ink-soft">Rotina Manual (Caderno / WhatsApp Comum)</p>
          <span className="w-10" />
          <p className="text-growth-text">Com a Plataforma Lypsyos</p>
        </div>

        <ul className="mt-6 flex flex-col gap-5 md:gap-4">
          {pairs.map((pair, index) => (
            <motion.li
              key={pair.pain.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-6"
            >
              <div className="flex gap-4 rounded-card border border-line bg-white p-5 md:p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-danger-soft text-danger">
                  <pair.pain.icon className="size-5.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted md:hidden">Sem a Lypsyos</p>
                  <h3 className="text-lg font-semibold text-ink">{pair.pain.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">{pair.pain.text}</p>
                </div>
              </div>

              <span className="flex items-center justify-center text-brand" aria-hidden="true">
                <ArrowDown className="size-5 md:hidden" />
                <span className="hidden size-10 items-center justify-center rounded-full bg-white shadow-soft md:flex">
                  <ArrowRight className="size-5" />
                </span>
              </span>

              <div className="flex gap-4 rounded-card border border-growth/25 bg-growth-soft p-5 md:p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-growth-text shadow-sm">
                  <pair.solution.icon className="size-5.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-growth-text md:hidden">Com a Lypsyos</p>
                  <h3 className="text-lg font-semibold text-ink">{pair.solution.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">{pair.solution.text}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        <p className="mx-auto mt-12 max-w-2xl text-center font-heading text-xl font-semibold leading-snug text-ink md:text-2xl">
          Atendimento automático, agenda cheia e você com tempo livre para descansar.{" "}
          <span className="text-brand">É isso que o Lypsyos entrega todos os dias.</span>
        </p>
      </div>
    </section>
  )
}
