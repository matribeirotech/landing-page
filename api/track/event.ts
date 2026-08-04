import { createClient } from "@supabase/supabase-js"
import crypto from "node:crypto"

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY devem estar configurados.")
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

function hashIp(ipAddress: string | undefined): string | null {
  if (!ipAddress) return null
  const salt = process.env.LYPSYOS_IP_SALT || "lypsyos-default-salt"
  return crypto.createHash("sha256").update(`${ipAddress}:${salt}`).digest("hex")
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      sessionId?: string
      eventName?: string
      path?: string
      category?: string
      label?: string
      value?: number
      metadata?: Record<string, unknown>
    }
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

    const client = getSupabaseClient()
    const response = await client.from("events").insert({
      session_id: sessionId,
      event_name: eventName,
      path: path || null,
      category: category || null,
      label: label || null,
      value: value || null,
      metadata_json: metadata || null,
      user_agent: userAgent,
      ip_hash: ipHash,
    })

    if (response.error) {
      throw response.error
    }

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
