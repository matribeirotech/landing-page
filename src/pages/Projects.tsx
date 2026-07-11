import { motion } from "motion/react"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card"
import { useDocumentMetadata } from "@/utils/useDocumentMetadata"
import { trackEvent } from "@/services/analytics"

// Simulação de dados. Futuramente pode vir do Supabase.
const projetos = [
  {
    id: "dbx-v4",
    title: "DBX-V4 Desktop",
    description: "Software desktop completo para engenharia. Inclui geração de DXF, PDF técnico, relatórios e automação de peças dobradas.",
    imageUrl: "/DBX/interface-principal-1.png",
    tags: ["Electron", "React", "Node.js", "C++"],
    githubUrl: null, // Software proprietário
    liveUrl: "/produtos/dbx-v4",
  },
  {
    id: "landing-page",
    title: "Lypsyos Website",
    description: "Landing page institucional focada em alta performance, SEO e design moderno com captura de leads.",
    imageUrl: "/DBX/desenho-peca-1.png", // Usando imagem de fallback
    tags: ["React", "Vite", "Tailwind", "Serverless"],
    githubUrl: "https://github.com/seugithub/landing-page",
    liveUrl: "/",
  },
]

export function Projects() {
  useDocumentMetadata(
    "Projetos e Soluções | Lypsyos",
    "Conheça os projetos e automações desenvolvidos pela Lypsyos para o setor industrial e de engenharia.",
  )

  function trackProjectClick(projectId: string, type: "github" | "live") {
    void trackEvent({
      eventName: "project_link_clicked",
      category: "portfolio",
      label: projectId,
      metadata: { linkType: type }
    })
  }

  return (
    <main className="flex min-h-screen flex-col py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Nosso Portfólio</p>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl text-primary">
              Projetos e <span className="text-secondary">Soluções</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-neutral-600 md:text-lg">
              Explore o histórico de soluções criadas pela Lypsyos. De ferramentas desktop para chão de fábrica a aplicações web focadas em produtividade.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {projetos.map((projeto, index) => (
            <motion.div
              key={projeto.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex"
            >
              <Card className="flex h-full w-full flex-col overflow-hidden border-neutral/20 bg-surface shadow-md transition-shadow hover:shadow-xl">
                <div className="relative h-60 w-full overflow-hidden bg-neutral/10">
                  {projeto.imageUrl ? (
                    <img
                      src={projeto.imageUrl}
                      alt={`Interface do projeto ${projeto.title}`}
                      className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/5 text-primary/40">
                      Sem imagem
                    </div>
                  )}
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    {projeto.tags.map(tag => (
                      <span key={tag} className="rounded-full bg-primary/90 px-2.5 py-1 text-xs font-medium text-surface backdrop-blur-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">{projeto.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-[15px] leading-relaxed text-neutral-700">{projeto.description}</p>
                </CardContent>
                <CardFooter className="flex gap-3 border-t border-neutral/10 pt-4">
                  {projeto.liveUrl && (
                    <Button 
                      variant="default" 
                      className="flex-1 gap-2"
                      onClick={() => {
                        trackProjectClick(projeto.id, "live")
                        if (projeto.liveUrl?.startsWith("/")) {
                          window.location.href = projeto.liveUrl
                        } else {
                          window.open(projeto.liveUrl, "_blank")
                        }
                      }}
                    >
                      Ver Detalhes <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  {projeto.githubUrl && (
                    <Button 
                      variant="outline" 
                      className="flex-1 gap-2"
                      onClick={() => {
                        trackProjectClick(projeto.id, "github")
                        window.open(projeto.githubUrl, "_blank")
                      }}
                    >
                      <Github className="h-4 w-4" /> Repositório
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
