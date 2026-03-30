import Database from "better-sqlite3"
import fs from "node:fs"
import path from "node:path"

function ensureSchema(database: Database.Database) {
  try {
    database.pragma("journal_mode = WAL")
  } catch {
    // In-memory databases used in tests may not support WAL mode.
  }

  database.exec(`
    CREATE TABLE IF NOT EXISTS access_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      path TEXT NOT NULL,
      title TEXT,
      referrer TEXT,
      language TEXT,
      screen_width INTEGER,
      screen_height INTEGER,
      user_agent TEXT,
      ip_hash TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      event_name TEXT NOT NULL,
      path TEXT,
      category TEXT,
      label TEXT,
      value REAL,
      metadata_json TEXT,
      user_agent TEXT,
      ip_hash TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT NOT NULL,
      message TEXT NOT NULL,
      source_path TEXT NOT NULL,
      user_agent TEXT,
      ip_hash TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS member_accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      display_name TEXT,
      password_hash TEXT NOT NULL,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS member_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      member_id INTEGER NOT NULL,
      session_token_hash TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      last_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (member_id) REFERENCES member_accounts(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_access_logs_created_at ON access_logs(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_events_name ON events(event_name);
    CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contact_submissions(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_member_accounts_email ON member_accounts(email);
    CREATE INDEX IF NOT EXISTS idx_member_sessions_expires_at ON member_sessions(expires_at);
  `)
}

function resolveDatabasePath() {
  const configuredPath = process.env.LYPSYOS_DB_PATH

  if (configuredPath) {
    return configuredPath
  }

  const dataDirectory = path.resolve(process.cwd(), "data")
  fs.mkdirSync(dataDirectory, { recursive: true })
  return path.join(dataDirectory, "analytics.db")
}

export function createDatabase(databasePath = resolveDatabasePath()) {
  const database = new Database(databasePath)
  ensureSchema(database)
  return database
}

export const db = createDatabase()
