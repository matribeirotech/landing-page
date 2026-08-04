import { motion } from "motion/react"
import { PlayCircle, Video } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"
import { trackEvent } from "@/services/analytics"
import { DbxProductMark } from "@/components/common/DbxProductMark"

const fallbackPreviewImage = "/DBX/interface-principal-1.png"

function normalizeVideoEmbedUrl(rawUrl?: string) {
  if (!rawUrl) {
    return ""
  }

  try {
    const parsed = new URL(rawUrl)
    const hostname = parsed.hostname.replace("www.", "")

    if (hostname === "drive.google.com") {
      if (parsed.pathname.includes("/file/d/")) {
        const fileId = parsed.pathname.split("/file/d/")[1]?.split("/")[0]
        return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : rawUrl
      }

      const fileId = parsed.searchParams.get("id")
      return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : rawUrl
    }

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

const videoEmbedUrl = normalizeVideoEmbedUrl(
  import.meta.env.VITE_DBX_DEMO_VIDEO_URL || import.meta.env.VITE_DBX_VIDEO_YOUTUBE_EMBED_URL,
)

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
    <section className="w-full bg-surface py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="min-w-0 space-y-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm font-medium text-accent">
              <Video className="h-4 w-4" />
              Demonstração em vídeo
            </div>
            <div className="space-y-4">
              <DbxProductMark version="V4" subtitle="Aproveitamento, fluxo técnico e peças dobradas" />
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                DBX-V4 em operação, aproveitamento e próximos passos da plataforma
              </h2>
              <p className="text-neutral-600 md:text-base leading-7">
                Este bloco apoia demonstrações técnicas e comerciais, além de servir como vitrine para o
                avanço do DBX-V4, da versão desktop atual até a futura experiência web.
              </p>
            </div>
            <ul className="space-y-2.5 text-neutral-700">
              <li className="flex items-start gap-3">
                <PlayCircle className="mt-0.5 h-5 w-5 text-secondary" />
                <span>Preparado para receber vídeo por link de Google Drive, YouTube ou outra fonte de embed.</span>
              </li>
              <li className="flex items-start gap-3">
                <PlayCircle className="mt-0.5 h-5 w-5 text-secondary" />
                <span>Ideal para mostrar aproveitamento, fluxo técnico, importação e exemplos de peças dobradas.</span>
              </li>
              <li className="flex items-start gap-3">
                <PlayCircle className="mt-0.5 h-5 w-5 text-secondary" />
                <span>Conecta a narrativa comercial com o uso real da aplicação dentro da engenharia.</span>
              </li>
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="secondary"
                onClick={() => {
                  handleVideoEvent("quero_conhecer_dbx_v4")
                  navigate("/contato")
                }}
              >
                Quero conhecer o DBX-V4
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => {
                  handleVideoEvent("abrir_produto_dbx_v4")
                  navigate("/produtos/dbx-v4")
                }}
              >
                Ver a página do DBX-V4
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[26px] border border-neutral/20 bg-primary p-3 shadow-2xl"
          >
            <div className="overflow-hidden rounded-[20px] bg-black">
              {videoEmbedUrl ? (
                <iframe
                  title="DBX-V4 em operação e próximos passos"
                  src={videoEmbedUrl}
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="relative aspect-video w-full overflow-hidden bg-[#03192f]">
                  <img
                    src={fallbackPreviewImage}
                    alt="Prévia da interface do DBX-V4"
                    className="h-full w-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,25,47,0.1),rgba(3,25,47,0.7))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-surface">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Prévia visual</p>
                    <p className="mt-2 max-w-[52ch] text-sm leading-6 text-surface/80">
                      Adicione o link do vídeo demonstrativo e esta área passa a exibir a gravação do
                      aproveitamento diretamente na landing.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
