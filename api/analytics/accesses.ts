import { getAnalyticsStore } from "../_lib/storage.js"

export default async function handler(request: Request) {
  if (request.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    })
  }

  const token = process.env.LYPSYOS_ANALYTICS_TOKEN
  const headerToken = request.headers.get("x-analytics-token")

  if (token && headerToken !== token) {
    return new Response(JSON.stringify({ error: "Nao autorizado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const url = new URL(request.url)
    const parsedLimit = Number(url.searchParams.get("limit") || 100)
    const limit = Number.isFinite(parsedLimit) ? Math.min(parsedLimit, 500) : 100

    const store = getAnalyticsStore()
    const accesses = await store.getRecentAccesses(limit)
    
    return new Response(JSON.stringify(accesses), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Erro ao consultar acessos", error)
    return new Response(JSON.stringify({ error: "Falha ao consultar acessos" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
