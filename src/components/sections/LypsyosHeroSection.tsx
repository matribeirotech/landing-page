import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  Bot,
  CalendarCheck2,
  Cpu,
  Layers,
  Lock,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"
import { LypsyosIconBadge } from "@/components/ui/LypsyosIconBadge"
import { trackEvent } from "@/services/analytics"
import { cn } from "@/utils/cn"

/* ============================================================================
 * 1. HOOK DE DETECÇÃO MOBILE & REDUCED MOTION (SEPARAÇÃO DESKTOP VS MOBILE)
 * ============================================================================ */

function useIsMobileViewport() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return
    }

    const mobileQuery = window.matchMedia("(max-width: 1023px), (pointer: coarse)")

    const updateViewport = () => {
      setIsMobile(mobileQuery.matches)
    }

    updateViewport()
    mobileQuery.addEventListener?.("change", updateViewport)

    return () => {
      mobileQuery.removeEventListener?.("change", updateViewport)
    }
  }, [])

  return isMobile
}

/* ============================================================================
 * 2. CAMADA DE FUNDO: MALHA NEURAL (<canvas>) + ORBES DE LUZ FLUIDOS
 * ============================================================================ */

interface NeuralNode {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

const BRAND_NODE_COLORS = [
  "rgba(11, 31, 77, 0.85)",   // Azul Marinho Institucional (#0b1f4d)
  "rgba(148, 163, 184, 0.8)", // Prata Tecnológico (#94a3b8)
  "rgba(6, 182, 212, 0.9)",   // Ciano Vibrante (#06b6d4)
  "rgba(36, 87, 245, 0.85)",  // Azul Lypsyos (#2457f5)
]

interface HeroBackgroundLayerProps {
  isMobile: boolean
  mouseX: ReturnType<typeof useMotionValue<number>>
  mouseY: ReturnType<typeof useMotionValue<number>>
}

function HeroBackgroundLayer({ isMobile, mouseX, mouseY }: HeroBackgroundLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  })

  const orbSpringX = useSpring(mouseX, { stiffness: 35, damping: 25, mass: 1.2 })
  const orbSpringY = useSpring(mouseY, { stiffness: 35, damping: 25, mass: 1.2 })

  const secondaryOrbX = useTransform(orbSpringX, (v) => -v * 0.65)
  const secondaryOrbY = useTransform(orbSpringY, (v) => -v * 0.65)

  useEffect(() => {
    const unsubscribeX = mouseX.on("change", (latestX) => {
      pointerRef.current.x = latestX
      pointerRef.current.active = true
    })
    const unsubscribeY = mouseY.on("change", (latestY) => {
      pointerRef.current.y = latestY
    })
    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [mouseX, mouseY])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (typeof navigator !== "undefined" && /jsdom/i.test(navigator.userAgent)) return

    let ctx: CanvasRenderingContext2D | null = null
    try {
      ctx = canvas.getContext("2d")
    } catch {
      ctx = null
    }
    if (!ctx) return

    let animationFrameId = 0
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth)
    let height = (canvas.height = canvas.offsetHeight || 680)

    // No mobile: menos partículas para máxima fluidez e economia de bateria
    const particleCount = isMobile ? 14 : 46
    const connectionDistance = isMobile ? 100 : 150

    const nodes: NeuralNode[] = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.45),
      vy: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.45),
      radius: i % 3 === 0 ? 2.3 : 1.6,
      color: BRAND_NODE_COLORS[i % BRAND_NODE_COLORS.length],
    }))

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth || window.innerWidth
      height = canvas.height = canvas.offsetHeight || 680
    }

    window.addEventListener("resize", handleResize)

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j]
          const dx = node.x - other.x
          const dy = node.y - other.y
          const dist = Math.hypot(dx, dy)

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.42
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha.toFixed(3)})`
            ctx.lineWidth = 0.85
            ctx.stroke()
          }
        }

        if (!isMobile && pointerRef.current.active) {
          const cursorX = width / 2 + pointerRef.current.x
          const cursorY = height / 2 + pointerRef.current.y
          const dx = node.x - cursorX
          const dy = node.y - cursorY
          const dist = Math.hypot(dx, dy)

          if (dist < 175) {
            const alpha = (1 - dist / 175) * 0.55
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(cursorX, cursorY)
            ctx.strokeStyle = `rgba(36, 87, 245, ${alpha.toFixed(3)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      animationFrameId = window.requestAnimationFrame(renderFrame)
    }

    animationFrameId = window.requestAnimationFrame(renderFrame)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.13]"
      />

      <motion.div
        style={isMobile ? undefined : { x: orbSpringX, y: orbSpringY }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.78, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-28 -top-28 size-[24rem] sm:size-[34rem] rounded-full bg-gradient-to-br from-brand/16 via-cyan-400/12 to-night/8 blur-3xl"
      />

      <motion.div
        style={isMobile ? undefined : { x: secondaryOrbX, y: secondaryOrbY }}
        animate={{
          scale: [1, 1.14, 1],
          opacity: [0.45, 0.72, 0.45],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute -bottom-36 -left-24 size-[22rem] sm:size-[32rem] rounded-full bg-gradient-to-tr from-growth/14 via-cyan-500/10 to-slate-400/12 blur-3xl"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0b1f4d_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.025]" />
    </div>
  )
}

/* ============================================================================
 * 3. TIPOGRAFIA EM CASCATA RESPONSIVA (SEM QUEBRA NO MOBILE)
 * ============================================================================ */

const HEADLINE_WORDS = [
  { text: "Aceleramos", highlight: false },
  { text: "seu", highlight: false },
  { text: "negócio", highlight: false },
  { text: "com", highlight: false },
  { text: "sistemas", highlight: false },
  { text: "modernos", highlight: false },
  { text: "e", highlight: false },
  { text: "automação", highlight: true },
  { text: "inteligente.", highlight: true },
]

function CascadeHeadline() {
  return (
    <h1
      aria-label="Aceleramos seu negócio com sistemas modernos e automação inteligente."
      className="text-[2rem] leading-[1.16] font-extrabold tracking-tight text-ink sm:text-5xl lg:text-[3.35rem] xl:text-[3.65rem] lg:leading-[1.1]"
    >
      {HEADLINE_WORDS.map((word, index) => (
        <span key={`${word.text}-${index}`} className="inline">
          <motion.span
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              delay: 0.06 + index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(
              "inline-block",
              word.highlight &&
                "bg-gradient-to-r from-brand via-cyan-600 to-brand bg-clip-text text-transparent",
            )}
          >
            {word.text}
          </motion.span>
          {index < HEADLINE_WORDS.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  )
}

/* ============================================================================
 * 4. BOTÕES MAGNÉTICOS COM BORDER-BEAM GLOW (RESPONSIVOS NO MOBILE)
 * ============================================================================ */

interface MagneticBorderBeamButtonProps {
  to: string
  variant?: "primary" | "outline"
  isMobile: boolean
  onClick?: () => void
  children: ReactNode
}

function MagneticBorderBeamButton({
  to,
  variant = "primary",
  isMobile,
  onClick,
  children,
}: MagneticBorderBeamButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 })

  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const spotlightBg = useMotionTemplate`radial-gradient(120px circle at ${glowX}% ${glowY}%, rgba(6, 182, 212, 0.35), transparent 80%)`

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (isMobile || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((event.clientX - centerX) * 0.2)
    y.set((event.clientY - centerY) * 0.25)

    glowX.set(((event.clientX - rect.left) / rect.width) * 100)
    glowY.set(((event.clientY - rect.top) / rect.height) * 100)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const isPrimary = variant === "primary"

  return (
    <motion.div
      ref={ref}
      style={isMobile ? undefined : { x: springX, y: springY }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative inline-flex w-full sm:w-auto rounded-btn p-[1.5px] overflow-hidden group"
    >
      <motion.span
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        className={cn(
          "pointer-events-none absolute -inset-[120%] transition-opacity duration-300",
          isPrimary
            ? "bg-[conic-gradient(from_0deg,transparent_0_260deg,#06b6d4_300deg,#10b981_335deg,#ffffff_360deg)] opacity-75 group-hover:opacity-100"
            : "bg-[conic-gradient(from_0deg,transparent_0_270deg,#2457f5_315deg,#06b6d4_360deg)] opacity-0 group-hover:opacity-100",
        )}
      />

      {!isMobile && isHovered ? (
        <motion.span
          aria-hidden="true"
          style={{ background: spotlightBg }}
          className="pointer-events-none absolute inset-0 z-0 rounded-btn"
        />
      ) : null}

      <Link
        to={to}
        onClick={onClick}
        className={cn(
          "relative z-10 inline-flex min-h-12 w-full sm:w-auto select-none items-center justify-center gap-2 rounded-[calc(var(--radius-btn)-1px)] px-4 py-2.5 text-center text-sm sm:px-6 sm:text-base sm:whitespace-nowrap transition-all duration-200",
          isPrimary
            ? "bg-brand font-bold text-white shadow-lg shadow-brand/25 group-hover:bg-brand-hover"
            : "border border-line bg-surface/95 font-semibold text-ink group-hover:border-transparent group-hover:bg-brand-soft/90 group-hover:text-brand",
        )}
      >
        {children}
      </Link>
    </motion.div>
  )
}

/* ============================================================================
 * 5. OBJETO EXCLUSIVO DESKTOP: NÚCLEO NEURAL HOLOGRÁFICO LYPSYOS (COM LOGO)
 *    - Renderizado APENAS em Desktop (!isMobile)
 *    - Contém o logo oficial da Lypsyos no centro do reator orbital
 *    - Harmônico com a identidade visual limpa (Branco, Azul Royal, Ciano e Verde)
 * ============================================================================ */

const ORBITAL_NODES = [
  {
    id: "whatsapp",
    label: "Robô WhatsApp 24/7",
    metric: "Resposta em 2s",
    icon: Bot,
    tone: "growth" as const,
    position: "-top-4 -left-4 xl:-left-6",
    delay: 0,
  },
  {
    id: "crm",
    label: "CRM Visual 3-em-1",
    metric: "Gestão em tempo real",
    icon: Layers,
    tone: "brand" as const,
    position: "-top-4 -right-4 xl:-right-6",
    delay: 0.6,
  },
  {
    id: "pwa",
    label: "App Nativo PWA",
    metric: "1-Clique sem loja",
    icon: Smartphone,
    tone: "cyan" as const,
    position: "-bottom-4 -left-4 xl:-left-6",
    delay: 1.2,
  },
  {
    id: "security",
    label: "Security Guard RLS",
    metric: "100% Isolado",
    icon: Lock,
    tone: "brand" as const,
    position: "-bottom-4 -right-4 xl:-right-6",
    delay: 1.8,
  },
]

interface LypsyosNeuralEmblem3DProps {
  mouseX: ReturnType<typeof useMotionValue<number>>
  mouseY: ReturnType<typeof useMotionValue<number>>
}

function LypsyosNeuralEmblem3D({ mouseX, mouseY }: LypsyosNeuralEmblem3DProps) {
  const rawRotateX = useTransform(mouseY, [-300, 300], [9, -9])
  const rawRotateY = useTransform(mouseX, [-500, 500], [-12, 12])
  const rawShiftX = useTransform(mouseX, [-500, 500], [-10, 10])
  const rawShiftY = useTransform(mouseY, [-300, 300], [-8, 8])

  const rotateX = useSpring(rawRotateX, { stiffness: 110, damping: 20 })
  const rotateY = useSpring(rawRotateY, { stiffness: 110, damping: 20 })
  const shiftX = useSpring(rawShiftX, { stiffness: 85, damping: 22 })
  const shiftY = useSpring(rawShiftY, { stiffness: 85, damping: 22 })

  return (
    <div className="hidden lg:flex items-center justify-center relative py-6">
      <motion.div
        aria-label="Núcleo tecnológico interativo da marca Lypsyos"
        style={{
          rotateX,
          rotateY,
          x: shiftX,
          y: shiftY,
          transformPerspective: 1100,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[26rem]"
      >
        {/* Levitação suave contínua no eixo Y */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-[2.25rem] border border-brand/20 bg-gradient-to-b from-white/95 via-white/90 to-brand-soft/40 p-7 shadow-[0_25px_70px_-12px_rgba(36,87,245,0.18)] backdrop-blur-xl"
        >
          {/* Brilho superior especular */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand/60 to-transparent"
          />

          {/* Satélites flutuantes nos 4 cantos */}
          {ORBITAL_NODES.map((node) => (
            <motion.div
              key={node.id}
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.delay,
              }}
              className={cn(
                "absolute z-20 flex items-center gap-2.5 rounded-2xl border border-line/90 bg-white/95 px-3 py-2 shadow-lift backdrop-blur-md",
                node.position,
              )}
            >
              <LypsyosIconBadge icon={node.icon} tone={node.tone} size="sm" />
              <div className="pr-1 text-left">
                <p className="text-xs font-bold leading-tight text-ink">{node.label}</p>
                <p className="text-[10px] font-semibold text-growth-text">{node.metric}</p>
              </div>
            </motion.div>
          ))}

          {/* Estágio Orbital Central com o Logo Oficial da Lypsyos */}
          <div className="relative mx-auto my-4 flex size-64 items-center justify-center">
            {/* Aura luminosa pulsante de fundo */}
            <motion.div
              animate={{ scale: [1, 1.14, 1], opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute size-44 rounded-full bg-gradient-to-tr from-brand/25 via-cyan-400/25 to-growth/20 blur-2xl"
            />

            {/* Anel Orbital Externo (SVG rotacionando no sentido horário) */}
            <motion.svg
              viewBox="0 0 240 240"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute inset-0 size-full"
            >
              <defs>
                <linearGradient id="lypsyos-orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2457f5" stopOpacity="0.65" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.65" />
                </linearGradient>
              </defs>
              <circle
                cx="120"
                cy="120"
                r="104"
                fill="none"
                stroke="url(#lypsyos-orbit-grad)"
                strokeWidth="1.5"
                strokeDasharray="8 8"
              />
              <circle cx="120" cy="16" r="4.5" fill="#2457f5" />
              <circle cx="224" cy="120" r="4.5" fill="#06b6d4" />
              <circle cx="120" cy="224" r="4.5" fill="#10b981" />
              <circle cx="16" cy="120" r="4.5" fill="#0b1f4d" />
            </motion.svg>

            {/* Anel Neural Interno (SVG rotacionando no sentido anti-horário) */}
            <motion.svg
              viewBox="0 0 200 200"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute size-48"
            >
              <circle
                cx="100"
                cy="100"
                r="76"
                fill="none"
                stroke="#2457f5"
                strokeOpacity="0.22"
                strokeWidth="1.5"
              />
              <path
                d="M 100 24 A 76 76 0 0 1 176 100"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 100 176 A 76 76 0 0 1 24 100"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </motion.svg>

            {/* Medalhão Central com a Logo Oficial da Lypsyos */}
            <motion.div
              whileHover={{ scale: 1.06 }}
              className="relative z-10 flex size-28 flex-col items-center justify-center rounded-3xl border-2 border-brand/25 bg-white p-4 shadow-[0_16px_40px_rgba(36,87,245,0.22)]"
            >
              <img
                src="/logo-oficial.png"
                alt="Logo Oficial Lypsyos"
                className="size-14 object-contain drop-shadow-xs"
              />
              <span className="mt-1 font-heading text-[11px] font-extrabold tracking-tight text-night">
                LYPSYOS
              </span>
            </motion.div>
          </div>

          {/* Barra inferior de telemetria em tempo real */}
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-brand/15 bg-white/90 px-4 py-2.5 text-xs shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-growth opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-growth" />
              </span>
              <span className="font-semibold text-ink">Ecossistema Lypsyos Ativo</span>
            </div>
            <span className="rounded-full bg-brand-soft px-2.5 py-0.5 font-bold text-brand text-[11px]">
              99.9% Uptime
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ============================================================================
 * 6. ABORDAGEM EXCLUSIVA MOBILE: PULSO INTERATIVO LYPSYOS (COM LOGO)
 *    - Ativa APENAS quando o usuário está no celular (isMobile / lg:hidden)
 *    - Compacta, fluida, sem quebrar o layout vertical e com toque interativo
 * ============================================================================ */

const MOBILE_PULSE_ITEMS = [
  {
    id: "bot",
    title: "Robô WhatsApp 24/7",
    subtitle: "Responde em 2s e fecha agendamentos sozinho",
    icon: Bot,
    tone: "growth" as const,
  },
  {
    id: "crm",
    title: "Central CRM 3-em-1",
    subtitle: "Cartões, Lista e Tabela com faturamento real",
    icon: CalendarCheck2,
    tone: "brand" as const,
  },
  {
    id: "cloud",
    title: "App PWA & Segurança RLS",
    subtitle: "Instalação em 1 toque e isolamento bancário",
    icon: Cpu,
    tone: "cyan" as const,
  },
]

function MobileLypsyosPulseBanner() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MOBILE_PULSE_ITEMS.length)
    }, 3400)
    return () => window.clearInterval(timer)
  }, [])

  const currentItem = MOBILE_PULSE_ITEMS[activeIndex]

  return (
    <div className="mt-4 w-full max-w-md mx-auto lg:hidden">
      <div className="relative overflow-hidden rounded-2xl border border-brand/25 bg-gradient-to-br from-white via-brand-soft/35 to-growth-soft/30 p-4 shadow-soft">
        {/* Cabeçalho com o Logo da Lypsyos + Pulso em Tempo Real */}
        <div className="flex items-center justify-between border-b border-line/80 pb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand/20 bg-white p-1.5 shadow-2xs">
              <img
                src="/logo-oficial.png"
                alt="Logo Lypsyos"
                className="size-full object-contain"
              />
              <span className="absolute -right-1 -top-1 flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-growth opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-growth" />
              </span>
            </div>
            <div className="min-w-0 text-left">
              <p className="font-heading text-xs font-extrabold uppercase tracking-wider text-night truncate">
                Lypsyos Neural Core
              </p>
              <p className="text-[11px] font-medium text-growth-text truncate">
                Automação Inteligente Ativa
              </p>
            </div>
          </div>

          {/* Indicadores tocáveis para alternar no celular */}
          <div className="flex items-center gap-1.5 shrink-0">
            {MOBILE_PULSE_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Ver módulo ${item.title}`}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === activeIndex ? "w-5 bg-brand" : "w-2 bg-brand/25",
                )}
              />
            ))}
          </div>
        </div>

        {/* Card animado que alterna suavemente no mobile */}
        <div className="pt-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="flex items-center gap-3 rounded-xl border border-white/80 bg-white/90 p-3 text-left shadow-2xs"
            >
              <LypsyosIconBadge icon={currentItem.icon} tone={currentItem.tone} size="md" />
              <div className="min-w-0 flex-1">
                <p className="font-heading text-sm font-bold text-ink truncate">
                  {currentItem.title}
                </p>
                <p className="text-xs text-ink-soft leading-snug line-clamp-2">
                  {currentItem.subtitle}
                </p>
              </div>
              <Zap className="size-4 text-brand shrink-0" aria-hidden="true" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ============================================================================
 * 7. COMPONENTE PRINCIPAL: LypsyosHeroSection
 * ============================================================================ */

const guarantees = [
  "Tecnologia em nuvem de alta disponibilidade",
  "Isolamento multitenant de nível bancário",
  "Design humanizado pensado para o dia a dia",
]

export function LypsyosHeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobileViewport()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleSectionMouseMove = (event: ReactMouseEvent<HTMLElement>) => {
    if (isMobile || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    mouseX.set(event.clientX - (rect.left + rect.width / 2))
    mouseY.set(event.clientY - (rect.top + rect.height / 2))
  }

  const handleSectionMouseLeave = () => {
    if (isMobile) return
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      className="relative isolate w-full overflow-hidden bg-white pb-14 pt-10 md:pb-24 md:pt-18"
    >
      {/* CAMADA 1: Animações de Fundo */}
      <HeroBackgroundLayer isMobile={isMobile} mouseX={mouseX} mouseY={mouseY} />

      {/* CAMADA 2: Layout Responsivo (Coluna Dupla no Desktop / Fluxo Vertical Limpo no Mobile) */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
          {/* Coluna Principal de Copy & Ações */}
          <div className="min-w-0 flex flex-col items-center text-center lg:items-start lg:text-left gap-5 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand/20 bg-brand-soft/90 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-brand shadow-2xs"
            >
              <span className="size-2 shrink-0 rounded-full bg-growth animate-pulse" aria-hidden="true" />
              <span className="truncate sm:whitespace-normal">
                Tecnologia, Sistemas Inteligentes & Automação
              </span>
            </motion.div>

            {/* Headline com efeito Cascata */}
            <CascadeHeadline />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="max-w-2xl text-base text-ink-soft sm:text-lg md:text-xl leading-relaxed"
            >
              A <strong>Lypsyos</strong> desenvolve plataformas digitais, automações de atendimento e CRMs sob medida para empresas que desejam eliminar tarefas manuais, atender clientes com rapidez e ter controle total do seu faturamento.
            </motion.p>

            {/* Botões Magnéticos com Border-Beam Glow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.62 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-1 w-full sm:w-auto"
            >
              <MagneticBorderBeamButton
                to="/zenda"
                variant="primary"
                isMobile={isMobile}
                onClick={() => {
                  void trackEvent({
                    eventName: "home_hero_zenda_click",
                    category: "navigation",
                    label: "lypsyos_hero",
                  })
                }}
              >
                <Sparkles className="size-5 shrink-0 text-growth" />
                <span>Conhecer o Produto Zenda</span>
                <ArrowRight className="size-5 shrink-0" />
              </MagneticBorderBeamButton>

              <MagneticBorderBeamButton
                to="/contato"
                variant="outline"
                isMobile={isMobile}
              >
                <span>Fale com Nossos Especialistas</span>
              </MagneticBorderBeamButton>
            </motion.div>

            {/* Abordagem de Animação Exclusiva para Mobile (renderizada apenas no celular) */}
            {isMobile ? <MobileLypsyosPulseBanner /> : null}

            {/* Garantias institucionais */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm text-ink-soft"
            >
              {guarantees.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <ShieldCheck className="size-4.5 text-growth shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Objeto 3D Exclusivo para Desktop (NÃO renderizado no mobile) */}
          {!isMobile ? <LypsyosNeuralEmblem3D mouseX={mouseX} mouseY={mouseY} /> : null}
        </div>
      </div>
    </section>
  )
}
