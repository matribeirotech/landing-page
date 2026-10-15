import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * Garante que a transição entre páginas distintas sempre role para o topo,
 * eliminando a sensação de scroll infinito ou posições desalinhadas.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname])

  return null
}

