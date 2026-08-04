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

    const client = getSupabaseClient()
    const response = await client.from("access_logs").insert({
      session_id: sessionId,
      path,
      title: title || null,
      referrer: referrer || null,
      language: language || null,
      screen_width: screen?.width || null,
      screen_height: screen?.height || null,
      user_agent: userAgent,
      ip_hash: ipHash,
    })

    if (response.error) {
      throw response.error
    }

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
