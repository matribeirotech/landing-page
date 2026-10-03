import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Home } from "./Home"

describe("Home", () => {
  it("renders the retail-focused hero copy and removes industrial references", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole("heading", {
        name: /gestão simples para a sua loja vender mais/i,
      }),
    ).toBeInTheDocument()
    
    // Check for solutions section
    expect(
      screen.getByRole("heading", { name: /três pilares para organizar sua loja/i }),
    ).toBeInTheDocument()
    
    // Ensure old industrial text is gone
    expect(
      screen.queryByRole("heading", { name: /software próprio para orçamento, engenharia e produção/i }),
    ).not.toBeInTheDocument()
  })
})
