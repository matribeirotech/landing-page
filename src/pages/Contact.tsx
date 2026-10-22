import { ContactFormSection } from "@/components/sections/ContactFormSection"
import { motion } from "motion/react"
import { MessageCircle, Presentation, Sparkles, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { buttonVariants } from "@/components/ui/Button"
import { WHATSAPP_URL } from "@/content/site"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"

export function Contact() {
  useDocumentMetadata(
    "Teste Grátis de 30 Dias & Contato | Zenda",
    "Comece seu teste grátis de 30 dias do Zenda ou chame nossa equipe no WhatsApp para ativar seu robô de agendamentos em 2 minutos.",
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-12 md:py-18 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-ink">
              Ative seus <span className="text-brand">30 Dias Grátis no Zenda</span>
            </h1>
            <p className="mx-auto max-w-[680px] text-ink-soft text-base md:text-lg leading-relaxed">
              Quer atendimento imediato? Chame agora mesmo no WhatsApp ou preencha seus dados abaixo para liberarmos seu acesso.
            </p>
            <div className="pt-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  size: "lg",
                  className: "min-h-14 w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold shadow-xl shadow-[#25D366]/25 px-8 gap-2.5",
                })}
              >
                <MessageCircle className="size-5 fill-white text-white" aria-hidden="true" />
                Chamar no WhatsApp Agora (Mais Rápido)
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Pronto em 2 minutos",
              description: "Ligue no seu WhatsApp sem complicação e comece a usar na hora.",
              icon: Zap,
            },
            {
              title: "Ajuda pelo WhatsApp",
              description: "A gente te acompanha passo a passo para deixar tudo configurado para o seu salão.",
              icon: Presentation,
            },
            {
              title: "30 dias grátis",
              description: "Teste tudo sem pagar nada agora e sem precisar de cartão de crédito.",
              icon: Sparkles,
            },
          ].map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-line bg-canvas shadow-sm text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <info.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink mb-1.5">{info.title}</h3>
                  <p className="text-sm text-ink-soft whitespace-pre-line">{info.description}</p>
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
