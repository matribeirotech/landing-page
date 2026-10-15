import { HeroSection } from "@/components/sections/HeroSection"
import { ProblemSolutionSection } from "@/components/sections/ProblemSolutionSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { TechStackSection } from "@/components/sections/TechStackSection"
import { FinalCtaSection } from "@/components/sections/FinalCtaSection"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"

export function ZendaProduct() {
  useDocumentMetadata({
    title: "Zenda — CRM de Agendamento e Robô no WhatsApp 24/7 | Lypsyos",
    description:
      "Conheça o Zenda: sistema de agendamento inteligente com robô atendente no WhatsApp 24/7, CRM visual e app instalável para salões de beleza, barbearias, manicures e clínicas. 30 dias grátis.",
    keywords:
      "crm de agendamento, crm para o whatsapp, sistema de agendamento, robo de agendamento whatsapp, zenda, zenda lypsyos, agendamento salão de beleza, barbearia, manicure",
    canonicalPath: "/zenda",
    ogType: "product",
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Zenda by Lypsyos",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android (PWA)",
      offers: {
        "@type": "Offer",
        price: "49.90",
        priceCurrency: "BRL",
        priceValidUntil: "2027-12-31",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "87",
      },
      description:
        "O Zenda é o sistema definitivo de agendamento automático com robô no WhatsApp 24/7, CRM inteligente 3-em-1 e app instalável sem loja.",
    },
  })

  return (
    <main className="flex flex-col">
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <TechStackSection />
      <FinalCtaSection />
    </main>
  )
}

