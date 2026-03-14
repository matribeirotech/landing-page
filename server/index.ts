import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import express from "express"
import { createDatabase, db } from "./db"
import { createAnalyticsStore } from "./storage"

type ServerOptions = {
  analyticsToken?: string
  ipSalt?: string
  frontendUrl?: string
  distPath?: string
}

export function createApp(
  database = db,
  {
    analyticsToken = process.env.LYPSYOS_ANALYTICS_TOKEN,
    ipSalt = process.env.LYPSYOS_IP_SALT || "lypsyos-default-salt",
    frontendUrl = process.env.LYPSYOS_FRONTEND_URL || "http://localhost:3002",
    distPath = path.resolve(process.cwd(), "dist"),
  }: ServerOptions = {},
) {
  const app = express()
  const hasBuiltFrontend = fs.existsSync(distPath)
  const store = createAnalyticsStore(database)
  const contactRateLimitWindowMs = 10 * 60 * 1000
  const contactMaxAttempts = 3
  const contactAttempts = new Map<string, number[]>()

  app.use(express.json())

  if (hasBuiltFrontend) {
    app.use(express.static(distPath))
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
      const { sessionId, name, email, company, message, sourcePath, website, formStartedAt } = request.body ?? {}

      if (!sessionId || !name || !email || !company || !message || !sourcePath) {
        return response.status(400).json({ error: "Campos obrigatorios ausentes" })
      }

      if (website) {
        return response.status(400).json({ error: "Envio identificado como spam" })
      }

      const userAgent = request.header("user-agent") || null
      const ipHash = hashIp(getClientIp(request))
      const startedAt = Number(formStartedAt)
      const elapsedMs = Number.isFinite(startedAt) ? Date.now() - startedAt : 0

      if (!startedAt || elapsedMs < 3000) {
        return response.status(400).json({ error: "Tempo minimo de preenchimento nao atingido" })
      }

      if (isContactRateLimited(ipHash || sessionId)) {
        return response.status(429).json({ error: "Muitas tentativas. Aguarde alguns minutos." })
      }

      await store.insertContact({
        sessionId,
        name,
        email,
        company,
        message,
        sourcePath,
        userAgent,
        ipHash,
      })

      await store.insertEvent({
        sessionId,
        eventName: "contact_form_submitted",
        path: sourcePath,
        category: "conversion",
        label: company,
        metadata: { emailDomain: String(email).split("@")[1] || null },
        userAgent,
        ipHash,
      })

      console.info(`[contact] ${email} source=${sourcePath}`)
      return response.status(201).json({ ok: true })
    } catch (error) {
      console.error("Erro ao registrar contato", error)
      return response.status(500).json({ error: "Falha ao registrar contato" })
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
