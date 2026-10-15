import type { ComponentType } from "react"
import type { SolutionMockup } from "@/content/products"
import {
  WhatsAppBotMockup,
  DashboardCrmMockup,
  PwaMobileMockup,
  PushAndCalendarMockup,
  CatalogCustomMockup,
  SecurityGuardMockup,
} from "@/components/mockups/DeviceMockups"

const mockups = {
  "whatsapp-bot": WhatsAppBotMockup,
  "dashboard-crm": DashboardCrmMockup,
  "pwa-mobile": PwaMobileMockup,
  "push-calendar": PushAndCalendarMockup,
  "catalog-custom": CatalogCustomMockup,
  "security-guard": SecurityGuardMockup,
} satisfies Record<SolutionMockup, ComponentType<{ className?: string }>>

export function SolutionMockupView({ type, className }: { type: SolutionMockup; className?: string }) {
  const Mockup = mockups[type]
  return <Mockup className={className} />
}
