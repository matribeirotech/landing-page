import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { trackPageView } from "@/services/analytics"

export function RouteAnalytics() {
  const location = useLocation()
  const previousPath = useRef("")

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`

    if (previousPath.current === path) {
      return
    }

    previousPath.current = path

    void trackPageView({
      path,
      title: document.title,
      referrer: document.referrer || undefined,
    }).catch((error) => {
      console.error("Nao foi possivel registrar pageview", error)
    })
  }, [location])

  return null
}
