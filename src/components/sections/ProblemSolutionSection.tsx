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
import { LypsyosIconBadge } from "@/components/ui/LypsyosIconBadge"
import { homeSections } from "@/content/site"

const pairs = [
  {
    pain: {
      title: "Horas perdidas no WhatsApp",
      text: "Você para o atendimento toda hora para responder 'vou ver meu horário e te aviso', perdendo clientes que não querem esperar.",
      icon: MessageSquareWarning,
    },
    solution: {
      title: "Robô que Responde no Mesmo Segundo",
      text: "O Zenda responde na hora, mostra os horários livres e marca a cliente sozinho — de madrugada, no almoço ou enquanto você atende.",
      icon: Bot,
    },
  },
  {
    pain: {
      title: "Caderno riscado e mensagens soltas",
      text: "Anotações perdidas no papel e nenhuma certeza de quanto dinheiro você realmente vai receber no fim do dia.",
      icon: CalendarX2,
    },
    solution: {
      title: "Agenda e Caixa no Seu Celular",
      text: "Veja seus horários do dia e o faturamento previsto hoje calculado sozinho na tela do seu telefone.",
      icon: CalendarCheck2,
    },
  },
  {
    pain: {
      title: "Duas clientes no mesmo horário",
      text: "Acabar marcando duas pessoas na mesma hora na correria do dia a dia, gerando atraso e dor de cabeça.",
      icon: Flame,
    },
    solution: {
      title: "Sem Risco de Choque de Horários",
      text: "Assim que uma cliente escolhe um horário, ele some na hora para as próximas. Impossível marcar duas pessoas juntas.",
      icon: Zap,
    },
  },
  {
    pain: {
      title: "Cliente que esquece e dá bolo",
      text: "A cliente não aparece, sua cadeira fica vazia de surpresa e você perde dinheiro sem tempo de encaixar outra pessoa.",
      icon: ClockAlert,
    },
    solution: {
      title: "Avisos e Lembretes Automáticos",
      text: "Resumo toda manhã no seu celular e botão de 1 toque para confirmar presença com a cliente pelo WhatsApp.",
      icon: Sparkles,
    },
  },
]

export function ProblemSolutionSection() {
  return (
    <section
      id={homeSections.why}
      aria-labelledby="problem-solution-title"
      className="w-full overflow-hidden bg-canvas py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          titleId="problem-solution-title"
          eyebrow="Por que usar o Zenda"
          title={
            <>
              Sua agenda não precisa de mais papel. Precisa de <span className="text-brand">automação inteligente.</span>
            </>
          }
          description="Quem trabalha com beleza perde até 4 horas por dia só respondendo mensagens de horário. Veja a diferença entre fazer tudo na mão e ter o Zenda trabalhando por você."
        />

        <div className="mt-10 hidden grid-cols-[1fr_auto_1fr] items-center gap-x-6 px-1 text-sm font-semibold uppercase tracking-[0.08em] md:grid">
          <p className="text-ink-soft">No Caderno / WhatsApp Manual</p>
          <span className="w-10" />
          <p className="text-growth-text">Com o Zenda no Seu Celular</p>
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
              <div className="group flex gap-4 rounded-card border border-line bg-white p-5 md:p-6">
                <LypsyosIconBadge icon={pair.pain.icon} tone="danger" size="md" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted md:hidden">Sem o Zenda</p>
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

              <div className="group flex gap-4 rounded-card border border-growth/25 bg-growth-soft p-5 md:p-6">
                <LypsyosIconBadge icon={pair.solution.icon} tone="growth" size="md" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-growth-text md:hidden">Com o Zenda</p>
                  <h3 className="text-lg font-semibold text-ink">{pair.solution.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">{pair.solution.text}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        <p className="mx-auto mt-12 max-w-2xl text-center font-heading text-xl font-semibold leading-snug text-ink md:text-2xl">
          Atendimento no mesmo segundo, agenda cheia e você com sossego para trabalhar.{" "}
          <span className="text-brand">É isso que o Zenda faz por você todos os dias.</span>
        </p>
      </div>
    </section>
  )
}
