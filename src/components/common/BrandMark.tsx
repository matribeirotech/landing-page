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
  const textTone = inverse ? "text-white" : "text-ink"
  const subtitleTone = inverse ? "text-white/65" : "text-ink-soft"
  const iconSizeClassName = compact ? "size-9 md:size-10" : "size-11 md:size-12"

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center justify-center",
          inverse && "rounded-xl bg-white p-1.5 shadow-[0_6px_16px_rgb(0_0_0/0.25)]",
        )}
      >
        <img
          src="/logo-oficial.png"
          alt="Lypsyos"
          className={cn("object-contain", iconSizeClassName, logoClassName)}
        />
      </div>
      <div className="min-w-0">
        <p className={cn("font-heading text-lg font-bold tracking-tight md:text-xl", textTone, titleClassName)}>
          Lypsyos
        </p>
        {showSubtitle ? (
          <p className={cn("text-[0.6875rem] font-medium md:text-xs", subtitleTone)}>
            Gestão e marketing para o comércio
          </p>
        ) : null}
      </div>
    </div>
  )
}
