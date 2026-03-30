import { getSupabaseClient, isSupabaseConfigured } from "@/services/supabase"

type MemberProfile = {
  email: string
  name: string | null
}

export type MemberSessionResponse = {
  authenticated: boolean
  member?: MemberProfile
  latestVersion?: string
  downloadEnabled?: boolean
  downloadUrl?: string
}

async function readJson(response: Response) {
  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const errorMessage =
      typeof payload?.error === "string" ? payload.error : "Não foi possível concluir a operação."
    throw new Error(errorMessage)
  }

  return payload
}

async function getAccessToken() {
  const client = getSupabaseClient()
  const { data, error } = await client.auth.getSession()

  if (error) {
    throw new Error("Não foi possível recuperar sua sessão de acesso.")
  }

  return data.session?.access_token || null
}

async function fetchMemberSession(accessToken: string) {
  const response = await fetch("/api/member/session", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status === 401) {
    return { authenticated: false } satisfies MemberSessionResponse
  }

  return readJson(response) as Promise<MemberSessionResponse>
}

export async function getMemberSession() {
  if (!isSupabaseConfigured()) {
    return { authenticated: false } satisfies MemberSessionResponse
  }

  const client = getSupabaseClient()
  const { data: userData, error: userError } = await client.auth.getUser()

  if (userError || !userData.user) {
    return { authenticated: false } satisfies MemberSessionResponse
  }

  const accessToken = await getAccessToken()

  if (!accessToken) {
    return { authenticated: false } satisfies MemberSessionResponse
  }

  return fetchMemberSession(accessToken)
}

export async function loginMember(email: string, password: string) {
  const client = getSupabaseClient()
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message || "Não foi possível entrar com sua conta.")
  }

  if (!data.session?.access_token) {
    throw new Error("Sua sessão não pôde ser iniciada agora.")
  }

  return fetchMemberSession(data.session.access_token)
}

export async function logoutMember() {
  const client = getSupabaseClient()
  const { error } = await client.auth.signOut()

  if (error) {
    throw new Error(error.message || "Não foi possível encerrar a sessão.")
  }

  return { ok: true } as const
}

export async function getMemberDownload() {
  const accessToken = await getAccessToken()

  if (!accessToken) {
    throw new Error("Faça login para liberar o download.")
  }

  const response = await fetch("/api/member/download-url", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return readJson(response) as Promise<{
    authenticated: true
    member: MemberProfile
    latestVersion?: string
    downloadEnabled?: boolean
    downloadUrl: string
  }>
}
