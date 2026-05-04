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
      screen.getByRole("heading", { name: /a lypsyos vai além do dbx-v4/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /dbx-v4 em operação, aproveitamento e próximos passos da plataforma/i }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("heading", { name: /o que dizem nossos clientes/i }),
    ).not.toBeInTheDocument()
  })
})
