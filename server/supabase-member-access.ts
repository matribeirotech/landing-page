import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js"

export type MemberProfile = {
  id: string
  email: string
  name: string | null
}

export type MemberAccessService = {
  isEnabled(): boolean
  ensureBootstrapMember(): Promise<void>
  getMemberByAccessToken(accessToken?: string | null): Promise<MemberProfile | null>
  getDownloadInfo(): {
    latestVersion?: string
    downloadEnabled: boolean
    downloadUrl?: string
  }
}

type SupabaseMemberAccessOptions = {
  client?: SupabaseClient
  supabaseUrl?: string
  supabaseServiceRoleKey?: string
  downloadUrl?: string
  latestVersion?: string
  bootstrapMemberEmail?: string
  bootstrapMemberPassword?: string
  bootstrapMemberName?: string
}

function createSupabaseAdminClient({
  client,
  supabaseUrl,
  supabaseServiceRoleKey,
}: Pick<SupabaseMemberAccessOptions, "client" | "supabaseUrl" | "supabaseServiceRoleKey">) {
  if (client) {
    return client
  }

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

function toMemberProfile(user: User | null): MemberProfile | null {
  if (!user?.email) {
    return null
  }

  const metadata = user.user_metadata || {}
  const possibleName =
    typeof metadata.name === "string"
      ? metadata.name
      : typeof metadata.full_name === "string"
        ? metadata.full_name
        : null

  return {
    id: user.id,
    email: user.email,
    name: possibleName?.trim() || null,
  }
}

async function findUserByEmail(client: SupabaseClient, email: string) {
  const normalizedEmail = email.trim().toLowerCase()
  let page = 1

  while (page > 0) {
    const { data, error } = await client.auth.admin.listUsers({
      page,
      perPage: 200,
    })

    if (error) {
      throw error
    }

    const users = data.users as User[]
    const existingUser = users.find((user) => user.email?.trim().toLowerCase() === normalizedEmail)

    if (existingUser) {
      return existingUser
    }

    page = "nextPage" in data ? data.nextPage || 0 : 0
  }

  return null
}

export function createSupabaseMemberAccess({
  client,
  supabaseUrl = process.env.SUPABASE_URL,
  supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY,
  downloadUrl = process.env.LYPSYOS_DBX_DOWNLOAD_URL,
  latestVersion = process.env.LYPSYOS_DBX_LATEST_VERSION || "DBX-V3 Desktop",
  bootstrapMemberEmail = process.env.LYPSYOS_DBX_BOOTSTRAP_MEMBER_EMAIL,
  bootstrapMemberPassword = process.env.LYPSYOS_DBX_BOOTSTRAP_MEMBER_PASSWORD,
  bootstrapMemberName = process.env.LYPSYOS_DBX_BOOTSTRAP_MEMBER_NAME || "Membro DBX",
}: SupabaseMemberAccessOptions = {}): MemberAccessService {
  const supabase = createSupabaseAdminClient({
    client,
    supabaseUrl,
    supabaseServiceRoleKey,
  })

  return {
    isEnabled() {
      return Boolean(supabase)
    },

    async ensureBootstrapMember() {
      if (!supabase || !bootstrapMemberEmail || !bootstrapMemberPassword) {
        return
      }

      try {
        const existingUser = await findUserByEmail(supabase, bootstrapMemberEmail)

        if (existingUser) {
          const { error } = await supabase.auth.admin.updateUserById(existingUser.id, {
            password: bootstrapMemberPassword,
            email_confirm: true,
            user_metadata: {
              ...(existingUser.user_metadata || {}),
              name: bootstrapMemberName,
            },
          })

          if (error) {
            throw error
          }

          console.info(`[member-auth] Conta de teste atualizada para ${bootstrapMemberEmail}.`)
          return
        }

        const { error } = await supabase.auth.admin.createUser({
          email: bootstrapMemberEmail,
          password: bootstrapMemberPassword,
          email_confirm: true,
          user_metadata: {
            name: bootstrapMemberName,
          },
        })

        if (error) {
          throw error
        }

        console.info(`[member-auth] Conta de teste criada para ${bootstrapMemberEmail}.`)
      } catch (error) {
        console.error("[member-auth] Não foi possível preparar a conta de teste do Supabase.", error)
      }
    },

    async getMemberByAccessToken(accessToken) {
      if (!supabase || !accessToken) {
        return null
      }

      const { data, error } = await supabase.auth.getUser(accessToken)

      if (error) {
        console.warn("[member-auth] Token de acesso inválido ou expirado.", error.message)
        return null
      }

      return toMemberProfile(data.user)
    },

    getDownloadInfo() {
      return {
        latestVersion,
        downloadEnabled: Boolean(downloadUrl),
        downloadUrl,
      }
    },
  }
}
