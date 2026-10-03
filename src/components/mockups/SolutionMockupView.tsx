import type { ComponentType } from "react"
import type { SolutionMockup } from "@/content/products"
import { CashFlowMockup, MarketingMockup, StockMockup } from "@/components/mockups/DeviceMockups"

const mockups = {
  stock: StockMockup,
  cashflow: CashFlowMockup,
  marketing: MarketingMockup,
} satisfies Record<SolutionMockup, ComponentType<{ className?: string }>>

export function SolutionMockupView({ type, className }: { type: SolutionMockup; className?: string }) {
  const Mockup = mockups[type]
  return <Mockup className={className} />
}
