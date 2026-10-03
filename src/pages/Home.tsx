import { HeroSection } from "@/components/sections/HeroSection"
import { ProblemSolutionSection } from "@/components/sections/ProblemSolutionSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { AudienceSection } from "@/components/sections/AudienceSection"
import { FinalCtaSection } from "@/components/sections/FinalCtaSection"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"

export function Home() {
  useDocumentMetadata(
    "Lypsyos — Gestão de Estoque, Caixa e Marketing para o Comércio",
    "Sistemas simples para controlar estoque, fluxo de caixa e fidelizar clientes. Ideal para varejo, conveniências, distribuidoras e comércios locais. Agende uma demonstração.",
  )

  return (
    <main className="flex flex-col">
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <AudienceSection />
      <FinalCtaSection />
    </main>
  )
}
