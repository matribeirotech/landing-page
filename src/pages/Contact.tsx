import { ContactFormSection } from "@/components/sections/ContactFormSection"
import { motion } from "motion/react"
import { Cog, Presentation, Workflow } from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"

export function Contact() {
  useDocumentMetadata(
    "Contato | Lypsyos",
    "Entre em contato com a Lypsyos para demonstração do DBX-V3 ou automações industriais sob medida.",
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
              Fale com a <span className="text-secondary">Lypsyos</span>
            </h1>
            <p className="max-w-[900px] text-neutral-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
              Vamos entender o seu processo, avaliar o encaixe do DBX-V3 e discutir oportunidades reais
              de automação na sua operação.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {[
            {
              title: "Diagnóstico do processo",
              description: "Mapeamos o fluxo atual para identificar onde a automação pode gerar mais ganho real.",
              icon: Workflow,
            },
            {
              title: "Demonstração do DBX-V3",
              description: "Apresentamos o produto com foco em aderência operacional e aplicação prática.",
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
                  <div className="mb-4 flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-accent/10 text-accent">
                    <info.icon className="h-7 w-7" />
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
