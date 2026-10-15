import { Cpu, Globe, Lock, MessageSquare, Smartphone, Zap } from "lucide-react"
import { motion } from "motion/react"
import { SectionHeading } from "@/components/ui/SectionHeading"

const stackItems = [
  {
    layer: "Frontend & Performance",
    tech: "React 19 + Vite + Tailwind CSS v4",
    desc: "Velocidade de carregamento extrema, transições instantâneas e design fluído em qualquer aparelho.",
    icon: Globe,
  },
  {
    layer: "PWA & Notificações",
    tech: "Web App Manifest + Service Workers + Web Push",
    desc: "Execução standalone em tela cheia sem app store, cache offline e alertas matinais direto na tela de bloqueio.",
    icon: Smartphone,
  },
  {
    layer: "Backend de Negócio",
    tech: "Python + Django REST Framework + FSM",
    desc: "Máquina de Estados Finita para controle estrito de fluxo de agendamentos e regras de negócio sem falhas.",
    icon: Cpu,
  },
  {
    layer: "Mensageria & WhatsApp",
    tech: "Microsserviço Node.js + Baileys WebSocket",
    desc: "Conexão direta de alta taxa de entrega, reconexão automática e resposta em menos de 2 segundos.",
    icon: MessageSquare,
  },
  {
    layer: "Banco de Dados & Segurança",
    tech: "Supabase PostgreSQL 15 + Row Level Security",
    desc: "Isolamento multitenant bancário: seus dados e clientes 100% blindados de outros usuários.",
    icon: Lock,
  },
]

export function TechStackSection() {
  return (
    <section aria-labelledby="tech-stack-title" className="w-full bg-canvas py-16 md:py-20 border-t border-line">
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
              className="flex flex-col gap-2.5 rounded-2xl border border-line bg-white p-5 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <item.icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{item.layer}</p>
                  <p className="font-heading text-sm font-bold text-ink">{item.tech}</p>
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

