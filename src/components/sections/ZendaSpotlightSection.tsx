import { Link } from "react-router-dom"
import { ArrowRight, Bot, CalendarCheck2, CheckCircle2, MessageCircle, Smartphone, Sparkles, Zap } from "lucide-react"
import { motion } from "motion/react"
import { buttonVariants } from "@/components/ui/Button"
import { WHATSAPP_URL } from "@/content/site"

const zendaHighlights = [
  {
    title: "Robô WhatsApp 24/7",
    desc: "Atendimento automático com URA intuitiva por letras e números. Fecha agendamentos em menos de 1 minuto.",
    icon: Bot,
  },
  {
    title: "Central CRM 3-em-1",
    desc: "Modo Cartões, Lista Cronológica ou Tabela. Faturamento do dia calculado em tempo real.",
    icon: CalendarCheck2,
  },
  {
    title: "App Móvel PWA",
    desc: "Instalação direta no iPhone ou Android com 1 clique, sem taxas nem burocracia de App Store.",
    icon: Smartphone,
  },
  {
    title: "Zero Double-Booking",
    desc: "Verificação de disponibilidade em milissegundos. Conflitos de horários eliminados.",
    icon: Zap,
  },
]

export function ZendaSpotlightSection() {
  return (
    <section aria-labelledby="zenda-spotlight-title" className="w-full bg-canvas py-16 md:py-24 border-y border-line">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand/30 bg-white p-7 shadow-lift sm:p-12 lg:p-16"
        >
          {/* Decoração sutil */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-brand/10 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-growth/15 blur-3xl" />

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-growth-soft px-3.5 py-1 text-xs font-bold text-growth-text">
                <Sparkles className="size-4" /> Produto Oficial da Casa
              </div>

              <div className="space-y-3">
                <h2 id="zenda-spotlight-title" className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
                  Conheça o <span className="text-brand">Zenda</span>: O CRM de Agendamentos com Robô no WhatsApp
                </h2>
                <p className="font-heading text-lg font-semibold text-growth-text sm:text-xl">
                  Enquanto você atende uma cliente, o Zenda agenda as próximas cinco.
                </p>
                <p className="text-base text-ink-soft leading-relaxed">
                  Criado sob medida para salões de beleza, barbearias, manicures, estéticas e spas. O Zenda opera como seu gerente virtual 24 horas por dia, garantindo agenda cheia, respostas em 2 segundos e faturamento previsível.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {zendaHighlights.map((feat) => (
                  <div key={feat.title} className="rounded-2xl border border-line bg-canvas p-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-brand font-bold text-sm">
                      <feat.icon className="size-4.5" />
                      <span>{feat.title}</span>
                    </div>
                    <p className="text-xs text-ink-soft leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
                <Link
                  to="/zenda"
                  className={buttonVariants({ size: "lg", className: "w-full sm:w-auto shadow-lg shadow-brand/20 font-bold" })}
                >
                  Ver Demonstração Completa do Zenda
                  <ArrowRight className="size-5" />
                </Link>
                <Link
                  to="/planos"
                  className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto" })}
                >
                  Ver Planos & Preços (30 Dias Grátis)
                </Link>
              </div>
            </div>

            {/* Card visual de destaque do Zenda */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="rounded-3xl border border-line bg-night p-6 text-white shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-brand text-white font-bold text-lg">
                      Z
                    </span>
                    <div>
                      <p className="font-heading font-bold text-white text-lg">Zenda Platform</p>
                      <p className="text-xs text-white/60">Sistema de Agendamento</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-growth-soft px-3 py-1 text-xs font-semibold text-growth-text">
                    Robô Ativo 24/7
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-1">
                    <p className="text-xs text-white/60">Faturamento previsto hoje</p>
                    <p className="font-heading text-3xl font-extrabold text-growth">R$ 540,00</p>
                    <p className="text-xs text-white/70">6 clientes confirmadas pelo robô</p>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <Bot className="size-5 text-brand" />
                      <div>
                        <p className="font-semibold text-white">Último agendamento</p>
                        <p className="text-white/60">Camila Silva • Alongamento em Gel</p>
                      </div>
                    </div>
                    <span className="font-bold text-growth">14:30</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-xs text-white/60">
                    Disponível com 30 dias de teste grátis sem compromisso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

