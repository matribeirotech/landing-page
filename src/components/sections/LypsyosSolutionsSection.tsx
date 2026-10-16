import { Bot, Layers, ShieldCheck, Smartphone } from "lucide-react"
import { motion } from "motion/react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { LypsyosIconBadge, type LypsyosIconTone } from "@/components/ui/LypsyosIconBadge"

const capabilities: {
  title: string
  desc: string
  icon: typeof Bot
  tag: string
  tone: LypsyosIconTone
}[] = [
  {
    title: "Automação de Atendimento & WhatsApp",
    desc: "Microsserviços de alta velocidade com WebSocket e URA inteligente para responder clientes em 2 segundos e agendar 24/7.",
    icon: Bot,
    tag: "Mensageria Inteligente",
    tone: "growth",
  },
  {
    title: "Sistemas de Gestão & CRM Visual",
    desc: "Painéis de controle modulares e intuitivos com visões flexíveis, métricas financeiras em tempo real e histórico de clientes.",
    icon: Layers,
    tag: "Gestão Descomplicada",
    tone: "brand",
  },
  {
    title: "Aplicações Móveis PWA",
    desc: "Sistemas que funcionam como aplicativos nativos no celular com 1 toque, sem precisar baixar arquivos pesados de App Store.",
    icon: Smartphone,
    tag: "Mobile-First",
    tone: "cyan",
  },
  {
    title: "Infraestrutura & Segurança Bancária",
    desc: "Arquitetura em nuvem com isolamento multitenant estrito via Supabase RLS, criptografia ponta a ponta e travas anti-bot.",
    icon: ShieldCheck,
    tag: "Segurança Absoluta",
    tone: "brand",
  },
]

export function LypsyosSolutionsSection() {
  return (
    <section aria-labelledby="solutions-title" className="w-full overflow-hidden bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          titleId="solutions-title"
          eyebrow="Capacidades Técnicas"
          title={
            <>
              Engenharia de software focada em <span className="text-brand">resultados reais</span>
            </>
          }
          description="Nossos produtos e soluções são desenvolvidos com tecnologia de ponta para entregar velocidade, segurança e usabilidade."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-canvas p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/35 hover:bg-white hover:shadow-lift"
            >
              {/* Detalhe luminoso superior no hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <LypsyosIconBadge icon={item.icon} tone={item.tone} size="lg" />
                  <span className="inline-block rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-brand border border-brand/15 shadow-2xs">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-ink leading-snug">{item.title}</h3>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
