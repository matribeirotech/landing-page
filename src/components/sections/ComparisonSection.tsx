import { Check, X, Minus, Sparkles } from "lucide-react"
import { motion } from "motion/react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { homeSections } from "@/content/site"

const comparisonRows = [
  {
    criterion: "Tempo gasto respondendo WhatsApp",
    manual: "2 a 4 horas por dia perdidas digitando horários",
    others: "Nenhuma automação ou bots caros à parte",
    lypsyos: "0 minutos: Robô atende e fecha o agendamento sozinho",
    highlight: true,
  },
  {
    criterion: "Agendamento fora do expediente",
    manual: "Cliente espera até o dia seguinte (e desiste)",
    others: "Depende de site complexo com login da cliente",
    lypsyos: "Imediato: Resposta em 2 segundos a qualquer hora",
    highlight: true,
  },
  {
    criterion: "Conflito de horários (Overbooking)",
    manual: "Frequente (erro humano ao anotar na pressa)",
    others: "Risco se não sincronizar em tempo real",
    lypsyos: "Zero risco: Consulta a agenda antes de oferecer opções",
    highlight: true,
  },
  {
    criterion: "Instalação no celular",
    manual: "Não se aplica (caderno / planilhas)",
    others: "Download obrigatório em app store pesada",
    lypsyos: "1 Clique (PWA): Leve, rápido e sem gastar memória",
    highlight: false,
  },
  {
    criterion: "Lembretes diários de clientes",
    manual: "Manual (precisa mandar mensagem uma a uma)",
    others: "Cobrança extra por pacote de SMS",
    lypsyos: "Push nativo no celular + Google Agenda sincronizada",
    highlight: false,
  },
  {
    criterion: "Curva de aprendizado",
    manual: "Baixa, porém ineficiente e desorganizada",
    others: "Alta (dezenas de menus confusos de ERP antigo)",
    lypsyos: "Imediata: Mobile-first, simples e direto ao ponto",
    highlight: false,
  },
]

export function ComparisonSection() {
  return (
    <section
      id={homeSections.comparison}
      aria-labelledby="comparison-title"
      className="w-full bg-canvas py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          titleId="comparison-title"
          eyebrow="Retorno sobre o Investimento"
          title={
            <>
              Por que a Lypsyos é diferente de <span className="text-brand">tudo o que você já viu</span>
            </>
          }
          description="Compare a gestão manual no caderno, sistemas genéricos de ERP e a experiência moderna com o ecossistema Lypsyos."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mt-12 overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-soft"
        >
          {/* Tabela responsiva com rolagem horizontal suave no mobile */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-canvas/80 text-xs uppercase tracking-wider text-ink-soft">
                  <th scope="col" className="p-4 sm:p-5 font-semibold">
                    Critério de Comparação
                  </th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-ink-muted">
                    Forma Manual (Caderno / WhatsApp)
                  </th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-ink-muted">
                    Outros Sistemas Complexos
                  </th>
                  <th
                    scope="col"
                    className="p-4 sm:p-5 font-bold text-white bg-brand rounded-t-xl"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="size-4" /> Plataforma Lypsyos
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-xs sm:text-sm">
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row.criterion}
                    className={index % 2 === 1 ? "bg-canvas/30" : "bg-white"}
                  >
                    <td className="p-4 sm:p-5 font-bold text-ink">
                      {row.criterion}
                    </td>
                    <td className="p-4 sm:p-5 text-ink-soft">
                      <div className="flex items-start gap-2">
                        <X className="size-4 shrink-0 text-danger mt-0.5" />
                        <span>{row.manual}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-ink-soft">
                      <div className="flex items-start gap-2">
                        <Minus className="size-4 shrink-0 text-ink-muted mt-0.5" />
                        <span>{row.others}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 font-semibold text-growth-text bg-growth-soft/30 border-l border-r border-growth/20">
                      <div className="flex items-start gap-2">
                        <Check className="size-4 shrink-0 text-growth mt-0.5" />
                        <span className="text-ink">{row.lypsyos}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

