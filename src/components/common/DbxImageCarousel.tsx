import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/utils/cn"
import { Button } from "@/components/ui/Button"
import { dbxVisualSlides, type DbxVisualSlide } from "@/content/dbxVisuals"

type DbxImageCarouselProps = {
  className?: string
  shellClassName?: string
  imageClassName?: string
  autoPlay?: boolean
  intervalMs?: number
  slides?: DbxVisualSlide[]
}

export function DbxImageCarousel({
  className,
  shellClassName,
  imageClassName,
  autoPlay = true,
  intervalMs = 5000,
  slides = dbxVisualSlides,
}: DbxImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) {
      return
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, intervalMs)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [autoPlay, intervalMs, slides.length])

  const activeSlide = slides[activeIndex]

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % slides.length)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className={cn("overflow-hidden rounded-[26px] border border-primary/10 bg-primary p-2.5 shadow-2xl", shellClassName)}>
        <div className="overflow-hidden rounded-[20px] bg-surface">
          <div className="flex items-center justify-between gap-4 border-b border-neutral/20 px-4 py-3.5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{activeSlide.eyebrow}</p>
              <p className="mt-1 text-base font-bold text-primary md:text-lg">{activeSlide.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full border-primary/10 bg-surface text-primary hover:bg-primary/5"
                onClick={goToPrevious}
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full border-primary/10 bg-surface text-primary hover:bg-primary/5"
                onClick={goToNext}
                aria-label="Próxima imagem"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="relative bg-[#f5f9ff]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.src}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="aspect-[16/9] w-full"
              >
                <img
                  src={activeSlide.src}
                  alt={activeSlide.alt}
                  className={cn("h-full w-full object-contain", imageClassName)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="border-t border-neutral/20 px-4 py-3.5">
            <p className="text-sm leading-6 text-neutral-700">{activeSlide.description}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-5">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "group overflow-hidden rounded-2xl border bg-surface text-left shadow-sm transition-all",
              activeIndex === index
                ? "border-accent/40 ring-2 ring-accent/20"
                : "border-primary/10 hover:border-primary/20 hover:shadow-md",
            )}
            aria-label={`Abrir slide ${index + 1}: ${slide.title}`}
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#f5f9ff]">
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="px-3 py-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{slide.eyebrow}</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-primary md:text-sm">{slide.title}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
