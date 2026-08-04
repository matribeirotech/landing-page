import { HeroSection } from "@/components/sections/HeroSection"
import { ProductsOverviewSection } from "@/components/sections/ProductsOverviewSection"
import { WhyLypsyosSection } from "@/components/sections/WhyLypsyosSection"
import { ContactFormSection } from "@/components/sections/ContactFormSection"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"

export function Home() {
  useDocumentMetadata(
    "Lypsyos | Software para orçamento, engenharia e produção industrial",
    "A Lypsyos desenvolve software próprio para indústrias do aço e da metalmecânica: GeoQuote, Editor de Perfis e DBX-V4.",
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <ProductsOverviewSection />
      <WhyLypsyosSection />
      <ContactFormSection />
    </main>
  )
}
