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
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src="/lyps-v2-tm2-svg.png"
        alt="Lypsyos"
        className={cn("w-12 shrink-0 object-contain", compact ? "h-12" : "h-14")}
      />
      <div className={cn("min-w-0", compact && "sr-only")}>
        <p className={cn("text-xl font-bold tracking-tight", titleClassName)}>Lypsyos</p>
        <p className="text-xs uppercase tracking-[0.24em] text-current/70">
          Automacao para a industria
        </p>
      </div>
    </div>
  )
}
