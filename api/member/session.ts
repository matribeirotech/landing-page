import { getMemberAccessService } from "../../_lib/member-access"

function getBearerToken(request: Request) {
  const authorizationHeader = request.headers.get("authorization")

  if (!authorizationHeader) {
    return null
  }

  const [scheme, token] = authorizationHeader.split(" ")
  return scheme?.toLowerCase() === "bearer" && token ? token.trim() : null
}

export default async function handler(request: Request) {
  if (request.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    })
  }

  const memberAccess = getMemberAccessService()

  if (!memberAccess.isEnabled()) {
    return new Response(JSON.stringify({ error: "A autenticação de membros ainda não foi configurada." }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    })
  }

  const token = getBearerToken(request)
  const member = await memberAccess.getMemberByAccessToken(token)

  if (!member) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  return new Response(JSON.stringify({
    authenticated: true,
    member,
    ...memberAccess.getDownloadInfo(),
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
