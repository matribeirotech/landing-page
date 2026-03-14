import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Factory, Layers, Settings, Workflow } from "lucide-react"
import { motion } from "motion/react"

const features = [
  {
    title: "Ferramentas proprias",
    description: "Desenvolvemos software para atacar gargalos reais da engenharia e da preparacao industrial.",
    icon: Settings,
  },
  {
    title: "Projetos sob medida",
    description: "Quando a necessidade e especifica, criamos automacoes alinhadas ao processo, equipe e maturidade da operacao.",
    icon: Workflow,
  },
  {
    title: "Integracao com o fluxo",
    description: "Conectamos etapas que hoje operam de forma isolada para reduzir espera, retrabalho e perda de contexto.",
    icon: Layers,
  },
  {
    title: "Visao industrial",
    description: "Nosso foco vai alem da tela do software: buscamos impacto concreto no ritmo, padrao e previsibilidade da producao.",
    icon: Factory,
  },
]

export function FeaturesSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Como a Lypsyos gera valor</h2>
            <p className="max-w-[900px] text-neutral-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Combinamos conhecimento de operacao, desenvolvimento de software e automacao aplicada para construir solucoes com impacto real.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-neutral/20 bg-surface shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-neutral-600">
                    {feature.description}
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
