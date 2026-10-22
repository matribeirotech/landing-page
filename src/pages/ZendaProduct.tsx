import { ZendaHeroSection } from "@/components/sections/ZendaHeroSection"
import { ZendaLiveSimulation } from "@/components/sections/ZendaLiveSimulation"
import { ZendaRealInterfaceShowcase } from "@/components/sections/ZendaRealInterfaceShowcase"
import { ProblemSolutionSection } from "@/components/sections/ProblemSolutionSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { ZendaTestimonialsSection } from "@/components/sections/ZendaTestimonialsSection"
import { FinalCtaSection } from "@/components/sections/FinalCtaSection"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"
import { Zap } from "lucide-react"

export function ZendaProduct() {
  useDocumentMetadata({
    title: "Zenda — Robô de Agendamento no WhatsApp 24h para Salões e Barbearias",
    description:
      "O seu salão não pode parar porque você está respondendo o WhatsApp. Enquanto você atende uma cliente, o Zenda agenda as próximas cinco. Teste 30 dias grátis.",
    keywords:
      "robo de agendamento whatsapp, sistema de agendamento, agenda para manicure, agenda para barbearia, agenda para salão de beleza, zenda, lypsyos",
    canonicalPath: "/zenda",
    ogType: "product",
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Zenda by Lypsyos",
      applicationCategory: "BusinessApplication",
      operatingSystem: "iPhone e Android (1 clique)",
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
        "Enquanto você atende uma cliente, o Zenda agenda as próximas cinco pelo WhatsApp. Instalação direta no iPhone ou Android com 1 clique.",
    },
  })

  return (
    <main className="flex flex-col">
      {/* 1. Topo focado 100% no Zenda */}
      <ZendaHeroSection />

      {/* 2. Como Funciona na Prática: Do WhatsApp direto para a Agenda */}
      <section
        id="como-funciona"
        className="relative w-full overflow-hidden bg-gradient-to-b from-white via-canvas to-surface py-12 sm:py-18 border-y border-line/70 scroll-mt-16"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-growth-soft px-3 py-1 text-xs font-bold text-growth-text uppercase tracking-wider">
              <Zap className="size-3.5 text-growth" />
              COMO FUNCIONA NA PRÁTICA
            </span>
            <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-ink sm:text-4xl">
              Veja o Zenda trabalhando por você <span className="text-growth-text">no piloto automático</span>
            </h2>
            <p className="mt-2 text-sm text-ink-soft sm:text-base leading-relaxed">
              Da mensagem que a cliente manda no seu WhatsApp até o horário marcado e o caixa atualizado no seu celular.
            </p>
          </div>

          <ZendaLiveSimulation />
        </div>
      </section>

      {/* 3. Imagens Reais da Tela que Você Vai Usar */}
      <ZendaRealInterfaceShowcase />

      {/* 4. Dor vs Solução: Caderno vs Zenda */}
      <ProblemSolutionSection />

      {/* 5. Tudo o que vem no Zenda */}
      <FeaturesSection />

      {/* 6. Facilidade em 2 Minutos + Depoimentos (Substitui o antigo bloco técnico) */}
      <ZendaTestimonialsSection />

      {/* 7. Chamada Final para WhatsApp e Teste Grátis */}
      <FinalCtaSection />
    </main>
  )
}
export default ZendaProduct
