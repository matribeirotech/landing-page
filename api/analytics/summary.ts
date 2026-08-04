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
    const client = getSupabaseClient()

    const [
      { count: pageviews, error: pageviewsError },
      { count: contacts, error: contactsError },
      { data: uniqueSessionsRows, error: uniqueSessionsError },
      { data: topPages, error: topPagesError },
      { data: topEvents, error: topEventsError },
    ] = await Promise.all([
      client.from("access_logs").select("*", { count: "exact", head: true }),
      client.from("contact_submissions").select("*", { count: "exact", head: true }),
      client.from("access_logs").select("session_id").not("session_id", "is", null),
      client.from("access_logs").select("path").limit(1000),
      client.from("events").select("event_name").limit(1000),
    ])

    if (pageviewsError || contactsError || uniqueSessionsError || topPagesError || topEventsError) {
      throw pageviewsError || contactsError || uniqueSessionsError || topPagesError || topEventsError
    }

    const uniqueSessions = new Set((uniqueSessionsRows || []).map((row) => row.session_id)).size

    const pageCounts = new Map<string, number>()
    for (const row of topPages || []) {
      pageCounts.set(row.path, (pageCounts.get(row.path) || 0) + 1)
    }

    const eventCounts = new Map<string, number>()
    for (const row of topEvents || []) {
      eventCounts.set(row.event_name, (eventCounts.get(row.event_name) || 0) + 1)
    }

    const summary = {
      totals: {
        pageviews: pageviews || 0,
        uniqueSessions,
        contacts: contacts || 0,
        conversionRate:
          uniqueSessions > 0 ? Number((((contacts || 0) / uniqueSessions) * 100).toFixed(2)) : 0,
      },
      topPages: [...pageCounts.entries()]
        .map(([path, views]) => ({ path, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5),
      topEvents: [...eventCounts.entries()]
        .map(([event_name, total]) => ({ event_name, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10),
    }

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
