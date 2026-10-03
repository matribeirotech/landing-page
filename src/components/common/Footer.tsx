import { Link } from "react-router-dom"
import { ArrowRight, Linkedin, MessageCircle } from "lucide-react"
import { BrandMark } from "@/components/common/BrandMark"
import { buttonVariants } from "@/components/ui/Button"
import { products } from "@/content/products"
import { homeSections, LINKEDIN_URL, WHATSAPP_URL } from "@/content/site"

const linkClassName = "text-sm text-white/72 transition-colors hover:text-white"

export function Footer() {
  return (
    <footer className="w-full bg-night py-14 text-white md:py-16">
      <div className="container mx-auto grid gap-10 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-[1.4fr_1fr_0.8fr_1fr]">
        <div className="flex flex-col gap-5">
          <Link to="/" className="w-fit rounded-lg">
            <BrandMark inverse showSubtitle={false} />
          </Link>
          <p className="max-w-[34ch] text-sm leading-7 text-white/72">
            Sistemas de gestão e marketing para o comércio. Mais controle, mais clientes, mais vendas.
          </p>
          <Link to="/contato" className={buttonVariants({ variant: "inverse", className: "w-fit" })}>
            Agende uma demonstração <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <nav aria-labelledby="footer-solutions" className="flex flex-col gap-3">
          <h2 id="footer-solutions" className="font-heading text-base font-semibold text-white">Soluções</h2>
          {products.map((product) => (
            <Link key={product.slug} to={`/produtos/${product.slug}`} className={linkClassName}>
              {product.name}
            </Link>
          ))}
        </nav>

        <nav aria-labelledby="footer-company" className="flex flex-col gap-3">
          <h2 id="footer-company" className="font-heading text-base font-semibold text-white">Empresa</h2>
          <Link to="/sobre" className={linkClassName}>Sobre a Lypsyos</Link>
          <Link to={`/#${homeSections.audience}`} className={linkClassName}>Para quem é</Link>
          <Link to="/produtos" className={linkClassName}>Todas as soluções</Link>
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-base font-semibold text-white">Suporte e contato</h2>
          <Link to="/contato" className={linkClassName}>Fale conosco</Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className={`${linkClassName} inline-flex items-center gap-2`}>
            <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className={`${linkClassName} inline-flex items-center gap-2`}>
            <Linkedin className="size-4" aria-hidden="true" /> LinkedIn
          </a>
        </div>
      </div>

      <div className="container mx-auto mt-12 border-t border-white/10 px-4 pt-8 text-center text-sm text-white/55 md:px-6">
        &copy; {new Date().getFullYear()} Lypsyos. Todos os direitos reservados.
      </div>
    </footer>
  )
}
