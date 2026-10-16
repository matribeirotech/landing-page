import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle2, MessageCircle, Sparkles, Scissors, Heart, Eye } from "lucide-react"
import { motion } from "motion/react"
import { buttonVariants } from "@/components/ui/Button"
import { LypsyosIconBadge } from "@/components/ui/LypsyosIconBadge"
import { HeroDevices } from "@/components/mockups/DeviceMockups"
import { WHATSAPP_URL } from "@/content/site"
import { trackEvent } from "@/services/analytics"

const reassurances = [
  "30 dias de teste grátis sem compromisso",
  "Sem necessidade de cartão de crédito",
  "Configure seu robô em apenas 2 minutos",
]

const segments = [
  { label: "Manicures & Nails", icon: Sparkles, tone: "growth" as const },
  { label: "Barbearias", icon: Scissors, tone: "brand" as const },
  { label: "Salões de Beleza", icon: Heart, tone: "cyan" as const },
  { label: "Clínicas de Estética", icon: Eye, tone: "brand" as const },
]

function trackHeroCta(label: string) {
  void trackEvent({
    eventName: "hero_cta_click",
    category: "conversion",
    label,
  }).catch((error) => {
    console.error("Não foi possível rastrear o CTA do hero", error)
  })
}

export function HeroSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white pb-14 pt-10 md:pb-20 md:pt-16">
      {/* Blobs decorativos da marca */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[34rem] rounded-full bg-brand/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 size-[30rem] rounded-full bg-growth/12 blur-3xl" />

      <div className="container mx-auto grid items-center gap-10 px-4 md:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex min-w-0 flex-col gap-5 sm:gap-6"
        >
          <p className="inline-flex max-w-full w-fit items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-brand md:text-[0.8125rem]">
            <span className="size-2 shrink-0 rounded-full bg-growth animate-pulse" aria-hidden="true" />
            <span className="truncate sm:whitespace-normal">
              Zenda by Lypsyos &bull; Robô WhatsApp 24/7 &bull; CRM
            </span>
          </p>

          <h1 className="text-[1.95rem] font-bold leading-[1.14] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08] break-words">
            Enquanto você atende uma cliente, o Zenda{" "}
            <span className="relative inline-block text-growth-text">
              agenda as próximas cinco.
              <svg
                aria-hidden="true"
                viewBox="0 0 220 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 h-2.5 w-full md:-bottom-2 md:h-3"
              >
                <defs>
                  <linearGradient id="hero-underline" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#2457f5" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <path d="M2 9 C 60 2, 150 2, 218 7" fill="none" stroke="url(#hero-underline)" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            O fim do <em>&ldquo;vou ver meu horário e te respondo&rdquo;</em>. O <strong>Zenda</strong> é o sistema de agendamento com robô no WhatsApp que verifica disponibilidade em tempo real, preenche sua agenda 24/7 e sincroniza tudo com seu CRM e celular.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contato"
              className={buttonVariants({ size: "lg", className: "shadow-lg shadow-brand/20" })}
              onClick={() => trackHeroCta("hero_comecar_teste_gratis")}
            >
              Começar Teste Grátis de 30 Dias
              <ArrowRight className="size-5 shrink-0" aria-hidden="true" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "lg", variant: "outline", className: "gap-2" })}
              onClick={() => trackHeroCta("hero_demo_whatsapp")}
            >
              <MessageCircle className="size-5 shrink-0 text-[#25D366]" aria-hidden="true" />
              Ver Demonstração no WhatsApp
            </a>
          </div>

          <p className="text-xs text-ink-muted">
            Sem cartão de crédito &bull; Cancele quando quiser &bull; Ativação imediata
          </p>

          <ul className="flex flex-col gap-2 text-sm text-ink-soft sm:flex-row sm:flex-wrap sm:gap-x-5">
            {reassurances.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="size-4.5 shrink-0 text-growth" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto w-full min-w-0 max-w-[42rem]"
        >
          <HeroDevices />
        </motion.div>
      </div>

      {/* Faixa de confiança multi-nicho */}
      <div className="container mx-auto mt-14 px-4 md:mt-18 md:px-6">
        <div className="flex flex-col items-center gap-5 rounded-card border border-line bg-canvas px-5 py-5 text-center md:flex-row md:justify-between md:text-left">
          <p className="max-w-md text-sm font-medium text-ink-soft md:text-base">
            Desenvolvido sob medida para profissionais de beleza, estética e bem-estar:
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {segments.map((segment) => (
              <li key={segment.label} className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                <LypsyosIconBadge icon={segment.icon} tone={segment.tone} size="sm" />
                <span>{segment.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
