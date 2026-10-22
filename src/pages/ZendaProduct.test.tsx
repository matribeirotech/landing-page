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
        name: /o seu salão não pode parar porque você está respondendo o whatsapp/i,
      }),
    ).toBeInTheDocument()

    // Check core slogan
    expect(
      screen.getAllByText(/enquanto você atende uma cliente, o zenda agenda as próximas cinco/i).length,
    ).toBeGreaterThan(0)

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

    // Check live simulation section
    expect(
      screen.getByText(/veja na prática: do whatsapp direto para a sua agenda/i),
    ).toBeInTheDocument()

    // Check real interface showcase section
    expect(
      screen.getByRole("heading", {
        name: /sem complicação\. essa é a tela real que você vai usar\./i,
      }),
    ).toBeInTheDocument()

    // Check testimonials & 2-minute setup section
    expect(
      screen.getByRole("heading", {
        name: /pronto para usar em 2 minutos no seu celular/i,
      }),
    ).toBeInTheDocument()

    // Check free trial CTA
    expect(
      screen.getAllByRole("link", { name: /30 dias grátis/i }).length,
    ).toBeGreaterThan(0)
  })
})
