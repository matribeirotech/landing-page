import { PricingSection } from "@/components/sections/PricingSection"
import { FinalCtaSection } from "@/components/sections/FinalCtaSection"
import { LypsyosIconBadge } from "@/components/ui/LypsyosIconBadge"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"
import { ChevronDown, HelpCircle } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"

const faqs = [
  {
    q: "Preciso colocar cartão de crédito para testar os 30 dias?",
    a: "Não! Você cria sua conta e usa tudo no Zenda por 30 dias grátis, sem precisar colocar cartão de crédito e sem qualquer compromisso.",
  },
  {
    q: "Como eu ligo o robô no meu WhatsApp?",
    a: "Leva menos de 2 minutos. Você abre o Zenda, lê o código na tela com o seu WhatsApp e pronto: o robô já começa a responder suas clientes no mesmo segundo.",
  },
  {
    q: "O robô vai responder minha família e amigos pessoais?",
    a: "Não! Números que já estão salvos na sua agenda pessoal continuam conversando com você normalmente. O robô só atende clientes buscando marcar horário.",
  },
  {
    q: "Funciona tanto em iPhone quanto em Android?",
    a: "Sim! Instalação direta no iPhone ou Android com 1 clique, sem taxas nem burocracia de App Store, e sem ocupar a memória do seu celular.",
  },
  {
    q: "Se eu quiser cancelar depois, tem multa?",
    a: "Nenhuma! Não existe fidelidade nem multa. Você pode cancelar quando quiser com apenas 1 clique.",
  },
]

export function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useDocumentMetadata({
    title: "Planos e Preços — Zenda Robô de Agendamento no WhatsApp",
    description:
      "Teste grátis por 30 dias sem cartão de crédito. Robô de agendamento no WhatsApp 24h, agenda no celular e controle de caixa.",
    keywords:
      "preço sistema de agendamento, plano robo whatsapp, assinatura zenda, teste gratis agendamento salão barbearia manicure",
    canonicalPath: "/planos",
    ogType: "website",
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
  })

  return (
    <main className="flex flex-col bg-white">
      <section className="relative overflow-hidden bg-white py-12 md:py-16 border-b border-line">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[32rem] rounded-full bg-brand/10 blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">
              Simples e Sem Fidelidade
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Planos claros, justos e com <span className="text-growth-text">30 dias grátis</span>
            </h1>
            <p className="text-base text-ink-soft sm:text-lg leading-relaxed">
              Teste o Zenda completo no seu salão ou barbearia sem pagar nada agora.
            </p>
          </motion.div>
        </div>
      </section>

      <PricingSection />

      <section className="py-14 md:py-22 bg-canvas border-t border-line">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-10 space-y-2">
            <div className="mb-3 flex justify-center">
              <LypsyosIconBadge icon={HelpCircle} tone="brand" size="md" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
              Dúvidas Comuns sobre o Zenda
            </h2>
            <p className="text-sm text-ink-soft">
              Respostas diretas para você começar seu teste grátis com tranquilidade.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-line bg-white shadow-soft overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between p-5 text-left font-semibold text-ink text-sm sm:text-base gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`size-5 text-ink-soft transition-transform shrink-0 ${
                        isOpen ? "rotate-180 text-brand" : ""
                      }`}
                    />
                  </button>
                  {isOpen ? (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-ink-soft leading-relaxed border-t border-line/60">
                      {faq.a}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <FinalCtaSection />
    </main>
  )
}
