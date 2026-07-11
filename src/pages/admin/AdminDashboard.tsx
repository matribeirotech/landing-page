import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"
import { getSupabaseClient } from "@/services/supabase"
import { Users, Eye, MousePointerClick, TrendingUp } from "lucide-react"

type SummaryData = {
  totals: {
    pageviews: number
    uniqueSessions: number
    contacts: number
    conversionRate: number
  }
  topPages: Array<{ path: string; views: number }>
  topEvents: Array<{ event_name: string; total: number }>
}

export function AdminDashboard() {
  const [data, setData] = useState<SummaryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useDocumentMetadata("Dashboard | Lypsyos Admin", "Visão geral de métricas e acessos.")

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const { data: sessionData } = await getSupabaseClient().auth.getSession()
        const token = sessionData.session?.access_token

        const res = await fetch("/api/analytics/summary", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        
        if (!res.ok) throw new Error("Falha ao carregar métricas")
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error(err)
        setError("Não foi possível carregar os dados. Verifique a conexão com o Supabase.")
      } finally {
        setLoading(false)
      }
    }

    void fetchMetrics()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-neutral-500">Carregando métricas...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Dashboard de Métricas</h1>
        <p className="text-neutral-600">Visão geral de tráfego e conversões.</p>
      </div>

      <div className="mb-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-neutral/20 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{data.totals.pageviews}</div>
          </CardContent>
        </Card>

        <Card className="border-neutral/20 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Sessões Únicas</CardTitle>
            <Users className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{data.totals.uniqueSessions}</div>
          </CardContent>
        </Card>

        <Card className="border-neutral/20 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Leads (Contatos)</CardTitle>
            <MousePointerClick className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{data.totals.contacts}</div>
          </CardContent>
        </Card>

        <Card className="border-neutral/20 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{data.totals.conversionRate}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="border-neutral/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-primary">Páginas Mais Acessadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topPages.map((page, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">{page.path}</span>
                  <span className="text-sm text-neutral-500">{page.views} views</span>
                </div>
              ))}
              {data.topPages.length === 0 && (
                <p className="text-sm text-neutral-500">Nenhum dado registrado.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-primary">Principais Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topEvents.map((event, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">{event.event_name}</span>
                  <span className="text-sm text-neutral-500">{event.total} disparos</span>
                </div>
              ))}
              {data.topEvents.length === 0 && (
                <p className="text-sm text-neutral-500">Nenhum dado registrado.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
