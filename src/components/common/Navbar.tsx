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
      console.error("Nao foi possivel rastrear clique de navegacao", error)
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
      console.error("Nao foi possivel rastrear CTA de demo", error)
    })
  }

  function goToContact(origin: string) {
    handleDemoClick(origin)
    navigate("/contato")
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral/20 bg-surface/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <BrandMark compact className="text-primary" />
        </Link>
        <div className="hidden md:flex md:items-center md:gap-6">
          <Link to="/" className="text-sm font-medium text-primary transition-colors hover:text-secondary" onClick={() => handleNavigation("inicio")}>Início</Link>
          <Link to="/sobre" className="text-sm font-medium text-primary transition-colors hover:text-secondary" onClick={() => handleNavigation("sobre")}>Sobre</Link>
          <Link to="/produtos/dbx-v2" className="text-sm font-medium text-primary transition-colors hover:text-secondary" onClick={() => handleNavigation("produto_dbx_v2")}>DBX-V2</Link>
          <Link to="/contato" className="text-sm font-medium text-primary transition-colors hover:text-secondary" onClick={() => handleNavigation("contato")}>Contato</Link>
          <Button className="bg-secondary text-primary hover:bg-secondary/80" onClick={() => goToContact("desktop_navbar")}>Solicite uma Demo</Button>
        </div>
        <button
          type="button"
          className="md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Fechar menu principal" : "Abrir menu principal"}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6 text-primary" /> : <Menu className="h-6 w-6 text-primary" />}
        </button>
      </div>
      {isOpen && (
        <div id="mobile-navigation" className="container mx-auto flex flex-col gap-4 px-4 pb-4 md:hidden">
          <Link to="/" className="text-sm font-medium text-primary transition-colors hover:text-secondary" onClick={() => { handleNavigation("inicio_mobile"); setIsOpen(false) }}>Início</Link>
          <Link to="/sobre" className="text-sm font-medium text-primary transition-colors hover:text-secondary" onClick={() => { handleNavigation("sobre_mobile"); setIsOpen(false) }}>Sobre</Link>
          <Link to="/produtos/dbx-v2" className="text-sm font-medium text-primary transition-colors hover:text-secondary" onClick={() => { handleNavigation("produto_dbx_v2_mobile"); setIsOpen(false) }}>DBX-V2</Link>
          <Link to="/contato" className="text-sm font-medium text-primary transition-colors hover:text-secondary" onClick={() => { handleNavigation("contato_mobile"); setIsOpen(false) }}>Contato</Link>
          <Button className="w-full bg-secondary text-primary hover:bg-secondary/80" onClick={() => { goToContact("mobile_navbar"); setIsOpen(false) }}>Solicite uma Demo</Button>
        </div>
      )}
    </nav>
  )
}
