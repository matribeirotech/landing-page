import { motion } from "motion/react"
import { Cog, Factory, Workflow } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

const solutions = [
  {
    title: "Engenharia e preparação",
    description:
      "Automatizamos etapas repetitivas da engenharia, desde a preparação de arquivos até rotinas que reduzem retrabalho e variabilidade.",
    items: [
      "Geração técnica em lote",
      "Padronização de entregáveis",
      "Menos dependência de operação manual",
    ],
    icon: Cog,
  },
  {
    title: "Operação industrial",
    description:
      "Desenhamos soluções para acelerar o fluxo entre planejamento, máquina, operadores e acompanhamento da produção.",
    items: [
      "Fluxos conectados ao chão de fábrica",
      "Apoio a corte, aproveitamento e preparo",
      "Mais previsibilidade operacional",
    ],
    icon: Factory,
  },
  {
    title: "Automação sob medida",
    description:
      "Quando o desafio não cabe em uma ferramenta pronta, a Lypsyos projeta automações específicas para a realidade da sua indústria.",
    items: [
      "Mapeamento do processo atual",
      "Soluções com integração progressiva",
      "Roadmap orientado a resultado",
    ],
    icon: Workflow,
  },
]

export function SolutionsSection() {
  return (
    <section className="w-full bg-background py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              Onde atuamos
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl">
              A Lypsyos vai além do DBX-V3
            </h2>
            <p className="mx-auto max-w-[920px] text-neutral-600 md:text-xl/relaxed">
              O DBX-V3 é uma frente importante da Lypsyos, mas o nosso trabalho vai além dele:
              desenvolvemos soluções que conectam engenharia, operação e melhoria contínua.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-neutral/20 bg-surface shadow-sm">
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <solution.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl text-primary">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className="leading-7 text-neutral-600">{solution.description}</p>
                  <ul className="space-y-3 text-sm text-neutral-700 md:text-base">
                    {solution.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-secondary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
