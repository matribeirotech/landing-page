import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import crypto from "node:crypto"

export function getSupabaseClient(): SupabaseClient {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY devem estar configurados.")
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export function hashIp(ipAddress: string | undefined): string | null {
  if (!ipAddress) return null
  const salt = process.env.LYPSYOS_IP_SALT || "lypsyos-default-salt"
  return crypto.createHash("sha256").update(`${ipAddress}:${salt}`).digest("hex")
}
