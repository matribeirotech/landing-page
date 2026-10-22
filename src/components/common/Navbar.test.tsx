import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Navbar } from "./Navbar"

describe("Navbar", () => {
  it("renders the Lypsyos brand, simplified navigation and conversion CTAs", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )

    expect(screen.getByAltText("Lypsyos")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /como funciona/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /planos/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /contato/i })).toBeInTheDocument()
    expect(screen.getAllByRole("link", { name: /teste grátis/i }).length).toBeGreaterThan(0)
  })
})
