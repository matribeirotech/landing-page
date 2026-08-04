import { getAnalyticsStore } from "../_lib/storage.js"
import { hashIp } from "../_lib/supabase.js"

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const body = (await request.json().catch(() => ({}))) as {
      sessionId?: string
      path?: string
      title?: string
      referrer?: string
      language?: string
      screen?: { width?: number; height?: number }
    }
    const { sessionId, path, title, referrer, language, screen } = body

    if (!sessionId || !path) {
      return new Response(JSON.stringify({ error: "sessionId e path sao obrigatorios" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const userAgent = request.headers.get("user-agent")
    const forwarded = request.headers.get("x-forwarded-for")
    const clientIp = forwarded ? forwarded.split(",")[0]?.trim() : undefined
    const ipHash = hashIp(clientIp)

    const store = getAnalyticsStore()
    await store.insertPageview({
      sessionId,
      path,
      title: title || null,
      referrer: referrer || null,
      language: language || null,
      screenWidth: screen?.width || null,
      screenHeight: screen?.height || null,
      userAgent,
      ipHash,
    })

    console.info(`[pageview] ${path} session=${sessionId}`)
    return new Response(JSON.stringify({ ok: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Erro ao registrar pageview", error)
    return new Response(JSON.stringify({ error: "Falha ao registrar pageview" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
