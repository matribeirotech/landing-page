import crypto from "node:crypto"
import type Database from "better-sqlite3"

type SeedMemberAccount = {
  email: string
  password: string
  name?: string
}

type MemberProfile = {
  id: number
  email: string
  name: string | null
}

type MemberAccessOptions = {
  memberAccountsRaw?: string
  sessionSecret?: string
  sessionTtlMs?: number
  downloadUrl?: string
  latestVersion?: string
}

const DEFAULT_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 14

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function createPasswordHash(password: string) {
  const salt = crypto.randomBytes(16).toString("hex")
  const hash = crypto.scryptSync(password, salt, 64).toString("hex")
  return `${salt}:${hash}`
}

function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":")

  if (!salt || !hash) {
    return false
  }

  const derived = crypto.scryptSync(password, salt, 64).toString("hex")
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(derived, "hex"))
}

function hashSessionToken(token: string, sessionSecret: string) {
  return crypto.createHash("sha256").update(`${token}:${sessionSecret}`).digest("hex")
}

function parseSeedAccounts(raw?: string) {
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw) as SeedMemberAccount[] | SeedMemberAccount
    const accounts = Array.isArray(parsed) ? parsed : [parsed]

    return accounts.filter((account) => account?.email && account?.password)
  } catch (error) {
    console.error("Não foi possível ler LYPSYOS_MEMBER_ACCOUNTS. Verifique o JSON configurado.", error)
    return []
  }
}

export function createMemberAccess(
  database: Database.Database,
  {
    memberAccountsRaw = process.env.LYPSYOS_MEMBER_ACCOUNTS,
    sessionSecret = process.env.LYPSYOS_MEMBER_SESSION_SECRET || "lypsyos-member-default-secret",
    sessionTtlMs = DEFAULT_SESSION_TTL_MS,
    downloadUrl = process.env.LYPSYOS_DBX_DOWNLOAD_URL,
    latestVersion = process.env.LYPSYOS_DBX_LATEST_VERSION || "DBX-V3",
  }: MemberAccessOptions = {},
) {
  const seedAccounts = parseSeedAccounts(memberAccountsRaw)

  for (const account of seedAccounts) {
    const normalizedEmail = normalizeEmail(account.email)
    const passwordHash = createPasswordHash(account.password)

    database.prepare(`
      INSERT INTO member_accounts (email, display_name, password_hash, is_active, updated_at)
      VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP)
      ON CONFLICT(email) DO UPDATE SET
        display_name = excluded.display_name,
        password_hash = excluded.password_hash,
        is_active = 1,
        updated_at = CURRENT_TIMESTAMP
    `).run(normalizedEmail, account.name?.trim() || null, passwordHash)
  }

  function deleteExpiredSessions() {
    database.prepare(`
      DELETE FROM member_sessions
      WHERE expires_at <= CURRENT_TIMESTAMP
    `).run()
  }

  function authenticate(email: string, password: string): MemberProfile | null {
    const normalizedEmail = normalizeEmail(email)
    const member = database.prepare(`
      SELECT id, email, display_name, password_hash, is_active
      FROM member_accounts
      WHERE email = ?
    `).get(normalizedEmail) as
      | { id: number; email: string; display_name: string | null; password_hash: string; is_active: number }
      | undefined

    if (!member || member.is_active !== 1) {
      return null
    }

    if (!verifyPassword(password, member.password_hash)) {
      return null
    }

    return {
      id: member.id,
      email: member.email,
      name: member.display_name,
    }
  }

  function createSession(memberId: number) {
    deleteExpiredSessions()

    const token = crypto.randomBytes(32).toString("hex")
    const tokenHash = hashSessionToken(token, sessionSecret)
    const expiresAt = new Date(Date.now() + sessionTtlMs).toISOString()

    database.prepare(`
      INSERT INTO member_sessions (member_id, session_token_hash, expires_at)
      VALUES (?, ?, ?)
    `).run(memberId, tokenHash, expiresAt)

    return token
  }

  function getMemberBySessionToken(token?: string | null): MemberProfile | null {
    if (!token) {
      return null
    }

    deleteExpiredSessions()

    const tokenHash = hashSessionToken(token, sessionSecret)
    const member = database.prepare(`
      SELECT
        member_accounts.id,
        member_accounts.email,
        member_accounts.display_name
      FROM member_sessions
      INNER JOIN member_accounts ON member_accounts.id = member_sessions.member_id
      WHERE member_sessions.session_token_hash = ?
        AND member_sessions.expires_at > CURRENT_TIMESTAMP
        AND member_accounts.is_active = 1
    `).get(tokenHash) as { id: number; email: string; display_name: string | null } | undefined

    if (!member) {
      return null
    }

    database.prepare(`
      UPDATE member_sessions
      SET last_seen_at = CURRENT_TIMESTAMP
      WHERE session_token_hash = ?
    `).run(tokenHash)

    return {
      id: member.id,
      email: member.email,
      name: member.display_name,
    }
  }

  function revokeSession(token?: string | null) {
    if (!token) {
      return
    }

    database.prepare(`
      DELETE FROM member_sessions
      WHERE session_token_hash = ?
    `).run(hashSessionToken(token, sessionSecret))
  }

  function getDownloadInfo() {
    return {
      downloadUrl,
      latestVersion,
      downloadEnabled: Boolean(downloadUrl),
    }
  }

  function getSessionTtlMs() {
    return sessionTtlMs
  }

  return {
    authenticate,
    createSession,
    getMemberBySessionToken,
    revokeSession,
    getDownloadInfo,
    getSessionTtlMs,
  }
}

export type { MemberProfile }
