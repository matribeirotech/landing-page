import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, CheckCircle2, Factory, FileText, Layers, Settings2, Sparkles, Workflow, Zap } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { BrandMark } from "@/components/common/BrandMark"
import { DemoVideoSection } from "@/components/sections/DemoVideoSection"
import { DbxMemberAccessSection } from "@/components/sections/DbxMemberAccessSection"
import { DbxTechnicalDocsSection } from "@/components/sections/DbxTechnicalDocsSection"
import { trackEvent } from "@/services/analytics"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"

const heroHighlights = [
  "Versão desktop já operacional para equipes que precisam acelerar o fluxo técnico agora.",
  "Entrada flexível por cadastro manual, planilha, DXF e JSON para reduzir retrabalho no início do processo.",
  "Geração de DXF, PDF técnico, relatórios e aproveitamento com mais padronização e rastreabilidade.",
  "Versão web em evolução para ampliar acesso, escala e continuidade como SaaS.",
]

const desktopCapabilities = [
  {
    title: "Projeto organizado desde o começo",
    description:
      "O DBX-V3 permite iniciar um novo projeto, retomar históricos salvos e manter uma estrutura clara para cada sessão de trabalho.",
    icon: Workflow,
  },
  {
    title: "Entrada de peças mais prática",
    description:
      "As peças podem entrar manualmente, por planilha, por múltiplos DXFs ou por JSON, reduzindo digitação repetitiva e acelerando a preparação.",
    icon: Layers,
  },
  {
    title: "Documentação e arquivos em lote",
    description:
      "A versão desktop já gera PDFs técnicos, DXFs em lote, resumo em Excel e relatórios para apoiar a passagem da engenharia para a produção.",
    icon: FileText,
  },
  {
    title: "Mais clareza no aproveitamento",
    description:
      "O sistema calcula nesting por espessura, classifica perdas e sobras e ajuda a visualizar melhor o aproveitamento antes da execução.",
    icon: Factory,
  },
]

const versionUpdates = [
  {
    title: "Mais flexibilidade na entrada",
    description:
      "A V3 amplia o leque de entradas e aceita diferentes formas de peça, furos, DXFs, planilhas e payloads JSON para acelerar a preparação do trabalho.",
    icon: Settings2,
  },
  {
    title: "Mais saídas úteis para a operação",
    description:
      "Além do desenho técnico, a V3 reúne exportações que ajudam a equipe a ganhar ritmo: DXFs em lote, PDFs, relatório de aproveitamento e resumo para Excel.",
    icon: Sparkles,
  },
  {
    title: "Mais base para automação futura",
    description:
      "A estrutura atual já prepara o caminho para fluxos assistidos por IA, sem perder o foco na operação real e no uso diário da equipe.",
    icon: Zap,
  },
]

const roadmap = [
  {
    title: "DBX-V3 Desktop",
    description:
      "É a frente que já está operacional hoje, cobrindo cadastro, importação, desenho técnico, nesting, exportações e histórico do projeto.",
  },
  {
    title: "DBX-V3 Web",
    description:
      "Estamos trabalhando em uma versão web SaaS para ampliar acesso, colaboração, implantação contínua e escala para mais equipes e unidades.",
  },
]

export function Products() {
  const navigate = useNavigate()
  useDocumentMetadata(
    "DBX-V3 | Lypsyos",
    "Conheça o DBX-V3, solução da Lypsyos para organizar a preparação técnica, reduzir retrabalho e evoluir para uma experiência web SaaS.",
  )

  function handleProductAction(label: string) {
    void trackEvent({
      eventName: "product_page_cta_click",
      category: "conversion",
      label,
      metadata: {
        page: "dbx-v3",
      },
    }).catch((error) => {
      console.error("Não foi possível rastrear o CTA da página de produto", error)
    })
  }

  function goToContact(label: string) {
    handleProductAction(label)
    navigate("/contato")
  }

  return (
    <main className="bg-background pb-24 pt-20 md:pb-32 md:pt-24">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(43,219,218,0.18),transparent_28%)]" />
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-5">
                <div className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-accent">
                  Produto Lypsyos
                </div>
                <h1 className="max-w-[13ch] text-4xl font-extrabold tracking-tight text-primary sm:text-5xl xl:text-7xl">
                  DBX-V3 para organizar a engenharia e preparar a evolução para o{" "}
                  <span className="text-accent">SaaS industrial</span>
                </h1>
                <p className="max-w-[760px] text-lg leading-8 text-neutral-700 md:text-xl">
                  O DBX-V3 foi pensado para equipes que precisam ganhar velocidade na preparação técnica,
                  reduzir retrabalho e estruturar um fluxo mais confiável entre engenharia, preparo e produção.
                </p>
              </div>

              <ul className="grid gap-3">
                {heroHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-surface/90 px-4 py-4 shadow-sm">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-secondary" />
                    <span className="text-base leading-7 text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Button size="lg" onClick={() => goToContact("solicitar_demonstracao_dbx_v3")}>
                  Solicitar uma demonstração
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => goToContact("falar_sobre_implantacao_dbx_v3")}>
                  Falar sobre implantação
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12 }}
            >
              <div className="overflow-hidden rounded-[32px] border border-primary/10 bg-primary p-3 shadow-2xl">
                <div className="rounded-[26px] bg-surface p-6">
                  <div className="flex items-center justify-between gap-4 border-b border-neutral/20 pb-5">
                    <BrandMark className="text-primary" />
                    <div className="rounded-full bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                      Atualização V3
                    </div>
                  </div>

                  <div className="grid gap-4 py-6">
                    <div className="rounded-2xl border border-neutral/20 bg-background p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Versão desktop em operação</p>
                      <p className="mt-3 text-sm leading-7 text-neutral-700">
                        O DBX-V3 desktop já cobre o ciclo principal de cadastro, importação, desenho técnico,
                        nesting e exportação para uso prático na rotina da equipe.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-neutral/20 bg-background p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Público principal</p>
                      <p className="mt-3 text-sm leading-7 text-neutral-700">
                        Feito para engenheiros, desenhistas, programadores e times que precisam organizar
                        melhor a preparação técnica e a passagem para a produção.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-neutral/20 bg-background p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Próximo passo</p>
                      <p className="mt-3 text-sm leading-7 text-neutral-700">
                        A camada web está em desenvolvimento para transformar essa base em uma experiência
                        SaaS mais acessível, escalável e contínua.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-primary px-5 py-5 text-surface">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Resumo executivo</p>
                    <p className="mt-3 text-sm leading-7 text-surface/80">
                      O DBX-V3 já atende o fluxo produtivo principal em desktop e está sendo preparado para uma
                      evolução web que amplie automação, colaboração e implantação como SaaS.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mt-24 md:mt-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Versão desktop hoje</p>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl">
              O que o DBX-V3 já entrega no uso diário
            </h2>
            <p className="text-lg leading-8 text-neutral-700">
              A proposta da versão atual é simples: reduzir esforço repetitivo, organizar melhor a preparação
              técnica e entregar saídas úteis para que o trabalho avance com mais fluidez.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {desktopCapabilities.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-neutral/20 bg-surface shadow-sm">
                  <CardHeader>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-2xl text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-7 text-neutral-700">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24 bg-surface py-24 md:mt-32 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Atualização do DBX-V3</p>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl">
              O que a evolução da V3 representa na prática
            </h2>
            <p className="text-lg leading-8 text-neutral-700">
              Em vez de falar de arquivos e módulos isolados, a melhor forma de enxergar a V3 é pelo ganho
              operacional que ela começa a entregar para quem usa a ferramenta no dia a dia.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {versionUpdates.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-neutral/20 bg-background shadow-sm">
                  <CardHeader>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-2xl text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-7 text-neutral-700">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DemoVideoSection />

      <section className="mt-24 md:mt-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Desktop agora, web na sequência</p>
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl">
                Uma base operacional hoje, com visão clara de produto para amanhã
              </h2>
              <p className="text-lg leading-8 text-neutral-700">
                O DBX-V3 não está parado em uma tela desktop. A proposta atual já resolve uma dor concreta,
                enquanto a camada web em desenvolvimento busca ampliar implantação, governança e acesso como SaaS.
              </p>
              <Button size="lg" onClick={() => goToContact("discutir_roadmap_dbx_v3")}>
                Conversar sobre o roadmap
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              viewport={{ once: true }}
              className="grid gap-5"
            >
              {roadmap.map((item) => (
                <div key={item.title} className="rounded-[28px] border border-primary/10 bg-primary p-6 text-surface shadow-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">{item.title}</p>
                  <p className="mt-4 text-base leading-7 text-surface/80">{item.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <DbxTechnicalDocsSection />
      <DbxMemberAccessSection />
    </main>
  )
}
