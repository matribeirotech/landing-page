import * as nodemailer from "nodemailer"

export type ContactSubmissionPayload = {
  sessionId: string
  name: string
  email: string
  company: string
  message: string
  sourcePath: string
}

export type ContactMailer = {
  isConfigured(): boolean
  sendContactEmails(payload: ContactSubmissionPayload): Promise<"sent" | "disabled">
}

type ContactMailerOptions = {
  transport?: Pick<nodemailer.Transporter, "sendMail">
  smtpHost?: string
  smtpPort?: string | number
  smtpSecure?: string | boolean
  smtpUser?: string
  smtpPass?: string
  contactToEmail?: string
  contactFromEmail?: string
  contactReplyToEmail?: string
  autoReplyEnabled?: boolean
  frontendUrl?: string
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function parseSmtpSecure(rawValue: string | boolean | undefined) {
  if (typeof rawValue === "boolean") {
    return rawValue
  }

  return String(rawValue || "").trim().toLowerCase() === "true"
}

function createTransport({
  smtpHost,
  smtpPort,
  smtpSecure,
  smtpUser,
  smtpPass,
}: ContactMailerOptions) {
  if (!smtpHost || !smtpUser || !smtpPass) {
    return null
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort || 587),
    secure: parseSmtpSecure(smtpSecure),
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })
}

export function createContactMailer({
  transport,
  smtpHost = process.env.LYPSYOS_SMTP_HOST,
  smtpPort = process.env.LYPSYOS_SMTP_PORT,
  smtpSecure = process.env.LYPSYOS_SMTP_SECURE,
  smtpUser = process.env.LYPSYOS_SMTP_USER,
  smtpPass = process.env.LYPSYOS_SMTP_PASS,
  contactToEmail = process.env.LYPSYOS_CONTACT_TO_EMAIL,
  contactFromEmail = process.env.LYPSYOS_CONTACT_FROM_EMAIL,
  contactReplyToEmail = process.env.LYPSYOS_CONTACT_REPLY_TO_EMAIL,
  autoReplyEnabled = process.env.LYPSYOS_CONTACT_AUTO_REPLY !== "false",
  frontendUrl = process.env.LYPSYOS_FRONTEND_URL || "http://localhost:3002",
}: ContactMailerOptions = {}): ContactMailer {
  const configuredTransport = transport || createTransport({ smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass })
  const isReady = Boolean(configuredTransport && contactToEmail && contactFromEmail)

  return {
    isConfigured() {
      return isReady
    },

    async sendContactEmails(payload) {
      if (!configuredTransport || !contactToEmail || !contactFromEmail) {
        console.warn("[contact-mailer] SMTP não configurado. O lead foi salvo, mas nenhum e-mail foi enviado.")
        return "disabled"
      }

      const safeName = escapeHtml(payload.name)
      const safeEmail = escapeHtml(payload.email)
      const safeCompany = escapeHtml(payload.company)
      const safeMessage = escapeHtml(payload.message)
      const safeSourcePath = escapeHtml(payload.sourcePath)

      await configuredTransport.sendMail({
        from: contactFromEmail,
        to: contactToEmail,
        replyTo: payload.email,
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
        await configuredTransport.sendMail({
          from: contactFromEmail,
          to: payload.email,
          replyTo: contactReplyToEmail || contactToEmail,
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
    },
  }
}
