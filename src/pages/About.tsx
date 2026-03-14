import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Factory, Lightbulb, Settings2 } from "lucide-react"
import { BrandMark } from "@/components/common/BrandMark"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"

export function About() {
  useDocumentMetadata(
    "Sobre a Lypsyos | Automacao industrial aplicada",
    "Conheca a proposta da Lypsyos para software proprio, automacao industrial e projetos sob medida.",
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
              Sobre a <span className="text-secondary">Lypsyos</span>
            </h1>
            <p className="max-w-[900px] text-neutral-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
              A Lypsyos atua no encontro entre software, automacao e realidade industrial para transformar processos engessados em operacoes mais fluidas.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
              Nossa Missão
            </h2>
            <p className="text-neutral-700 md:text-lg leading-relaxed">
              A Lypsyos nasceu para reduzir atritos entre engenharia, preparacao tecnica e operacao industrial.
              Nosso trabalho e transformar atividades repetitivas, demoradas ou pouco padronizadas em fluxos mais rapidos e confiaveis.
            </p>
            <p className="text-neutral-700 md:text-lg leading-relaxed">
              Isso pode acontecer por meio de uma ferramenta propria, como o DBX-V2, ou por projetos sob medida desenhados para a realidade de cada industria.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-[28px] border border-neutral/20 bg-surface p-8 shadow-xl"
          >
            <BrandMark className="text-primary" />
            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-neutral/20 bg-background px-5 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Como pensamos</p>
                <p className="mt-2 text-sm text-neutral-700">
                  Primeiro entendemos o processo e o gargalo. Depois definimos a melhor combinacao entre software, automacao e implantacao.
                </p>
              </div>
              <div className="rounded-2xl border border-neutral/20 bg-background px-5 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Como entregamos</p>
                <p className="mt-2 text-sm text-neutral-700">
                  Evoluimos a operacao por etapas, com clareza tecnica, menor risco e foco no que gera ganho real para a equipe.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Tecnologia aplicada",
              description: "Criamos solucoes que nascem de problemas reais de operacao, e nao de modismos de software.",
              icon: Lightbulb,
            },
            {
              title: "Leitura de processo",
              description: "Entendemos a rotina industrial para propor automacoes viaveis, aderentes e sustentaveis.",
              icon: Settings2,
            },
            {
              title: "Visao de fabrica",
              description: "Nosso objetivo e melhorar o fluxo como um todo, da engenharia ao resultado no chao de fabrica.",
              icon: Factory,
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-neutral/20 bg-surface shadow-sm text-center">
                <CardHeader className="items-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl text-primary">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
