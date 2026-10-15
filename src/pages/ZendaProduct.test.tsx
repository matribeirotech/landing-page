import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ZendaProduct } from "./ZendaProduct"

describe("ZendaProduct", () => {
  it("renders the dedicated Zenda scheduling system showcase and CTAs", () => {
    render(
      <MemoryRouter>
        <ZendaProduct />
      </MemoryRouter>,
    )

    // Check main Zenda headline
    expect(
      screen.getByRole("heading", {
        name: /enquanto você atende uma cliente, o zenda agenda as próximas cinco/i,
      }),
    ).toBeInTheDocument()

    // Check problem/solution section
    expect(
      screen.getByRole("heading", {
        name: /sua agenda não precisa de mais papel/i,
      }),
    ).toBeInTheDocument()

    // Check features/modules section
    expect(
      screen.getByRole("heading", {
        name: /tudo o que seu espaço precisa para lotar a agenda e lucrar mais/i,
      }),
    ).toBeInTheDocument()

    // Check free trial CTA
    expect(
      screen.getAllByRole("link", { name: /teste grátis/i }).length,
    ).toBeGreaterThan(0)
  })
})
