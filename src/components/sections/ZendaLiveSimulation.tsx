import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Bot,
  CalendarCheck2,
  Check,
  CheckCheck,
  MessageCircle,
  Play,
  RotateCcw,
  Smartphone,
  Zap,
} from "lucide-react"
import { cn } from "@/utils/cn"

interface Step {
  id: number
  title: string
  subtitle: string
  icon: typeof Bot
}

const steps: Step[] = [
  {
    id: 1,
    title: "1. Cliente manda mensagem",
    subtitle: "A qualquer hora do dia ou da noite",
    icon: MessageCircle,
  },
  {
    id: 2,
    title: "2. Robô responde no mesmo segundo",
    subtitle: "Mostra apenas os horários livres",
    icon: Bot,
  },
  {
    id: 3,
    title: "3. Cliente escolhe o horário",
    subtitle: "Basta digitar o número da opção",
    icon: CheckCheck,
  },
  {
    id: 4,
    title: "4. Agenda e Caixa atualizados",
    subtitle: "Salvo na sua agenda e aviso no celular",
    icon: CalendarCheck2,
  },
]

export function ZendaLiveSimulation({ className }: { className?: string }) {
  const [activeStep, setActiveStep] = useState<number>(1)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = window.setInterval(() => {
      setActiveStep((prev) => (prev >= 4 ? 1 : prev + 1))
    }, 4200)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying])

  function handleSelectStep(stepId: number) {
    setIsPlaying(false)
    setActiveStep(stepId)
  }

  function handleReset() {
    setActiveStep(1)
    setIsPlaying(true)
  }

  return (
    <div className={cn("w-full overflow-hidden rounded-3xl border border-line/70 bg-gradient-to-b from-white via-canvas to-surface shadow-2xl", className)}>
      {/* Header do Simulador */}
      <div className="flex flex-col gap-4 border-b border-line/70 bg-night px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-growth/20 text-growth ring-1 ring-growth/40">
            <Zap className="size-5 animate-pulse" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-growth animate-ping" />
              <p className="font-heading text-base font-bold text-white sm:text-lg">
                Veja na Prática: Do WhatsApp direto para a Sua Agenda
              </p>
            </div>
            <p className="text-xs text-white/70 sm:text-sm">
              O Zenda marca o cliente sozinho enquanto você está de mãos ocupadas atendendo.
            </p>
          </div>
        </div>

        {/* Controles de Play/Pause e Reiniciar */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
            aria-label={isPlaying ? "Pausar demonstração" : "Reproduzir demonstração"}
          >
            {isPlaying ? (
              <>
                <span className="size-2 rounded-full bg-amber-400" />
                Pausar
              </>
            ) : (
              <>
                <Play className="size-3 fill-growth text-growth" />
                Play
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Reiniciar demonstração"
          >
            <RotateCcw className="size-3" />
            Reiniciar
          </button>
        </div>
      </div>

      {/* Barra de Progresso / Stepper Interativo */}
      <div className="grid grid-cols-2 border-b border-line bg-canvas p-2 sm:grid-cols-4 sm:p-3">
        {steps.map((step) => {
          const isActive = activeStep === step.id
          const isPassed = activeStep > step.id

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => handleSelectStep(step.id)}
              className={cn(
                "group relative flex flex-col items-start gap-1 rounded-xl p-3 text-left transition-all",
                isActive
                  ? "bg-white shadow-md ring-1 ring-brand/30"
                  : "hover:bg-white/60"
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors",
                    isActive
                      ? "bg-brand text-white shadow-sm"
                      : isPassed
                      ? "bg-growth text-white"
                      : "bg-line text-ink-muted group-hover:bg-line/80"
                  )}
                >
                  {isPassed ? <Check className="size-3.5 stroke-[3]" /> : step.id}
                </div>
                <span className={cn("text-xs font-bold sm:text-sm", isActive ? "text-brand" : "text-ink")}>
                  {step.title.split(". ")[1]}
                </span>
              </div>
              <p className="hidden text-[11px] text-ink-soft sm:line-clamp-1 md:block">
                {step.subtitle}
              </p>

              {isActive && isPlaying && (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4.2, ease: "linear" }}
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-brand"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Palco da Animação: Celular (WhatsApp) + Conexão + Painel da Agenda */}
      <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-12 lg:items-center lg:gap-8">
        {/* Lado Esquerdo: Simulador do WhatsApp no Celular */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-[340px] rounded-[2.5rem] border-[6px] border-night bg-[#efeae2] p-2.5 shadow-2xl ring-1 ring-black/10">
            <div className="absolute left-1/2 top-3 h-4 w-28 -translate-x-1/2 rounded-full bg-night/90 flex items-center justify-center gap-2">
              <span className="size-2 rounded-full bg-[#1e293b]" />
              <span className="h-1 w-8 rounded-full bg-[#334155]" />
            </div>

            <div className="flex min-h-[450px] flex-col overflow-hidden rounded-[2rem] bg-[#0c1317]">
              {/* Top bar WhatsApp */}
              <div className="flex items-center gap-3 bg-[#1f2c34] px-4 pb-3 pt-6 text-white">
                <div className="relative">
                  <div className="flex size-10 items-center justify-center rounded-full bg-growth font-bold text-white shadow-sm">
                    <Bot className="size-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-400 ring-2 ring-[#1f2c34]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate font-heading text-sm font-bold text-white">
                      El Estabelecimento
                    </p>
                    <span className="rounded bg-growth/20 px-1.5 py-0.5 text-[9px] font-semibold text-growth">
                      24H
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-400">
                    {activeStep >= 2 ? "Robô respondendo no mesmo segundo" : "Online"}
                  </p>
                </div>
              </div>

              {/* Área das Mensagens com fundo do WhatsApp */}
              <div className="flex flex-1 flex-col justify-end gap-3.5 bg-[#0b141a] p-4 text-[13px] leading-snug">
                {/* Mensagem 1: Cliente solicitando */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="self-end max-w-[85%] rounded-2xl rounded-tr-sm bg-[#005c4b] p-3 text-white shadow"
                >
                  <p className="text-emerald-100/70 text-[10px] font-semibold mb-0.5">Rafael Costa</p>
                  <p>Oi! Gostaria de marcar um horário para amanhã, vocês têm vaga?</p>
                  <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-white/60">
                    14:12 <CheckCheck className="size-3 text-cyan-400" />
                  </span>
                </motion.div>

                {/* Mensagem 2: Robô respondendo */}
                <AnimatePresence>
                  {activeStep >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="self-start max-w-[88%] rounded-2xl rounded-tl-sm bg-[#202c33] p-3 text-white shadow"
                    >
                      <p className="text-growth font-bold text-[10px] flex items-center gap-1 mb-1">
                        <Bot className="size-3" /> ROBÔ ATENDENTE 24H
                      </p>
                      <p>
                        Olá Rafael! 🌟 Que bom ter você aqui. Temos estes horários livres amanhã:
                      </p>
                      <div className="my-2 space-y-1 rounded-lg bg-black/30 p-2 text-xs font-mono text-emerald-300">
                        <p>1️⃣ 10:00 — Corte &amp; Barba</p>
                        <p>2️⃣ 14:30 — Barba Terapia</p>
                        <p>3️⃣ 16:30 — Completo Premium</p>
                      </div>
                      <p className="text-[12px] text-white/80">
                        Digite apenas o número para escolher:
                      </p>
                      <span className="mt-1 flex items-center justify-end text-[10px] text-white/50">
                        14:12
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mensagem 3: Cliente digitou '2' */}
                <AnimatePresence>
                  {activeStep >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="self-end rounded-2xl rounded-tr-sm bg-[#005c4b] px-4 py-2 text-white shadow"
                    >
                      <p className="text-base font-bold">2</p>
                      <span className="flex items-center justify-end gap-1 text-[10px] text-white/60">
                        14:13 <CheckCheck className="size-3 text-cyan-400" />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mensagem 4: Robô confirma agendamento */}
                <AnimatePresence>
                  {activeStep >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="self-start max-w-[88%] rounded-2xl rounded-tl-sm bg-[#202c33] p-3 text-white ring-1 ring-growth/40 shadow-lg"
                    >
                      <div className="flex items-center gap-1.5 text-growth font-bold text-xs">
                        <CheckCheck className="size-4" /> HORÁRIO CONFIRMADO!
                      </div>
                      <p className="mt-1 text-xs text-white/90">
                        🎉 Prontinho, Rafael! Seu horário para <strong>Amanhã às 14:30</strong> já está marcado.
                      </p>
                      <div className="mt-2 rounded bg-growth/15 p-2 text-[11px] text-growth-text">
                        🔔 Vamos te mandar um lembrete 2h antes para você não esquecer!
                      </div>
                      <span className="mt-1 flex items-center justify-end text-[10px] text-white/50">
                        14:13
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Efeito de Conexão Central */}
        <div className="hidden lg:col-span-1 lg:flex flex-col items-center justify-center">
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={{
                scale: activeStep >= 3 ? [1, 1.25, 1] : 1,
                opacity: activeStep >= 3 ? 1 : 0.4,
              }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="flex size-11 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/40"
            >
              <Zap className="size-6 text-growth animate-pulse" />
            </motion.div>
            <div className="my-2 h-16 w-0.5 bg-gradient-to-b from-brand via-growth to-transparent" />
            <span className="rounded-full bg-growth-soft px-2 py-1 text-[10px] font-bold text-growth-text uppercase tracking-wider">
              Na hora
            </span>
          </div>
        </div>

        {/* Lado Direito: Sua Agenda atualizando sozinha */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-xl sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-brand text-white font-bold text-sm shadow">
                  Z
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-ink sm:text-base">
                    Sua Agenda Zenda &bull; El Estabelecimento
                  </h4>
                  <p className="text-xs text-ink-soft">Atualizada sozinha no seu celular</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-growth-soft px-3 py-1 text-xs font-semibold text-growth-text ring-1 ring-growth/30">
                <span className="size-2 rounded-full bg-growth animate-pulse" />
                Robô 24h Ligado
              </span>
            </div>

            {/* Métricas que Atualizam ao Vivo */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-line bg-canvas p-3">
                <p className="text-xs text-ink-soft">Faturamento Previsto</p>
                <div className="mt-1 flex items-baseline gap-1">
                  <motion.p
                    key={activeStep >= 3 ? "fat-updated" : "fat-initial"}
                    initial={{ scale: 0.8, color: "#10b981" }}
                    animate={{ scale: 1, color: activeStep >= 3 ? "#10b981" : "#0f172a" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="font-heading text-xl font-bold sm:text-2xl"
                  >
                    {activeStep >= 3 ? "R$ 540,00" : "R$ 450,00"}
                  </motion.p>
                </div>
                <p className="text-[10px] font-semibold text-growth-text">
                  {activeStep >= 3 ? "+ R$ 90,00 na conta" : "5 clientes hoje"}
                </p>
              </div>

              <div className="rounded-xl border border-line bg-canvas p-3">
                <p className="text-xs text-ink-soft">Clientes do Dia</p>
                <motion.p
                  key={activeStep >= 3 ? "count-updated" : "count-initial"}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="font-heading text-xl font-bold text-ink sm:text-2xl"
                >
                  {activeStep >= 3 ? "6 marcados" : "5 marcados"}
                </motion.p>
                <p className="text-[10px] font-medium text-brand">
                  {activeStep >= 3 ? "Marcado sozinho" : "Aguardando"}
                </p>
              </div>

              <div className="col-span-2 rounded-xl border border-growth/30 bg-growth-soft/40 p-3 sm:col-span-1">
                <p className="text-xs font-semibold text-growth-text">Tempo de Resposta</p>
                <p className="font-heading text-xl font-bold text-growth-text sm:text-2xl">
                  No mesmo segundo
                </p>
                <p className="text-[10px] text-ink-soft">Você não precisou parar</p>
              </div>
            </div>

            {/* Linha da Agenda com o novo item preenchido */}
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                  Horários de Amanhã
                </p>
                <span className="text-xs font-semibold text-brand">Sem risco de choque de horário</span>
              </div>

              {/* Item existente */}
              <div className="flex items-center justify-between rounded-xl border border-line/60 bg-canvas/60 px-3.5 py-2.5 text-xs text-ink">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-ink-soft">10:00</span>
                  <div>
                    <p className="font-semibold text-ink">Lucas Mendes</p>
                    <p className="text-[11px] text-ink-soft">Corte Degradê</p>
                  </div>
                </div>
                <span className="rounded bg-line px-2 py-0.5 text-[10px] font-semibold text-ink-soft">
                  Confirmado
                </span>
              </div>

              {/* Novo agendamento entrando dinamicamente */}
              <motion.div
                animate={{
                  borderColor: activeStep >= 3 ? "#10b981" : "#e2e8f0",
                  backgroundColor: activeStep >= 3 ? "rgba(16, 185, 129, 0.08)" : "#ffffff",
                }}
                className={cn(
                  "relative flex items-center justify-between rounded-xl border-2 p-3 text-xs transition-all shadow-sm",
                  activeStep >= 3 ? "ring-2 ring-growth/20" : "opacity-60"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <span className="font-mono font-bold text-brand">14:30</span>
                    {activeStep >= 3 && (
                      <span className="size-2 rounded-full bg-growth animate-ping mt-0.5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-ink">Rafael Costa</p>
                      {activeStep >= 3 && (
                        <span className="rounded-full bg-growth px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider animate-bounce">
                          NOVO HORÁRIO
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-ink-soft">Barba Terapia &bull; R$ 90,00</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="rounded bg-growth/20 px-2 py-1 text-[10px] font-bold text-growth-text">
                    Marcado pelo Robô
                  </span>
                  <p className="mt-0.5 text-[10px] text-ink-muted">pelo WhatsApp</p>
                </div>
              </motion.div>

              {/* Aviso no Celular */}
              <AnimatePresence>
                {activeStep >= 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-3 rounded-xl border border-brand/30 bg-brand-soft/50 p-3 text-xs"
                  >
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
                      <Smartphone className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-brand">Aviso na tela do seu celular</p>
                      <p className="text-[11px] text-ink-soft">
                        &ldquo;Rafael Costa acabou de marcar para amanhã às 14:30. Faturamento previsto hoje: R$ 540,00.&rdquo;
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Footer com Chamada */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-line bg-canvas/80 px-6 py-4 text-center sm:flex-row sm:text-left sm:px-8">
        <p className="text-xs text-ink-soft sm:text-sm">
          💡 <strong>Quer testar no seu próprio celular?</strong> Comece seus 30 dias grátis em menos de 2 minutos.
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-growth-text flex items-center gap-1">
            <CheckCheck className="size-4 text-growth" /> O lucro é 100% seu (sem comissões)
          </span>
        </div>
      </div>
    </div>
  )
}
