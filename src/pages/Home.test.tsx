import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Home } from "./Home"

describe("Home", () => {
  it("renders the Lypsyos-first hero copy and removes testimonials", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole("heading", {
        name: /transformamos gargalos operacionais em fluxos mais claros, econômicos e escaláveis/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /software próprio para orçamento, engenharia e produção/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /por que indústrias do aço trabalham com a lypsyos/i }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("heading", { name: /o que dizem nossos clientes/i }),
    ).not.toBeInTheDocument()
  })
})
