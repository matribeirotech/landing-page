import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginMember } from "@/services/memberAccess"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"
import { BrandMark } from "@/components/common/BrandMark"
import { AlertCircle } from "lucide-react"

export function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useDocumentMetadata("Acesso Restrito | Lypsyos Admin", "Login para área administrativa.")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError("Preencha e-mail e senha.")
      return
    }

    setLoading(true)
    try {
      const success = await loginMember(email, password)
      if (success) {
        navigate("/admin")
      } else {
        setError("Credenciais inválidas ou acesso negado.")
      }
    } catch (err) {
      setError("Ocorreu um erro ao tentar fazer login.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md border-neutral/20 shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <BrandMark compact showSubtitle={false} />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Painel Admin</CardTitle>
          <CardDescription>Insira suas credenciais para acessar as métricas.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                <p>{error}</p>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700" htmlFor="email">
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@lypsyos.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700" htmlFor="password">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
