import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, MessageCircle, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/Button"
import { BrandMark } from "@/components/common/BrandMark"
import { WHATSAPP_URL } from "@/content/site"
import { trackEvent } from "@/services/analytics"

interface NavItem {
  label: string
  to: string
  id: string
}

const navItems: NavItem[] = [
  { label: "Como Funciona", to: "/#como-funciona", id: "como_funciona" },
  { label: "Planos", to: "/planos", id: "planos" },
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
    if (to.startsWith("/#")) {
      return location.pathname === "/" || location.pathname === "/zenda"
    }
    return location.pathname.startsWith(to)
  }

  return (
    <nav aria-label="Navegação principal" className="sticky top-0 z-50 w-full border-b border-line/80 bg-white/95 backdrop-blur-xl">
      <div className="container mx-auto flex h-[4.25rem] items-center justify-between gap-3 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 rounded-lg" onClick={() => handleNavigation("logo")}>
          <BrandMark compact showSubtitle={false} />
        </Link>

        {/* Menu Enxuto: Como Funciona, Planos, Contato */}
        <div className="hidden md:flex md:items-center md:gap-2">
          {navItems.map((item) => {
            const active = isActive(item.to)
            return (
              <Link
                key={item.id}
                to={item.to}
                className={`relative inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[0.9375rem] font-semibold transition-all ${
                  active
                    ? "bg-brand/10 text-brand"
                    : "text-ink-soft hover:bg-brand-soft hover:text-brand"
                }`}
                onClick={() => handleNavigation(item.id)}
              >
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* CTAs Desktop */}
        <div className="hidden md:flex md:items-center md:gap-2.5">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              size: "sm",
              className: "bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold gap-1.5",
            })}
            onClick={() => handleDemoClick("desktop_navbar_whatsapp")}
          >
            <MessageCircle className="size-4 fill-white text-white" aria-hidden="true" />
            WhatsApp
          </a>
          <Link
            to="/contato"
            className={buttonVariants({ size: "sm", className: "font-bold" })}
            onClick={() => handleDemoClick("desktop_navbar_teste_gratis")}
          >
            Teste Grátis (30 Dias)
          </Link>
        </div>

        {/* Botão Rápido + Menu no Celular */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/contato"
            className={buttonVariants({ size: "sm", className: "px-3 py-1.5 text-xs font-bold" })}
            onClick={() => handleDemoClick("mobile_header_teste_gratis")}
          >
            Teste Grátis
          </Link>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-lg border border-line text-ink"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Fechar menu principal" : "Abrir menu principal"}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div id="mobile-navigation" className="container mx-auto flex flex-col gap-1.5 border-t border-line px-4 pb-5 pt-3 md:hidden">
          {navItems.map((item) => {
            const active = isActive(item.to)
            return (
              <Link
                key={item.id}
                to={item.to}
                className={`flex min-h-12 items-center justify-between rounded-xl px-4 text-base font-semibold transition-colors ${
                  active
                    ? "bg-brand/10 text-brand"
                    : "text-ink hover:bg-brand-soft hover:text-brand"
                }`}
                onClick={() => {
                  handleNavigation(`${item.id}_mobile`)
                  setIsOpen(false)
                }}
              >
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="mt-2 grid gap-2.5 pt-2 border-t border-line/60">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                size: "lg",
                className: "w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold gap-2",
              })}
              onClick={() => {
                handleDemoClick("mobile_navbar_whatsapp")
                setIsOpen(false)
              }}
            >
              <MessageCircle className="size-5 fill-white text-white" aria-hidden="true" />
              Chamar no WhatsApp
            </a>
            <Link
              to="/contato"
              className={buttonVariants({ size: "lg", className: "w-full font-bold" })}
              onClick={() => {
                handleDemoClick("mobile_navbar_teste_gratis")
                setIsOpen(false)
              }}
            >
              Começar 30 Dias Grátis
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  )
}
