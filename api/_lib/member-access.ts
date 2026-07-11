import type { SupabaseClient } from "@supabase/supabase-js"
import { getSupabaseClient } from "./supabase"

export type MemberProfile = {
  id: string
  email: string
  displayName?: string | null
}

export type DownloadInfo = {
  downloadUrl: string | null
  latestVersion: string | null
  downloadEnabled: boolean
}

export type MemberAccessService = {
  isEnabled(): boolean
  getMemberByAccessToken(token: string | null): Promise<MemberProfile | null>
  getDownloadInfo(): DownloadInfo
}

export function createSupabaseMemberAccess(
  client: SupabaseClient,
  options: {
    downloadUrl?: string
    latestVersion?: string
  } = {},
): MemberAccessService {
  const isReady = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
  const downloadUrl = options.downloadUrl || process.env.LYPSYOS_DBX_DOWNLOAD_URL || null
  const latestVersion = options.latestVersion || process.env.LYPSYOS_DBX_LATEST_VERSION || null

  return {
    isEnabled() {
      return isReady
    },

    async getMemberByAccessToken(token) {
      if (!isReady || !token) {
        return null
      }

      try {
        const { data, error } = await client.auth.getUser(token)

        if (error || !data.user) {
          return null
        }

        return {
          id: data.user.id,
          email: data.user.email || "",
          displayName: data.user.user_metadata?.display_name || null,
        }
      } catch (error) {
        console.error("Falha ao validar token do membro", error)
        return null
      }
    },

    getDownloadInfo() {
      return {
        downloadUrl,
        latestVersion,
        downloadEnabled: Boolean(downloadUrl),
      }
    },
  }
}

export function getMemberAccessService(): MemberAccessService {
  return createSupabaseMemberAccess(getSupabaseClient())
}
