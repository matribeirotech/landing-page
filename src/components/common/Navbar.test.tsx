import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Navbar } from "./Navbar"

describe("Navbar", () => {
  it("renders the Lypsyos brand and main conversion CTA", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )

    expect(screen.getByAltText("Lypsyos")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /agende uma demonstração/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /zenda/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /comparativo/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /planos/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /para quem é/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /sobre/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /contato/i })).toBeInTheDocument()
  })
})
