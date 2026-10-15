import {
  ArrowUpRight,
  BellRing,
  Bot,
  CalendarCheck2,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  Download,
  Lock,
  MessageCircle,
  Moon,
  Palette,
  QrCode,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  TrendingUp,
  UserCheck,
  Wifi,
  Zap,
} from "lucide-react"
import { cn } from "@/utils/cn"

/* ------------------------------------------------------------------ */
/* Hero: Tablet com CRM + Celular com Robô WhatsApp + Notificação Push*/
/* ------------------------------------------------------------------ */

export function HeroDevices({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Ilustração da plataforma Lypsyos: painel de agendamentos no tablet, robô inteligente fechando agendamento no WhatsApp e resumo matinal na tela de bloqueio."
      className={cn("@container relative aspect-[5/4] w-full select-none", className)}
    >
      <div aria-hidden="true" className="absolute inset-0">
        {/* Painel de Gestão (Tablet / Monitor de fundo) */}
        <div className="absolute left-[2%] top-[3%] w-[72%]">
          <div className="rounded-[2.2cqw] bg-night p-[1.1cqw] shadow-lift">
            <div className="flex aspect-[16/10] flex-col gap-[1.5cqw] overflow-hidden rounded-[1.4cqw] bg-white p-[2.2cqw]">
              {/* Barra superior do CRM */}
              <div className="flex items-center justify-between border-b border-line pb-[1.2cqw]">
                <div className="flex items-center gap-[1cqw]">
                  <span className="flex size-[3.2cqw] items-center justify-center rounded-[0.8cqw] bg-brand text-white font-bold text-[1.4cqw]">
                    L
                  </span>
                  <div>
                    <p className="font-heading text-[1.9cqw] font-bold text-ink">Studio Bella Vista</p>
                    <p className="text-[1.2cqw] text-ink-soft">Visão Geral • Hoje</p>
                  </div>
                </div>
                <div className="flex items-center gap-[0.8cqw]">
                  <span className="inline-flex items-center gap-[0.5cqw] rounded-full bg-growth-soft px-[1.2cqw] py-[0.5cqw] text-[1.3cqw] font-semibold text-growth-text">
                    <span className="size-[0.8cqw] rounded-full bg-growth animate-pulse" /> Robô Ativo 24/7
                  </span>
                </div>
              </div>

              {/* Indicadores rápidos */}
              <div className="grid grid-cols-3 gap-[1.2cqw]">
                <div className="rounded-[1.2cqw] bg-canvas p-[1.2cqw] border border-line">
                  <p className="text-[1.3cqw] text-ink-soft">Atendimentos Hoje</p>
                  <p className="font-heading text-[2.8cqw] font-bold text-ink">6 marcados</p>
                  <p className="text-[1.1cqw] text-growth-text font-medium flex items-center gap-[0.4cqw]">
                    <CheckCircle2 className="size-[1.3cqw]" /> 100% confirmados
                  </p>
                </div>
                <div className="rounded-[1.2cqw] bg-growth-soft/40 p-[1.2cqw] border border-growth/20">
                  <p className="text-[1.3cqw] text-growth-text font-medium">Faturamento Previsto</p>
                  <p className="font-heading text-[2.8cqw] font-bold text-ink">R$ 540,00</p>
                  <p className="text-[1.1cqw] text-ink-soft">R$ 3.420 na semana</p>
                </div>
                <div className="rounded-[1.2cqw] bg-brand-soft/40 p-[1.2cqw] border border-brand/20">
                  <p className="text-[1.3cqw] text-brand font-medium">Próxima Cliente</p>
                  <p className="font-heading text-[2.2cqw] font-bold text-ink">14:30 • Camila S.</p>
                  <p className="text-[1.1cqw] text-brand font-medium">Alongamento em Gel</p>
                </div>
              </div>

              {/* Lista dos próximos agendamentos */}
              <div className="flex-1 space-y-[0.8cqw] overflow-hidden">
                <p className="text-[1.3cqw] font-semibold text-ink">Próximos horários</p>
                {[
                  { time: "10:00", name: "Mariana Costa", service: "Manutenção Gel", value: "R$ 90", status: "Concluído", tone: "bg-canvas text-ink-soft" },
                  { time: "14:30", name: "Camila Silva", service: "Alongamento em Gel", value: "R$ 150", status: "Em breve", tone: "bg-growth-soft text-growth-text font-semibold" },
                  { time: "16:30", name: "Fernanda Lima", service: "Spa dos Pés + Gel", value: "R$ 110", status: "Confirmado", tone: "bg-brand-soft text-brand font-semibold" },
                ].map((item) => (
                  <div key={item.time} className="flex items-center justify-between rounded-[1cqw] bg-canvas/80 px-[1.2cqw] py-[0.8cqw] border border-line">
                    <div className="flex items-center gap-[1cqw]">
                      <span className="font-heading text-[1.4cqw] font-bold text-ink">{item.time}</span>
                      <div>
                        <p className="text-[1.3cqw] font-semibold text-ink leading-tight">{item.name}</p>
                        <p className="text-[1.1cqw] text-ink-soft">{item.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[1cqw]">
                      <span className="text-[1.3cqw] font-bold text-ink">{item.value}</span>
                      <span className={cn("rounded-full px-[1.2cqw] py-[0.4cqw] text-[1.1cqw]", item.tone)}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Base elegante do tablet */}
          <div className="mx-auto h-[2.5cqw] w-[14%] bg-gradient-to-b from-night to-[#16306b]" />
          <div className="mx-auto h-[0.8cqw] w-[30%] rounded-full bg-night/90" />
        </div>

        {/* Smartphone em primeiro plano com WhatsApp Bot */}
        <div className="absolute right-[2%] top-[8%] w-[34%] rounded-[3.8cqw] bg-night p-[0.9cqw] shadow-lift">
          <div className="flex aspect-[9/18] flex-col overflow-hidden rounded-[3cqw] bg-[#efeae2]">
            {/* Cabeçalho WhatsApp */}
            <div className="flex items-center gap-[1cqw] bg-[#075e54] px-[1.6cqw] py-[1.2cqw] text-white">
              <span className="flex size-[3.4cqw] items-center justify-center rounded-full bg-white/20 text-[1.4cqw] font-bold">
                <Bot className="size-[2cqw]" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[1.4cqw] font-semibold truncate leading-tight">Studio Bella Vista</p>
                <p className="text-[1.1cqw] text-white/80 flex items-center gap-[0.4cqw]">
                  <span className="size-[0.8cqw] rounded-full bg-growth" /> Robô online 24h
                </p>
              </div>
            </div>

            {/* Mensagens do chat */}
            <div className="flex flex-1 flex-col justify-end gap-[1cqw] p-[1.4cqw] text-[1.2cqw]">
              {/* Bot */}
              <div className="max-w-[92%] rounded-[1.2cqw] rounded-tl-sm bg-white p-[1.2cqw] text-ink shadow-sm">
                <p className="font-semibold text-brand text-[1.2cqw]">Olá! Sou a assistente do Studio Bella 🌸</p>
                <p className="mt-[0.4cqw]">Como posso te ajudar?</p>
                <p className="mt-[0.4cqw] text-ink-soft">
                  <strong>A)</strong> Agendar novo horário<br />
                  <strong>B)</strong> Ver meus horários<br />
                  <strong>C)</strong> Falar com profissional
                </p>
              </div>

              {/* Cliente */}
              <div className="ml-auto max-w-[50%] rounded-[1.2cqw] rounded-tr-sm bg-[#dcf8c6] px-[1.4cqw] py-[0.8cqw] text-ink shadow-sm">
                A
              </div>

              {/* Bot */}
              <div className="max-w-[92%] rounded-[1.2cqw] rounded-tl-sm bg-white p-[1.2cqw] text-ink shadow-sm">
                <p className="font-semibold text-growth-text">Perfeito! Horários para amanhã:</p>
                <p className="mt-[0.2cqw] text-ink-soft">
                  <strong>1)</strong> 10:00 • <strong>2)</strong> 14:30 • <strong>3)</strong> 16:30
                </p>
              </div>

              {/* Cliente */}
              <div className="ml-auto max-w-[50%] rounded-[1.2cqw] rounded-tr-sm bg-[#dcf8c6] px-[1.4cqw] py-[0.8cqw] text-ink shadow-sm">
                2 (14:30)
              </div>

              {/* Bot Confirmação */}
              <div className="max-w-[94%] rounded-[1.2cqw] rounded-tl-sm border border-growth/40 bg-growth-soft/70 p-[1.2cqw] text-ink shadow-sm">
                <p className="font-bold text-growth-text flex items-center gap-[0.4cqw]">
                  <CheckCircle2 className="size-[1.6cqw]" /> Agendamento Confirmado!
                </p>
                <p className="text-[1.1cqw] text-ink mt-[0.2cqw]">
                  Alongamento em Gel às <strong>14:30</strong>. Te esperamos! ✨
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card flutuante: Push Notification diária */}
        <div className="absolute left-[3%] bottom-[3%] flex items-center gap-[1.2cqw] rounded-[1.6cqw] border border-line bg-white/95 backdrop-blur-md px-[1.8cqw] py-[1.2cqw] shadow-lift">
          <span className="flex size-[4.2cqw] items-center justify-center rounded-full bg-warning-soft text-warning">
            <Sun className="size-[2.4cqw]" />
          </span>
          <div>
            <p className="text-[1.2cqw] font-bold uppercase tracking-wider text-ink-soft">Resumo Matinal • 08:00</p>
            <p className="font-heading text-[1.8cqw] font-bold text-ink">
              6 agendamentos confirmados hoje
            </p>
            <p className="text-[1.3cqw] font-medium text-growth-text">
              Faturamento previsto: R$ 540,00
            </p>
          </div>
        </div>

        {/* Card flutuante: Selo de Agilidade */}
        <div className="absolute right-[0%] top-0 flex items-center gap-[1cqw] rounded-[1.4cqw] border border-growth/30 bg-white px-[1.6cqw] py-[1cqw] shadow-lift">
          <span className="flex size-[3.8cqw] items-center justify-center rounded-full bg-growth-soft text-growth-text">
            <Zap className="size-[2.2cqw]" />
          </span>
          <div>
            <p className="font-heading text-[1.8cqw] font-bold text-ink">Resposta em 2s</p>
            <p className="text-[1.2cqw] text-ink-soft">Agendamento 100% automático</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mockup 1: Robô Atendente WhatsApp 24/7 (Smart WhatsApp Bot)        */
/* ------------------------------------------------------------------ */

export function WhatsAppBotMockup({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Demonstração do Robô no WhatsApp: fluxo automático com menu URA inteligente, verificação de disponibilidade e confirmação imediata sem conflito."
      className={cn("relative mx-auto w-full max-w-lg select-none pb-6", className)}
    >
      <div aria-hidden="true" className="rounded-[2.25rem] bg-night p-2.5 shadow-lift">
        <div className="flex flex-col overflow-hidden rounded-[1.75rem] bg-[#ece5dd]">
          {/* Header do WhatsApp */}
          <div className="flex items-center justify-between bg-[#075e54] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-white/20 text-white font-bold">
                <Bot className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">Robô Lypsyos • Salão & Estética</p>
                <p className="text-[11px] text-white/80">Atendimento 24 horas por dia</p>
              </div>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium">
              <QrCode className="size-3.5" /> Conectado
            </span>
          </div>

          {/* Conversa interativa */}
          <div className="space-y-3 p-4 text-xs sm:text-sm">
            {/* Mensagem da cliente de madrugada */}
            <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-[#dcf8c6] px-3.5 py-2.5 text-ink shadow-sm">
              <p>Olá! Quero marcar um horário para fazer as unhas amanhã à tarde, tem vaga?</p>
              <span className="mt-1 block text-right text-[10px] text-ink-muted">23:42</span>
            </div>

            {/* Resposta imediata do robô */}
            <div className="max-w-[90%] rounded-xl rounded-tl-sm bg-white p-3.5 text-ink shadow-sm space-y-2">
              <p className="font-semibold text-brand">
                Olá! Sou a assistente virtual do espaço 💅
              </p>
              <p className="text-ink-soft">
                Consultei a agenda agora mesmo! Temos os seguintes horários disponíveis para <strong>amanhã</strong>:
              </p>
              <div className="grid gap-1.5 pt-1">
                <div className="rounded-lg bg-canvas p-2 border border-line flex items-center justify-between">
                  <span><strong>A)</strong> 14:00 • Alongamento em Gel</span>
                  <span className="text-xs text-brand font-semibold">Livre</span>
                </div>
                <div className="rounded-lg bg-canvas p-2 border border-line flex items-center justify-between">
                  <span><strong>B)</strong> 16:30 • Alongamento em Gel</span>
                  <span className="text-xs text-brand font-semibold">Livre</span>
                </div>
              </div>
              <p className="text-ink-soft text-xs pt-1">Responda apenas com a letra <strong>A</strong> ou <strong>B</strong>.</p>
              <span className="block text-right text-[10px] text-ink-muted">23:42 • 2 segundos depois</span>
            </div>

            {/* Cliente escolhe */}
            <div className="ml-auto max-w-[50%] rounded-xl rounded-tr-sm bg-[#dcf8c6] px-3.5 py-2 text-ink shadow-sm">
              <p className="font-bold">B</p>
              <span className="mt-0.5 block text-right text-[10px] text-ink-muted">23:43</span>
            </div>

            {/* Confirmação final */}
            <div className="max-w-[90%] rounded-xl rounded-tl-sm border-2 border-growth/40 bg-growth-soft p-3.5 text-ink shadow-sm space-y-1">
              <p className="font-bold text-growth-text flex items-center gap-1.5">
                <CheckCircle2 className="size-4 shrink-0" /> Agendamento Confirmado!
              </p>
              <p className="text-xs text-ink-soft">
                Horário marcado para <strong>amanhã às 16:30</strong>. Seu lembrete já foi ativado! ✨
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerta flutuante de zero double-booking */}
      <div className="absolute -bottom-1 left-4 flex items-center gap-3 rounded-2xl border border-growth/30 bg-white px-4 py-3 shadow-lift sm:-left-4">
        <span className="flex size-10 items-center justify-center rounded-full bg-growth-soft text-growth-text">
          <ShieldCheck className="size-5" />
        </span>
        <p className="text-xs sm:text-sm font-semibold text-ink">
          100% livre de conflito de horários (zero overbooking)
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mockup 2: Painel de Gestão & CRM 3-em-1 (Smart Dashboard)          */
/* ------------------------------------------------------------------ */

export function DashboardCrmMockup({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Ilustração do painel CRM Lypsyos com visão 3-em-1, cards de faturamento, horários do dia e disparo de WhatsApp com 1 clique."
      className={cn("relative mx-auto w-full max-w-lg select-none pb-6", className)}
    >
      <div aria-hidden="true" className="rounded-[1.75rem] border border-line bg-white p-5 shadow-lift sm:p-6 space-y-4">
        {/* Toggle de visão 3-em-1 */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <div>
            <p className="font-heading text-base font-bold text-ink">Central de Agendamentos</p>
            <p className="text-xs text-ink-soft">Visão flexível gravada no seu navegador</p>
          </div>
          <div className="inline-flex rounded-xl bg-canvas p-1 border border-line text-xs font-semibold">
            <span className="rounded-lg bg-brand px-3 py-1.5 text-white shadow-sm">Cartões</span>
            <span className="rounded-lg px-3 py-1.5 text-ink-soft">Cronológico</span>
            <span className="rounded-lg px-3 py-1.5 text-ink-soft">Tabela</span>
          </div>
        </div>

        {/* Faturamento e Métricas */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-canvas p-3 border border-line">
            <p className="text-xs text-ink-soft">Atendimentos Hoje</p>
            <p className="font-heading text-xl font-bold text-ink">6 marcados</p>
          </div>
          <div className="rounded-xl bg-growth-soft p-3 border border-growth/20">
            <p className="text-xs text-growth-text font-medium">Faturamento Hoje</p>
            <p className="font-heading text-xl font-bold text-ink">R$ 540,00</p>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-xl bg-brand-soft p-3 border border-brand/20">
            <p className="text-xs text-brand font-medium">Acumulado no Mês</p>
            <p className="font-heading text-xl font-bold text-ink">R$ 6.840</p>
          </div>
        </div>

        {/* Cards de Agendamentos com botão de WhatsApp 1 clique */}
        <div className="space-y-2.5 pt-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Agendamentos de Hoje</p>
          {[
            { time: "14:30", name: "Camila Silva", service: "Alongamento em Gel", val: "R$ 150", phone: "17999...", status: "Confirmado" },
            { time: "16:30", name: "Fernanda Lima", service: "Spa dos Pés + Esmaltação", val: "R$ 110", phone: "17981...", status: "Confirmado" },
            { time: "18:00", name: "Juliana Rocha", service: "Banho de Gel", val: "R$ 80", phone: "17997...", status: "Pendente" },
          ].map((item) => (
            <div key={item.time} className="flex items-center justify-between rounded-xl border border-line bg-canvas p-3.5">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand font-heading text-sm font-bold text-white">
                  {item.time}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink leading-tight">{item.name}</p>
                  <p className="text-xs text-ink-soft">{item.service} • {item.val}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block rounded-full bg-growth-soft px-2.5 py-1 text-[11px] font-semibold text-growth-text">
                  {item.status}
                </span>
                <span className="flex items-center gap-1 rounded-lg bg-[#25D366]/15 border border-[#25D366]/30 px-2.5 py-1 text-xs font-semibold text-[#128C7E]">
                  <MessageCircle className="size-3.5" /> 1-clique
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selo flutuante de agilidade */}
      <div className="absolute -bottom-1 right-4 flex items-center gap-3 rounded-2xl bg-night px-4 py-3 text-white shadow-lift sm:-right-4">
        <span className="flex size-9 items-center justify-center rounded-full bg-growth text-night font-bold">
          <TrendingUp className="size-5 text-night" />
        </span>
        <div>
          <p className="text-xs text-white/70">Faturamento sob controle</p>
          <p className="font-heading text-sm font-bold">Sem anotações perdidas</p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mockup 3: Aplicativo Móvel Instalável (PWA Nativo)                 */
/* ------------------------------------------------------------------ */

export function PwaMobileMockup({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Ilustração do aplicativo móvel Lypsyos PWA: aplicativo instalado no celular com modo standalone de tela cheia e atalhos rápidos."
      className={cn("relative mx-auto w-full max-w-lg select-none pb-6", className)}
    >
      <div aria-hidden="true" className="flex items-center justify-center gap-6">
        {/* Smartphone com o PWA */}
        <div className="w-[68%] max-w-72 shrink-0 rounded-[2.5rem] bg-night p-2.5 shadow-lift">
          <div className="flex aspect-[9/18] flex-col overflow-hidden rounded-[2rem] bg-white">
            {/* Status bar */}
            <div className="flex items-center justify-between px-5 pt-3 text-[11px] font-semibold text-ink">
              <span>09:41</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="size-3" />
                <span className="h-2 w-4 rounded-sm border border-current" />
              </div>
            </div>

            {/* Banner Add to Home Screen */}
            <div className="mx-3 mt-3 rounded-xl bg-brand-soft border border-brand/20 p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-brand text-white font-bold text-xs">
                  L
                </span>
                <div>
                  <p className="text-xs font-bold text-ink">Instalar App Lypsyos</p>
                  <p className="text-[10px] text-ink-soft">Sem App Store • 1 toque</p>
                </div>
              </div>
              <span className="rounded-lg bg-brand px-2.5 py-1 text-[11px] font-semibold text-white flex items-center gap-1">
                <Download className="size-3" /> Instalar
              </span>
            </div>

            {/* Conteúdo Standalone */}
            <div className="p-4 flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-ink-soft">Bom dia,</p>
                  <p className="font-heading text-lg font-bold text-ink">Studio Bella</p>
                </div>
                <span className="flex size-8 items-center justify-center rounded-full bg-canvas border border-line">
                  <UserCheck className="size-4 text-brand" />
                </span>
              </div>

              {/* Atalhos rápidos */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="rounded-xl bg-canvas p-2 border border-line">
                  <CalendarDays className="size-5 mx-auto text-brand mb-1" />
                  <p className="font-semibold text-ink">Ver Agenda</p>
                </div>
                <div className="rounded-xl bg-canvas p-2 border border-line">
                  <Bot className="size-5 mx-auto text-growth-text mb-1" />
                  <p className="font-semibold text-ink">Robô WhatsApp</p>
                </div>
                <div className="rounded-xl bg-canvas p-2 border border-line">
                  <Palette className="size-5 mx-auto text-warning mb-1" />
                  <p className="font-semibold text-ink">Meu Perfil</p>
                </div>
              </div>

              {/* Próximos horários resumidos */}
              <div className="rounded-2xl border border-line bg-canvas p-3 space-y-2">
                <p className="text-xs font-semibold text-ink">Hoje (6 agendamentos)</p>
                <div className="flex items-center justify-between text-xs py-1 border-b border-line">
                  <span>10:00 • Mariana</span>
                  <span className="text-growth-text font-bold">R$ 90</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1">
                  <span>14:30 • Camila</span>
                  <span className="text-growth-text font-bold">R$ 150</span>
                </div>
              </div>
            </div>

            {/* Bottom bar nativa */}
            <div className="flex items-center justify-around border-t border-line py-2.5 bg-white text-xs">
              <span className="text-brand font-semibold flex flex-col items-center gap-0.5">
                <CalendarDays className="size-4" /> Agenda
              </span>
              <span className="text-ink-soft flex flex-col items-center gap-0.5">
                <Bot className="size-4" /> Robô
              </span>
              <span className="text-ink-soft flex flex-col items-center gap-0.5">
                <Sparkles className="size-4" /> Serviços
              </span>
            </div>
          </div>
        </div>

        {/* Destaque lateral PWA */}
        <div className="hidden sm:flex flex-col gap-3 w-48">
          <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand mb-2">
              <Zap className="size-5" />
            </span>
            <p className="font-bold text-sm text-ink">Zero App Store</p>
            <p className="text-xs text-ink-soft mt-1">
              Não ocupa memória do celular e funciona direto no Safari ou Chrome.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
            <span className="flex size-10 items-center justify-center rounded-xl bg-growth-soft text-growth-text mb-2">
              <Wifi className="size-5" />
            </span>
            <p className="font-bold text-sm text-ink">Cache Offline</p>
            <p className="text-xs text-ink-soft mt-1">
              Carregamento instantâneo mesmo no 3G/4G fraco.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mockup 4: Notificações Proativas Push & Google Calendar            */
/* ------------------------------------------------------------------ */

export function PushAndCalendarMockup({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Ilustração das notificações proativas: resumo matinal na tela de bloqueio e sincronização com Google Agenda com alarme sonoro."
      className={cn("relative mx-auto w-full max-w-lg select-none pb-6", className)}
    >
      <div aria-hidden="true" className="space-y-4 rounded-[1.75rem] border border-line bg-canvas p-5 shadow-lift sm:p-6">
        {/* Tela de bloqueio com notificação push */}
        <div className="rounded-2xl bg-night p-5 text-white shadow-lift space-y-3">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>Quinta-feira, 08:00</span>
            <BellRing className="size-4 text-warning" />
          </div>

          <div className="rounded-xl bg-white/10 backdrop-blur-md p-4 border border-white/15 space-y-1.5">
            <div className="flex items-center gap-2 text-warning font-semibold text-xs">
              <Sun className="size-4" /> Resumo Matinal Lypsyos
            </div>
            <p className="font-heading text-sm sm:text-base font-bold text-white">
              ☀️ Bom dia! Você tem 6 agendamentos confirmados para hoje.
            </p>
            <p className="text-xs text-white/80">
              Faturamento previsto: <strong className="text-growth font-bold">R$ 540,00</strong>. Primeiro atendimento às 10:00.
            </p>
          </div>

          <div className="rounded-xl bg-white/10 backdrop-blur-md p-3 border border-white/10 flex items-center justify-between text-xs">
            <span className="flex items-center gap-2">
              <Bot className="size-4 text-growth" /> Nova reserva confirmada pelo Robô
            </span>
            <span className="text-white/60">há 2 min</span>
          </div>
        </div>

        {/* Integração Google Calendar */}
        <div className="rounded-2xl bg-white p-4 border border-line shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-brand-soft text-brand font-bold">
                <CalendarCheck2 className="size-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">Google Agenda Sincronizada</p>
                <p className="text-xs text-ink-soft">Alarme no celular 15 min antes do cliente</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-growth-soft px-2.5 py-1 text-xs font-semibold text-growth-text">
              <Check className="size-3" /> Conectado
            </span>
          </div>

          <div className="rounded-xl bg-canvas p-3 border border-line flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-ink">14:30 - Camila Silva (Alongamento em Gel)</p>
              <p className="text-ink-soft">Alarme sonoro nativo do celular ativo</p>
            </div>
            <Clock className="size-4 text-brand" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mockup 5: Catálogo Multi-Nicho & Customização Visual               */
/* ------------------------------------------------------------------ */

export function CatalogCustomMockup({ className }: { className?: string }) {
  const niches = [
    { label: "Manicures & Nails", icon: "💅", active: true },
    { label: "Barbearias", icon: "💈", active: false },
    { label: "Salões de Beleza", icon: "💇‍♀️", active: false },
    { label: "Estética & Clínicas", icon: "✨", active: false },
  ]

  return (
    <div
      role="img"
      aria-label="Ilustração do catálogo multi-nicho: nichos pré-configurados com 1 clique, alternância de Modo Escuro/Claro e chave PIX para sinais."
      className={cn("relative mx-auto w-full max-w-lg select-none pb-6", className)}
    >
      <div aria-hidden="true" className="space-y-4 rounded-[1.75rem] border border-line bg-white p-5 shadow-lift sm:p-6">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div>
            <p className="font-heading text-base font-bold text-ink">Catálogo Multi-Nicho</p>
            <p className="text-xs text-ink-soft">Ative seu segmento em 1 clique</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-canvas p-1 border border-line text-xs">
            <span className="rounded-full bg-white px-2 py-0.5 shadow-sm text-ink font-semibold flex items-center gap-1">
              <Sun className="size-3 text-warning" /> Claro
            </span>
            <span className="px-2 py-0.5 text-ink-soft flex items-center gap-1">
              <Moon className="size-3" /> Escuro
            </span>
          </div>
        </div>

        {/* Pílulas de segmentos */}
        <div className="flex flex-wrap gap-2">
          {niches.map((n) => (
            <span
              key={n.label}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5",
                n.active
                  ? "bg-brand text-white shadow-sm"
                  : "bg-canvas text-ink-soft border border-line",
              )}
            >
              <span>{n.icon}</span> {n.label}
            </span>
          ))}
        </div>

        {/* Serviços carregados no catálogo */}
        <div className="space-y-2 pt-1">
          {[
            { name: "Alongamento em Gel", dur: "1h 45m", price: "R$ 150,00" },
            { name: "Manutenção de Alongamento", dur: "1h 15m", price: "R$ 90,00" },
            { name: "Esmaltação em Gel", dur: "50m", price: "R$ 60,00" },
          ].map((s) => (
            <div key={s.name} className="flex items-center justify-between rounded-xl bg-canvas p-3 border border-line">
              <div>
                <p className="text-xs font-semibold text-ink">{s.name}</p>
                <p className="text-[11px] text-ink-soft">Duração: {s.dur}</p>
              </div>
              <span className="font-heading text-xs font-bold text-growth-text">{s.price}</span>
            </div>
          ))}
        </div>

        {/* Chave PIX integrada */}
        <div className="rounded-xl border border-growth/30 bg-growth-soft p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-growth-text">PIX</span>
            <span className="text-ink">Chave cadastrada para sinal de 50%</span>
          </div>
          <span className="text-[11px] font-semibold text-growth-text">Ativo</span>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mockup 6: Lypsyos Security Guard & Isolamento de Dados             */
/* ------------------------------------------------------------------ */

export function SecurityGuardMockup({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Ilustração de segurança e isolamento de dados com Row-Level Security, anti-bot e criptografia ponta a ponta."
      className={cn("relative mx-auto w-full max-w-lg select-none pb-6", className)}
    >
      <div aria-hidden="true" className="space-y-4 rounded-[1.75rem] border border-line bg-canvas p-5 shadow-lift sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-growth-soft text-growth-text">
            <ShieldCheck className="size-7" />
          </span>
          <div>
            <p className="font-heading text-base font-bold text-ink">Lypsyos Security Guard</p>
            <p className="text-xs text-ink-soft">Blindagem multitenant com tecnologia bancária</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {[
            {
              title: "Isolamento Multitenant (Supabase RLS)",
              desc: "Políticas de Row-Level Security garantem que ninguém acesse os clientes ou faturamento de outro salão.",
              icon: Lock,
            },
            {
              title: "Travas Anti-Bot & Honeypots",
              desc: "Filtros inteligentes bloqueiam spam, robôs de ataque e solicitações fraudulentas automaticamente.",
              icon: ShieldCheck,
            },
            {
              title: "Criptografia Ponta a Ponta",
              desc: "Comunicação autenticada via tokens JWT e criptografia de ponta a ponta com SSL/TLS.",
              icon: Zap,
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-3 rounded-xl border border-line bg-white p-3.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-canvas text-brand">
                <item.icon className="size-4.5" />
              </span>
              <div>
                <p className="text-xs font-bold text-ink">{item.title}</p>
                <p className="text-[11px] leading-relaxed text-ink-soft">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
