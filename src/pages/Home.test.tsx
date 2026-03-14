import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Home } from "./Home"

describe("Home", () => {
  it("renders the updated Lypsyos conversion copy and removes testimonials", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole("heading", {
        name: /transforme gargalos industriais em fluxos mais rapidos, padronizados e escalaveis/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /a lypsyos nao se limita ao dbx-v2/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /evolucao do dbx-v2 e proximos passos da automacao/i }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("heading", { name: /o que dizem nossos clientes/i }),
    ).not.toBeInTheDocument()
  })
})
