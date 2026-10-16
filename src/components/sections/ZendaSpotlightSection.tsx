import { Link } from "react-router-dom"
import { ArrowRight, Bot, CalendarCheck2, Smartphone, Sparkles, Zap } from "lucide-react"
import { motion } from "motion/react"
import { buttonVariants } from "@/components/ui/Button"
import { LypsyosIconBadge, type LypsyosIconTone } from "@/components/ui/LypsyosIconBadge"

const zendaHighlights: {
  title: string
  desc: string
  icon: typeof Bot
  tone: LypsyosIconTone
}[] = [
  {
    title: "Robô WhatsApp 24/7",
    desc: "Atendimento automático com URA intuitiva por letras e números. Fecha agendamentos em menos de 1 minuto.",
    icon: Bot,
    tone: "growth",
  },
  {
    title: "Central CRM 3-em-1",
    desc: "Modo Cartões, Lista Cronológica ou Tabela. Faturamento do dia calculado em tempo real.",
    icon: CalendarCheck2,
    tone: "brand",
  },
  {
    title: "App Móvel PWA",
    desc: "Instalação direta no iPhone ou Android com 1 clique, sem taxas nem burocracia de App Store.",
    icon: Smartphone,
    tone: "cyan",
  },
  {
    title: "Zero Double-Booking",
    desc: "Verificação de disponibilidade em milissegundos. Conflitos de horários eliminados.",
    icon: Zap,
    tone: "brand",
  },
]

export function ZendaSpotlightSection() {
  return (
    <section aria-labelledby="zenda-spotlight-title" className="w-full overflow-hidden bg-canvas py-14 md:py-24 border-y border-line">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] border-2 border-brand/30 bg-white p-5 shadow-lift sm:p-10 lg:p-14"
        >
          {/* Decoração sutil */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-72 sm:size-80 rounded-full bg-brand/10 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-20 size-72 sm:size-80 rounded-full bg-growth/15 blur-3xl" />

          <div className="grid items-center gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
            <div className="min-w-0 space-y-5 sm:space-y-6">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-growth/25 bg-growth-soft px-3.5 py-1 text-xs font-bold text-growth-text">
                <Sparkles className="size-4 shrink-0" />
                <span className="truncate">Produto Oficial da Casa</span>
              </div>

              <div className="space-y-3">
                <h2
                  id="zenda-spotlight-title"
                  className="font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12] break-words"
                >
                  Conheça o <span className="text-brand">Zenda</span>: O CRM de Agendamentos com Robô no WhatsApp
                </h2>
                <p className="font-heading text-base font-semibold text-growth-text sm:text-xl leading-snug">
                  Enquanto você atende uma cliente, o Zenda agenda as próximas cinco.
                </p>
                <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                  Criado sob medida para salões de beleza, barbearias, manicures, estéticas e spas. O Zenda opera como seu gerente virtual 24 horas por dia, garantindo agenda cheia, respostas em 2 segundos e faturamento previsível.
                </p>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                {zendaHighlights.map((feat) => (
                  <div
                    key={feat.title}
                    className="group flex items-start gap-3.5 rounded-2xl border border-line bg-canvas/80 p-3.5 sm:p-4 transition-all hover:border-brand/30 hover:bg-white hover:shadow-soft"
                  >
                    <LypsyosIconBadge icon={feat.icon} tone={feat.tone} size="sm" />
                    <div className="min-w-0 space-y-1">
                      <p className="font-heading font-bold text-ink text-sm leading-tight">
                        {feat.title}
                      </p>
                      <p className="text-xs text-ink-soft leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Link
                  to="/zenda"
                  className={buttonVariants({ size: "lg", className: "w-full sm:w-auto shadow-lg shadow-brand/20 font-bold" })}
                >
                  <span>Ver Demonstração do Zenda</span>
                  <ArrowRight className="size-5 shrink-0" />
                </Link>
                <Link
                  to="/planos"
                  className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto" })}
                >
                  <span>Planos & Preços (30 Dias Grátis)</span>
                </Link>
              </div>
            </div>

            {/* Card visual de destaque do Zenda */}
            <div className="relative mx-auto w-full min-w-0 max-w-md lg:max-w-none">
              <div className="rounded-3xl border border-white/10 bg-night p-5 sm:p-6 text-white shadow-2xl space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-md">
                      <img src="/logo-oficial.png" alt="Lypsyos" className="size-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading font-bold text-white text-base sm:text-lg truncate">Zenda by Lypsyos</p>
                      <p className="text-xs text-white/60 truncate">Sistema de Agendamento</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-growth-soft px-3 py-1 text-[11px] font-semibold text-growth-text shrink-0">
                    Robô Ativo 24/7
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-1">
                    <p className="text-xs text-white/60">Faturamento previsto hoje</p>
                    <p className="font-heading text-2xl sm:text-3xl font-extrabold text-growth">R$ 540,00</p>
                    <p className="text-xs text-white/70">6 clientes confirmadas pelo robô</p>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <LypsyosIconBadge icon={Bot} tone="night" size="sm" />
                      <div className="min-w-0">
                        <p className="font-semibold text-white truncate">Último agendamento</p>
                        <p className="text-white/60 truncate">Camila Silva &bull; Alongamento em Gel</p>
                      </div>
                    </div>
                    <span className="font-bold text-growth shrink-0">14:30</span>
                  </div>
                </div>

                <div className="pt-1 text-center">
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
