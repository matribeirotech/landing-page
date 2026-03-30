import { cn } from "@/utils/cn"

type BrandMarkProps = {
  className?: string
  compact?: boolean
  titleClassName?: string
}

export function BrandMark({
  className,
  compact = false,
  titleClassName,
}: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      <img
        src="/lyps-v2-tm2-svg.png"
        alt="Lypsyos"
        className={cn("shrink-0 object-contain", compact ? "h-11 w-11" : "h-14 w-14")}
      />
      <div className={cn("min-w-0", compact && "sr-only")}>
        <p className={cn("text-xl font-bold tracking-tight md:text-2xl", titleClassName)}>Lypsyos</p>
        <p className="text-[11px] uppercase tracking-[0.26em] text-current/70 md:text-xs">
          Automação para a indústria
        </p>
      </div>
    </div>
  )
}
