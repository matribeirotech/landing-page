import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Factory, Ruler, Workflow } from "lucide-react"
import { motion } from "motion/react"

const reasons = [
  {
    title: "Menos retrabalho entre setores",
    description:
      "Conectamos comercial, engenharia e produção em um fluxo único, no lugar de planilhas e arquivos soltos indo e voltando entre times.",
    icon: Workflow,
  },
  {
    title: "Padrão técnico, não improviso",
    description:
      "Orçamentos, desenhos e preparação técnica seguem um padrão único, reduzindo a dependência de interpretação manual de cada peça.",
    icon: Ruler,
  },
  {
    title: "Software que nasce da operação",
    description:
      "Desenvolvemos cada produto a partir de gargalos reais da indústria do aço e da metalmecânica, não de modismo de tecnologia.",
    icon: Factory,
  },
]

export function WhyLypsyosSection() {
  return (
    <section className="w-full bg-background py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center justify-center space-y-3 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
              Por que indústrias do aço trabalham com a Lypsyos
            </h2>
            <p className="max-w-[760px] text-neutral-600 md:text-lg/relaxed">
              Combinamos leitura de processo e software próprio para reduzir retrabalho e dar mais ritmo ao
              fluxo entre comercial, engenharia e produção.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-neutral/20 bg-surface shadow-sm transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <reason.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl text-primary">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[15px] leading-7 text-neutral-600">
                    {reason.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
