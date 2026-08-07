import { cn } from "@/utils/cn"

type BrandMarkProps = {
  className?: string
  compact?: boolean
  inverse?: boolean
  showSubtitle?: boolean
  titleClassName?: string
  logoClassName?: string
}

export function BrandMark({
  className,
  compact = false,
  inverse = false,
  showSubtitle = !compact,
  titleClassName,
  logoClassName,
}: BrandMarkProps) {
  const textTone = inverse ? "text-surface" : "text-primary"
  const subtitleTone = inverse ? "text-surface/65" : "text-primary/60"
  const iconSizeClassName = compact ? "h-9 w-9 md:h-10 md:w-10" : "h-11 w-11 md:h-12 md:w-12"
  const titleSizeClassName = compact ? "text-lg md:text-xl" : "text-lg md:text-xl"
  const subtitleSizeClassName = compact ? "text-[10px] md:text-[11px]" : "text-[11px] md:text-xs"

  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center justify-center",
          inverse && "rounded-xl bg-surface p-1.5 shadow-[0_6px_16px_rgba(0,0,0,0.35)] ring-1 ring-white/10",
        )}
      >
        <img
          src="/logo-oficial.png"
          alt="Lypsyos"
          className={cn("object-contain", iconSizeClassName, logoClassName)}
        />
      </div>
      <div className="min-w-0">
        <p className={cn("font-sans font-extrabold uppercase tracking-[0.14em]", textTone, titleSizeClassName, titleClassName)}>
          Lypsyos
        </p>
        {showSubtitle ? (
          <p className={cn("font-sans uppercase tracking-[0.26em]", subtitleTone, subtitleSizeClassName)}>
            Automation Intelligence Engineering
          </p>
        ) : null}
      </div>
    </div>
  )
}
