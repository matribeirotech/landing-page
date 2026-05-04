import { Link } from "react-router-dom"
import { ArrowRight, Linkedin } from "lucide-react"
import { BrandMark } from "@/components/common/BrandMark"

export function Footer() {
  return (
    <footer className="w-full bg-[#041122] text-surface py-14 md:py-16">
      <div className="container mx-auto grid gap-10 px-4 md:px-6 md:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.75fr_1fr]">
        <div className="flex flex-col gap-5">
          <Link to="/" className="flex items-center gap-2">
            <BrandMark inverse showSubtitle={false} className="text-surface" />
          </Link>
          <p className="max-w-[32ch] text-sm leading-7 text-surface/72">
            Software próprio, automações sob medida e apoio consultivo para evoluir a operação industrial
            com mais clareza, velocidade e capacidade de escala.
          </p>
          <div className="h-px w-full max-w-[320px] bg-gradient-to-r from-secondary/50 via-secondary/10 to-transparent" />
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-secondary">Links rápidos</h4>
          <Link to="/" className="text-sm text-surface/72 hover:text-secondary transition-colors">Início</Link>
          <Link to="/sobre" className="text-sm text-surface/72 hover:text-secondary transition-colors">Sobre a Lypsyos</Link>
          <Link to="/produtos/dbx-v4" className="text-sm text-surface/72 hover:text-secondary transition-colors">DBX-V4</Link>
          <Link to="/contato" className="text-sm text-surface/72 hover:text-secondary transition-colors">Contato</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-secondary">Atuação</h4>
          <p className="text-sm text-surface/72">Automação para engenharia e preparação</p>
          <p className="text-sm text-surface/72">Fluxos industriais sob medida</p>
          <p className="text-sm text-surface/72">Implantação do DBX-V4 e evolução SaaS</p>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold text-secondary">Vamos conversar</h4>
          <p className="text-sm leading-7 text-surface/72">
            Se você quer reduzir retrabalho, acelerar a preparação técnica e organizar melhor o fluxo entre engenharia e produção, fale com a Lypsyos.
          </p>
          <a
            href="https://www.linkedin.com/in/lypsyos-tech-328b853a5/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-surface/72 transition-colors hover:text-secondary"
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
      <div className="container mx-auto mt-10 border-t border-surface/10 px-4 pt-8 text-center text-sm text-surface/48 md:px-6">
        &copy; {new Date().getFullYear()} Lypsyos. Todos os direitos reservados.
      </div>
    </footer>
  )
}
