import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/Button"
import { BrandMark } from "@/components/common/BrandMark"
import { homeSections } from "@/content/site"
import { trackEvent } from "@/services/analytics"

interface NavItem {
  label: string
  to: string
  id: string
  badge?: string
}

const navItems: NavItem[] = [
  { label: "Início", to: "/", id: "inicio" },
  { label: "Zenda", to: "/zenda", id: "zenda", badge: "Robô & CRM" },
  { label: "Comparativo", to: "/comparativo", id: "comparativo" },
  { label: "Planos", to: "/planos", id: "planos" },
  { label: "Para quem é", to: "/para-quem-e", id: "para_quem_e" },
  { label: "Sobre", to: "/sobre", id: "sobre" },
  { label: "Contato", to: "/contato", id: "contato" },
]

function handleNavigation(label: string) {
  void trackEvent({
    eventName: "navigation_click",
    category: "navigation",
    label,
  }).catch((error) => {
    console.error("Não foi possível rastrear clique de navegação", error)
  })
}

function handleDemoClick(origin: string) {
  void trackEvent({
    eventName: "demo_cta_click",
    category: "conversion",
    label: origin,
    metadata: {
      placement: "navbar",
    },
  }).catch((error) => {
    console.error("Não foi possível rastrear CTA de demonstração", error)
  })
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname, location.hash])

  const isActive = (to: string) => {
    if (to === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(to)
  }

  return (
    <nav aria-label="Navegação principal" className="sticky top-0 z-50 w-full border-b border-line/80 bg-white/95 backdrop-blur-xl">
      <div className="container mx-auto flex h-[4.25rem] items-center justify-between gap-4 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 rounded-lg" onClick={() => handleNavigation("logo")}>
          <BrandMark compact showSubtitle={false} />
        </Link>

        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {navItems.map((item) => {
            const active = isActive(item.to)
            return (
              <Link
                key={item.id}
                to={item.to}
                className={`relative inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.9375rem] font-medium transition-all ${
                  active
                    ? "bg-brand/10 text-brand font-semibold"
                    : "text-ink-soft hover:bg-brand-soft hover:text-brand"
                }`}
                onClick={() => handleNavigation(item.id)}
              >
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-growth-soft px-1.5 py-0.5 text-[0.6875rem] font-bold text-growth-text">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            )
          })}
        </div>

        <Link
          to="/contato"
          className={buttonVariants({ className: "hidden lg:inline-flex" })}
          onClick={() => handleDemoClick("desktop_navbar")}
        >
          Agende uma demonstração
        </Link>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Fechar menu principal" : "Abrir menu principal"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </div>

      {isOpen ? (
        <div id="mobile-navigation" className="container mx-auto flex flex-col gap-1 border-t border-line px-4 pb-5 pt-3 lg:hidden">
          {navItems.map((item) => {
            const active = isActive(item.to)
            return (
              <Link
                key={item.id}
                to={item.to}
                className={`flex min-h-11 items-center justify-between rounded-xl px-3 text-base font-medium transition-colors ${
                  active
                    ? "bg-brand/10 text-brand font-semibold"
                    : "text-ink hover:bg-brand-soft hover:text-brand"
                }`}
                onClick={() => {
                  handleNavigation(`${item.id}_mobile`)
                  setIsOpen(false)
                }}
              >
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-growth-soft px-2 py-0.5 text-xs font-bold text-growth-text">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            )
          })}
          <Link
            to="/contato"
            className={buttonVariants({ size: "lg", className: "mt-3 w-full" })}
            onClick={() => {
              handleDemoClick("mobile_navbar")
              setIsOpen(false)
            }}
          >
            Agende uma demonstração
          </Link>
        </div>
      ) : null}
    </nav>
  )
}
