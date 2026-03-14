import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type Database from "better-sqlite3"

type PageviewPayload = {
  sessionId: string
  path: string
  title?: string | null
  referrer?: string | null
  language?: string | null
  screenWidth?: number | null
  screenHeight?: number | null
  userAgent?: string | null
  ipHash?: string | null
}

type EventPayload = {
  sessionId: string
  eventName: string
  path?: string | null
  category?: string | null
  label?: string | null
  value?: number | null
  metadata?: Record<string, unknown> | null
  userAgent?: string | null
  ipHash?: string | null
}

type ContactPayload = {
  sessionId: string
  name: string
  email: string
  company: string
  message: string
  sourcePath: string
  userAgent?: string | null
  ipHash?: string | null
}

type SummaryResponse = {
  totals: {
    pageviews: number
    uniqueSessions: number
    contacts: number
    conversionRate: number
  }
  topPages: Array<{ path: string; views: number }>
  topEvents: Array<{ event_name: string; total: number }>
}

type RecentAccessesResponse = {
  accesses: unknown[]
  events: unknown[]
  contacts: unknown[]
}

export type AnalyticsStore = {
  insertPageview(payload: PageviewPayload): Promise<void>
  insertEvent(payload: EventPayload): Promise<void>
  insertContact(payload: ContactPayload): Promise<void>
  getSummary(): Promise<SummaryResponse>
  getRecentAccesses(limit: number): Promise<RecentAccessesResponse>
}

export function createSqliteStore(database: Database.Database): AnalyticsStore {
  return {
    async insertPageview(payload) {
      database.prepare(`
        INSERT INTO access_logs (
          session_id,
          path,
          title,
          referrer,
          language,
          screen_width,
          screen_height,
          user_agent,
          ip_hash
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        payload.sessionId,
        payload.path,
        payload.title || null,
        payload.referrer || null,
        payload.language || null,
        payload.screenWidth || null,
        payload.screenHeight || null,
        payload.userAgent || null,
        payload.ipHash || null,
      )
    },

    async insertEvent(payload) {
      database.prepare(`
        INSERT INTO events (
          session_id,
          event_name,
          path,
          category,
          label,
          value,
          metadata_json,
          user_agent,
          ip_hash
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        payload.sessionId,
        payload.eventName,
        payload.path || null,
        payload.category || null,
        payload.label || null,
        payload.value || null,
        payload.metadata ? JSON.stringify(payload.metadata) : null,
        payload.userAgent || null,
        payload.ipHash || null,
      )
    },

    async insertContact(payload) {
      database.prepare(`
        INSERT INTO contact_submissions (
          session_id,
          name,
          email,
          company,
          message,
          source_path,
          user_agent,
          ip_hash
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        payload.sessionId,
        payload.name,
        payload.email,
        payload.company,
        payload.message,
        payload.sourcePath,
        payload.userAgent || null,
        payload.ipHash || null,
      )
    },

    async getSummary() {
      const pageviews = database.prepare(`SELECT COUNT(*) AS total FROM access_logs`).get() as { total: number }
      const contacts = database.prepare(`SELECT COUNT(*) AS total FROM contact_submissions`).get() as { total: number }
      const uniqueSessions = database.prepare(`
        SELECT COUNT(DISTINCT session_id) AS total
        FROM access_logs
      `).get() as { total: number }
      const topPages = database.prepare(`
        SELECT path, COUNT(*) AS views
        FROM access_logs
        GROUP BY path
        ORDER BY views DESC
        LIMIT 5
      `).all() as Array<{ path: string; views: number }>
      const topEvents = database.prepare(`
        SELECT event_name, COUNT(*) AS total
        FROM events
        GROUP BY event_name
        ORDER BY total DESC
        LIMIT 10
      `).all() as Array<{ event_name: string; total: number }>

      return {
        totals: {
          pageviews: pageviews.total,
          uniqueSessions: uniqueSessions.total,
          contacts: contacts.total,
          conversionRate:
            uniqueSessions.total > 0
              ? Number(((contacts.total / uniqueSessions.total) * 100).toFixed(2))
              : 0,
        },
        topPages,
        topEvents,
      }
    },

    async getRecentAccesses(limit) {
      const accesses = database.prepare(`
        SELECT id, session_id, path, title, referrer, language, created_at
        FROM access_logs
        ORDER BY created_at DESC
        LIMIT ?
      `).all(limit)
      const events = database.prepare(`
        SELECT id, session_id, event_name, path, category, label, created_at
        FROM events
        ORDER BY created_at DESC
        LIMIT ?
      `).all(limit)
      const contacts = database.prepare(`
        SELECT id, session_id, name, email, company, source_path, created_at
        FROM contact_submissions
        ORDER BY created_at DESC
        LIMIT ?
      `).all(limit)

      return { accesses, events, contacts }
    },
  }
}

function assertSupabase(response: { error: unknown }) {
  if (response.error) {
    throw response.error
  }
}

export function createSupabaseStore(client: SupabaseClient): AnalyticsStore {
  return {
    async insertPageview(payload) {
      const response = await client.from("access_logs").insert({
        session_id: payload.sessionId,
        path: payload.path,
        title: payload.title || null,
        referrer: payload.referrer || null,
        language: payload.language || null,
        screen_width: payload.screenWidth || null,
        screen_height: payload.screenHeight || null,
        user_agent: payload.userAgent || null,
        ip_hash: payload.ipHash || null,
      })

      assertSupabase(response)
    },

    async insertEvent(payload) {
      const response = await client.from("events").insert({
        session_id: payload.sessionId,
        event_name: payload.eventName,
        path: payload.path || null,
        category: payload.category || null,
        label: payload.label || null,
        value: payload.value || null,
        metadata_json: payload.metadata || null,
        user_agent: payload.userAgent || null,
        ip_hash: payload.ipHash || null,
      })

      assertSupabase(response)
    },

    async insertContact(payload) {
      const response = await client.from("contact_submissions").insert({
        session_id: payload.sessionId,
        name: payload.name,
        email: payload.email,
        company: payload.company,
        message: payload.message,
        source_path: payload.sourcePath,
        user_agent: payload.userAgent || null,
        ip_hash: payload.ipHash || null,
      })

      assertSupabase(response)
    },

    async getSummary() {
      const [{ count: pageviews, error: pageviewsError }, { count: contacts, error: contactsError }, { data: uniqueSessionsRows, error: uniqueSessionsError }, { data: topPages, error: topPagesError }, { data: topEvents, error: topEventsError }] =
        await Promise.all([
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

      return {
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
    },

    async getRecentAccesses(limit) {
      const [{ data: accesses, error: accessesError }, { data: events, error: eventsError }, { data: contacts, error: contactsError }] =
        await Promise.all([
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

      return {
        accesses: accesses || [],
        events: events || [],
        contacts: contacts || [],
      }
    },
  }
}

export function createAnalyticsStore(database: Database.Database) {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (supabaseUrl && supabaseServiceRoleKey) {
    const client = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })

    return createSupabaseStore(client)
  }

  return createSqliteStore(database)
}
