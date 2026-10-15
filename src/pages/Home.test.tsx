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
        name: /aceleramos seu negócio com sistemas modernos e automação inteligente/i,
      }),
    ).toBeInTheDocument()

    // Check for Zenda spotlight section
    expect(
      screen.getByRole("heading", { name: /conheça o zenda/i }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole("link", { name: /conhecer o produto zenda/i }),
    ).toBeInTheDocument()

    // Check for solutions/engineering section
    expect(
      screen.getByRole("heading", { name: /engenharia de software focada em resultados reais/i }),
    ).toBeInTheDocument()

    // Ensure old industrial text is gone
    expect(
      screen.queryByRole("heading", { name: /software próprio para orçamento, engenharia e produção/i }),
    ).not.toBeInTheDocument()
  })
})
