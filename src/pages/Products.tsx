import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, CheckCircle2, Factory, FileText, Gauge, Layers, Play, Settings2, ShieldCheck, Sparkles, Waypoints, Workflow, Zap } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { DbxImageCarousel } from "@/components/common/DbxImageCarousel"
import { DbxProductMark } from "@/components/common/DbxProductMark"
import { DemoVideoSection } from "@/components/sections/DemoVideoSection"
import { DbxMemberAccessSection } from "@/components/sections/DbxMemberAccessSection"
import { DbxTechnicalDocsSection } from "@/components/sections/DbxTechnicalDocsSection"
import { trackEvent } from "@/services/analytics"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"

const heroHighlights = [
  "Importação por cadastro manual, planilha, DXF e JSON em um único fluxo.",
  "Geração de DXF, PDF técnico, relatórios e resumo em Excel com menos montagem manual.",
  "Nesting, perdas, sobras e histórico do projeto com mais clareza para revisão e produção.",
  "Peças dobradas com perfil final e blank desenvolvido para apoiar fabricação e conferência.",
]

const heroSignalCards = [
  {
    title: "Mais velocidade",
    description: "Ganho estimado de até 40% no fluxo técnico.",
    icon: Gauge,
  },
  {
    title: "Menos retrabalho",
    description: "Padronização da saída e menos ajustes manuais.",
    icon: ShieldCheck,
  },
  {
    title: "Peças dobradas",
    description: "Perfil final e blank desenvolvido para reduzir interpretação manual.",
    icon: Settings2,
  },
]

const heroBenefitPanels = [
  {
    eyebrow: "Ganho operacional",
    title: "Até 40% mais fluidez no fluxo de trabalho",
    description:
      "O DBX-V4 reduz etapas repetitivas da preparação técnica e ajuda a equipe a avançar com mais ritmo entre engenharia, preparo e produção.",
  },
  {
    eyebrow: "Nova capacidade",
    title: "Agora com desenhos de peças dobradas",
    description:
      "A versão atual passa a detalhar o perfil final e o blank desenvolvido no mesmo fluxo, ampliando a aplicação do DBX em cenários fabris mais completos.",
  },
]

const desktopCapabilities = [
  {
    title: "Projeto organizado desde o começo",
    description:
      "O DBX-V4 permite iniciar um novo projeto, retomar históricos salvos e manter uma estrutura clara para cada sessão de trabalho.",
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
  {
    title: "Nova frente para peças dobradas",
    description:
      "A V4 amplia o uso do produto ao detalhar perfis dobrados com vista frontal e blank desenvolvido, apoiando fabricação e conferência.",
    icon: Settings2,
  },
]

const versionUpdates = [
  {
    title: "Mais flexibilidade na entrada",
    description:
      "A V4 amplia o leque de entradas e aceita diferentes formas de peça, furos, DXFs, planilhas e payloads JSON para acelerar a preparação do trabalho.",
    icon: Settings2,
  },
  {
    title: "Mais saídas úteis para a operação",
    description:
      "Além do desenho técnico, a V4 reúne exportações que ajudam a equipe a ganhar ritmo: DXFs em lote, PDFs, relatório de aproveitamento e resumo para Excel.",
    icon: Sparkles,
  },
  {
    title: "Peças dobradas entram no fluxo",
    description:
      "A nova versão passa a contemplar peças dobradas com desenho do perfil e blank desenvolvido, ampliando a aderência a cenários fabris mais completos.",
    icon: Zap,
  },
]

const roadmap = [
  {
    title: "DBX-V4 Desktop",
    description:
      "É a frente que já está operacional hoje, cobrindo cadastro, importação, desenho técnico, nesting, exportações, peças dobradas e histórico do projeto.",
  },
  {
    title: "DBX-V4 Web",
    description:
      "Estamos trabalhando em uma versão web SaaS para ampliar acesso, colaboração, implantação contínua e escala para mais equipes e unidades.",
  },
]

export function Products() {
  const navigate = useNavigate()
  useDocumentMetadata(
    "DBX-V4 | Lypsyos",
    "Conheça o DBX-V4, solução da Lypsyos para organizar a preparação técnica, reduzir retrabalho, incluir peças dobradas e evoluir para uma experiência web SaaS.",
  )

  function handleProductAction(label: string) {
    void trackEvent({
      eventName: "product_page_cta_click",
      category: "conversion",
      label,
      metadata: {
        page: "dbx-v4",
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
    <main className="bg-background pb-16 pt-0 md:pb-20">
      <section className="relative overflow-hidden bg-[#020814] py-16 text-surface md:py-20 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(43,219,218,0.16),transparent_26%),radial-gradient(circle_at_78%_38%,rgba(43,219,218,0.22),transparent_24%),linear-gradient(180deg,#030815_0%,#071427_55%,#07111d_100%)]" />
        <div className="absolute inset-0 opacity-55" style={{ backgroundImage: "linear-gradient(rgba(28,140,140,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(28,140,140,0.11) 1px, transparent 1px)", backgroundSize: "120px 120px" }} />
        <div className="absolute left-[-8%] top-[12%] h-[420px] w-[420px] rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute right-[-14%] top-[18%] h-[520px] w-[520px] rounded-full bg-secondary/12 blur-3xl" />
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="inline-flex rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-secondary">
                  Funcionalidades do DBX-V4
                </div>
                <h1 className="max-w-[11ch] text-4xl font-extrabold tracking-tight text-surface sm:text-5xl xl:text-6xl">
                  DBX-V4 para organizar a engenharia com{" "}
                  <span className="text-secondary">mais velocidade, padrão e controle</span>
                </h1>
                <p className="max-w-[620px] text-[15px] leading-7 text-surface/78 md:text-lg">
                  O DBX-V4 concentra a preparação técnica em um fluxo mais claro, reduz tarefas repetitivas
                  e entrega saídas úteis para engenharia, preparo e produção, agora também com peças dobradas.
                </p>
              </div>

              <ul className="grid gap-2.5">
                {heroHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-surface/8 bg-surface/[0.03] px-3.5 py-3 backdrop-blur-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                    <span className="text-sm leading-7 text-surface/86 md:text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Button size="lg" onClick={() => goToContact("solicitar_demonstracao_dbx_v4")}>
                  Solicitar uma demonstração
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => goToContact("falar_sobre_implantacao_dbx_v4")}>
                  Falar sobre implantação
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.12 }}
              className="mx-auto flex w-full max-w-[700px] items-center justify-center lg:max-w-none"
            >
              <div className="relative w-full min-h-[500px] overflow-hidden rounded-[34px] border border-secondary/18 bg-[linear-gradient(180deg,rgba(8,24,43,0.82),rgba(3,12,24,0.95))] p-5 shadow-[0_26px_70px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "radial-gradient(circle at 50% 62%, rgba(43,219,218,0.32), transparent 22%), radial-gradient(circle at 82% 22%, rgba(43,219,218,0.18), transparent 16%), radial-gradient(circle at 18% 34%, rgba(43,219,218,0.16), transparent 14%)" }} />
                <div className="absolute left-8 top-[5.5rem] h-px w-36 bg-gradient-to-r from-secondary/0 via-secondary/60 to-secondary/0" />
                <div className="absolute right-16 top-[6.5rem] h-px w-44 bg-gradient-to-r from-secondary/0 via-secondary/60 to-secondary/0" />
                <div className="absolute right-7 top-14 h-14 w-14 rounded-2xl border border-secondary/18" />
                <div className="absolute left-1/2 top-[57%] h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/30 shadow-[0_0_65px_rgba(43,219,218,0.18)]" />
                <div className="absolute left-1/2 top-[57%] h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/10" />
                <div className="absolute bottom-12 left-1/2 h-20 w-[82%] -translate-x-1/2 rounded-[999px] border border-secondary/14" />
                <div className="absolute bottom-16 left-1/2 h-10 w-[54%] -translate-x-1/2 rounded-[999px] border border-secondary/18 bg-secondary/5 shadow-[0_0_40px_rgba(43,219,218,0.18)]" />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <DbxProductMark version="V4" subtitle="Desktop operacional e recursos integrados" className="text-surface" />
                    <button
                      type="button"
                      onClick={() => goToContact("abrir_detalhes_hero_dbx_v4")}
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-secondary/30 bg-secondary/12 text-secondary shadow-[0_0_24px_rgba(43,219,218,0.18)] transition-transform hover:scale-105"
                      aria-label="Solicitar demonstração do DBX-V4"
                    >
                      <Play className="ml-1 h-6 w-6" />
                    </button>
                  </div>

                  <div className="relative flex flex-1 items-center justify-center py-3">
                    <div className="relative z-10 grid w-full max-w-[390px] gap-3">
                      {heroBenefitPanels.map((panel, index) => (
                        <div
                          key={panel.title}
                          className={`overflow-hidden rounded-[24px] border border-secondary/20 bg-[linear-gradient(180deg,rgba(10,28,49,0.9),rgba(5,15,28,0.96))] shadow-[0_18px_40px_rgba(0,0,0,0.34)] ${
                            index === 0 ? "lg:translate-x-[-10px]" : "lg:translate-x-[18px]"
                          }`}
                        >
                          <div className="border-b border-secondary/12 px-4 py-3">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">
                              {panel.eyebrow}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-surface md:text-base">
                              {panel.title}
                            </p>
                          </div>
                          <div className="px-4 py-3.5 text-sm leading-6 text-surface/72">
                            {panel.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {heroSignalCards.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[22px] border border-secondary/20 bg-[linear-gradient(180deg,rgba(10,28,49,0.85),rgba(5,15,28,0.92))] px-4 py-4 text-center shadow-[0_12px_24px_rgba(0,0,0,0.26)]"
                      >
                        <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-2xl border border-secondary/25 bg-secondary/10 text-secondary">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-secondary">{item.title}</p>
                        <p className="mt-1.5 text-xs leading-6 text-surface/72">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mt-16 md:mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Tour visual do produto</p>
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Veja a interface, as saídas técnicas e a nova frente de peças dobradas
              </h2>
              <p className="text-base leading-7 text-neutral-700 md:text-lg">
                Esta visão reúne a tela principal do DBX-V4, exemplos de documentação e os novos cenários
                com dobras para mostrar como a plataforma está evoluindo sem perder clareza operacional.
              </p>
              <div className="grid gap-3.5">
                <div className="rounded-2xl border border-neutral/20 bg-surface p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Versão desktop em operação</p>
                  <p className="mt-2 text-sm leading-7 text-neutral-700">
                    O DBX-V4 desktop já cobre cadastro, importação, desenho técnico, nesting, exportação e novas saídas para peças dobradas.
                  </p>
                </div>
                <div className="rounded-2xl border border-neutral/20 bg-surface p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Público principal</p>
                  <p className="mt-2 text-sm leading-7 text-neutral-700">
                    Feito para engenheiros, desenhistas, programadores e equipes que precisam organizar melhor a preparação técnica e a passagem para a produção.
                  </p>
                </div>
                <div className="rounded-2xl bg-primary px-4 py-4 text-surface">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Resumo executivo</p>
                  <p className="mt-2 text-sm leading-7 text-surface/80">
                    O DBX-V4 já atende o fluxo produtivo principal em desktop e está sendo preparado para ampliar automação, colaboração e implantação como SaaS.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <DbxImageCarousel />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 md:mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Versão desktop hoje</p>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              O que o DBX-V4 já entrega no uso diário
            </h2>
            <p className="text-base leading-7 text-neutral-700 md:text-lg">
              A proposta da versão atual é simples: reduzir esforço repetitivo, organizar melhor a preparação
              técnica e entregar saídas úteis para que o trabalho avance com mais fluidez, inclusive quando
              o fluxo exige peças dobradas.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[15px] leading-7 text-neutral-700">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 bg-surface py-16 md:mt-20 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Atualização do DBX-V4</p>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              O que a evolução da V4 representa na prática
            </h2>
            <p className="text-base leading-7 text-neutral-700 md:text-lg">
              Em vez de falar de arquivos e módulos isolados, a melhor forma de enxergar a V4 é pelo ganho
              operacional que ela começa a entregar para quem usa a ferramenta no dia a dia.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
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
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[15px] leading-7 text-neutral-700">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DemoVideoSection />

      <section className="mt-16 md:mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Desktop agora, web na sequência</p>
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Uma base operacional hoje, com visão clara de produto para amanhã
              </h2>
              <p className="text-base leading-7 text-neutral-700 md:text-lg">
                O DBX-V4 não está parado em uma tela desktop. A proposta atual já resolve uma dor concreta,
                enquanto a camada web em desenvolvimento busca ampliar implantação, governança e acesso como SaaS.
              </p>
              <Button size="lg" onClick={() => goToContact("discutir_roadmap_dbx_v4")}>
                Conversar sobre o roadmap
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              viewport={{ once: true }}
              className="grid gap-4"
            >
              {roadmap.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-primary/10 bg-primary p-5 text-surface shadow-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">{item.title}</p>
                  <p className="mt-3 text-[15px] leading-7 text-surface/80">{item.description}</p>
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
