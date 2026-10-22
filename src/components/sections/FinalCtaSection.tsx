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
    <section aria-labelledby="final-cta-title" className="w-full bg-white py-14 md:py-22">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="relative isolate overflow-hidden rounded-[1.75rem] bg-night px-5 py-12 text-center md:px-12 md:py-18"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-brand/45 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-16 -z-10 size-80 rounded-full bg-growth/35 blur-3xl" />

          <h2 id="final-cta-title" className="mx-auto max-w-3xl text-[1.65rem] font-extrabold leading-tight text-white md:text-[2.4rem]">
            Pare de perder clientes enquanto está com as mãos ocupadas atendendo.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Deixe o robô do <strong>Zenda</strong> responder no mesmo segundo e preencher sua agenda 24 horas por dia no WhatsApp.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                size: "lg",
                className: "min-h-14 w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebe5b] text-white shadow-xl font-bold px-6 py-4 gap-2",
              })}
              onClick={() => trackFinalCta("whatsapp_cta_click", "final_cta_home")}
            >
              <MessageCircle className="size-5 fill-white text-white" aria-hidden="true" />
              Chamar no WhatsApp Agora
            </a>
            <Link
              to="/contato"
              className={buttonVariants({
                variant: "inverse",
                size: "lg",
                className: "min-h-14 w-full sm:w-auto shadow-xl font-bold px-6 py-4",
              })}
              onClick={() => trackFinalCta("demo_cta_click", "final_cta_home")}
            >
              Começar 30 Dias Grátis
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/70">
            Teste grátis por 30 dias &bull; Sem precisar de cartão de crédito &bull; Cancele quando quiser
          </p>
        </motion.div>
      </div>
    </section>
  )
}
