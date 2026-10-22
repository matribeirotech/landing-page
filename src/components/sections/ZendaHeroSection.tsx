import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Heart,
  MessageCircle,
  Scissors,
  Sparkles,
  Zap,
} from "lucide-react"
import { motion } from "motion/react"
import { buttonVariants } from "@/components/ui/Button"
import { LypsyosIconBadge } from "@/components/ui/LypsyosIconBadge"
import { WHATSAPP_URL } from "@/content/site"
import { trackEvent } from "@/services/analytics"

// Imagem real limpa do painel Zenda (capturada via F12)
import zendaDashboardImg from "@/assets/images/zenda/interface-zenda-dashboard.png"

const reassurances = [
  "Instalação direta no iPhone ou Android com 1 clique, sem taxas nem burocracia de App Store.",
  "30 dias de teste grátis sem precisar de cartão de crédito",
  "Configurado em 2 minutos direto no seu WhatsApp",
]

const segments = [
  { label: "Manicures & Pedicures", icon: Sparkles, tone: "growth" as const },
  { label: "Barbearias", icon: Scissors, tone: "brand" as const },
  { label: "Salões de Beleza", icon: Heart, tone: "cyan" as const },
  { label: "Estética & Cílios", icon: Eye, tone: "brand" as const },
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
    <section className="relative isolate w-full overflow-hidden bg-white pb-12 pt-8 md:pb-20 md:pt-14">
      {/* Luzes decorativas suaves */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[32rem] rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 size-[28rem] rounded-full bg-growth/12 blur-3xl"
      />

      <div className="container mx-auto grid items-center gap-10 px-4 md:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        {/* Coluna da Esquerda: Textos Diretos, Sem Tecniquês e Focados na Dor */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex min-w-0 flex-col gap-5"
        >
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline-flex max-w-full w-fit items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.05em] text-brand">
              <span className="size-2 shrink-0 rounded-full bg-growth animate-pulse" aria-hidden="true" />
              <span>Zenda &bull; Robô de Agendamento no WhatsApp</span>
            </p>
            <span className="inline-flex items-center gap-1 rounded-full bg-growth-soft px-3 py-1 text-xs font-bold text-growth-text">
              <Zap className="size-3.5" /> 30 Dias Grátis
            </span>
          </div>

          <h1 className="text-[1.85rem] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08] break-words">
            O seu salão não pode parar porque você está{" "}
            <span className="text-brand">respondendo o WhatsApp.</span>
          </h1>

          {/* Slogan de Ouro */}
          <p className="font-heading text-lg font-bold text-growth-text sm:text-2xl leading-snug">
            &ldquo;Enquanto você atende uma cliente, o Zenda agenda as próximas cinco.&rdquo;
          </p>

          <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            O fim do <em>&ldquo;vou ver meu horário e te respondo&rdquo;</em>. O <strong>Zenda</strong> responde suas clientes no mesmo segundo pelo WhatsApp, mostra apenas os horários vagos e deixa sua agenda organizada automaticamente no celular.
          </p>

          {/* Botões Grandes e Fáceis de Tocar no Celular */}
          <div className="flex flex-col gap-3.5 pt-1 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                size: "lg",
                className:
                  "min-h-14 w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebe5b] text-white shadow-xl shadow-[#25D366]/25 text-base font-bold px-6 py-4 gap-2.5",
              })}
              onClick={() => trackHeroCta("zenda_whatsapp_direto")}
            >
              <MessageCircle className="size-5 shrink-0 fill-white text-white" aria-hidden="true" />
              Ver Funcionando no WhatsApp
            </a>

            <Link
              to="/contato"
              className={buttonVariants({
                size: "lg",
                className:
                  "min-h-14 w-full sm:w-auto shadow-lg shadow-brand/20 bg-brand hover:bg-brand-hover text-white text-base font-bold px-6 py-4",
              })}
              onClick={() => trackHeroCta("zenda_comecar_teste_gratis")}
            >
              Começar 30 Dias Grátis
              <ArrowRight className="size-5 shrink-0" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-1 flex flex-col gap-2.5 text-sm font-medium text-ink">
            {reassurances.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-growth" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Coluna da Direita: Destaque de Faturamento + Tela Real + WhatsApp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative mx-auto w-full max-w-[600px] select-none"
        >
          {/* Card de Brilhar os Olhos (Visível tanto no Celular quanto no PC) */}
          <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border-2 border-growth/40 bg-night px-4 py-3.5 text-white shadow-xl sm:px-5">
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-growth/20 text-growth">
                <Sparkles className="size-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                  Resumo na tela do seu celular &bull; 08:00
                </p>
                <p className="font-heading text-base font-extrabold text-growth sm:text-xl">
                  Faturamento previsto hoje: R$ 540,00
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-growth/20 px-3 py-1 text-xs font-bold text-growth">
              6 clientes hoje
            </span>
          </div>

          {/* Moldura Principal com a Imagem Real do Zenda */}
          <div className="relative rounded-3xl border border-line bg-white p-2.5 shadow-2xl">
            <div className="mb-2 flex items-center justify-between rounded-xl bg-night px-3.5 py-2 text-xs text-white">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-red-500/80" />
                <span className="size-2.5 rounded-full bg-amber-500/80" />
                <span className="size-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-semibold text-[11px] text-white/80">
                  Zenda &bull; Sua Agenda Sempre Cheia
                </span>
              </div>
              <span className="rounded bg-growth/20 px-2 py-0.5 text-[10px] font-bold text-growth">
                ROBÔ ATIVO 24H
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-line/60">
              <img
                src={zendaDashboardImg}
                alt="Tela real do Zenda mostrando o faturamento previsto e os horários marcados"
                className="w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>

            {/* Selo Flutuante: Mensagens no mesmo segundo */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="mt-3 flex items-center justify-between gap-2 rounded-2xl border border-growth/30 bg-growth-soft/60 px-3.5 py-2.5 sm:absolute sm:-bottom-5 sm:left-4 sm:mt-0 sm:bg-white/95 sm:shadow-xl sm:backdrop-blur-md"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-growth text-white">
                  <Zap className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-ink">Mensagens enviadas no mesmo segundo</p>
                  <p className="text-[11px] text-ink-soft">A cliente não espera e não vai para o concorrente</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Celular Flutuante com WhatsApp (Em telas maiores) */}
          <motion.div
            animate={{
              y: isHovered ? -6 : 0,
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="hidden sm:block absolute -bottom-8 -right-4 w-[230px] rounded-[2rem] border-4 border-night bg-black p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] z-20"
          >
            <div className="overflow-hidden rounded-[1.6rem] bg-[#0b141a] text-white">
              <div className="flex items-center gap-2 bg-[#1f2c34] px-3 py-2 text-xs">
                <div className="flex size-6 items-center justify-center rounded-full bg-growth text-white font-bold text-[10px]">
                  Z
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-[11px]">Studio Bella Vista</p>
                  <p className="text-[9px] text-emerald-400">Respondendo sozinho 24h</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-2.5 text-[10px] leading-tight">
                <div className="self-start max-w-[90%] rounded-xl rounded-tl-sm bg-[#202c33] p-2">
                  <p className="text-emerald-300 font-semibold mb-0.5">Robô Zenda</p>
                  <p>Olá! Horários livres amanhã: 1) 10:00 &bull; 2) 14:30</p>
                </div>

                <div className="self-end rounded-xl rounded-tr-sm bg-[#005c4b] px-3 py-1.5">
                  <p className="font-bold">2 (14:30)</p>
                </div>

                <div className="self-start max-w-[92%] rounded-xl rounded-tl-sm bg-[#202c33] p-2 ring-1 ring-growth/40">
                  <p className="text-growth font-bold flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> Horário Confirmado!
                  </p>
                  <p className="mt-0.5 text-white/80">Alongamento em Gel às 14:30. Te esperamos! ✨</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Faixa de Segmentos Atendidos */}
      <div className="container mx-auto mt-12 px-4 md:mt-20 md:px-6">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-canvas px-5 py-4 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-sm font-semibold text-ink-soft md:text-base">
            Feito sob medida para quem vive de agenda cheia:
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {segments.map((segment) => (
              <li key={segment.label} className="flex items-center gap-2 text-sm font-bold text-ink">
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
