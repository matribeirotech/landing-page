import { getAnalyticsStore } from "./_lib/storage"
import { sendContactEmails } from "./_lib/contact-mailer"
import { hashIp } from "./_lib/supabase"

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const { sessionId, name, email, company, message, sourcePath } = body

    if (!sessionId || !name || !email || !company || !message || !sourcePath) {
      return new Response(JSON.stringify({ error: "Campos obrigatorios ausentes" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const sanitizedName = String(name).trim()
    const sanitizedEmail = String(email).trim().toLowerCase()
    const sanitizedCompany = String(company).trim()
    const sanitizedMessage = String(message).trim()
    const sanitizedSourcePath = String(sourcePath).trim()

    if (!sanitizedName || !sanitizedEmail || !sanitizedCompany || !sanitizedMessage || !sanitizedSourcePath) {
      return new Response(JSON.stringify({ error: "Campos obrigatorios ausentes" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!/^\S+@\S+\.\S+$/i.test(sanitizedEmail)) {
      return new Response(JSON.stringify({ error: "Informe um e-mail válido." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const userAgent = request.headers.get("user-agent")
    const forwarded = request.headers.get("x-forwarded-for")
    const clientIp = forwarded ? forwarded.split(",")[0]?.trim() : undefined
    const ipHash = hashIp(clientIp)

    const store = getAnalyticsStore()
    
    await store.insertContact({
      sessionId,
      name: sanitizedName,
      email: sanitizedEmail,
      company: sanitizedCompany,
      message: sanitizedMessage,
      sourcePath: sanitizedSourcePath,
      userAgent,
      ipHash,
    })

    await store.insertEvent({
      sessionId,
      eventName: "contact_form_submitted",
      path: sanitizedSourcePath,
      category: "conversion",
      label: sanitizedCompany,
      metadata: { emailDomain: sanitizedEmail.split("@")[1] || null },
      userAgent,
      ipHash,
    })

    const emailDelivery = await sendContactEmails({
      sessionId: String(sessionId),
      name: sanitizedName,
      email: sanitizedEmail,
      company: sanitizedCompany,
      message: sanitizedMessage,
      sourcePath: sanitizedSourcePath,
    })

    console.info(`[contact] ${sanitizedEmail} source=${sanitizedSourcePath} delivery=${emailDelivery}`)
    return new Response(JSON.stringify({ ok: true, emailDelivery }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Erro ao registrar contato", error)
    return new Response(JSON.stringify({ error: "Falha ao registrar contato ou enviar e-mail." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
