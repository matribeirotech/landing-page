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

          <h2 id="final-cta-title" className="mx-auto max-w-3xl text-[1.75rem] font-semibold leading-tight text-white md:text-[2.5rem]">
            Sua loja merece uma gestão à altura do seu esforço.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Agende uma demonstração e veja, na prática, como controlar estoque, caixa e clientes em um só lugar. Em
            poucos minutos você vai entender por que é mais simples do que parece.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contato"
              className={buttonVariants({ variant: "inverse", size: "lg" })}
              onClick={() => trackFinalCta("demo_cta_click", "final_cta_home")}
            >
              Agende uma demonstração
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-btn px-4 text-base font-semibold text-white underline-offset-4 hover:underline"
              onClick={() => trackFinalCta("whatsapp_cta_click", "final_cta_home")}
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Prefere conversar agora? Fale no WhatsApp
            </a>
          </div>

          <p className="mt-6 text-sm text-white/65">Sem compromisso. Conte como é a sua loja e mostramos o caminho.</p>
        </motion.div>
      </div>
    </section>
  )
}
