import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Factory, Lightbulb, Settings2 } from "lucide-react"
import { BrandMark } from "@/components/common/BrandMark"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"

export function About() {
  useDocumentMetadata(
    "Sobre a Lypsyos | Plataforma de Agendamentos & WhatsApp",
    "Conheça a proposta da Lypsyos: automação de agendamentos, robô no WhatsApp 24/7 e CRM para profissionais de beleza e estética.",
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center justify-center space-y-3 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none text-ink">
              Sobre a <span className="text-brand">Lypsyos</span>
            </h1>
            <p className="mx-auto max-w-[860px] text-ink-soft md:text-lg/relaxed">
              Desenvolvemos a plataforma definitiva de automação de agendamentos, robô no WhatsApp 24/7 e CRM inteligente para profissionais de beleza, estética e bem-estar.
            </p>
          </motion.div>
        </div>

        <div className="mb-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-ink">
              Nossa missão
            </h2>
            <p className="text-ink-soft md:text-base leading-7">
              A Lypsyos nasceu para eliminar o atrito de responder mensagens manuais no WhatsApp, conferir horários na folha de papel ou perder clientes durante o horário de atendimento.
            </p>
            <p className="text-ink-soft md:text-base leading-7">
              Operamos como um <strong>gerente virtual 24 horas por dia</strong>, garantindo agenda cheia, faturamento previsível e profissionalismo de alto padrão para manicures, nail designers, barbearias, salões de beleza, clínicas de estética e spas.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-[26px] border border-line bg-canvas p-6 shadow-xl"
          >
            <BrandMark showSubtitle={false} className="text-ink" />
            <div className="mt-6 space-y-3.5">
              <div className="rounded-2xl border border-line bg-white px-4 py-3.5">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">Como pensamos</p>
                <p className="mt-2 text-sm text-ink-soft">
                  Criamos uma experiência rápida e fluida: a cliente agenda em menos de 1 minuto pelo WhatsApp, sem precisar baixar aplicativos ou criar logins complexos.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-white px-4 py-3.5">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">Como entregamos</p>
                <p className="mt-2 text-sm text-ink-soft">
                  Ativação em 2 minutos via QR Code do WhatsApp, aplicativo móvel instalável (PWA) e acompanhamento próximo da nossa equipe.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Automação Humanizada",
              description: "Robô inteligente no WhatsApp com URA rápida que assume o nome e a identidade visual do seu espaço.",
              icon: Lightbulb,
            },
            {
              title: "Simplicidade Mobile-First",
              description: "Painel de controle visual 3-em-1 (Cartões, Lista, Tabela), disparo com 1 clique (wa.me) e resumo matinal diário.",
              icon: Settings2,
            },
            {
              title: "Segurança de Nível Bancário",
              description: "Isolamento multitenant no Supabase com Row-Level Security (RLS) para blindar totalmente seus dados e faturamento.",
              icon: Factory,
            },
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-line bg-canvas shadow-sm text-center">
                <CardHeader className="items-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl text-ink">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-ink-soft">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
