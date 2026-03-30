import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { trackEvent } from "@/services/analytics"
import { BrandMark } from "@/components/common/BrandMark"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

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

  function goToContact(origin: string) {
    handleDemoClick(origin)
    navigate("/contato")
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral/20 bg-surface/80 backdrop-blur-md">
      <div className="container mx-auto flex h-[4.5rem] items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <BrandMark compact className="text-primary" />
        </Link>
        <div className="hidden md:flex md:items-center md:gap-7">
          <Link to="/" className="text-[15px] font-semibold text-primary transition-colors hover:text-accent" onClick={() => handleNavigation("inicio")}>Início</Link>
          <Link to="/sobre" className="text-[15px] font-semibold text-primary transition-colors hover:text-accent" onClick={() => handleNavigation("sobre")}>Sobre</Link>
          <Link to="/produtos/dbx-v3" className="text-[15px] font-semibold text-primary transition-colors hover:text-accent" onClick={() => handleNavigation("produto_dbx_v3")}>DBX-V3</Link>
          <Link to="/contato" className="text-[15px] font-semibold text-primary transition-colors hover:text-accent" onClick={() => handleNavigation("contato")}>Contato</Link>
          <Button size="default" onClick={() => goToContact("desktop_navbar")}>Solicitar uma demonstração</Button>
        </div>
        <button
          type="button"
          className="rounded-lg border border-primary/10 p-2 md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Fechar menu principal" : "Abrir menu principal"}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6 text-primary" /> : <Menu className="h-6 w-6 text-primary" />}
        </button>
      </div>
      {isOpen && (
        <div id="mobile-navigation" className="container mx-auto flex flex-col gap-3 px-4 pb-5 md:hidden">
          <Link to="/" className="rounded-xl border border-transparent px-3 py-2 text-[15px] font-semibold text-primary transition-colors hover:border-primary/10 hover:bg-primary/5" onClick={() => { handleNavigation("inicio_mobile"); setIsOpen(false) }}>Início</Link>
          <Link to="/sobre" className="rounded-xl border border-transparent px-3 py-2 text-[15px] font-semibold text-primary transition-colors hover:border-primary/10 hover:bg-primary/5" onClick={() => { handleNavigation("sobre_mobile"); setIsOpen(false) }}>Sobre</Link>
          <Link to="/produtos/dbx-v3" className="rounded-xl border border-transparent px-3 py-2 text-[15px] font-semibold text-primary transition-colors hover:border-primary/10 hover:bg-primary/5" onClick={() => { handleNavigation("produto_dbx_v3_mobile"); setIsOpen(false) }}>DBX-V3</Link>
          <Link to="/contato" className="rounded-xl border border-transparent px-3 py-2 text-[15px] font-semibold text-primary transition-colors hover:border-primary/10 hover:bg-primary/5" onClick={() => { handleNavigation("contato_mobile"); setIsOpen(false) }}>Contato</Link>
          <Button className="mt-2 w-full" onClick={() => { goToContact("mobile_navbar"); setIsOpen(false) }}>Solicitar uma demonstração</Button>
        </div>
      )}
    </nav>
  )
}
