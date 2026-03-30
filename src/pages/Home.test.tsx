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
        name: /reduza retrabalho industrial e avance para fluxos mais claros, rápidos e escaláveis/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /a lypsyos vai além do dbx-v3/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /dbx-v3 em evolução e próximos passos da automação/i }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("heading", { name: /o que dizem nossos clientes/i }),
    ).not.toBeInTheDocument()
  })
})
