import { CheckCircle2, MessageCircle, Smartphone, Sparkles, Star, ShieldCheck } from "lucide-react"
import { motion } from "motion/react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { buttonVariants } from "@/components/ui/Button"
import { WHATSAPP_URL } from "@/content/site"

const easySteps = [
  {
    step: "1",
    title: "Ative seus 30 dias grátis",
    desc: "Sem precisar de cartão de crédito. Já vem com os serviços da sua área prontos.",
  },
  {
    step: "2",
    title: "Conecte seu WhatsApp",
    desc: "Aponte a câmera do celular uma única vez e o robô já começa a atender em 2 minutos.",
  },
  {
    step: "3",
    title: "Coloque na tela do celular",
    desc: "Instalação direta no iPhone ou Android com 1 clique, sem taxas nem burocracia de App Store.",
  },
]

const testimonials = [
  {
    name: "Juliana Martins",
    role: "Manicure & Nail Designer",
    quote:
      "Eu vivia parando de lixar unha para responder cliente pedindo horário no WhatsApp. Agora enquanto estou fazendo um alongamento, o Zenda já deixa a semana inteira marcada sozinho.",
    highlight: "Agenda lotada sem parar o trabalho",
  },
  {
    name: "Marcos Vinícius",
    role: "Dono de Barbearia",
    quote:
      "A rapaziada manda mensagem onze da noite querendo cortar cabelo no sábado. Antes eu perdia cliente porque já estava dormindo. Agora acordo às 8h com o resumo na tela e os horários todos preenchidos.",
    highlight: "Faturamento previsto na tela todo dia",
  },
  {
    name: "Patrícia Almeida",
    role: "Estúdio de Estética e Cílios",
    quote:
      "Eu achava que ia ser difícil mexer, mas instalei no meu celular com 1 clique sem nem precisar baixar nada pesado. Minha lista de clientes e meu caixa ficam salvos com segurança total.",
    highlight: "Super fácil de usar no celular",
  },
]

export function ZendaTestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="w-full overflow-hidden bg-canvas py-16 md:py-24 border-t border-line"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Parte 1: Facilidade de Uso em 3 Passos */}
        <SectionHeading
          titleId="testimonials-title"
          eyebrow="Simples, Rápido e Sem Dor de Cabeça"
          title={
            <>
              Pronto para usar em <span className="text-brand">2 minutos no seu celular</span>
            </>
          }
          description="Você não precisa entender de computador nem baixar programas complicados. O Zenda foi feito para facilitar a sua rotina."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {easySteps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-6 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand font-heading text-lg font-extrabold text-white shadow-sm">
                  {item.step}
                </span>
                <h3 className="font-heading text-lg font-bold text-ink">{item.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-ink-soft">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Parte 2: Depoimentos Reais do Dia a Dia */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-growth-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-growth-text">
              <Sparkles className="size-3.5" /> Quem usa não volta para o caderno
            </p>
            <h3 className="mt-3 font-heading text-2xl font-bold text-ink sm:text-3xl">
              Feito para a correria real de salões e barbearias
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, index) => (
              <motion.article
                key={t.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex flex-col justify-between rounded-2xl border border-line bg-white p-6 shadow-soft"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400" aria-label="Avaliação 5 estrelas">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-400" aria-hidden="true" />
                    ))}
                  </div>

                  <p className="text-[0.9375rem] leading-relaxed text-ink italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 border-t border-line pt-4">
                  <p className="font-heading text-base font-bold text-ink">{t.name}</p>
                  <p className="text-xs font-medium text-ink-soft">{t.role}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-growth-soft px-2.5 py-1 text-[11px] font-bold text-growth-text">
                    <CheckCircle2 className="size-3.5 text-growth" />
                    {t.highlight}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Faixa de Confiança Simples + Botão Rápido pro WhatsApp */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-brand/20 bg-white p-6 text-center shadow-soft md:flex-row md:text-left">
          <div className="flex flex-col items-center gap-3 md:flex-row">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <p className="font-heading text-base font-bold text-ink sm:text-lg">
                Segurança total dos seus dados e atendimento no mesmo segundo
              </p>
              <p className="text-sm text-ink-soft">
                Se você trocar de celular, sua agenda e suas clientes continuam salvas. E se tiver dúvida, a gente te ajuda pelo WhatsApp.
              </p>
            </div>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              size: "lg",
              className: "w-full md:w-auto shrink-0 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold gap-2",
            })}
          >
            <MessageCircle className="size-5 fill-white text-white" />
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
