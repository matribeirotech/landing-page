import { AudienceSection } from "@/components/sections/AudienceSection"
import { FinalCtaSection } from "@/components/sections/FinalCtaSection"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"
import { CheckCircle2, Sparkles } from "lucide-react"
import { motion } from "motion/react"

const nicheBenefits = [
  {
    niche: "Nail Designers & Manicures",
    tagline: "Chega de perder tempo digitando horários durante o atendimento de mesa.",
    points: [
      "Agendamento automático de Alongamento em Gel, Banho de Gel e Spa dos Pés",
      "Cobrança imediata de sinal de 50% via chave PIX para garantir o horário",
      "Lembrete sonoro 15 minutos antes de cada cliente chegar",
    ],
  },
  {
    niche: "Barbearias Modernas",
    tagline: "Agendamento em segundos para o público masculino que valoriza praticidade.",
    points: [
      "Menu rápido A, B, C no WhatsApp: corte degradê, barba ou combo completo",
      "Visão da agenda por profissional da barbearia",
      "Histórico de preferências de corte de cada cliente salvo no CRM",
    ],
  },
  {
    niche: "Salões de Beleza & Cabeleireiros",
    tagline: "Organização precisa para dias intensos com escovas, mechas e químicas.",
    points: [
      "Configuração de intervalos de tempo para pausa de produtos químicos",
      "Visualização rápida do dia com resumo de faturamento matinal",
      "Disparo com 1 clique no WhatsApp oficial sem precisar salvar contatos",
    ],
  },
  {
    niche: "Clínicas de Estética & Spas",
    tagline: "Controle sofisticado para procedimentos faciais, corporais e massoterapia.",
    points: [
      "Gestão de salas e macas de atendimento sem conflito de horários",
      "Privacidade bancária de dados médicos e estéticos via Supabase RLS",
      "Histórico de sessões realizadas por pacote de tratamento",
    ],
  },
]

export function Audience() {
  useDocumentMetadata({
    title: "Sistemas de Agendamento para Salões, Barbearias e Manicures | Zenda Lypsyos",
    description:
      "Descubra como o Zenda foi desenvolvido especificamente para atender a rotina de manicures, barbearias, salões de beleza, estéticas e spas com robô no WhatsApp 24/7.",
    keywords:
      "sistema de agendamento para manicures, agendamento barbearia whatsapp, software para salão de beleza, clinica de estetica app, zenda segmentos",
    canonicalPath: "/para-quem-e",
    ogType: "article",
  })

  return (
    <main className="flex flex-col bg-white">
      {/* Hero da página Para Quem É */}
      <section className="relative overflow-hidden bg-white py-14 md:py-20 border-b border-line">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[32rem] rounded-full bg-brand/10 blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">
              Especialização por Nicho
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Desenvolvido para quem vive de <span className="text-growth-text">hora marcada</span>
            </h1>
            <p className="text-base text-ink-soft sm:text-lg leading-relaxed">
              O Zenda se adapta perfeitamente ao seu catálogo de serviços e à sua forma de trabalhar. Veja como funciona na prática para o seu espaço.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid de Segmentos */}
      <AudienceSection />

      {/* Casos Práticos de Aplicação */}
      <section className="py-16 md:py-24 bg-white border-t border-line">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center mb-14 space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-bold text-brand">
              <Sparkles className="size-3.5" /> Na Prática
            </span>
            <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
              Como o Zenda resolve os desafios diários da sua profissão
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {nicheBenefits.map((item, index) => (
              <motion.div
                key={item.niche}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-2xl border border-line bg-canvas p-6 sm:p-7 shadow-soft space-y-4"
              >
                <div>
                  <h3 className="font-heading text-xl font-bold text-ink">{item.niche}</h3>
                  <p className="text-sm font-medium text-growth-text mt-1">{item.tagline}</p>
                </div>
                <ul className="space-y-2.5 pt-1">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink leading-relaxed">
                      <CheckCircle2 className="size-4.5 text-growth shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSection />
    </main>
  )
}

