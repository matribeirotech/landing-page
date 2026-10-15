import { HeroSection } from "@/components/sections/HeroSection"
import { ProblemSolutionSection } from "@/components/sections/ProblemSolutionSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { ComparisonSection } from "@/components/sections/ComparisonSection"
import { PricingSection } from "@/components/sections/PricingSection"
import { AudienceSection } from "@/components/sections/AudienceSection"
import { TechStackSection } from "@/components/sections/TechStackSection"
import { FinalCtaSection } from "@/components/sections/FinalCtaSection"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"

export function Home() {
  useDocumentMetadata(
    "Lypsyos — Automação de Agendamentos e Robô no WhatsApp para Beleza e Estética",
    "Transforme seu WhatsApp em uma máquina de agendamentos 24/7. CRM inteligente, aplicativo móvel e agendamento sem conflitos para salões, barbearias, manicures e clínicas. Teste grátis.",
  )

  return (
    <main className="flex flex-col">
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <ComparisonSection />
      <PricingSection />
      <AudienceSection />
      <TechStackSection />
      <FinalCtaSection />
    </main>
  )
}

