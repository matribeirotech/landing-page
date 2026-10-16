import { ComparisonSection } from "@/components/sections/ComparisonSection"
import { FinalCtaSection } from "@/components/sections/FinalCtaSection"
import { LypsyosIconBadge, type LypsyosIconTone } from "@/components/ui/LypsyosIconBadge"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"
import { Clock, ShieldCheck, TrendingUp, Users } from "lucide-react"
import { motion } from "motion/react"

const roiCards: {
  title: string
  desc: string
  icon: typeof Clock
  tone: LypsyosIconTone
}[] = [
  {
    title: "Economia de 2 a 4 horas por dia",
    desc: "Acabe com o tempo gasto digitando mensagens manuais, negociando horários e checando cadernos rasurados.",
    icon: Clock,
    tone: "brand",
  },
  {
    title: "Zero conflito de agenda (Double booking)",
    desc: "O robô consulta a disponibilidade no milissegundo em que a cliente solicita. Não há chance de erro humano.",
    icon: ShieldCheck,
    tone: "growth",
  },
  {
    title: "+35% de taxa de comparecimento",
    desc: "Com o lembrete proativo e sincronização com o Google Agenda, suas clientes não esquecem o horário marcado.",
    icon: TrendingUp,
    tone: "cyan",
  },
  {
    title: "Atendimento 24 horas por dia",
    desc: "Mais de 40% dos agendamentos de salão acontecem de noite ou aos finais de semana quando o comércio está fechado.",
    icon: Users,
    tone: "brand",
  },
]

export function Comparison() {
  useDocumentMetadata({
    title: "Comparativo de Sistemas de Agendamento & CRM WhatsApp | Zenda Lypsyos",
    description:
      "Compare a gestão manual no caderno, sistemas genéricos de ERP e a automação do Zenda com robô no WhatsApp 24/7. Descubra seu retorno sobre o investimento.",
    keywords:
      "comparativo sistema de agendamento, crm de agendamento whatsapp, melhor sistema para salão de beleza, software barbearia, zenda comparativo",
    canonicalPath: "/comparativo",
    ogType: "article",
  })

  return (
    <main className="flex flex-col overflow-hidden bg-white">
      {/* Hero da página Comparativo */}
      <section className="relative overflow-hidden bg-white py-14 md:py-20 border-b border-line">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[32rem] rounded-full bg-brand/10 blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">
              Transparência & Retorno sobre o Investimento
            </p>
            <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-5xl break-words">
              Comparativo: Forma Manual vs. Outros Sistemas vs. <span className="text-growth-text">Zenda</span>
            </h1>
            <p className="text-sm text-ink-soft sm:text-lg leading-relaxed">
              Descubra por que dezenas de profissionais de beleza e bem-estar abandonaram de vez os cadernos e sistemas complicados para adotar o Zenda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabela de Comparação */}
      <ComparisonSection />

      {/* Cards de Métricas e Benefícios de ROI */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
              O impacto real no faturamento do seu espaço
            </h2>
            <p className="mt-2 text-sm text-ink-soft sm:text-base">
              Menos tempo perdido com tarefas operacionais significa mais clientes atendidas com excelência.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roiCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group rounded-2xl border border-line bg-canvas p-6 shadow-soft space-y-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:bg-white hover:shadow-lift"
              >
                <LypsyosIconBadge icon={card.icon} tone={card.tone} size="md" />
                <h3 className="font-heading text-base font-bold text-ink">{card.title}</h3>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSection />
    </main>
  )
}

