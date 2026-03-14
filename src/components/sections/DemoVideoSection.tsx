import { motion } from "motion/react"
import { PlayCircle, Video } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"
import { trackEvent } from "@/services/analytics"

const localVideoPath = encodeURI(
  "/videos/Evolução do DBX-V2 e Próximos Passos na Automação de DXFNesting.mp4",
)
const youtubeEmbedUrl = import.meta.env.VITE_DBX_VIDEO_YOUTUBE_EMBED_URL

export function DemoVideoSection() {
  const navigate = useNavigate()

  function handleVideoEvent(label: string) {
    void trackEvent({
      eventName: "demo_video_interaction",
      category: "engagement",
      label,
    }).catch((error) => {
      console.error("Nao foi possivel rastrear a interacao com o video", error)
    })
  }

  return (
    <section className="w-full bg-surface py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm font-medium text-accent">
              <Video className="h-4 w-4" />
              Demonstracao em video
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl">
                Evolucao do DBX-V2 e proximos passos da automacao
              </h2>
              <p className="text-neutral-600 md:text-lg leading-relaxed">
                Incluimos um bloco de video para apoiar demonstracoes tecnicas, apresentacoes comerciais
                e futuras publicacoes no YouTube sem precisar refazer a landing.
              </p>
            </div>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start gap-3">
                <PlayCircle className="mt-0.5 h-5 w-5 text-secondary" />
                <span>Suporte imediato ao video local enviado para o projeto.</span>
              </li>
              <li className="flex items-start gap-3">
                <PlayCircle className="mt-0.5 h-5 w-5 text-secondary" />
                <span>Preparado para alternar para embed do YouTube via variavel de ambiente.</span>
              </li>
              <li className="flex items-start gap-3">
                <PlayCircle className="mt-0.5 h-5 w-5 text-secondary" />
                <span>Ideal para demonstracao de funcionalidades, roadmap e provas tecnicas.</span>
              </li>
            </ul>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button
                className="bg-primary text-surface hover:bg-primary/90"
                onClick={() => {
                  handleVideoEvent("quero_conversa_tecnica")
                  navigate("/contato")
                }}
              >
                Quero uma conversa tecnica
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => {
                  handleVideoEvent("abrir_produto_dbx_v2")
                  navigate("/produtos/dbx-v2")
                }}
              >
                Ver detalhes do DBX-V2
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[28px] border border-neutral/20 bg-primary p-3 shadow-2xl"
          >
            <div className="overflow-hidden rounded-[20px] bg-black">
              {youtubeEmbedUrl ? (
                <iframe
                  title="Evolucao do DBX-V2 e proximos passos"
                  src={youtubeEmbedUrl}
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  controls
                  preload="metadata"
                  className="aspect-video w-full"
                  onPlay={() => handleVideoEvent("play_video_local")}
                >
                  <source src={localVideoPath} type="video/mp4" />
                  Seu navegador nao suporta a reproducao de video.
                </video>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
