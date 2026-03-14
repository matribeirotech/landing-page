import { motion } from "motion/react"
import { Cog, Factory, Workflow } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

const solutions = [
  {
    title: "Engenharia e preparacao",
    description:
      "Automatizamos etapas repetitivas da engenharia, da preparacao de arquivos a padronizacoes que reduzem retrabalho.",
    items: [
      "Geracao tecnica em lote",
      "Padronizacao de entregaveis",
      "Menos dependencia de operacao manual",
    ],
    icon: Cog,
  },
  {
    title: "Operacao industrial",
    description:
      "Desenhamos solucoes para acelerar o fluxo entre planejamento, maquina, operadores e acompanhamento da producao.",
    items: [
      "Fluxos conectados ao chao de fabrica",
      "Apoio a corte, nesting e preparo",
      "Mais previsibilidade operacional",
    ],
    icon: Factory,
  },
  {
    title: "Automacao sob medida",
    description:
      "Quando o desafio nao cabe em uma ferramenta pronta, a Lypsyos projeta automacoes especificas para a realidade da sua industria.",
    items: [
      "Mapeamento do processo atual",
      "Solucoes com integracao progressiva",
      "Roadmap tecnico orientado a resultado",
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
            <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl">
              A Lypsyos nao se limita ao DBX-V2
            </h2>
            <p className="mx-auto max-w-[920px] text-neutral-600 md:text-xl/relaxed">
              Nosso foco e desenvolver ferramentas e automacoes que resolvam gargalos reais da industria,
              conectando engenharia, operacao e melhoria continua.
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
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <solution.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl text-primary">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className="text-neutral-600">{solution.description}</p>
                  <ul className="space-y-3 text-sm text-neutral-700">
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
