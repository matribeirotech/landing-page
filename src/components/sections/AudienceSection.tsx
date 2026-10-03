import { Headset, MapPin, ShoppingBag, Smartphone, Store, Truck, Zap } from "lucide-react"
import { motion } from "motion/react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { homeSections } from "@/content/site"

const segments = [
  {
    title: "Lojas de varejo",
    text: "Moda, calçados, eletrônicos e utilidades. Controle de grade, giro de produtos e clientes recorrentes.",
    icon: ShoppingBag,
  },
  {
    title: "Conveniências",
    text: "Venda rápida no balcão, controle de itens de alto giro e reposição sem ruptura.",
    icon: Store,
  },
  {
    title: "Distribuidoras",
    text: "Entradas e saídas em volume, pedidos de clientes e controle de lote e validade.",
    icon: Truck,
  },
  {
    title: "Comércios locais",
    text: "Mercadinhos, padarias, pet shops, papelarias e adegas que querem atender melhor o bairro.",
    icon: MapPin,
  },
]

const reasons = [
  {
    title: "Gestão de qualquer lugar",
    text: "Acompanhe a loja pelo celular, mesmo quando não estiver no balcão.",
    icon: Smartphone,
  },
  {
    title: "Pronto para usar rápido",
    text: "Telas intuitivas que sua equipe aprende no primeiro dia.",
    icon: Zap,
  },
  {
    title: "Suporte que fala a sua língua",
    text: "Atendimento humano, em português, de quem entende de comércio.",
    icon: Headset,
  },
]

export function AudienceSection() {
  return (
    <section id={homeSections.audience} aria-labelledby="audience-title" className="w-full bg-canvas py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          titleId="audience-title"
          eyebrow="Para quem é"
          title={
            <>
              Feita para o comércio que quer crescer <span className="text-brand">sem complicação</span>
            </>
          }
          description="Se você precisa profissionalizar a gestão, mas não tem tempo para aprender sistemas difíceis, a Lypsyos foi pensada para você."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((segment, index) => (
            <motion.li
              key={segment.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="group flex flex-col gap-4 rounded-card border border-line bg-white p-6 shadow-soft transition-[translate,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <segment.icon className="size-7" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-semibold">{segment.title}</h3>
              <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{segment.text}</p>
            </motion.li>
          ))}
        </ul>

        <div className="mt-14 rounded-card border border-line bg-white p-6 md:p-10">
          <h3 className="text-center text-xl font-semibold md:text-2xl">Por que lojistas escolhem a Lypsyos</h3>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {reasons.map((reason) => (
              <li key={reason.title} className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-growth-soft text-growth-text">
                  <reason.icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-ink">{reason.title}</p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">{reason.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
