import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Factory, Lightbulb, Settings2 } from "lucide-react"
import { BrandMark } from "@/components/common/BrandMark"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"

export function About() {
  useDocumentMetadata(
    "Sobre a Lypsyos | Sistemas para o Varejo",
    "Conheça a proposta da Lypsyos para facilitar a gestão do seu comércio.",
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
              Sobre a <span className="text-brand">Lypsyos</span>
            </h1>
            <p className="mx-auto max-w-[860px] text-ink-soft md:text-lg/relaxed">
              A Lypsyos atua no encontro entre tecnologia e realidade do varejo para transformar
              processos complexos e trabalhosos em rotinas simples, ágeis e organizadas.
            </p>
          </motion.div>
        </div>

        <div className="mb-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-ink">
              Nossa missão
            </h2>
            <p className="text-ink-soft md:text-base leading-7">
              A Lypsyos nasceu para reduzir atritos entre o balcão de vendas, o estoque e o financeiro do seu comércio. 
              Nosso trabalho é transformar tarefas demoradas ou confusas em fluxos rápidos que deixam o dono da loja focar no que importa: crescer e atender bem.
            </p>
            <p className="text-ink-soft md:text-base leading-7">
              Isso acontece através do nosso sistema modular de gestão, desenhado especialmente para a realidade 
              do comércio local, conveniências e lojas de bairro.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-[26px] border border-line bg-canvas p-6 shadow-xl"
          >
            <BrandMark showSubtitle={false} className="text-ink" />
            <div className="mt-6 space-y-3.5">
              <div className="rounded-2xl border border-line bg-white px-4 py-3.5">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">Como pensamos</p>
                <p className="mt-2 text-sm text-ink-soft">
                  Primeiro entendemos a rotina e os maiores furos do seu negócio. Depois definimos a melhor combinação 
                  de módulos para resolver isso rápido.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-white px-4 py-3.5">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">Como entregamos</p>
                <p className="mt-2 text-sm text-ink-soft">
                  Evoluímos a operação por etapas, com implantação fácil e sem interromper suas vendas no dia a dia.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Tecnologia acessível",
              description: "Criamos soluções que nascem de problemas reais de lojistas, e não de sistemas complicados e burocráticos.",
              icon: Lightbulb,
            },
            {
              title: "Foco na rotina",
              description: "Entendemos a realidade de quem abre a loja todo dia para propor ferramentas práticas.",
              icon: Settings2,
            },
            {
              title: "Visão de negócio",
              description: "Nosso objetivo é melhorar seus resultados como um todo: do estoque controlado até a fidelização de clientes.",
              icon: Factory,
            },
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-line bg-canvas shadow-sm text-center">
                <CardHeader className="items-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl text-ink">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-ink-soft">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
