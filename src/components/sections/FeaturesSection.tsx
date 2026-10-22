import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react"
import { motion } from "motion/react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { buttonVariants } from "@/components/ui/Button"
import { LypsyosIconBadge } from "@/components/ui/LypsyosIconBadge"
import { products } from "@/content/products"
import { homeSections, WHATSAPP_URL } from "@/content/site"
import { trackEvent } from "@/services/analytics"

function trackSolutionClick(label: string) {
  void trackEvent({
    eventName: "solutions_cta_click",
    category: "conversion",
    label,
  }).catch((error) => {
    console.error("Não foi possível rastrear o CTA de soluções", error)
  })
}

export function FeaturesSection() {
  return (
    <section
      id={homeSections.solutions}
      aria-labelledby="features-title"
      className="w-full overflow-hidden bg-white py-14 md:py-22"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          titleId="features-title"
          eyebrow="Tudo o Que Você Recebe no Zenda"
          title={
            <>
              Tudo o que seu espaço precisa para <span className="text-growth-text">lotar a agenda e lucrar mais</span>
            </>
          }
          description="Robô que responde no mesmo segundo no WhatsApp, agenda simples de mexer, aplicativo em 1 clique no celular e segurança total dos seus dados."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.article
              key={product.slug}
              aria-labelledby={`feature-${product.slug}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="flex flex-col justify-between rounded-2xl border border-line bg-canvas/60 p-6 shadow-soft transition-all hover:border-brand/30 hover:bg-white hover:shadow-lift"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <LypsyosIconBadge
                    icon={product.icon}
                    tone={product.tone === "growth" ? "growth" : "brand"}
                    size="lg"
                  />
                  <span className="rounded-full bg-brand-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand">
                    {product.category}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 id={`feature-${product.slug}`} className="font-heading text-xl font-bold text-ink leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-sm font-semibold text-growth-text leading-snug">
                    {product.tagline}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-ink-soft">
                  {product.description}
                </p>

                <ul className="space-y-2 border-t border-line pt-4">
                  {product.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink leading-snug">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-growth" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              size: "lg",
              className: "min-h-14 w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold shadow-lg shadow-[#25D366]/25 gap-2",
            })}
            onClick={() => trackSolutionClick("whatsapp_features")}
          >
            <MessageCircle className="size-5 fill-white text-white" aria-hidden="true" />
            Quero Ver Funcionando no WhatsApp
          </a>
          <Link
            to="/contato"
            className={buttonVariants({
              size: "lg",
              className: "min-h-14 w-full sm:w-auto shadow-lg shadow-brand/20 font-bold",
            })}
            onClick={() => trackSolutionClick("comecar_teste_gratis_features")}
          >
            Começar Teste Grátis de 30 Dias
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
