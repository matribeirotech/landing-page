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
    expect(screen.getByRole("button", { name: /solicitar uma demonstração/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /produtos/i })).toBeInTheDocument()
  })
})
