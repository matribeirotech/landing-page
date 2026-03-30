import { motion } from "motion/react"
import { PlayCircle, Video } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"
import { trackEvent } from "@/services/analytics"

const localVideoPath = encodeURI(
  "/videos/Evolução do DBX-V2 e Próximos Passos na Automação de DXFNesting.mp4",
)

function normalizeYoutubeEmbedUrl(rawUrl?: string) {
  if (!rawUrl) {
    return ""
  }

  try {
    const parsed = new URL(rawUrl)
    const hostname = parsed.hostname.replace("www.", "")

    if (hostname === "youtu.be") {
      const videoId = parsed.pathname.replace("/", "")
      return videoId ? `https://www.youtube.com/embed/${videoId}` : rawUrl
    }

    if (hostname.endsWith("youtube.com")) {
      if (parsed.pathname.startsWith("/embed/")) {
        return rawUrl
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        const videoId = parsed.pathname.split("/")[2]
        return videoId ? `https://www.youtube.com/embed/${videoId}` : rawUrl
      }

      const videoId = parsed.searchParams.get("v")
      return videoId ? `https://www.youtube.com/embed/${videoId}` : rawUrl
    }

    return rawUrl
  } catch {
    return rawUrl
  }
}

const youtubeEmbedUrl = normalizeYoutubeEmbedUrl(import.meta.env.VITE_DBX_VIDEO_YOUTUBE_EMBED_URL)

export function DemoVideoSection() {
  const navigate = useNavigate()

  function handleVideoEvent(label: string) {
    void trackEvent({
      eventName: "demo_video_interaction",
      category: "engagement",
      label,
    }).catch((error) => {
      console.error("Não foi possível rastrear a interação com o vídeo", error)
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
              Demonstração em vídeo
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl">
                DBX-V3 em evolução e próximos passos da automação
              </h2>
              <p className="text-neutral-600 md:text-lg leading-relaxed">
                Este bloco apoia demonstrações técnicas e comerciais, além de servir como vitrine para o
                avanço do DBX-V3, da versão desktop atual até a futura experiência web.
              </p>
            </div>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start gap-3">
                <PlayCircle className="mt-0.5 h-6 w-6 text-secondary" />
                <span>Suporte imediato ao vídeo local já enviado para o projeto.</span>
              </li>
              <li className="flex items-start gap-3">
                <PlayCircle className="mt-0.5 h-6 w-6 text-secondary" />
                <span>Aceita link do YouTube e converte URL comum para formato de embed automaticamente.</span>
              </li>
              <li className="flex items-start gap-3">
                <PlayCircle className="mt-0.5 h-6 w-6 text-secondary" />
                <span>Ideal para apresentar funcionalidades, roadmap e ganhos esperados na operação.</span>
              </li>
            </ul>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button
                variant="secondary"
                onClick={() => {
                  handleVideoEvent("quero_conhecer_dbx_v3")
                  navigate("/contato")
                }}
              >
                Quero conhecer o DBX-V3
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => {
                  handleVideoEvent("abrir_produto_dbx_v3")
                  navigate("/produtos/dbx-v3")
                }}
              >
                Ver a página do DBX-V3
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
                  title="DBX-V3 em evolução e próximos passos"
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
                  Seu navegador não suporta a reprodução de vídeo.
                </video>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
