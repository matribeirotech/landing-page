import { LypsyosHeroSection } from "@/components/sections/LypsyosHeroSection"
import { ZendaSpotlightSection } from "@/components/sections/ZendaSpotlightSection"
import { LypsyosSolutionsSection } from "@/components/sections/LypsyosSolutionsSection"
import { LypsyosValuesSection } from "@/components/sections/LypsyosValuesSection"
import { FinalCtaSection } from "@/components/sections/FinalCtaSection"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"

export function Home() {
  useDocumentMetadata({
    title: "Lypsyos — Tecnologia, Sistemas Inteligentes e Automação de Negócios",
    description:
      "A Lypsyos desenvolve plataformas digitais, sistemas de gestão e automações inteligentes. Conheça o Zenda: nosso CRM de agendamentos com robô no WhatsApp 24/7.",
    keywords:
      "lypsyos, zenda, crm de agendamento, crm para o whatsapp, sistema de agendamento, automação whatsapp, software para salão, sistema para barbearia, manicure",
    canonicalPath: "/",
    ogType: "website",
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Lypsyos",
      url: "https://lypsyos.com.br",
      logo: "https://lypsyos.com.br/favicon.ico",
      description:
        "Plataformas digitais, sistemas de gestão inteligentes e automações para negócios modernos.",
      brand: {
        "@type": "Brand",
        name: "Zenda",
      },
    },
  })

  return (
    <main className="flex flex-col">
      <LypsyosHeroSection />
      <ZendaSpotlightSection />
      <LypsyosSolutionsSection />
      <LypsyosValuesSection />
      <FinalCtaSection />
    </main>
  )
}
