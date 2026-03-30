import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { ContactFormSection } from "./ContactFormSection"
import * as analyticsService from "@/services/analytics"

vi.mock("@/services/analytics", async () => {
  const actual = await vi.importActual<typeof import("@/services/analytics")>(
    "@/services/analytics",
  )

  return {
    ...actual,
    submitContactForm: vi.fn(),
    trackEvent: vi.fn(),
  }
})

describe("ContactFormSection", () => {
  it("shows validation messages when the form is submitted empty", async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <ContactFormSection />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole("button", { name: /solicitar contato/i }))

    expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument()
    expect(screen.getByText(/e-mail é obrigatório/i)).toBeInTheDocument()
    expect(screen.getByText(/empresa é obrigatória/i)).toBeInTheDocument()
    expect(screen.getByText(/mensagem é obrigatória/i)).toBeInTheDocument()
  })

  it("submits the form and shows the success feedback", async () => {
    const user = userEvent.setup()
    vi.mocked(analyticsService.submitContactForm).mockResolvedValue({ ok: true })
    vi.mocked(analyticsService.trackEvent).mockResolvedValue({ ok: true })

    render(
      <MemoryRouter>
        <ContactFormSection />
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText(/nome/i), "Matheus")
    await user.type(screen.getByLabelText(/e-mail/i), "matheus@lypsyos.com.br")
    await user.type(screen.getByLabelText(/empresa/i), "Lypsyos")
    await user.type(screen.getByLabelText(/mensagem/i), "Quero avaliar o DBX-V3 para um fluxo industrial.")
    await user.click(screen.getByRole("button", { name: /solicitar contato/i }))

    expect(await screen.findByText(/mensagem enviada com sucesso/i)).toBeInTheDocument()
    expect(analyticsService.submitContactForm).toHaveBeenCalledTimes(1)
    expect(analyticsService.trackEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        eventName: "contact_form_success",
        category: "conversion",
      }),
    )
  })
})
