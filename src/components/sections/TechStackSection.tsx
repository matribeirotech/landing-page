import { Cpu, Globe, Lock, MessageSquare, Smartphone } from "lucide-react"
import { motion } from "motion/react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { LypsyosIconBadge, type LypsyosIconTone } from "@/components/ui/LypsyosIconBadge"

const stackItems: {
  layer: string
  tech: string
  desc: string
  icon: typeof Globe
  tone: LypsyosIconTone
}[] = [
  {
    layer: "Frontend & Performance",
    tech: "React 19 + Vite + Tailwind CSS v4",
    desc: "Velocidade de carregamento extrema, transições instantâneas e design fluído em qualquer aparelho.",
    icon: Globe,
    tone: "brand",
  },
  {
    layer: "PWA & Notificações",
    tech: "Web App Manifest + Service Workers + Web Push",
    desc: "Execução standalone em tela cheia sem app store, cache offline e alertas matinais direto na tela de bloqueio.",
    icon: Smartphone,
    tone: "cyan",
  },
  {
    layer: "Backend de Negócio",
    tech: "Python + Django REST Framework + FSM",
    desc: "Máquina de Estados Finita para controle estrito de fluxo de agendamentos e regras de negócio sem falhas.",
    icon: Cpu,
    tone: "brand",
  },
  {
    layer: "Mensageria & WhatsApp",
    tech: "Microsserviço Node.js + Baileys WebSocket",
    desc: "Conexão direta de alta taxa de entrega, reconexão automática e resposta em menos de 2 segundos.",
    icon: MessageSquare,
    tone: "growth",
  },
  {
    layer: "Banco de Dados & Segurança",
    tech: "Supabase PostgreSQL 15 + Row Level Security",
    desc: "Isolamento multitenant bancário: seus dados e clientes 100% blindados de outros usuários.",
    icon: Lock,
    tone: "brand",
  },
]

export function TechStackSection() {
  return (
    <section aria-labelledby="tech-stack-title" className="w-full overflow-hidden bg-canvas py-16 md:py-20 border-t border-line">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          titleId="tech-stack-title"
          eyebrow="Infraestrutura & Confiabilidade"
          title={
            <>
              Construído com tecnologia de ponta para <span className="text-brand">nunca deixar você na mão</span>
            </>
          }
          description="Estabilidade e velocidade extrema para suportar centenas de agendamentos diários sem quedas ou lentidão."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stackItems.map((item, index) => (
            <motion.div
              key={item.layer}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group flex flex-col gap-3 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift"
            >
              <div className="flex items-center gap-3.5">
                <LypsyosIconBadge icon={item.icon} tone={item.tone} size="md" />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-brand">{item.layer}</p>
                  <p className="font-heading text-sm font-bold text-ink truncate">{item.tech}</p>
                </div>
              </div>
              <p className="text-xs text-ink-soft leading-relaxed pt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
