type TrackPageViewPayload = {
  path: string
  title?: string
  referrer?: string
}

type TrackEventPayload = {
  eventName: string
  path?: string
  category?: string
  label?: string
  value?: number
  metadata?: Record<string, unknown>
}

type ContactPayload = {
  name: string
  email: string
  company: string
  message: string
  sourcePath: string
}

const SESSION_STORAGE_KEY = "lypsyos.session.id"

function getSessionId() {
  const existingId = window.localStorage.getItem(SESSION_STORAGE_KEY)

  if (existingId) {
    return existingId
  }

  const newId = crypto.randomUUID()
  window.localStorage.setItem(SESSION_STORAGE_KEY, newId)
  return newId
}

async function postJson(path: string, payload: Record<string, unknown>) {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const responsePayload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const errorMessage =
      typeof responsePayload?.error === "string" ? responsePayload.error : `Falha na requisicao ${path}`
    throw new Error(errorMessage)
  }

  return responsePayload
}

export async function trackPageView({ path, title, referrer }: TrackPageViewPayload) {
  return postJson("/api/track/pageview", {
    sessionId: getSessionId(),
    path,
    title,
    referrer,
    language: navigator.language,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
    },
  })
}

export async function trackEvent({
  eventName,
  path = window.location.pathname,
  category = "engagement",
  label,
  value,
  metadata,
}: TrackEventPayload) {
  return postJson("/api/track/event", {
    sessionId: getSessionId(),
    eventName,
    path,
    category,
    label,
    value,
    metadata,
  })
}

export async function submitContactForm(payload: ContactPayload) {
  return postJson("/api/contact", {
    sessionId: getSessionId(),
    ...payload,
  })
}
