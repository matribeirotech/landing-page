import { Link } from "react-router-dom"
import { ArrowRight, Bot, Cpu, Database, LayoutDashboard, Lock, MessageSquare, Smartphone, Zap } from "lucide-react"
import { motion } from "motion/react"
import { SectionHeading } from "@/components/ui/SectionHeading"

const capabilities = [
  {
    title: "Automação de Atendimento & WhatsApp",
    desc: "Microsserviços de alta velocidade com WebSocket e URA inteligente para responder clientes em 2 segundos e agendar 24/7.",
    icon: MessageSquare,
    tag: "Mensageria Inteligente",
  },
  {
    title: "Sistemas de Gestão & CRM Visual",
    desc: "Painéis de controle modulares e intuitivos com visões flexíveis, métricas financeiras em tempo real e histórico de clientes.",
    icon: LayoutDashboard,
    tag: "Gestão Descomplicada",
  },
  {
    title: "Aplicações Móveis PWA",
    desc: "Sistemas que funcionam como aplicativos nativos no celular com 1 toque, sem precisar baixar arquivos pesados de App Store.",
    icon: Smartphone,
    tag: "Mobile-First",
  },
  {
    title: "Infraestrutura & Segurança Bancária",
    desc: "Arquitetura em nuvem com isolamento multitenant estrito via Supabase RLS, criptografia ponta a ponta e travas anti-bot.",
    icon: Lock,
    tag: "Segurança Absoluta",
  },
]

export function LypsyosSolutionsSection() {
  return (
    <section aria-labelledby="solutions-title" className="w-full bg-white py-16 md:py-24">
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
              className="flex flex-col justify-between rounded-2xl border border-line bg-canvas p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="space-y-4">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <item.icon className="size-6" />
                </span>
                <span className="inline-block rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-brand border border-brand/15">
                  {item.tag}
                </span>
                <h3 className="font-heading text-lg font-bold text-ink">{item.title}</h3>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

