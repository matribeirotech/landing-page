import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  Bot,
  CalendarCheck2,
  CheckCircle2,
  Eye,
  Heart,
  MessageCircle,
  Scissors,
  Sparkles,
  Smartphone,
  TrendingUp,
  Zap,
} from "lucide-react"
import { motion } from "motion/react"
import { buttonVariants } from "@/components/ui/Button"
import { LypsyosIconBadge } from "@/components/ui/LypsyosIconBadge"
import { WHATSAPP_URL } from "@/content/site"
import { trackEvent } from "@/services/analytics"
import { cn } from "@/utils/cn"

// Imagem real do painel Zenda
import zendaDashboardImg from "@/assets/images/zenda/zenda-dashboard-real.png"

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
    eventName: "zenda_hero_cta_click",
    category: "conversion",
    label,
  }).catch((error) => {
    console.error("Não foi possível rastrear o CTA do hero Zenda", error)
  })
}

export function ZendaHeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative isolate w-full overflow-hidden bg-white pb-14 pt-10 md:pb-20 md:pt-16">
      {/* Luzes decorativas difusas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[36rem] rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 size-[32rem] rounded-full bg-growth/12 blur-3xl"
      />

      <div className="container mx-auto grid items-center gap-10 px-4 md:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        {/* Coluna da Esquerda: Textos, Proposta de Valor e CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex min-w-0 flex-col gap-5 sm:gap-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline-flex max-w-full w-fit items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-brand md:text-[0.8125rem]">
              <span className="size-2 shrink-0 rounded-full bg-growth animate-pulse" aria-hidden="true" />
              <span>Zenda by Lypsyos &bull; Robô WhatsApp 24/7 &bull; CRM</span>
            </p>
            <span className="inline-flex items-center gap-1 rounded-full bg-growth-soft px-2.5 py-1 text-[11px] font-bold text-growth-text">
              <Zap className="size-3" /> 30 Dias Grátis
            </span>
          </div>

          <h1 className="text-[2rem] font-bold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08] break-words">
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
                  <linearGradient id="zenda-hero-underline" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#2457f5" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <path
                  d="M2 9 C 60 2, 150 2, 218 7"
                  fill="none"
                  stroke="url(#zenda-hero-underline)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            O fim do <em>&ldquo;vou ver meu horário e te respondo&rdquo;</em>. O <strong>Zenda</strong> é o sistema de agendamento com robô no WhatsApp que verifica disponibilidade em tempo real, preenche sua agenda 24/7 e sincroniza tudo com seu CRM e celular.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contato"
              className={buttonVariants({
                size: "lg",
                className: "shadow-xl shadow-brand/25 bg-brand hover:bg-brand-hover text-white text-base py-3.5",
              })}
              onClick={() => trackHeroCta("zenda_comecar_teste_gratis")}
            >
              Começar Teste Grátis de 30 Dias
              <ArrowRight className="size-5 shrink-0" aria-hidden="true" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "gap-2 border-line bg-white hover:border-[#25D366] hover:bg-emerald-50/50 text-base py-3.5",
              })}
              onClick={() => trackHeroCta("zenda_demo_whatsapp")}
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

        {/* Coluna da Direita: Showcase Visual Híbrido (Desktop Real + Celular Flutuante) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative mx-auto w-full max-w-[620px] select-none"
        >
          {/* Card Principal: Monitor com a Imagem Real do Dashboard Zenda */}
          <div className="relative rounded-3xl border border-line bg-white p-2.5 shadow-2xl transition-all duration-500 hover:shadow-brand/10">
            {/* Barra superior de monitor/browser */}
            <div className="mb-2 flex items-center justify-between rounded-xl bg-night px-3.5 py-2 text-white text-xs">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-red-500/80" />
                <span className="size-2.5 rounded-full bg-amber-500/80" />
                <span className="size-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[10px] text-white/50">app.lypsyos.com/crm</span>
              </div>
              <span className="rounded bg-growth/20 px-2 py-0.5 text-[10px] font-bold text-growth">
                ROBÔ ATIVO 24/7
              </span>
            </div>

            {/* Imagem Real do Zenda */}
            <div className="overflow-hidden rounded-xl border border-line/60">
              <img
                src={zendaDashboardImg}
                alt="Painel Zenda CRM com indicadores de faturamento e agendamentos"
                className="w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                loading="eager"
                fetchPriority="high"
              />
            </div>

            {/* Badge Flutuante 1: Resposta em 2s */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute -top-4 right-4 flex items-center gap-2 rounded-2xl border border-line bg-white/95 px-3.5 py-2 shadow-xl backdrop-blur-md"
            >
              <div className="flex size-7 items-center justify-center rounded-lg bg-growth-soft text-growth-text">
                <Zap className="size-4 animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold text-ink">Resposta em 2s</p>
                <p className="text-[10px] text-ink-soft">Agendamento 100% automático</p>
              </div>
            </motion.div>

            {/* Badge Flutuante 2: Resumo Matinal */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-5 left-6 hidden sm:flex items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-2.5 shadow-xl backdrop-blur-md"
            >
              <div className="flex size-8 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Sparkles className="size-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                  RESUMO MATINAL &bull; 08:00
                </p>
                <p className="text-xs font-bold text-ink">6 agendamentos confirmados hoje</p>
                <p className="text-[10px] font-semibold text-growth-text">Faturamento previsto: R$ 540,00</p>
              </div>
            </motion.div>
          </div>

          {/* Celular Flutuante com WhatsApp (Sobreposição Realista) */}
          <motion.div
            animate={{
              y: isHovered ? -8 : 0,
              rotate: isHovered ? -1 : 0,
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="absolute -bottom-8 -right-4 w-[210px] sm:w-[240px] rounded-[2rem] border-4 border-night bg-black p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] z-20"
          >
            <div className="overflow-hidden rounded-[1.6rem] bg-[#0b141a] text-white">
              {/* Header do WhatsApp no celular flutuante */}
              <div className="flex items-center gap-2 bg-[#1f2c34] px-3 py-2 text-xs">
                <div className="flex size-6 items-center justify-center rounded-full bg-growth text-white font-bold text-[10px]">
                  Z
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-[11px]">Studio Bella Vista</p>
                  <p className="text-[9px] text-emerald-400">Robô online 24h</p>
                </div>
              </div>

              {/* Mensagens animadas no celular */}
              <div className="flex flex-col gap-2 p-2.5 text-[10px] leading-tight">
                <div className="self-start max-w-[90%] rounded-xl rounded-tl-sm bg-[#202c33] p-2">
                  <p className="text-emerald-300 font-semibold mb-0.5">Assistente Virtual</p>
                  <p>Olá! Temos vagas para amanhã: 1) 10:00 &bull; 2) 14:30</p>
                </div>

                <div className="self-end rounded-xl rounded-tr-sm bg-[#005c4b] px-3 py-1.5">
                  <p className="font-bold">2 (14:30)</p>
                </div>

                <div className="self-start max-w-[92%] rounded-xl rounded-tl-sm bg-[#202c33] p-2 ring-1 ring-growth/40">
                  <p className="text-growth font-bold flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> Agendamento Confirmado!
                  </p>
                  <p className="mt-0.5 text-white/80">Alongamento em Gel às 14:30. Te esperamos! ✨</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Faixa de Confiança Multi-Nicho */}
      <div className="container mx-auto mt-14 px-4 md:mt-20 md:px-6">
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
