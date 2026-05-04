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
  const iconSizeClassName = compact ? "h-10 w-10 md:h-11 md:w-11" : "h-12 w-12 md:h-14 md:w-14"
  const titleSizeClassName = compact ? "text-lg md:text-xl" : "text-lg md:text-xl"
  const subtitleSizeClassName = compact ? "text-[10px] md:text-[11px]" : "text-[11px] md:text-xs"

  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      <img
        src="/logo-oficial.png"
        alt="Lypsyos"
        className={cn("shrink-0 object-contain", iconSizeClassName, logoClassName)}
      />
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
