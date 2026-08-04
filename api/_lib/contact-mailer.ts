export type ContactSubmissionPayload = {
  sessionId: string
  name: string
  email: string
  company: string
  message: string
  sourcePath: string
}

const RESEND_API_URL = "https://api.resend.com/emails"

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

async function sendResendEmail(apiKey: string, payload: Record<string, unknown>) {
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "")
    throw new Error(`Resend respondeu ${response.status}: ${errorBody}`)
  }
}

export async function sendContactEmails(payload: ContactSubmissionPayload) {
  const resendApiKey = process.env.RESEND_API_KEY
  const contactToEmail = process.env.LYPSYOS_CONTACT_TO_EMAIL
  const contactFromEmail = process.env.LYPSYOS_CONTACT_FROM_EMAIL
  const contactReplyToEmail = process.env.LYPSYOS_CONTACT_REPLY_TO_EMAIL
  const autoReplyEnabled = process.env.LYPSYOS_CONTACT_AUTO_REPLY !== "false"
  const frontendUrl = process.env.LYPSYOS_FRONTEND_URL || "https://lypsyos.com"

  if (!resendApiKey || !contactToEmail || !contactFromEmail) {
    console.warn("[contact-mailer] Resend não configurado. O lead foi salvo, mas nenhum e-mail foi enviado.")
    return "disabled"
  }

  const safeName = escapeHtml(payload.name)
  const safeEmail = escapeHtml(payload.email)
  const safeCompany = escapeHtml(payload.company)
  const safeMessage = escapeHtml(payload.message)
  const safeSourcePath = escapeHtml(payload.sourcePath)

  await sendResendEmail(resendApiKey, {
    from: contactFromEmail,
    to: [contactToEmail],
    reply_to: payload.email,
    subject: `Novo contato da landing | ${payload.company} | ${payload.name}`,
    text: [
      "Novo contato recebido na landing da Lypsyos.",
      "",
      `Nome: ${payload.name}`,
      `E-mail: ${payload.email}`,
      `Empresa: ${payload.company}`,
      `Origem: ${payload.sourcePath}`,
      `Sessão: ${payload.sessionId}`,
      "",
      "Mensagem:",
      payload.message,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #163a5a; line-height: 1.6;">
        <h2 style="margin-bottom: 16px;">Novo contato recebido na landing da Lypsyos</h2>
        <p><strong>Nome:</strong> ${safeName}</p>
        <p><strong>E-mail:</strong> ${safeEmail}</p>
        <p><strong>Empresa:</strong> ${safeCompany}</p>
        <p><strong>Origem:</strong> ${safeSourcePath}</p>
        <p><strong>Sessão:</strong> ${escapeHtml(payload.sessionId)}</p>
        <p><strong>Mensagem:</strong></p>
        <div style="padding: 16px; border-radius: 12px; background: #f5f7fb; white-space: pre-wrap;">${safeMessage}</div>
      </div>
    `,
  })

  if (autoReplyEnabled) {
    await sendResendEmail(resendApiKey, {
      from: contactFromEmail,
      to: [payload.email],
      reply_to: contactReplyToEmail || contactToEmail,
      subject: "Recebemos sua mensagem | Lypsyos",
      text: [
        `Olá, ${payload.name}.`,
        "",
        "Recebemos sua mensagem e vamos retornar em breve para entender melhor o seu contexto.",
        "Enquanto isso, nossa equipe já pode analisar seu pedido com base nas informações enviadas.",
        "",
        `Empresa: ${payload.company}`,
        `Página de origem: ${payload.sourcePath}`,
        "",
        "Se quiser complementar algo antes do nosso retorno, basta responder este e-mail.",
        "",
        `Lypsyos`,
        frontendUrl,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; color: #163a5a; line-height: 1.7;">
          <h2 style="margin-bottom: 12px;">Recebemos sua mensagem</h2>
          <p>Olá, ${safeName}.</p>
          <p>Recebemos seu contato e vamos retornar em breve para entender melhor o seu contexto.</p>
          <p>
            <strong>Empresa:</strong> ${safeCompany}<br />
            <strong>Página de origem:</strong> ${safeSourcePath}
          </p>
          <p>Se quiser complementar algo antes do nosso retorno, basta responder este e-mail.</p>
          <p style="margin-top: 24px;">
            <strong>Lypsyos</strong><br />
            <a href="${escapeHtml(frontendUrl)}">${escapeHtml(frontendUrl)}</a>
          </p>
        </div>
      `,
    })
  }

  return "sent"
}
