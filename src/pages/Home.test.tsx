import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Home } from "./Home"

describe("Home", () => {
  it("renders the Zenda-focused appointment scheduling copy without technical jargon", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole("heading", {
        name: /o seu salão não pode parar porque você está respondendo o whatsapp/i,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getAllByText(/enquanto você atende uma cliente, o zenda agenda as próximas cinco/i).length,
    ).toBeGreaterThan(0)

    expect(
      screen.getAllByText(/faturamento previsto hoje: r\$ 540,00/i).length,
    ).toBeGreaterThan(0)

    expect(
      screen.getAllByText(
        /instalação direta no iphone ou android com 1 clique, sem taxas nem burocracia de app store/i,
      ).length,
    ).toBeGreaterThan(0)

    // Ensure technical jargon is removed
    expect(screen.queryByText(/supabase rls/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/lypsyos neural core/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/websocket/i)).not.toBeInTheDocument()
  })
})
