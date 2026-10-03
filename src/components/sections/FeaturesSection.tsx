import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { motion } from "motion/react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { buttonVariants } from "@/components/ui/Button"
import { SolutionMockupView } from "@/components/mockups/SolutionMockupView"
import { products } from "@/content/products"
import { homeSections } from "@/content/site"
import { trackEvent } from "@/services/analytics"
import { cn } from "@/utils/cn"

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
    <section id={homeSections.solutions} aria-labelledby="features-title" className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          titleId="features-title"
          eyebrow="Soluções"
          title={
            <>
              Três pilares para organizar sua loja e <span className="text-growth-text">acelerar suas vendas</span>
            </>
          }
          description="Use um módulo ou combine os três. Tudo conversa entre si — e com você, onde estiver."
        />

        <div className="mt-14 flex flex-col gap-20 md:mt-20 md:gap-28">
          {products.map((product, index) => {
            const reversed = index % 2 === 1
            return (
              <article
                key={product.slug}
                aria-labelledby={`feature-${product.slug}`}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className={cn("flex flex-col gap-5", reversed && "lg:order-2")}
                >
                  <span
                    className={cn(
                      "flex size-14 items-center justify-center rounded-2xl",
                      product.tone === "growth" ? "bg-growth-soft text-growth-text" : "bg-brand-soft text-brand",
                    )}
                  >
                    <product.icon className="size-7" aria-hidden="true" />
                  </span>
                  <div className="space-y-2">
                    <h3 id={`feature-${product.slug}`} className="text-[1.375rem] font-semibold leading-snug md:text-[1.75rem]">
                      {product.name}
                    </h3>
                    <p className="font-heading text-lg font-semibold text-brand">{product.tagline}</p>
                  </div>
                  <p className="text-base leading-relaxed text-ink-soft md:text-lg">{product.description}</p>
                  <ul className="grid gap-3">
                    {product.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-ink md:text-base">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-growth" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/produtos/${product.slug}`}
                    className={buttonVariants({ variant: "link", className: "w-fit px-0" })}
                    onClick={() => trackSolutionClick(`saiba_mais_${product.slug}`)}
                  >
                    Saiba mais sobre {product.category.toLowerCase()}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={cn("relative", reversed && "lg:order-1")}
                >
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-6 inset-y-10 -z-0 rounded-[2rem] blur-2xl",
                      product.tone === "growth" ? "bg-growth/15" : "bg-brand/12",
                    )}
                  />
                  <div className="relative">
                    <SolutionMockupView type={product.mockup} />
                  </div>
                </motion.div>
              </article>
            )
          })}
        </div>

        <div className="mt-20 flex justify-center">
          <Link
            to="/contato"
            className={buttonVariants({ size: "lg" })}
            onClick={() => trackSolutionClick("ver_modulos_funcionando")}
          >
            Quero ver os módulos funcionando
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
