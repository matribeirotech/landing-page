import { getAnalyticsStore } from "../_lib/storage"
import { hashIp } from "../_lib/supabase"

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const { sessionId, eventName, path, category, label, value, metadata } = body

    if (!sessionId || !eventName) {
      return new Response(JSON.stringify({ error: "sessionId e eventName sao obrigatorios" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const userAgent = request.headers.get("user-agent")
    const forwarded = request.headers.get("x-forwarded-for")
    const clientIp = forwarded ? forwarded.split(",")[0]?.trim() : undefined
    const ipHash = hashIp(clientIp)

    const store = getAnalyticsStore()
    await store.insertEvent({
      sessionId,
      eventName,
      path: path || null,
      category: category || null,
      label: label || null,
      value: value || null,
      metadata: metadata || null,
      userAgent,
      ipHash,
    })

    console.info(`[event] ${eventName} path=${path || "-"} session=${sessionId}`)
    return new Response(JSON.stringify({ ok: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Erro ao registrar evento", error)
    return new Response(JSON.stringify({ error: "Falha ao registrar evento" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
