import { Link } from "react-router-dom"
import { ArrowRight, Linkedin } from "lucide-react"
import { BrandMark } from "@/components/common/BrandMark"

export function Footer() {
  return (
    <footer className="w-full bg-primary text-surface py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2">
            <BrandMark compact className="text-surface" />
          </Link>
          <p className="text-sm text-neutral/80">
            Software próprio, automações sob medida e apoio consultivo para evoluir a operação industrial com mais clareza e velocidade.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-secondary">Links rápidos</h4>
          <Link to="/" className="text-sm text-neutral/80 hover:text-secondary transition-colors">Início</Link>
          <Link to="/sobre" className="text-sm text-neutral/80 hover:text-secondary transition-colors">Sobre a Lypsyos</Link>
          <Link to="/produtos/dbx-v3" className="text-sm text-neutral/80 hover:text-secondary transition-colors">DBX-V3</Link>
          <Link to="/contato" className="text-sm text-neutral/80 hover:text-secondary transition-colors">Contato</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-secondary">Atuação</h4>
          <p className="text-sm text-neutral/80">Automação para engenharia e preparação</p>
          <p className="text-sm text-neutral/80">Fluxos industriais sob medida</p>
          <p className="text-sm text-neutral/80">Implantação do DBX-V3 e evolução SaaS</p>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold text-secondary">Vamos conversar</h4>
          <p className="text-sm text-neutral/80">
            Se você quer reduzir retrabalho, acelerar a preparação técnica e organizar melhor o fluxo entre engenharia e produção, fale com a Lypsyos.
          </p>
          <a
            href="https://www.linkedin.com/in/lypsyos-tech-328b853a5/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-neutral/80 transition-colors hover:text-secondary"
          >
            <Linkedin className="h-4 w-4" />
            Acompanhar no LinkedIn
          </a>
          <Link
            to="/contato"
            className="inline-flex items-center justify-center rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-secondary/90"
          >
            Agendar apresentação <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-8 pt-8 border-t border-neutral/20 text-center text-sm text-neutral/60">
        &copy; {new Date().getFullYear()} Lypsyos. Todos os direitos reservados.
      </div>
    </footer>
  )
}
