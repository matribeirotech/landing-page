import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { useForm } from "react-hook-form"
import { motion } from "motion/react"
import { Send } from "lucide-react"
import { submitContactForm, trackEvent } from "@/services/analytics"

type FormData = {
  name: string
  email: string
  company: string
  message: string
}

export function ContactFormSection() {
  const location = useLocation()
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [submitState, setSubmitState] = useState<"success" | "error" | null>(null)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setSubmitMessage(null)
    setSubmitState(null)

    try {
      await submitContactForm({
        ...data,
        sourcePath: location.pathname,
      })

      await trackEvent({
        eventName: "contact_form_success",
        category: "conversion",
        label: location.pathname,
        metadata: {
          company: data.company,
        },
      })

      reset()
      setSubmitState("success")
      setSubmitMessage("Mensagem enviada com sucesso. Nossa equipe retornará em breve.")
    } catch (error) {
      console.error("Não foi possível enviar o formulário", error)
      setSubmitState("error")
      setSubmitMessage(error instanceof Error ? error.message : "Não foi possível enviar agora. Tente novamente em instantes.")
    }
  }

  return (
    <section className="w-full bg-surface py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center justify-center space-y-3 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
              Vamos identificar o próximo ganho do seu processo
            </h2>
            <p className="max-w-[860px] text-neutral-600 md:text-lg/relaxed">
              Fale com a Lypsyos para avaliar o encaixe dos nossos produtos, discutir um fluxo industrial
              específico ou estruturar uma automação sob medida.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-neutral/20 bg-background shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Fale com a Lypsyos</CardTitle>
                <CardDescription className="text-neutral-600">
                  Compartilhe seu contexto, desafio ou objetivo operacional. Retornaremos com um
                  direcionamento técnico-comercial claro e prático.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium leading-none text-primary">Nome</label>
                      <Input
                        id="name"
                        placeholder="Seu nome"
                        {...register("name", { required: "Nome é obrigatório" })}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p id="name-error" className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium leading-none text-primary">E-mail</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        {...register("email", {
                          required: "E-mail é obrigatório",
                          pattern: { value: /^\S+@\S+$/i, message: "E-mail inválido" },
                        })}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p id="email-error" className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium leading-none text-primary">Empresa</label>
                    <Input
                      id="company"
                      placeholder="Nome da empresa"
                      {...register("company", { required: "Empresa é obrigatória" })}
                      aria-invalid={Boolean(errors.company)}
                      aria-describedby={errors.company ? "company-error" : undefined}
                      className={errors.company ? "border-red-500" : ""}
                    />
                    {errors.company && <p id="company-error" className="text-sm text-red-500">{errors.company.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium leading-none text-primary">Mensagem</label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Descreva seu processo, o gargalo atual ou o tipo de automação que você busca."
                      {...register("message", { required: "Mensagem é obrigatória" })}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`flex w-full rounded-md border border-neutral/30 bg-surface px-3 py-2 text-sm ring-offset-background placeholder:text-neutral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.message ? "border-red-500" : ""}`}
                    />
                    {errors.message && <p id="message-error" className="text-sm text-red-500">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Enviando..." : <><Send className="h-4 w-4" /> Solicitar contato</>}
                  </Button>
                  {submitMessage && (
                    <p
                      role={submitState === "error" ? "alert" : "status"}
                      aria-live="polite"
                      className="rounded-md border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-primary"
                    >
                      {submitMessage}
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
