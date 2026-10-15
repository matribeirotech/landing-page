import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Check, Sparkles, Zap, ShieldCheck } from "lucide-react"
import { motion } from "motion/react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { buttonVariants } from "@/components/ui/Button"
import { homeSections } from "@/content/site"
import { trackEvent } from "@/services/analytics"

const planFeatures = [
  "Robô Atendente no WhatsApp ilimitado 24 horas por dia",
  "Catálogo dinâmico multi-nicho (unhas, barba, cabelo, estética, etc.)",
  "Acesso ao Aplicativo Móvel Instalável (PWA) para iPhone e Android",
  "Notificações Push diárias com resumo matinal na tela de bloqueio",
  "Sincronização em tempo real com Google Calendar com alarmes",
  "CRM de agendamentos com histórico e link direto de WhatsApp (wa.me)",
  "Suporte prioritário humanizado direto via WhatsApp",
  "Lypsyos Security Guard ativo com isolamento total de dados",
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
      className="w-full bg-white py-16 md:py-24 border-t border-line"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          titleId="pricing-title"
          eyebrow="Planos Transparentes"
          title={
            <>
              Investimento acessível com <span className="text-growth-text">30 dias grátis para testar</span>
            </>
          }
          description="Sem pegadinhas, sem taxas escondidas de App Store e sem cartão de crédito para começar. Cancele quando quiser."
        />

        {/* Alternador Mensal / Anual */}
        <div className="mt-10 flex items-center justify-center gap-3">
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

        {/* Card do Plano PRO Automação Total */}
        <div className="mx-auto mt-12 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-[2rem] border-2 border-brand bg-white p-7 shadow-lift sm:p-10"
          >
            {/* Faixa de destaque */}
            <div className="absolute -right-12 top-7 rotate-45 bg-gradient-to-r from-brand to-growth px-12 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
              Plano Destaque
            </div>

            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                <Sparkles className="size-3.5" /> Automação Total
              </span>
              <h3 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                Plano PRO Lypsyos
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                Tudo o que seu estabelecimento precisa: robô de WhatsApp, CRM visual, aplicativo no celular e agenda cheia sem esforço.
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
                  ? "Cobrado anualmente R$ 479,00 (economia de R$ 119,80/ano)"
                  : "Sem fidelidade &bull; Cancele a qualquer momento"}
              </p>
            </div>

            <div className="my-7 border-t border-line" />

            {/* Lista de Recursos inclusos */}
            <ul className="space-y-3.5">
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
                  className: "w-full shadow-lg shadow-brand/20 text-base font-semibold",
                })}
                onClick={() => trackPricingClick(isAnnual ? "anual_pro" : "mensal_pro")}
              >
                Começar Teste Grátis de 30 Dias
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <div className="flex items-center justify-center gap-2 text-xs text-ink-muted">
                <ShieldCheck className="size-4 text-growth" />
                <span>30 dias grátis &bull; Sem cartão de crédito &bull; Suporte dedicado</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

