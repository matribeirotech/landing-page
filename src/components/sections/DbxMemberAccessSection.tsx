import { type FormEvent, useEffect, useState } from "react"
import { motion } from "motion/react"
import { Download, LockKeyhole, LogOut, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import {
  getMemberDownload,
  getMemberSession,
  loginMember,
  logoutMember,
  type MemberSessionResponse,
} from "@/services/memberAccess"

type LoginFormState = {
  email: string
  password: string
}

const initialFormState: LoginFormState = {
  email: "",
  password: "",
}

export function DbxMemberAccessSection() {
  const [form, setForm] = useState(initialFormState)
  const [session, setSession] = useState<MemberSessionResponse>({ authenticated: false })
  const [isLoadingSession, setIsLoadingSession] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackTone, setFeedbackTone] = useState<"neutral" | "error">("neutral")

  useEffect(() => {
    let isMounted = true

    void getMemberSession()
      .then((response) => {
        if (!isMounted) {
          return
        }

        setSession(response)
      })
      .catch(() => {
        if (!isMounted) {
          return
        }

        setFeedback("Não foi possível verificar sua sessão agora. Você ainda pode tentar fazer login.")
        setFeedbackTone("error")
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingSession(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFeedback(null)
    setFeedbackTone("neutral")
    setIsSubmitting(true)

    try {
      const nextSession = await loginMember(form.email, form.password)
      setSession(nextSession)
      setForm(initialFormState)
      setFeedback("Login realizado com sucesso. O download exclusivo do executável foi liberado.")
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Não foi possível entrar agora.")
      setFeedbackTone("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleLogout() {
    setFeedback(null)
    setFeedbackTone("neutral")
    setIsSubmitting(true)

    try {
      await logoutMember()
      setSession({ authenticated: false })
      setFeedback("Sessão encerrada com sucesso.")
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Não foi possível sair agora.")
      setFeedbackTone("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDownload() {
    setFeedback(null)
    setFeedbackTone("neutral")
    setIsSubmitting(true)

    try {
      const download = await getMemberDownload()
      setSession(download)
      window.location.assign(download.downloadUrl)
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Não foi possível liberar o download agora.")
      setFeedbackTone("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mt-16 md:mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              Área de membros
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Login exclusivo para baixar o executável mais recente
            </h2>
            <p className="text-base leading-7 text-neutral-700 md:text-lg">
              A área de membros do DBX-V4 está preparada para autenticação com Supabase Auth, liberando
              o download da versão desktop mais recente apenas para usuários autorizados.
            </p>
            <div className="rounded-[26px] border border-primary/10 bg-primary p-5 text-surface shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                O que já fica preparado
              </p>
              <div className="mt-4 grid gap-3.5">
                {[
                  "Login com e-mail e senha usando Supabase Auth.",
                  "Download do executável mais recente apenas para membros autenticados.",
                  "Base pronta para evoluir para login com Google e contas criadas no ecossistema web do DBX.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-surface/10 bg-surface/5 px-4 py-3.5">
                    <p className="text-sm leading-6 text-surface/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            viewport={{ once: true }}
          >
            <Card className="border-neutral/20 bg-surface shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-primary">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <LockKeyhole className="h-5 w-5" />
                  </span>
                  Portal do membro DBX
                </CardTitle>
                <CardDescription className="text-[15px] leading-7 text-neutral-600">
                  Entre com sua conta para acessar a versão desktop mais recente do DBX-V4.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoadingSession ? (
                  <div className="rounded-2xl border border-neutral/20 bg-background px-5 py-4 text-sm text-neutral-600">
                    Verificando sessão do membro...
                  </div>
                ) : session.authenticated && session.member ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-accent/20 bg-accent/10 px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-primary">
                            Acesso liberado para {session.member.name || session.member.email}
                          </p>
                          <p className="text-sm text-neutral-700">
                            Versão disponível: {session.latestVersion || "DBX-V4 Desktop"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button
                        size="lg"
                        onClick={handleDownload}
                        disabled={!session.downloadEnabled || isSubmitting}
                      >
                        <Download className="h-5 w-5" />
                        {isSubmitting ? "Preparando download..." : "Baixar executável"}
                      </Button>
                      <Button size="lg" variant="outline" onClick={handleLogout} disabled={isSubmitting}>
                        <LogOut className="h-5 w-5" />
                        Sair
                      </Button>
                    </div>

                    {!session.downloadEnabled && (
                      <p className="rounded-xl border border-neutral/20 bg-background px-4 py-3 text-sm text-neutral-700">
                        O download ainda não foi publicado no ambiente. Assim que a URL da versão mais
                        recente estiver configurada, o botão ficará disponível.
                      </p>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="member-email" className="text-sm font-medium text-primary">E-mail</label>
                      <Input
                        id="member-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={form.email}
                        onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                        autoComplete="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="member-password" className="text-sm font-medium text-primary">Senha</label>
                      <Input
                        id="member-password"
                        type="password"
                        placeholder="Digite sua senha"
                        value={form.password}
                        onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                        autoComplete="current-password"
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      <LockKeyhole className="h-5 w-5" />
                      {isSubmitting ? "Entrando..." : "Entrar e liberar download"}
                    </Button>
                  </form>
                )}

                <p className="text-sm leading-6 text-neutral-600">
                  O portal já está estruturado para o acesso por membros e segue preparado para login social
                  com Google nas próximas etapas do produto.
                </p>

                {feedback && (
                  <p
                    className={`rounded-xl border px-4 py-3 text-sm ${
                      feedbackTone === "error"
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "border-secondary/30 bg-secondary/10 text-primary"
                    }`}
                  >
                    {feedback}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
