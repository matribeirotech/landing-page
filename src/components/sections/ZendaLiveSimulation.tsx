import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Bot,
  CalendarCheck2,
  Check,
  CheckCheck,
  ChevronRight,
  Clock,
  DollarSign,
  Flame,
  MessageCircle,
  Play,
  RotateCcw,
  Sparkles,
  Smartphone,
  TrendingUp,
  User,
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
    title: "1. Cliente envia mensagem",
    subtitle: "A qualquer hora do dia ou da madrugada",
    icon: MessageCircle,
  },
  {
    id: 2,
    title: "2. Robô Zenda responde em 1.8s",
    subtitle: "Verifica vagas livres em tempo real",
    icon: Bot,
  },
  {
    id: 3,
    title: "3. Confirmação instantânea",
    subtitle: "Cliente escolhe o horário pelo menu",
    icon: CheckCheck,
  },
  {
    id: 4,
    title: "4. Sincronização com o CRM",
    subtitle: "Agenda preenchida e faturamento atualizado",
    icon: CalendarCheck2,
  },
]

export function ZendaLiveSimulation({ className }: { className?: string }) {
  const [activeStep, setActiveStep] = useState<number>(1)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const timerRef = useRef<number | null>(null)

  // Avanço automático das etapas
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
      <div className="flex flex-col gap-4 border-b border-line/70 bg-night px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-growth/20 text-growth ring-1 ring-growth/40">
            <Zap className="size-5 animate-pulse" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-growth animate-ping" />
              <p className="font-heading text-base font-bold text-white sm:text-lg">
                Simulação em Tempo Real: Do WhatsApp ao CRM
              </p>
            </div>
            <p className="text-xs text-white/60 sm:text-sm">
              Veja exatamente como o Zenda fecha agendamentos sozinho enquanto você trabalha.
            </p>
          </div>
        </div>

        {/* Controles de Play/Pause e Reiniciar */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
            aria-label={isPlaying ? "Pausar simulação" : "Reproduzir simulação"}
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
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Reiniciar simulação"
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
          const Icon = step.icon

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

              {/* Linha indicadora de tempo da etapa ativa */}
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

      {/* Palco da Animação: Celular (WhatsApp) + Conexão + Painel CRM */}
      <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-12 lg:items-center lg:gap-8">
        {/* Lado Esquerdo: Simulador do WhatsApp no Celular (5 colunas) */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-[340px] rounded-[2.5rem] border-[6px] border-night bg-[#efeae2] p-2.5 shadow-2xl ring-1 ring-black/10">
            {/* Notch e alto-falante */}
            <div className="absolute left-1/2 top-3 h-4 w-28 -translate-x-1/2 rounded-full bg-night/90 flex items-center justify-center gap-2">
              <span className="size-2 rounded-full bg-[#1e293b]" />
              <span className="h-1 w-8 rounded-full bg-[#334155]" />
            </div>

            {/* Tela do Celular */}
            <div className="flex min-h-[460px] flex-col overflow-hidden rounded-[2rem] bg-[#0c1317]">
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
                      Zenda • El Estabelecimento
                    </p>
                    <span className="rounded bg-growth/20 px-1 py-0.5 text-[9px] font-semibold text-growth">
                      OFICIAL
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-400">
                    {activeStep >= 2 ? "Robô Online 24h • Resposta em 1.8s" : "Online"}
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
                  <p className="text-emerald-100/70 text-[10px] font-semibold mb-0.5">Camila Silva</p>
                  <p>Oi! Gostaria de marcar um horário para amanhã, vocês têm vaga?</p>
                  <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-white/60">
                    14:12 <CheckCheck className="size-3 text-cyan-400" />
                  </span>
                </motion.div>

                {/* Mensagem 2: Robô respondendo com URA */}
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
                        <Bot className="size-3" /> ROBÔ ZENDA 24/7
                      </p>
                      <p>
                        Olá Camila! 🌟 Que bom ter você aqui. Temos os seguintes horários livres amanhã:
                      </p>
                      <div className="my-2 space-y-1 rounded-lg bg-black/30 p-2 text-xs font-mono text-emerald-300">
                        <p>1️⃣ 10:00 — Corte & Barba</p>
                        <p>2️⃣ 14:30 — Barba Terapia</p>
                        <p>3️⃣ 16:30 — Completo Premium</p>
                      </div>
                      <p className="text-[12px] text-white/80">
                        Digite o número do horário desejado para confirmar:
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
                        <CheckCheck className="size-4" /> AGENDAMENTO CONFIRMADO!
                      </div>
                      <p className="mt-1 text-xs text-white/90">
                        🎉 Prontinho, Camila! Seu horário para <strong>Amanhã às 14:30</strong> foi confirmado com sucesso.
                      </p>
                      <div className="mt-2 rounded bg-growth/15 p-2 text-[11px] text-growth-text">
                        🔔 Enviaremos um lembrete 2h antes. Te esperamos!
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

        {/* Efeito de Conexão Central (Luz & Fluxo de Dados) */}
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
            <span className="rounded-full bg-growth-soft px-2 py-1 text-[10px] font-bold text-growth-text uppercase tracking-widest">
              Sync 3s
            </span>
          </div>
        </div>

        {/* Lado Direito: O CRM Zenda atualizando em Tempo Real (6 colunas) */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-xl sm:p-6">
            {/* Barra de Status do CRM */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-brand text-white font-bold text-sm shadow">
                  Z
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-ink sm:text-base">
                    Zenda CRM • El Estabelecimento
                  </h4>
                  <p className="text-xs text-ink-soft">Visão em Tempo Real • Barba & Cabelo</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-growth-soft px-3 py-1 text-xs font-semibold text-growth-text ring-1 ring-growth/30">
                <span className="size-2 rounded-full bg-growth animate-pulse" />
                Robô 24/7 Conectado
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
                    {activeStep >= 3 ? "R$ 480,00" : "R$ 390,00"}
                  </motion.p>
                </div>
                <p className="text-[10px] font-semibold text-growth-text">
                  {activeStep >= 3 ? "+ R$ 90,00 confirmado" : "5 agendamentos hoje"}
                </p>
              </div>

              <div className="rounded-xl border border-line bg-canvas p-3">
                <p className="text-xs text-ink-soft">Agendamentos</p>
                <motion.p
                  key={activeStep >= 3 ? "count-updated" : "count-initial"}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="font-heading text-xl font-bold text-ink sm:text-2xl"
                >
                  {activeStep >= 3 ? "6 marcados" : "5 marcados"}
                </motion.p>
                <p className="text-[10px] font-medium text-brand">
                  {activeStep >= 3 ? "100% automatizado" : "Aguardando bot"}
                </p>
              </div>

              <div className="col-span-2 rounded-xl border border-growth/30 bg-growth-soft/40 p-3 sm:col-span-1">
                <p className="text-xs font-semibold text-growth-text">Tempo de Resposta</p>
                <p className="font-heading text-xl font-bold text-growth-text sm:text-2xl">
                  1.8 segundos
                </p>
                <p className="text-[10px] text-ink-soft">Sem digitação manual</p>
              </div>
            </div>

            {/* Linha da Agenda com o novo item preenchido */}
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                  Agenda de Amanhã (Sincronizada)
                </p>
                <span className="text-xs font-semibold text-brand">3 vagas restantes</span>
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
                      <p className="font-bold text-ink">Camila Silva</p>
                      {activeStep >= 3 && (
                        <span className="rounded-full bg-growth px-2 py-0.2 text-[9px] font-bold text-white uppercase tracking-wider animate-bounce">
                          NOVO AGENDAMENTO
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-ink-soft">Barba Terapia • R$ 90,00</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="rounded bg-growth/20 px-2 py-1 text-[10px] font-bold text-growth-text">
                    Fechado pelo Robô
                  </span>
                  <p className="mt-0.5 text-[10px] text-ink-muted">via WhatsApp 24/7</p>
                </div>
              </motion.div>

              {/* Notificação Proativa de Push */}
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
                      <p className="font-bold text-brand">Notificação enviada para o seu celular</p>
                      <p className="text-[11px] text-ink-soft">
                        &ldquo;Resumo Zenda: Camila Silva agendou para amanhã às 14:30. Faturamento subiu para R$ 480.&rdquo;
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
          💡 <strong>Quer ver no seu próprio número?</strong> Inicie seu teste de 30 dias grátis em menos de 2 minutos.
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-growth-text flex items-center gap-1">
            <CheckCheck className="size-4 text-growth" /> 100% sem comissão
          </span>
        </div>
      </div>
    </div>
  )
}

