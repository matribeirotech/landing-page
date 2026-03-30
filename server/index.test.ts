import request from "supertest"
import { createApp, createDatabase } from "./index"

describe("analytics server", () => {
  it("tracks events and exposes protected analytics summary", async () => {
    const database = createDatabase(":memory:")
    const contactMailer = {
      isConfigured: () => true,
      sendContactEmails: vi.fn().mockResolvedValue("sent" as const),
    }
    const app = createApp(database, {
      analyticsToken: "secret-token",
      frontendUrl: "http://localhost:3002",
      distPath: "C:\\lypsyos\\missing-dist",
      contactMailer,
    })

    await request(app).post("/api/track/pageview").send({
      sessionId: "session-1",
      path: "/",
      title: "Lypsyos",
      language: "pt-BR",
      screen: { width: 1440, height: 900 },
    }).expect(201)

    await request(app).post("/api/contact").send({
      sessionId: "session-1",
      name: "Matheus",
      email: "matheus@lypsyos.com.br",
      company: "Lypsyos",
      message: "Quero uma demonstracao",
      sourcePath: "/contato",
    }).expect(201)

    const unauthorized = await request(app).get("/api/analytics/summary")
    expect(unauthorized.status).toBe(401)

    const summary = await request(app)
      .get("/api/analytics/summary")
      .set("x-analytics-token", "secret-token")

    expect(summary.status).toBe(200)
    expect(summary.body.totals.pageviews).toBe(1)
    expect(summary.body.totals.contacts).toBe(1)
    expect(summary.body.totals.conversionRate).toBe(100)
    expect(contactMailer.sendContactEmails).toHaveBeenCalledTimes(1)

    database.close()
  })

  it("redirects non-api routes to the configured frontend when no build is present", async () => {
    const database = createDatabase(":memory:")
    const app = createApp(database, {
      frontendUrl: "http://localhost:3002",
      distPath: "C:\\lypsyos\\missing-dist",
    })

    const response = await request(app).get("/sobre")

    expect(response.status).toBe(302)
    expect(response.headers.location).toBe("http://localhost:3002/sobre")

    database.close()
  })

  it("rejects invalid contact emails with a clear validation message", async () => {
    const database = createDatabase(":memory:")
    const app = createApp(database, {
      frontendUrl: "http://localhost:3002",
      distPath: "C:\\lypsyos\\missing-dist",
    })

    const response = await request(app).post("/api/contact").send({
      sessionId: "session-1",
      name: "Matheus",
      email: "matheus-email-invalido",
      company: "Lypsyos",
      message: "Quero falar com a equipe",
      sourcePath: "/contato",
    })

    expect(response.status).toBe(400)
    expect(response.body.error).toMatch(/e-mail v[aá]lido/i)

    database.close()
  })

  it("validates member access with bearer token and exposes the protected DBX download", async () => {
    const database = createDatabase(":memory:")
    const memberAccess = {
      isEnabled: () => true,
      ensureBootstrapMember: vi.fn().mockResolvedValue(undefined),
      getMemberByAccessToken: vi.fn().mockImplementation(async (accessToken?: string | null) => {
        if (accessToken !== "valid-token") {
          return null
        }

        return {
          id: "member-1",
          email: "membro@empresa.com",
          name: "Cliente DBX",
        }
      }),
      getDownloadInfo: () => ({
        downloadEnabled: true,
        downloadUrl: "https://downloads.lypsyos.com/dbx-v3-latest.exe",
        latestVersion: "DBX-V3 Desktop",
      }),
    }
    const app = createApp(database, {
      frontendUrl: "http://localhost:3002",
      distPath: "C:\\lypsyos\\missing-dist",
      memberAccess,
    })

    const session = await request(app)
      .get("/api/member/session")
      .set("Authorization", "Bearer valid-token")
    expect(session.status).toBe(200)
    expect(session.body.authenticated).toBe(true)
    expect(session.body.member.email).toBe("membro@empresa.com")

    const downloadUrl = await request(app)
      .get("/api/member/download-url")
      .set("Authorization", "Bearer valid-token")
    expect(downloadUrl.status).toBe(200)
    expect(downloadUrl.body.downloadUrl).toBe("https://downloads.lypsyos.com/dbx-v3-latest.exe")

    const download = await request(app)
      .get("/api/member/download")
      .set("Authorization", "Bearer valid-token")
    expect(download.status).toBe(302)
    expect(download.headers.location).toBe("https://downloads.lypsyos.com/dbx-v3-latest.exe")

    database.close()
  })
})
