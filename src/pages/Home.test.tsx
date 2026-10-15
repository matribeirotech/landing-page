import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Home } from "./Home"

describe("Home", () => {
  it("renders the appointment scheduling copy and removes outdated references", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole("heading", {
        name: /enquanto você atende uma cliente, o lypsyos agenda as próximas cinco/i,
      }),
    ).toBeInTheDocument()
    
    // Check for solutions section
    expect(
      screen.getByRole("heading", { name: /tudo o que seu espaço precisa para lotar a agenda/i }),
    ).toBeInTheDocument()

    // Check for comparison section
    expect(
      screen.getByRole("heading", { name: /por que a lypsyos é diferente de tudo o que você já viu/i }),
    ).toBeInTheDocument()

    // Check for pricing section
    expect(
      screen.getByRole("heading", { name: /investimento acessível com 30 dias grátis para testar/i }),
    ).toBeInTheDocument()
    
    // Ensure old industrial text is gone
    expect(
      screen.queryByRole("heading", { name: /software próprio para orçamento, engenharia e produção/i }),
    ).not.toBeInTheDocument()
  })
})
