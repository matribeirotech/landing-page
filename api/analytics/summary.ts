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
    const store = getAnalyticsStore()
    const summary = await store.getSummary()
    
    return new Response(JSON.stringify(summary), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Erro ao consultar summary", error)
    return new Response(JSON.stringify({ error: "Falha ao consultar analytics" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
