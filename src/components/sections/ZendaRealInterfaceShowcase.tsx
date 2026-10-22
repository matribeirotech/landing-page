import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  BarChart3,
  CheckCircle2,
  Megaphone,
  MousePointerClick,
  Sparkles,
} from "lucide-react"
import { cn } from "@/utils/cn"

// Imagens reais limpas da interface (capturadas via F12)
import zendaDashboardImg from "@/assets/images/zenda/interface-zenda-dashboard.png"
import zendaMarketingImg from "@/assets/images/zenda/interface-zenda-marketing.png"

interface Hotspot {
  id: string
  x: number
  y: number
  title: string
  description: string
  badge: string
}

interface ShowcaseTab {
  id: "dashboard" | "marketing"
  label: string
  badge: string
  icon: typeof BarChart3
  title: string
  headline: string
  description: string
  image: string
  imageAlt: string
  hotspots: Hotspot[]
  keyBenefits: string[]
}

const tabsData: ShowcaseTab[] = [
  {
    id: "dashboard",
    label: "Sua Agenda & Caixa",
    badge: "Tela Real",
    icon: BarChart3,
    title: "Painel Simples e Direto",
    headline: "Saiba quem você vai atender e quanto vai ganhar no dia com um olhar",
    description:
      "Esqueça planilhas complicadas. No Zenda você vê quanto dinheiro vai entrar hoje, quem já confirmou presença e acompanha o robô preenchendo seus horários vagos sozinho.",
    image: zendaDashboardImg,
    imageAlt: "Tela real da agenda do Zenda mostrando o faturamento previsto e horários do dia",
    keyBenefits: [
      "Faturamento previsto hoje calculado sozinho a cada cliente marcada",
      "Botões rápidos para ver a agenda de Hoje, Amanhã e da semana inteira",
      "Mensagens enviadas no mesmo segundo pelo robô no WhatsApp",
      "Instalação direta no iPhone ou Android com 1 clique, sem taxas nem burocracia de App Store",
    ],
    hotspots: [
      {
        id: "bot-status",
        x: 8,
        y: 12,
        title: "Robô 24h Ligado",
        badge: "WhatsApp",
        description: "Conecta direto no seu WhatsApp em 2 minutos. Ele responde suas clientes dia e noite sem você precisar tocar no celular.",
      },
      {
        id: "install-app",
        x: 8,
        y: 20,
        title: "Aplicativo em 1 Clique",
        badge: "No Celular",
        description: "Instalação direta no iPhone ou Android com 1 clique, sem taxas nem burocracia de App Store.",
      },
      {
        id: "faturamento",
        x: 27,
        y: 49,
        title: "Faturamento Previsto Hoje",
        badge: "Seu Dinheiro",
        description: "Soma automaticamente o valor de todos os serviços agendados para você saber quanto vai ganhar no dia.",
      },
      {
        id: "resumo-caixa",
        x: 58,
        y: 49,
        title: "Resumo do Caixa",
        badge: "Controle Fácil",
        description: "Mostra separado o que já foi pago hoje e o que você ainda vai receber das próximas clientes.",
      },
      {
        id: "platform-widget",
        x: 85,
        y: 49,
        title: "Respostas no Mesmo Segundo",
        badge: "Rapidez",
        description: "O robô responde na hora para a cliente não desistir nem procurar outro salão.",
      },
      {
        id: "agenda-nav",
        x: 32,
        y: 83,
        title: "Dias da Semana",
        badge: "Praticidade",
        description: "Toque em Hoje, Amanhã ou qualquer dia da semana para ver seus horários em segundos.",
      },
    ],
  },
  {
    id: "marketing",
    label: "Chamar Clientes Sumidas",
    badge: "Lotar Agenda",
    icon: Megaphone,
    title: "Recupere Clientes Antigas",
    headline: "Agenda fraca na terça ou quarta? Chame clientes sumidas com 1 clique",
    description:
      "O Zenda separa automaticamente quem não aparece há mais de 30 dias e envia um convite simpático no WhatsApp chamando pelo nome de cada cliente.",
    image: zendaMarketingImg,
    imageAlt: "Tela real do Zenda para enviar mensagens no WhatsApp e recuperar clientes sumidas",
    keyBenefits: [
      "Encontra sozinho clientes que não agendam há mais de 30 dias",
      "Chama cada cliente pelo próprio nome automaticamente",
      "Mostra na tela exatamente como a mensagem vai chegar no celular dela",
      "A cliente só responde '1' e o robô já marca o horário para você",
    ],
    hotspots: [
      {
        id: "segmentacao",
        x: 38,
        y: 45,
        title: "Escolher Quem Recebe",
        badge: "1 Toque",
        description: "Toque em 'Recuperar Clientes' para chamar apenas quem sumiu há mais de 30 dias.",
      },
      {
        id: "variaveis",
        x: 44,
        y: 68,
        title: "Mensagem com o Nome Dela",
        badge: "Atencioso",
        description: "O Zenda troca automaticamente pelo nome de cada cliente para parecer que você escreveu uma por uma.",
      },
      {
        id: "disparo-btn",
        x: 44,
        y: 96,
        title: "Enviar para o WhatsApp",
        badge: "Prático",
        description: "Com 1 clique o Zenda envia os convites com cuidado e preenche seus horários vagos.",
      },
      {
        id: "mobile-preview",
        x: 84,
        y: 65,
        title: "Veja Como Vai Ficar",
        badge: "No Celular",
        description: "Confira no celular ao lado como sua mensagem fica bonita antes de enviar.",
      },
    ],
  },
]

export function ZendaRealInterfaceShowcase({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "marketing">("dashboard")
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)

  const currentTab = tabsData.find((tab) => tab.id === activeTab) || tabsData[0]

  return (
    <section className={cn("w-full overflow-hidden bg-canvas py-14 md:py-22", className)}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Cabeçalho da Seção */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
            <Sparkles className="size-3.5" />
            FÁCIL DE USAR NO DIA A DIA
          </p>
          <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-ink sm:text-4xl">
            Sem complicação.{" "}
            <span className="text-growth-text">Essa é a tela real que você vai usar.</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            Feito para ser simples e rápido: você bate o olho e já sabe seus horários e quanto vai receber no dia.
          </p>
        </div>

        {/* Seletor de Abas da Interface */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {tabsData.map((tab) => {
            const isSelected = activeTab === tab.id
            const Icon = tab.icon

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id)
                  setActiveHotspot(null)
                }}
                className={cn(
                  "inline-flex min-h-12 items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-bold transition-all sm:text-base",
                  isSelected
                    ? "bg-night text-white shadow-xl shadow-night/20 ring-2 ring-brand/40"
                    : "border border-line bg-white text-ink-soft hover:bg-white hover:text-ink hover:shadow-sm"
                )}
              >
                <Icon className={cn("size-5", isSelected ? "text-growth" : "text-ink-soft")} />
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase",
                    isSelected ? "bg-white/20 text-white" : "bg-line text-ink-muted"
                  )}
                >
                  {tab.badge}
                </span>
              </button>
            )
          })}
        </div>

        {/* Moldura da Interface com Hotspots Interativos */}
        <div className="mt-8 rounded-3xl border border-line bg-white p-3 shadow-2xl sm:p-5">
          {/* Top bar */}
          <div className="mb-3 flex items-center justify-between rounded-xl bg-night px-4 py-3 text-xs text-white">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-red-500/80" />
              <span className="size-3 rounded-full bg-amber-500/80" />
              <span className="size-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-semibold text-[11px] text-white/75">
                Zenda &bull; {currentTab.id === "dashboard" ? "Agenda e Caixa" : "Chamar Clientes no WhatsApp"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-growth/20 px-2.5 py-0.5 font-semibold text-growth text-[11px]">
                <span className="size-1.5 rounded-full bg-growth animate-pulse" />
                Robô 24h Ativo
              </span>
            </div>
          </div>

          {/* Área da Imagem Real com Hotspots Flutuantes */}
          <div className="relative overflow-hidden rounded-2xl border border-line/60 bg-black/5">
            <img
              src={currentTab.image}
              alt={currentTab.imageAlt}
              className="w-full object-cover transition-transform duration-500"
              loading="eager"
            />

            {/* Pins / Hotspots Interativos sobre a imagem */}
            <div className="absolute inset-0 pointer-events-none">
              {currentTab.hotspots.map((hotspot) => {
                const isSelected = activeHotspot?.id === hotspot.id

                return (
                  <div
                    key={hotspot.id}
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(isSelected ? null : hotspot)}
                      className={cn(
                        "group relative flex size-7 items-center justify-center rounded-full transition-all focus:outline-none",
                        isSelected
                          ? "bg-brand text-white scale-125 shadow-lg shadow-brand/50 ring-4 ring-white"
                          : "bg-night text-white hover:scale-110 shadow-md ring-2 ring-white/80 hover:bg-brand"
                      )}
                      aria-label={`Ver detalhe: ${hotspot.title}`}
                    >
                      <span className="absolute -inset-1 rounded-full bg-growth/40 animate-ping pointer-events-none" />
                      <MousePointerClick className="size-3.5 group-hover:rotate-12 transition-transform" />
                    </button>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 rounded-2xl border border-line bg-night p-3.5 text-white shadow-2xl z-30"
                        >
                          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5">
                            <p className="font-heading text-xs font-bold text-white">{hotspot.title}</p>
                            <span className="rounded bg-brand/30 px-1.5 py-0.5 text-[9px] font-semibold text-cyan-300">
                              {hotspot.badge}
                            </span>
                          </div>
                          <p className="mt-1.5 text-[11px] leading-relaxed text-white/80">
                            {hotspot.description}
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveHotspot(null)
                            }}
                            className="mt-2 text-[10px] text-white/50 hover:text-white underline"
                          >
                            Fechar
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-ink-muted">
            <MousePointerClick className="size-3.5 text-brand" />
            <span>Toque nos círculos piscantes na imagem para ver como cada parte te ajuda.</span>
          </div>

          {/* Destaques e Benefícios da Tela Ativa */}
          <div className="mt-6 grid gap-6 border-t border-line pt-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-2">
              <h3 className="font-heading text-xl font-bold text-ink sm:text-2xl">
                {currentTab.headline}
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                {currentTab.description}
              </p>
            </div>

            <div className="lg:col-span-6">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {currentTab.keyBenefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 rounded-xl border border-line bg-canvas p-3 text-xs font-medium text-ink"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-growth" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
