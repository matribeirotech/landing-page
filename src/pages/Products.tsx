import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { ArrowRight, CheckCircle2, FileText, Layers, Sparkles, Zap } from "lucide-react"
import { trackEvent } from "@/services/analytics"
import { BrandMark } from "@/components/common/BrandMark"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"

export function Products() {
  const navigate = useNavigate()
  useDocumentMetadata(
    "DBX-V2 | Lypsyos",
    "Conheca o DBX-V2, ferramenta da Lypsyos para acelerar a geracao tecnica e padronizar fluxos industriais.",
  )

  function handleProductAction(label: string) {
    void trackEvent({
      eventName: "product_page_cta_click",
      category: "conversion",
      label,
      metadata: {
        page: "dbx-v2",
      },
    }).catch((error) => {
      console.error("Nao foi possivel rastrear CTA da pagina de produto", error)
    })
  }

  function goToContact() {
    handleProductAction("solicitar_demonstracao")
    navigate("/contato")
  }

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
            <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm text-accent font-semibold mb-4">
              Produto Principal
            </div>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
              <span className="text-secondary">DBX-V2</span>
            </h1>
            <p className="max-w-[900px] text-neutral-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
              Uma ferramenta da Lypsyos para acelerar a geracao tecnica, reduzir operacoes manuais e padronizar a preparacao de arquivos em rotinas industriais.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-3 min-[400px]:flex-row mt-8"
          >
            <Button size="lg" className="h-12 bg-secondary px-8 font-semibold text-primary hover:bg-secondary/90" onClick={goToContact}>
              Solicitar demonstracao
            </Button>
            <Button size="lg" variant="outline" className="h-12 border-primary px-8 text-primary hover:bg-primary/10" onClick={() => handleProductAction("falar_sobre_integracao")}>
              <ArrowRight className="mr-2 h-5 w-5" /> Falar sobre integracao
            </Button>
          </motion.div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-[28px] border border-neutral/20 bg-surface p-6 shadow-xl"
          >
            <div className="flex items-center justify-between gap-4 border-b border-neutral/20 pb-5">
              <BrandMark className="text-primary" />
              <div className="rounded-full bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Aplicacao pratica
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {[
                "Menos tempo gasto em geracao manual de arquivos tecnicos.",
                "Mais padrao entre engenharia, preparo e operacao.",
                "Base mais robusta para expansao de automacoes no processo.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-neutral/20 bg-background p-4">
                  <div className="mt-1 rounded-full bg-accent/10 p-2 text-accent">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <p className="text-sm text-neutral-700">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
              Por que o DBX-V2?
            </h2>
            <p className="text-neutral-700 md:text-lg leading-relaxed">
              O DBX-V2 foi desenhado para enxugar o tempo gasto com tarefas repetitivas da preparacao tecnica.
              Em vez de depender de uma sequencia manual longa e sujeita a variacao, a equipe ganha um fluxo mais consistente e produtivo.
            </p>
            <ul className="grid gap-4">
              {[
                "Reduz esforco operacional em tarefas de engenharia repetitiva.",
                "Diminui falhas em exportacoes e entregas manuais.",
                "Padroniza o fluxo de geracao tecnica para o time.",
                "Ajuda a escalar o processo com mais previsibilidade.",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-24">
          {[
            {
              title: "Geracao em lote",
              description: "Conduz a criacao de arquivos e entregaveis tecnicos de forma mais rapida e consistente.",
              icon: Layers,
            },
            {
              title: "Padronizacao tecnica",
              description: "Apoia equipes que precisam reduzir variacao manual e dar mais previsibilidade ao fluxo.",
              icon: FileText,
            },
            {
              title: "Base para evolucao",
              description: "Serve como ponto de partida para novas etapas de automacao e melhoria continua na industria.",
              icon: Zap,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-neutral/20 bg-surface shadow-sm">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
