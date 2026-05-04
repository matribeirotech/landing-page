import { motion } from "motion/react"
import { Factory, FileText, Layers, Settings2, ShieldCheck, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

const importFormats = ["PDF", "PNG", "DZ", "JSON", "DXF"]

const documentationCards = [
  {
    title: "Peças planas e dobradas",
    description:
      "O DBX-V4 amplia o escopo operacional ao combinar peças planas com a nova frente de peças dobradas, incluindo leitura do perfil final e do blank desenvolvido.",
    icon: FileText,
  },
  {
    title: "Arquitetura mais organizada",
    description:
      "A base foi refatorada para reduzir acoplamento, separar responsabilidades e facilitar manutenção, novas funcionalidades e evolução incremental do produto.",
    icon: Layers,
  },
  {
    title: "Interface alinhada à marca",
    description:
      "A interface foi atualizada para acompanhar a identidade visual da Lypsyos e melhorar a leitura de projeto, parâmetros, importação, furação e lista de produção.",
    icon: Settings2,
  },
  {
    title: "Importação mais flexível",
    description:
      "Além do cadastro manual, o DBX-V4 segue preparado para receber planilhas, DXFs, JSON e arquivos auxiliares como PDF, PNG e medidas em DZ.",
    icon: Zap,
  },
  {
    title: "Telemetria em planejamento",
    description:
      "Está prevista uma camada de telemetria para medir volume de desenhos gerados, dados das peças e uso por usuário, criando base para análise operacional e evolução de produto.",
    icon: Zap,
  },
  {
    title: "Autenticação e controle remoto",
    description:
      "A área de membros já está migrando para Supabase Auth, preparando o produto para acesso por conta, validação via internet e futuras camadas de controle remoto.",
    icon: ShieldCheck,
  },
  {
    title: "Build e distribuição automatizados",
    description:
      "O fluxo de build já conta com GitHub Actions para padronizar a geração do executável, reduzir etapas manuais e acelerar a publicação de novas versões.",
    icon: Factory,
  },
]

const nextSteps = [
  "Validação via internet para suporte a controle remoto de licença.",
  "Ampliação do acesso por membros com Supabase Auth no ecossistema web do DBX.",
  "Autenticação federada com conta Google.",
  "Camada de telemetria com persistência em banco de dados.",
  "Expansão da experiência web para colaboração e uso contínuo como SaaS.",
]

export function DbxTechnicalDocsSection() {
  return (
    <section className="mt-16 bg-surface py-16 md:mt-20 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 max-w-4xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            Documentação técnica
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            DBX-V4, atualização técnica e direção de produto
          </h2>
          <p className="text-base leading-7 text-neutral-700 md:text-lg">
            A versão 4 leva o produto além da base anterior ao combinar melhorias de estrutura, refinamento
            visual, maior flexibilidade de entrada e a nova capacidade de detalhar peças dobradas dentro do
            mesmo fluxo técnico.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {importFormats.map((format) => (
            <div
              key={format}
              className="rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
            >
              Importação por {format}
            </div>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {documentationCards.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
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

        <div className="mt-10 rounded-[26px] border border-primary/10 bg-primary p-6 text-surface shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Próximos passos</p>
          <div className="mt-4 grid gap-3.5 md:grid-cols-2">
            {nextSteps.map((item) => (
              <div key={item} className="rounded-2xl border border-surface/10 bg-surface/5 px-4 py-3.5">
                <p className="text-sm leading-6 text-surface/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
