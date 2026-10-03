import { ArrowDown, ArrowRight, Blocks, HeartHandshake, PackageCheck, PackageX, Puzzle, TrendingDown, Wallet, Megaphone } from "lucide-react"
import { motion } from "motion/react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { homeSections } from "@/content/site"

const pairs = [
  {
    pain: {
      title: "Furos no estoque",
      text: "Produto acaba sem aviso, mercadoria vence na prateleira e ninguém sabe ao certo o que tem no depósito.",
      icon: PackageX,
    },
    solution: {
      title: "Estoque em tempo real",
      text: "Cada venda atualiza o saldo na hora, e o sistema avisa antes de faltar ou vencer.",
      icon: PackageCheck,
    },
  },
  {
    pain: {
      title: "Caixa sem previsibilidade",
      text: "Você vende bem, mas no fim do mês não sabe para onde foi o dinheiro.",
      icon: TrendingDown,
    },
    solution: {
      title: "Fluxo de caixa claro",
      text: "Entradas, saídas e contas a pagar em uma tela só, com a previsão das próximas semanas.",
      icon: Wallet,
    },
  },
  {
    pain: {
      title: "Marketing no escuro",
      text: "Promoção feita no improviso, cliente que compra uma vez e nunca mais volta.",
      icon: Megaphone,
    },
    solution: {
      title: "Marketing que traz cliente de volta",
      text: "Campanhas, cupons e programas de fidelidade baseados no que seu cliente realmente compra.",
      icon: HeartHandshake,
    },
  },
  {
    pain: {
      title: "Sistemas complicados e caros",
      text: "Ferramentas cheias de botões que ninguém na equipe consegue usar.",
      icon: Puzzle,
    },
    solution: {
      title: "Simples e modular",
      text: "Comece pelo que você precisa hoje e ative novos módulos quando a loja crescer.",
      icon: Blocks,
    },
  },
]

export function ProblemSolutionSection() {
  return (
    <section
      id={homeSections.why}
      aria-labelledby="problem-solution-title"
      className="w-full bg-canvas py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          titleId="problem-solution-title"
          eyebrow="Por que a Lypsyos"
          title={
            <>
              Sua loja não precisa de mais trabalho. Precisa de <span className="text-brand">mais controle.</span>
            </>
          }
          description="Todo comerciante conhece essa rotina: anotar no caderno, conferir na planilha e torcer para o caixa fechar. A gente sabe — e criou um jeito mais leve de cuidar do seu negócio."
        />

        <div className="mt-10 hidden grid-cols-[1fr_auto_1fr] items-center gap-x-6 px-1 text-sm font-semibold uppercase tracking-[0.08em] md:grid">
          <p className="text-ink-soft">Sem a Lypsyos</p>
          <span className="w-10" />
          <p className="text-growth-text">Com a Lypsyos</p>
        </div>

        <ul className="mt-6 flex flex-col gap-5 md:gap-4">
          {pairs.map((pair, index) => (
            <motion.li
              key={pair.pain.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-6"
            >
              <div className="flex gap-4 rounded-card border border-line bg-white p-5 md:p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-danger-soft text-danger">
                  <pair.pain.icon className="size-5.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted md:hidden">Sem a Lypsyos</p>
                  <h3 className="text-lg font-semibold text-ink">{pair.pain.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">{pair.pain.text}</p>
                </div>
              </div>

              <span className="flex items-center justify-center text-brand" aria-hidden="true">
                <ArrowDown className="size-5 md:hidden" />
                <span className="hidden size-10 items-center justify-center rounded-full bg-white shadow-soft md:flex">
                  <ArrowRight className="size-5" />
                </span>
              </span>

              <div className="flex gap-4 rounded-card border border-growth/25 bg-growth-soft p-5 md:p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-growth-text shadow-sm">
                  <pair.solution.icon className="size-5.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-growth-text md:hidden">Com a Lypsyos</p>
                  <h3 className="text-lg font-semibold text-ink">{pair.solution.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">{pair.solution.text}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        <p className="mx-auto mt-12 max-w-2xl text-center font-heading text-xl font-semibold leading-snug text-ink md:text-2xl">
          Tecnologia rápida, telas simples e suporte de verdade.{" "}
          <span className="text-brand">É assim que a Lypsyos trabalha.</span>
        </p>
      </div>
    </section>
  )
}
