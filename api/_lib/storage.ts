import type { SupabaseClient } from "@supabase/supabase-js"
import { getSupabaseClient } from "./supabase.js"

export type PageviewPayload = {
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

export type EventPayload = {
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

export type ContactPayload = {
  sessionId: string
  name: string
  email: string
  company: string
  message: string
  sourcePath: string
  userAgent?: string | null
  ipHash?: string | null
}

export type SummaryResponse = {
  totals: {
    pageviews: number
    uniqueSessions: number
    contacts: number
    conversionRate: number
  }
  topPages: Array<{ path: string; views: number }>
  topEvents: Array<{ event_name: string; total: number }>
}

export type RecentAccessesResponse = {
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

      return {
        accesses: accesses || [],
        events: events || [],
        contacts: contacts || [],
      }
    },
  }
}

export function getAnalyticsStore(): AnalyticsStore {
  return createSupabaseStore(getSupabaseClient())
}
