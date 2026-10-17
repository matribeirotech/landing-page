import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  BarChart3,
  Bot,
  CalendarCheck2,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Info,
  Maximize2,
  Megaphone,
  MessageSquare,
  MousePointerClick,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react"
import { cn } from "@/utils/cn"

// Imagens reais da interface
import zendaDashboardImg from "@/assets/images/zenda/zenda-dashboard-real.png"
import zendaMarketingImg from "@/assets/images/zenda/zenda-marketing-campaigns-real.png"

interface Hotspot {
  id: string
  x: number // percentual horizontal
  y: number // percentual vertical
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
    label: "Painel CRM & Gestão",
    badge: "Visão Real da Plataforma",
    icon: BarChart3,
    title: "Central de Comando Zenda",
    headline: "Controle financeiro, horários e atendimento em uma única tela moderna",
    description:
      "Acompanhe o faturamento previsto do dia, confirme agendamentos pendentes com 1 clique e veja o robô do WhatsApp preencher os espaços vagos em tempo real.",
    image: zendaDashboardImg,
    imageAlt: "Captura de tela real do Painel Dashboard do Zenda CRM com indicadores de faturamento e agendamentos",
    keyBenefits: [
      "Faturamento previsto atualizado automaticamente a cada marcação",
      "Navegação rápida por dias com filtros de Confirmados e Pendentes",
      "Indicador de status do Robô 24/7 com resposta média de 3 segundos",
      "Atalho de instalação direta do aplicativo no celular (PWA)",
    ],
    hotspots: [
      {
        id: "bot-status",
        x: 8,
        y: 12,
        title: "Robô 24/7 Ativo",
        badge: "Automação",
        description: "Conexão direta com seu WhatsApp comercial via QR Code criptografado. Atende dia e noite.",
      },
      {
        id: "install-app",
        x: 8,
        y: 20,
        title: "Instalar App Móvel",
        badge: "PWA Nativo",
        description: "Adicione o ícone do Zenda na tela inicial do seu celular com 1 clique, sem passar por lojas.",
      },
      {
        id: "faturamento",
        x: 27,
        y: 49,
        title: "Faturamento Previsto",
        badge: "Finanças",
        description: "Receita confirmada em tempo real na agenda. Saiba quanto vai faturar antes de abrir o salão.",
      },
      {
        id: "resumo-caixa",
        x: 58,
        y: 49,
        title: "Resumo do Caixa & Entradas",
        badge: "Controle",
        description: "Separação clara entre o que já entrou hoje e valores a receber pendentes.",
      },
      {
        id: "platform-widget",
        x: 85,
        y: 49,
        title: "Zenda Platform 24/7",
        badge: "Performance",
        description: "Robô ativo operando com latência ultrarrápida de 3 segundos nas respostas do WhatsApp.",
      },
      {
        id: "agenda-nav",
        x: 32,
        y: 83,
        title: "Navegação Rápida da Agenda",
        badge: "Produtividade",
        description: "Alterne entre Hoje, Amanhã e os próximos dias com um clique. Filtros de status integrados.",
      },
    ],
  },
  {
    id: "marketing",
    label: "Campanhas & Disparos WhatsApp",
    badge: "Motor de Faturamento",
    icon: Megaphone,
    title: "Reativação de Clientes Inativas",
    headline: "Lote sua agenda nos dias fracos enviando mensagens personalizadas com 1 clique",
    description:
      "O Zenda identifica automaticamente clientes que não agendam há mais de 30 dias. Dispare ofertas no WhatsApp oficial sem risco de banimento e com preview em tempo real.",
    image: zendaMarketingImg,
    imageAlt: "Captura de tela real do módulo de Marketing e Campanhas no WhatsApp do Zenda CRM",
    keyBenefits: [
      "Segmentação com 1 clique: Clientes ativas vs. Clientes sem vir há >30 dias",
      "Variáveis automáticas: cada cliente recebe a mensagem com o nome próprio dela",
      "Preview realista em formato de smartphone antes de fazer o disparo",
      "Chamada de ação direta com URA: 'Digite 1 para agendar agora'",
    ],
    hotspots: [
      {
        id: "segmentacao",
        x: 38,
        y: 45,
        title: "Público-Alvo Inteligente",
        badge: "Segmentação",
        description: "Filtro 'Recuperar Clientes' isola quem não comparece há mais de 30 dias para campanhas de retorno.",
      },
      {
        id: "variaveis",
        x: 44,
        y: 68,
        title: "Tags Dinâmicas {nome_cliente}",
        badge: "Personalização",
        description: "O robô substitui as tags pelo nome cadastrado da cliente, tornando o atendimento 100% humanizado.",
      },
      {
        id: "disparo-btn",
        x: 44,
        y: 96,
        title: "Disparo no WhatsApp Oficial",
        badge: "Conversão",
        description: "Envio em fila com intervalos naturais para manter alta entregabilidade e resposta imediata.",
      },
      {
        id: "mobile-preview",
        x: 84,
        y: 65,
        title: "Simulação Realista no Celular",
        badge: "Preview",
        description: "Veja exatamente como a mensagem oficial será exibida na tela do celular da sua cliente.",
      },
    ],
  },
]

export function ZendaRealInterfaceShowcase({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "marketing">("dashboard")
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)

  const currentTab = tabsData.find((tab) => tab.id === activeTab) || tabsData[0]

  return (
    <section className={cn("w-full overflow-hidden bg-canvas py-16 md:py-24", className)}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Cabeçalho da Seção */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
            <Sparkles className="size-3.5" />
            INTERFACE REAL DO PRODUTO ZENDA
          </p>
          <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-ink sm:text-4xl">
            Sem maquetes genéricas.{" "}
            <span className="text-growth-text">Essa é a tela real que você vai usar.</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            Desenvolvido para ser intuitivo até para quem não domina tecnologia. Explore os pontos interativos abaixo para conhecer os detalhes do sistema.
          </p>
        </div>

        {/* Seletor de Abas da Interface */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
                  "inline-flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-bold transition-all sm:text-base",
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
          {/* Top bar estilo navegador moderno */}
          <div className="mb-3 flex items-center justify-between rounded-xl bg-night px-4 py-3 text-xs text-white">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-red-500/80" />
              <span className="size-3 rounded-full bg-amber-500/80" />
              <span className="size-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-white/50">
                app.lypsyos.com/{currentTab.id === "dashboard" ? "crm" : "marketing"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-growth/20 px-2.5 py-0.5 font-semibold text-growth text-[11px]">
                <span className="size-1.5 rounded-full bg-growth animate-pulse" />
                El Estabelecimento • Zenda Pro Ativo
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
                      {/* Efeito de radar pulsante */}
                      <span className="absolute -inset-1 rounded-full bg-growth/40 animate-ping pointer-events-none" />
                      <MousePointerClick className="size-3.5 group-hover:rotate-12 transition-transform" />
                    </button>

                    {/* Tooltip do Hotspot ao clicar ou ativar */}
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

          {/* Instrução de Hotspots */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-ink-muted">
            <MousePointerClick className="size-3.5 text-brand" />
            <span>Toque nos ícones piscantes na imagem para entender cada função da tela.</span>
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

