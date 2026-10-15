import { ContactFormSection } from "@/components/sections/ContactFormSection"
import { motion } from "motion/react"
import { Cog, Presentation, Workflow } from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"

export function Contact() {
  useDocumentMetadata(
    "Contato & Teste Grátis | Lypsyos",
    "Entre em contato com a Lypsyos para começar seu teste grátis de 30 dias ou agendar uma demonstração do robô de agendamentos no WhatsApp.",
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
              Fale com a <span className="text-brand">Lypsyos</span>
            </h1>
            <p className="mx-auto max-w-[860px] text-ink-soft md:text-lg/relaxed">
              Vamos entender a rotina do seu espaço e ativar seu robô no WhatsApp para preencher sua agenda 24 horas por dia.
            </p>
          </motion.div>
        </div>

        <div className="mb-10 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Ativação em 2 minutos",
              description: "Conecte seu WhatsApp por QR Code e comece a atender sem atrito.",
              icon: Workflow,
            },
            {
              title: "Demonstração guiada",
              description: "Mostramos o robô e o painel funcionando na prática para o seu nicho.",
              icon: Presentation,
            },
            {
              title: "30 dias grátis",
              description: "Teste completo sem compromisso e sem precisar de cartão de crédito.",
              icon: Cog,
            },
          ].map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-line bg-canvas shadow-sm text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <info.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink mb-2">{info.title}</h3>
                  <p className="text-ink-soft whitespace-pre-line">{info.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <ContactFormSection />
      </div>
    </main>
  )
}
