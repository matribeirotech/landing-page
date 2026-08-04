import { createClient } from "@supabase/supabase-js"

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

export async function GET(request: Request) {
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

    const client = getSupabaseClient()

    const [
      { data: accesses, error: accessesError },
      { data: events, error: eventsError },
      { data: contacts, error: contactsError },
    ] = await Promise.all([
      client
        .from("access_logs")
        .select("id, session_id, path, title, referrer, language, created_at")
        .order("created_at", { ascending: false })
        .limit(limit),
      client
        .from("events")
        .select("id, session_id, event_name, path, category, label, created_at")
        .order("created_at", { ascending: false })
        .limit(limit),
      client
        .from("contact_submissions")
        .select("id, session_id, name, email, company, source_path, created_at")
        .order("created_at", { ascending: false })
        .limit(limit),
    ])

    if (accessesError || eventsError || contactsError) {
      throw accessesError || eventsError || contactsError
    }

    return new Response(
      JSON.stringify({
        accesses: accesses || [],
        events: events || [],
        contacts: contacts || [],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Erro ao consultar acessos", error)
    return new Response(JSON.stringify({ error: "Falha ao consultar acessos" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
