import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Check, Sparkles, ShieldCheck, MessageCircle } from "lucide-react"
import { motion } from "motion/react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { buttonVariants } from "@/components/ui/Button"
import { homeSections, WHATSAPP_URL } from "@/content/site"
import { trackEvent } from "@/services/analytics"

const planFeatures = [
  "Robô Atendente no WhatsApp respondendo no mesmo segundo 24h",
  "Instalação direta no iPhone ou Android com 1 clique, sem taxas nem burocracia de App Store",
  "Agenda com faturamento previsto hoje e controle fácil de caixa",
  "Resumo toda manhã na tela do celular com seus horários do dia",
  "Serviços prontos para manicure, barbearia, salão de beleza e estética",
  "Recuperação de clientes sumidas há mais de 30 dias com 1 clique",
  "Segurança total dos seus dados: sua lista de clientes nunca se perde",
  "Suporte rápido pelo WhatsApp para te ajudar em tudo",
]

function trackPricingClick(plan: string) {
  void trackEvent({
    eventName: "pricing_plan_click",
    category: "conversion",
    label: plan,
  }).catch((error) => {
    console.error("Não foi possível rastrear clique de precificação", error)
  })
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section
      id={homeSections.pricing}
      aria-labelledby="pricing-title"
      className="w-full bg-white py-14 md:py-22 border-t border-line"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          titleId="pricing-title"
          eyebrow="Planos Simples e Sem Surpresas"
          title={
            <>
              Preço justo que cabe no bolso com <span className="text-growth-text">30 dias grátis para testar</span>
            </>
          }
          description="Menos que o valor de um único corte ou unha por mês. Sem cartão de crédito para começar e você cancela quando quiser."
        />

        {/* Alternador Mensal / Anual */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-sm font-semibold ${!isAnnual ? "text-ink" : "text-ink-soft"}`}>
            Mensal
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={isAnnual}
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative h-7 w-14 rounded-full bg-line p-1 transition-colors hover:bg-line/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <span
              className={`block size-5 rounded-full bg-brand transition-transform ${
                isAnnual ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-sm font-semibold flex items-center gap-1.5 ${isAnnual ? "text-ink" : "text-ink-soft"}`}>
            Anual <span className="rounded-full bg-growth-soft px-2 py-0.5 text-xs font-bold text-growth-text">Economize 20%</span>
          </span>
        </div>

        {/* Card do Plano Zenda PRO */}
        <div className="mx-auto mt-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[2rem] border-2 border-brand bg-white p-6 shadow-lift sm:p-10"
          >
            <div className="absolute -right-12 top-7 rotate-45 bg-gradient-to-r from-brand to-growth px-12 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
              Mais Escolhido
            </div>

            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                <Sparkles className="size-3.5" /> Tudo Liberado
              </span>
              <h3 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                Plano Zenda PRO
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                Tudo o que seu salão ou barbearia precisa: robô no WhatsApp, agenda no celular, controle de caixa e zero comissões sobre o seu trabalho.
              </p>

              {/* Preço */}
              <div className="flex items-baseline gap-2 pt-2">
                <span className="font-heading text-4xl font-extrabold text-ink sm:text-5xl">
                  {isAnnual ? "R$ 39,90" : "R$ 49,90"}
                </span>
                <span className="text-sm font-medium text-ink-soft">/ mês</span>
              </div>
              <p className="text-xs text-ink-muted">
                {isAnnual
                  ? "Plano anual R$ 479,00 (você economiza R$ 119,80 no ano)"
                  : "Sem fidelidade &bull; Cancele quando quiser com 1 clique"}
              </p>
            </div>

            <div className="my-6 border-t border-line" />

            {/* Lista de Recursos inclusos */}
            <ul className="space-y-3">
              {planFeatures.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-sm text-ink leading-snug">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-growth-soft text-growth-text mt-0.5">
                    <Check className="size-3.5" />
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3">
              <Link
                to="/contato"
                className={buttonVariants({
                  size: "lg",
                  className: "min-h-14 w-full shadow-lg shadow-brand/20 text-base font-bold",
                })}
                onClick={() => trackPricingClick(isAnnual ? "anual_pro" : "mensal_pro")}
              >
                Começar Teste Grátis de 30 Dias
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className: "min-h-12 w-full gap-2 font-bold border-[#25D366]/40 text-ink hover:bg-emerald-50/50",
                })}
                onClick={() => trackPricingClick("whatsapp_pricing")}
              >
                <MessageCircle className="size-5 text-[#25D366]" aria-hidden="true" />
                Tirar Dúvida Rápida no WhatsApp
              </a>

              <div className="flex items-center justify-center gap-2 pt-1 text-xs text-ink-muted">
                <ShieldCheck className="size-4 text-growth" />
                <span>30 dias grátis &bull; Sem cartão de crédito &bull; O lucro é 100% seu</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
