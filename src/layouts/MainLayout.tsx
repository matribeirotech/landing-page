import { Outlet } from "react-router-dom"
import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { RouteAnalytics } from "@/components/common/RouteAnalytics"
import { WhatsAppButton } from "@/components/common/WhatsAppButton"
import { ScrollToTop } from "@/components/common/ScrollToTop"

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-primary">
      <ScrollToTop />
      <RouteAnalytics />
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
