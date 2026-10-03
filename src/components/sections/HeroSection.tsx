import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle2, ShoppingBag, Store, Truck, MapPin } from "lucide-react"
import { motion } from "motion/react"
import { buttonVariants } from "@/components/ui/Button"
import { HeroDevices } from "@/components/mockups/DeviceMockups"
import { homeSections } from "@/content/site"
import { trackEvent } from "@/services/analytics"

const reassurances = [
  "Demonstração sem compromisso",
  "Funciona no celular, tablet e PC",
  "Implantação acompanhada pela nossa equipe",
]

const segments = [
  { label: "Varejo", icon: ShoppingBag },
  { label: "Conveniências", icon: Store },
  { label: "Distribuidoras", icon: Truck },
  { label: "Lojas de bairro", icon: MapPin },
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
    <section className="relative isolate w-full overflow-hidden bg-white pb-14 pt-12 md:pb-20 md:pt-20">
      {/* Blobs decorativos da marca */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[32rem] rounded-full bg-brand/12 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/3 -z-10 size-[28rem] rounded-full bg-growth/12 blur-3xl" />

      <div className="container mx-auto grid items-center gap-12 px-4 md:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex min-w-0 flex-col gap-6"
        >
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-brand md:text-[0.8125rem]">
            <span className="size-2 rounded-full bg-growth" aria-hidden="true" />
            Gestão e marketing para o comércio
          </p>

          <h1 className="text-[2.25rem] font-bold leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            Gestão simples para a sua loja{" "}
            <span className="relative whitespace-nowrap text-growth-text">
              vender mais.
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
            A Lypsyos desenvolve sistemas inteligentes de{" "}
            <strong className="font-semibold text-ink">controle de estoque, fluxo de caixa e marketing</strong> para
            comerciantes que querem tomar decisões com segurança — do balcão ao celular.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contato"
              className={buttonVariants({ size: "lg" })}
              onClick={() => trackHeroCta("hero_agendar_demonstracao")}
            >
              Agende uma demonstração
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <a
              href={`#${homeSections.solutions}`}
              className={buttonVariants({ size: "lg", variant: "outline" })}
              onClick={() => trackHeroCta("hero_conhecer_solucoes")}
            >
              Conheça nossas soluções
            </a>
          </div>

          <ul className="flex flex-col gap-2 text-sm text-ink-soft sm:flex-row sm:flex-wrap sm:gap-x-5">
            {reassurances.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="size-4.5 shrink-0 text-growth" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto w-full min-w-0 max-w-[40rem]"
        >
          <HeroDevices />
        </motion.div>
      </div>

      {/* Faixa de confiança */}
      <div className="container mx-auto mt-14 px-4 md:mt-20 md:px-6">
        <div className="flex flex-col items-center gap-5 rounded-card border border-line bg-canvas px-6 py-6 text-center md:flex-row md:justify-between md:text-left">
          <p className="max-w-md text-sm font-medium text-ink-soft md:text-base">
            Feito para quem vive o dia a dia do comércio.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {segments.map((segment) => (
              <li key={segment.label} className="flex items-center gap-2 text-sm font-semibold text-ink">
                <segment.icon className="size-5 text-brand" aria-hidden="true" />
                {segment.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
