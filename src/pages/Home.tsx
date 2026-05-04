import { HeroSection } from "@/components/sections/HeroSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { ProductShowcase } from "@/components/sections/ProductShowcase"
import { SolutionsSection } from "@/components/sections/SolutionsSection"
import { DemoVideoSection } from "@/components/sections/DemoVideoSection"
import { ContactFormSection } from "@/components/sections/ContactFormSection"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"

export function Home() {
  useDocumentMetadata(
    "Lypsyos | Software e automação para a indústria",
    "Landing page da Lypsyos com DBX-V4, peças planas e dobradas, automações industriais sob medida e contato técnico-comercial.",
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <FeaturesSection />
      <ProductShowcase />
      <SolutionsSection />
      <DemoVideoSection />
      <ContactFormSection />
    </main>
  )
}
