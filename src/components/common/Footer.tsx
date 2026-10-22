import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle } from "lucide-react"
import { BrandMark } from "@/components/common/BrandMark"
import { buttonVariants } from "@/components/ui/Button"
import { WHATSAPP_URL } from "@/content/site"

const linkClassName = "text-sm text-white/75 transition-colors hover:text-white"

export function Footer() {
  return (
    <footer className="w-full bg-night py-12 text-white md:py-14">
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-3 md:px-6">
        <div className="flex flex-col gap-4">
          <Link to="/" className="w-fit rounded-lg">
            <BrandMark inverse showSubtitle={false} />
          </Link>
          <p className="max-w-[36ch] text-sm leading-relaxed text-white/75">
            <strong>Zenda</strong> — O robô de agendamento no WhatsApp e agenda no celular para manicures, barbearias, salões de beleza e estética.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                size: "sm",
                className: "bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold gap-1.5",
              })}
            >
              <MessageCircle className="size-4 fill-white text-white" aria-hidden="true" />
              Chamar no WhatsApp
            </a>
            <Link to="/contato" className={buttonVariants({ variant: "inverse", size: "sm", className: "font-bold" })}>
              Testar 30 Dias Grátis <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <nav aria-labelledby="footer-nav" className="flex flex-col gap-3">
          <h2 id="footer-nav" className="font-heading text-base font-semibold text-white">
            Navegação Rápida
          </h2>
          <Link to="/#como-funciona" className={linkClassName}>
            Como Funciona
          </Link>
          <Link to="/planos" className={linkClassName}>
            Planos e Preços (30 Dias Grátis)
          </Link>
          <Link to="/contato" className={linkClassName}>
            Contato
          </Link>
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-base font-semibold text-white">Atendimento Rápido</h2>
          <p className="text-sm text-white/70">
            Ficou com alguma dúvida? Chame nossa equipe agora mesmo pelo WhatsApp e veja o Zenda funcionando.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className={`${linkClassName} inline-flex items-center gap-2 font-semibold text-growth`}
          >
            <MessageCircle className="size-4" aria-hidden="true" /> Conversar pelo WhatsApp
          </a>
        </div>
      </div>

      <div className="container mx-auto mt-10 border-t border-white/10 px-4 pt-6 text-center text-xs text-white/55 md:px-6">
        &copy; {new Date().getFullYear()} Zenda &bull; Um produto oficial da Lypsyos. Todos os direitos reservados.
      </div>
    </footer>
  )
}
