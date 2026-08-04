import { ContactFormSection } from "@/components/sections/ContactFormSection"
import { motion } from "motion/react"
import { Cog, Presentation, Workflow } from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"

export function Contact() {
  useDocumentMetadata(
    "Contato | Lypsyos",
    "Entre em contato com a Lypsyos para demonstração dos nossos produtos ou automações industriais sob medida.",
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center justify-center space-y-3 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
              Fale com a <span className="text-secondary">Lypsyos</span>
            </h1>
            <p className="mx-auto max-w-[860px] text-neutral-600 md:text-lg/relaxed">
              Vamos entender o seu processo, avaliar o encaixe dos nossos produtos e discutir oportunidades
              reais de automação na sua operação.
            </p>
          </motion.div>
        </div>

        <div className="mb-10 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Diagnóstico do processo",
              description: "Mapeamos o fluxo atual para identificar onde a automação pode gerar mais ganho real.",
              icon: Workflow,
            },
            {
              title: "Demonstração dos produtos",
              description: "Apresentamos o GeoQuote, o Editor de Perfis ou o DBX-V4 com foco em aderência ao seu processo.",
              icon: Presentation,
            },
            {
              title: "Automação sob medida",
              description: "Quando necessário, desenhamos uma solução específica para o seu contexto industrial.",
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
              <Card className="h-full border-neutral/20 bg-surface shadow-sm text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <info.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{info.title}</h3>
                  <p className="text-neutral-600 whitespace-pre-line">{info.description}</p>
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
