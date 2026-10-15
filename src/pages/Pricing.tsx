import { PricingSection } from "@/components/sections/PricingSection"
import { FinalCtaSection } from "@/components/sections/FinalCtaSection"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"
import { ChevronDown, HelpCircle } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"

const faqs = [
  {
    q: "Preciso informar cartão de crédito para começar o teste?",
    a: "Não! Você cria sua conta e usa todas as funcionalidades do Zenda por 30 dias gratuitamente, sem precisar cadastrar cartão de crédito ou ter qualquer compromisso financeiro.",
  },
  {
    q: "Como conecto meu número do WhatsApp ao Zenda?",
    a: "O processo leva menos de 2 minutos. Você abre as configurações no painel do Zenda e escaneia um QR Code criptografado direto com o WhatsApp do seu celular. Pronto: seu robô já estará ativo.",
  },
  {
    q: "O robô vai incomodar meus contatos pessoais (amigos e família)?",
    a: "Não. O Zenda possui uma trava inteligente de privacidade. Números já salvos na sua agenda pessoal continuam conversando com você normalmente. O robô só atende clientes novos ou quando alguém digita explicitamente a palavra /agendar.",
  },
  {
    q: "Funciona tanto em iPhone (iOS) quanto em celulares Android?",
    a: "Sim! O Zenda é um Progressive Web App (PWA) de última geração. Você instala direto pelo navegador (Safari no iPhone ou Chrome no Android) com 1 toque, sem gastar memória do celular.",
  },
  {
    q: "Posso cancelar a assinatura quando eu quiser?",
    a: "Sim, sem nenhuma multa, fidelidade ou pegadinha. Você tem total liberdade para cancelar a assinatura a qualquer momento com apenas 1 clique.",
  },
]

export function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useDocumentMetadata({
    title: "Planos e Preços — CRM e Agendamento no WhatsApp | Zenda Lypsyos",
    description:
      "Assinatura acessível com 30 dias de teste grátis sem compromisso. Robô atendente no WhatsApp ilimitado, CRM visual e aplicativo instalável.",
    keywords:
      "preço sistema de agendamento, plano crm whatsapp, assinatura zenda, teste gratis agendamento salão barbearia",
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
      {/* Hero da página de Planos */}
      <section className="relative overflow-hidden bg-white py-14 md:py-20 border-b border-line">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[32rem] rounded-full bg-brand/10 blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">
              Assinatura Sem Pegadinhas
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Planos claros, justos e com <span className="text-growth-text">30 dias grátis</span>
            </h1>
            <p className="text-base text-ink-soft sm:text-lg leading-relaxed">
              Experimente a automação completa do Zenda sem pagar nada agora. Comece hoje e recupere horas de descanso na sua rotina.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Seção do Card de Preços */}
      <PricingSection />

      {/* Seção FAQ */}
      <section className="py-16 md:py-24 bg-canvas border-t border-line">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-12 space-y-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-brand mx-auto mb-3">
              <HelpCircle className="size-5" />
            </span>
            <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
              Perguntas Frequentes sobre o Zenda
            </h2>
            <p className="text-sm text-ink-soft">
              Tudo o que você precisa saber antes de iniciar seu teste de 30 dias.
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

