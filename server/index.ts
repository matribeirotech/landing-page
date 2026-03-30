import "./env"
import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import express from "express"
import { createDatabase, db } from "./db"
import { createContactMailer, type ContactMailer } from "./contact-mailer"
import { createAnalyticsStore } from "./storage"
import { createSupabaseMemberAccess, type MemberAccessService } from "./supabase-member-access"

type ServerOptions = {
  analyticsToken?: string
  ipSalt?: string
  frontendUrl?: string
  distPath?: string
  dbxDownloadUrl?: string
  dbxLatestVersion?: string
  memberAccess?: MemberAccessService
  contactMailer?: ContactMailer
}

export function createApp(
  database = db,
  {
    analyticsToken = process.env.LYPSYOS_ANALYTICS_TOKEN,
    ipSalt = process.env.LYPSYOS_IP_SALT || "lypsyos-default-salt",
    frontendUrl = process.env.LYPSYOS_FRONTEND_URL || "http://localhost:3002",
    distPath = path.resolve(process.cwd(), "dist"),
    dbxDownloadUrl = process.env.LYPSYOS_DBX_DOWNLOAD_URL,
    dbxLatestVersion = process.env.LYPSYOS_DBX_LATEST_VERSION,
    memberAccess = createSupabaseMemberAccess({
      downloadUrl: dbxDownloadUrl,
      latestVersion: dbxLatestVersion,
    }),
    contactMailer = createContactMailer({
      frontendUrl,
    }),
  }: ServerOptions = {},
) {
  const app = express()
  const hasBuiltFrontend = fs.existsSync(distPath)
  const store = createAnalyticsStore(database)
  const contactRateLimitWindowMs = 15 * 60 * 1000
  const contactMaxAttempts = 6
  const contactAttempts = new Map<string, number[]>()

  app.use(express.json())

  if (hasBuiltFrontend) {
    app.use(express.static(distPath))
  }

  if (memberAccess.isEnabled()) {
    void memberAccess.ensureBootstrapMember()
  }

  function getClientIp(request: express.Request) {
    const forwarded = request.headers["x-forwarded-for"]

    if (typeof forwarded === "string" && forwarded.length > 0) {
      return forwarded.split(",")[0]?.trim() || request.ip
    }

    return request.ip
  }

  function hashIp(ipAddress: string | undefined) {
    if (!ipAddress) {
      return null
    }

    return crypto.createHash("sha256").update(`${ipAddress}:${ipSalt}`).digest("hex")
  }

  function getBearerToken(request: express.Request) {
    const authorizationHeader = request.header("authorization")

    if (!authorizationHeader) {
      return null
    }

    const [scheme, token] = authorizationHeader.split(" ")
    return scheme?.toLowerCase() === "bearer" && token ? token.trim() : null
  }

  function requireAnalyticsAccess(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    if (!analyticsToken) {
      return next()
    }

    if (request.header("x-analytics-token") !== analyticsToken) {
      return response.status(401).json({ error: "Nao autorizado" })
    }

    return next()
  }

  function isContactRateLimited(identifier: string) {
    const now = Date.now()
    const attempts = (contactAttempts.get(identifier) || []).filter(
      (timestamp) => now - timestamp <= contactRateLimitWindowMs,
    )

    if (attempts.length >= contactMaxAttempts) {
      contactAttempts.set(identifier, attempts)
      return true
    }

    attempts.push(now)
    contactAttempts.set(identifier, attempts)
    return false
  }

  app.get("/api/health", (_request, response) => {
    response.json({ status: "ok" })
  })

  app.get("/api/member/session", async (request, response) => {
    if (!memberAccess.isEnabled()) {
      return response.status(503).json({ error: "A autenticação de membros ainda não foi configurada." })
    }

    const member = await memberAccess.getMemberByAccessToken(getBearerToken(request))

    if (!member) {
      return response.status(401).json({ authenticated: false })
    }

    return response.json({
      authenticated: true,
      member,
      ...memberAccess.getDownloadInfo(),
    })
  })

  app.get("/api/member/download-url", async (request, response) => {
    if (!memberAccess.isEnabled()) {
      return response.status(503).json({ error: "A autenticação de membros ainda não foi configurada." })
    }

    const member = await memberAccess.getMemberByAccessToken(getBearerToken(request))

    if (!member) {
      return response.status(401).json({ error: "Acesso restrito a membros." })
    }

    const { downloadUrl, latestVersion, downloadEnabled } = memberAccess.getDownloadInfo()

    if (!downloadEnabled || !downloadUrl) {
      return response.status(503).json({ error: "Download indisponível no momento." })
    }

    return response.json({
      authenticated: true,
      member,
      latestVersion,
      downloadEnabled,
      downloadUrl,
    })
  })

  app.get("/api/member/download", async (request, response) => {
    if (!memberAccess.isEnabled()) {
      return response.status(503).json({ error: "A autenticação de membros ainda não foi configurada." })
    }

    const member = await memberAccess.getMemberByAccessToken(getBearerToken(request))

    if (!member) {
      return response.status(401).json({ error: "Acesso restrito a membros." })
    }

    const { downloadUrl, downloadEnabled } = memberAccess.getDownloadInfo()

    if (!downloadEnabled || !downloadUrl) {
      return response.status(503).json({ error: "Download indisponível no momento." })
    }

    return response.redirect(downloadUrl)
  })

  app.get("/", (_request, response) => {
    if (hasBuiltFrontend) {
      return response.sendFile(path.join(distPath, "index.html"))
    }

    return response.redirect(frontendUrl)
  })

  app.post("/api/track/pageview", async (request, response) => {
    try {
      const { sessionId, path, title, referrer, language, screen } = request.body ?? {}

      if (!sessionId || !path) {
        return response.status(400).json({ error: "sessionId e path sao obrigatorios" })
      }

      const userAgent = request.header("user-agent") || null
      const ipHash = hashIp(getClientIp(request))

      await store.insertPageview({
        sessionId,
        path,
        title: title || null,
        referrer: referrer || null,
        language: language || null,
        screenWidth: screen?.width || null,
        screenHeight: screen?.height || null,
        userAgent,
        ipHash,
      })

      console.info(`[pageview] ${path} session=${sessionId}`)
      return response.status(201).json({ ok: true })
    } catch (error) {
      console.error("Erro ao registrar pageview", error)
      return response.status(500).json({ error: "Falha ao registrar pageview" })
    }
  })

  app.post("/api/track/event", async (request, response) => {
    try {
      const { sessionId, eventName, path, category, label, value, metadata } = request.body ?? {}

      if (!sessionId || !eventName) {
        return response.status(400).json({ error: "sessionId e eventName sao obrigatorios" })
      }

      const userAgent = request.header("user-agent") || null
      const ipHash = hashIp(getClientIp(request))

      await store.insertEvent({
        sessionId,
        eventName,
        path: path || null,
        category: category || null,
        label: label || null,
        value: value || null,
        metadata: metadata || null,
        userAgent,
        ipHash,
      })

      console.info(`[event] ${eventName} path=${path || "-"} session=${sessionId}`)
      return response.status(201).json({ ok: true })
    } catch (error) {
      console.error("Erro ao registrar evento", error)
      return response.status(500).json({ error: "Falha ao registrar evento" })
    }
  })

  app.post("/api/contact", async (request, response) => {
    try {
      const {
        sessionId,
        name,
        email,
        company,
        message,
        sourcePath,
      } = request.body ?? {}

      if (!sessionId || !name || !email || !company || !message || !sourcePath) {
        return response.status(400).json({ error: "Campos obrigatorios ausentes" })
      }

      const sanitizedName = String(name).trim()
      const sanitizedEmail = String(email).trim().toLowerCase()
      const sanitizedCompany = String(company).trim()
      const sanitizedMessage = String(message).trim()
      const sanitizedSourcePath = String(sourcePath).trim()

      if (!sanitizedName || !sanitizedEmail || !sanitizedCompany || !sanitizedMessage || !sanitizedSourcePath) {
        return response.status(400).json({ error: "Campos obrigatorios ausentes" })
      }

      if (!/^\S+@\S+\.\S+$/i.test(sanitizedEmail)) {
        return response.status(400).json({ error: "Informe um e-mail válido." })
      }

      const userAgent = request.header("user-agent") || null
      const ipHash = hashIp(getClientIp(request))
      const contactIdentifier = [String(sessionId).trim(), sanitizedEmail].filter(Boolean).join(":") || ipHash || String(sessionId)

      if (isContactRateLimited(contactIdentifier)) {
        return response.status(429).json({ error: "Muitas tentativas. Aguarde alguns minutos." })
      }

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

      const emailDelivery = await contactMailer.sendContactEmails({
        sessionId: String(sessionId),
        name: sanitizedName,
        email: sanitizedEmail,
        company: sanitizedCompany,
        message: sanitizedMessage,
        sourcePath: sanitizedSourcePath,
      })

      console.info(`[contact] ${sanitizedEmail} source=${sanitizedSourcePath} delivery=${emailDelivery}`)
      return response.status(201).json({ ok: true, emailDelivery })
    } catch (error) {
      console.error("Erro ao registrar contato", error)
      return response.status(500).json({ error: "Falha ao registrar contato ou enviar e-mail." })
    }
  })

  app.get("/api/analytics/summary", requireAnalyticsAccess, async (_request, response) => {
    try {
      response.json(await store.getSummary())
    } catch (error) {
      console.error("Erro ao consultar summary", error)
      response.status(500).json({ error: "Falha ao consultar analytics" })
    }
  })

  app.get("/api/analytics/accesses", requireAnalyticsAccess, async (request, response) => {
    try {
      const parsedLimit = Number(request.query.limit || 100)
      const limit = Number.isFinite(parsedLimit) ? Math.min(parsedLimit, 500) : 100

      response.json(await store.getRecentAccesses(limit))
    } catch (error) {
      console.error("Erro ao consultar acessos", error)
      response.status(500).json({ error: "Falha ao consultar acessos" })
    }
  })

  app.get(/^\/(?!api).*/, (request, response) => {
    if (hasBuiltFrontend) {
      return response.sendFile(path.join(distPath, "index.html"))
    }

    return response.redirect(`${frontendUrl}${request.originalUrl}`)
  })

  return app
}

export const app = createApp()

if (!process.env.VITEST) {
  const port = Number(process.env.PORT || 3001)

  app.listen(port, () => {
    console.info(`Lypsyos analytics server running on http://localhost:${port}`)
  })
}

export { createDatabase }
