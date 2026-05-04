import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Factory, Layers, Settings, Workflow } from "lucide-react"
import { motion } from "motion/react"

const features = [
  {
    title: "Software que nasce da operação",
    description: "Desenvolvemos soluções para gargalos reais da engenharia, da preparação técnica e da rotina industrial.",
    icon: Settings,
  },
  {
    title: "Projetos sob medida",
    description: "Quando o desafio pede algo específico, desenhamos automações aderentes ao processo, à equipe e à maturidade da operação.",
    icon: Workflow,
  },
  {
    title: "Integração entre etapas",
    description: "Conectamos atividades que hoje ficam isoladas para reduzir espera, retrabalho e perda de contexto.",
    icon: Layers,
  },
  {
    title: "Visão de chão de fábrica",
    description: "O foco não é só a tela do sistema, mas o impacto no ritmo, no padrão e na previsibilidade da produção.",
    icon: Factory,
  },
]

export function FeaturesSection() {
  return (
    <section className="w-full bg-background py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center justify-center space-y-3 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
              Como a Lypsyos gera ganho visível
            </h2>
            <p className="max-w-[860px] text-neutral-600 md:text-lg/relaxed">
              Combinamos leitura de processo, software próprio e automação aplicada para reduzir
              retrabalho, dar mais ritmo ao fluxo e aumentar a previsibilidade operacional, tanto em
              rotinas técnicas quanto em produtos digitais como o DBX-V4.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-5 lg:grid-cols-2 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-neutral/20 bg-surface shadow-sm transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[15px] leading-7 text-neutral-600">
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
