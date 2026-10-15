import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle } from "lucide-react"
import { motion } from "motion/react"
import { buttonVariants } from "@/components/ui/Button"
import { WHATSAPP_URL } from "@/content/site"
import { trackEvent } from "@/services/analytics"

function trackFinalCta(eventName: string, label: string) {
  void trackEvent({
    eventName,
    category: "conversion",
    label,
  }).catch((error) => {
    console.error("Não foi possível rastrear o CTA final", error)
  })
}

export function FinalCtaSection() {
  return (
    <section aria-labelledby="final-cta-title" className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="relative isolate overflow-hidden rounded-[1.75rem] bg-night px-6 py-14 text-center md:px-12 md:py-20"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-brand/45 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-16 -z-10 size-80 rounded-full bg-growth/35 blur-3xl" />

          <h2 id="final-cta-title" className="mx-auto max-w-3xl text-[1.75rem] font-bold leading-tight text-white md:text-[2.5rem]">
            Pronta para dobrar seus agendamentos e recuperar suas horas de descanso?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Elimine o estresse de responder mensagens manuais. Deixe o robô inteligente do Lypsyos cuidar da sua agenda 24 horas por dia enquanto você foca no atendimento e no crescimento do seu espaço.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contato"
              className={buttonVariants({ variant: "inverse", size: "lg", className: "shadow-xl font-bold" })}
              onClick={() => trackFinalCta("demo_cta_click", "final_cta_home")}
            >
              Criar Minha Conta Grátis Agora
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-btn px-4 text-base font-semibold text-white underline-offset-4 hover:underline"
              onClick={() => trackFinalCta("whatsapp_cta_click", "final_cta_home")}
            >
              <MessageCircle className="size-5 text-[#25D366]" aria-hidden="true" />
              Prefere tirar dúvidas antes? Fale no WhatsApp
            </a>
          </div>

          <p className="mt-6 text-sm text-white/65">
            Teste grátis por 30 dias &bull; Sem necessidade de cartão de crédito &bull; Cancelamento descomplicado
          </p>
        </motion.div>
      </div>
    </section>
  )
}
