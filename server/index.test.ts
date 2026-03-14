import request from "supertest"
import { createApp, createDatabase } from "./index"

describe("analytics server", () => {
  it("tracks events and exposes protected analytics summary", async () => {
    const database = createDatabase(":memory:")
    const app = createApp(database, {
      analyticsToken: "secret-token",
      frontendUrl: "http://localhost:3002",
      distPath: "C:\\lypsyos\\missing-dist",
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
      formStartedAt: Date.now() - 5000,
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

  it("blocks obvious spam submissions through the honeypot field", async () => {
    const database = createDatabase(":memory:")
    const app = createApp(database, {
      frontendUrl: "http://localhost:3002",
      distPath: "C:\\lypsyos\\missing-dist",
    })

    const response = await request(app).post("/api/contact").send({
      sessionId: "session-1",
      name: "Bot",
      email: "bot@spam.com",
      company: "Spam",
      message: "spam",
      sourcePath: "/contato",
      website: "https://spam.test",
      formStartedAt: Date.now() - 5000,
    })

    expect(response.status).toBe(400)
    expect(response.body.error).toMatch(/spam/i)

    database.close()
  })
})
