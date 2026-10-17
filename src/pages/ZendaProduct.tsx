import { ZendaHeroSection } from "@/components/sections/ZendaHeroSection"
import { ZendaLiveSimulation } from "@/components/sections/ZendaLiveSimulation"
import { ZendaRealInterfaceShowcase } from "@/components/sections/ZendaRealInterfaceShowcase"
import { ProblemSolutionSection } from "@/components/sections/ProblemSolutionSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { TechStackSection } from "@/components/sections/TechStackSection"
import { FinalCtaSection } from "@/components/sections/FinalCtaSection"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"
import { Sparkles, Zap, Bot, ShieldCheck } from "lucide-react"

export function ZendaProduct() {
  useDocumentMetadata({
    title: "Zenda — CRM de Agendamento e Robô no WhatsApp 24/7 | Lypsyos",
    description:
      "Conheça o Zenda: sistema de agendamento inteligente com robô atendente no WhatsApp 24/7, CRM visual com imagens reais e app instalável para salões de beleza, barbearias, manicures e clínicas. 30 dias grátis.",
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
      {/* Hero com a interface real e celular flutuante */}
      <ZendaHeroSection />

      {/* Animação Exclusiva Zenda: Simulação ao vivo do WhatsApp para o CRM */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-canvas to-surface py-14 sm:py-20 border-y border-line/70">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-growth-soft px-3 py-1 text-xs font-bold text-growth-text uppercase tracking-wider">
              <Zap className="size-3.5 text-growth" />
              ANIMAÇÃO EXCLUSIVA DO PRODUTO ZENDA
            </span>
            <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-ink sm:text-4xl">
              Como o Zenda opera no <span className="text-growth-text">piloto automático</span>
            </h2>
            <p className="mt-2 text-sm text-ink-soft sm:text-base leading-relaxed">
              Veja a mágica acontecer: da primeira mensagem enviada pela cliente no WhatsApp até a confirmação de horário e sincronização imediata no CRM.
            </p>
          </div>

          <ZendaLiveSimulation />
        </div>
      </section>

      {/* Showcase com as Imagens Reais da Interface do Zenda (Dashboard + Marketing) */}
      <ZendaRealInterfaceShowcase />

      {/* Dor vs Solução: Rotina manual de papel vs Zenda */}
      <ProblemSolutionSection />

      {/* Módulos do Ecossistema */}
      <FeaturesSection />

      {/* Arquitetura e Tecnologia */}
      <TechStackSection />

      {/* CTA Final para Início do Teste Grátis */}
      <FinalCtaSection />
    </main>
  )
}
export default ZendaProduct
