import type { ReactNode } from "react"
import { cn } from "@/utils/cn"

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: "center" | "left"
  inverse?: boolean
  className?: string
  titleId?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  inverse = false,
  className,
  titleId,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" && "mx-auto items-center text-center", "max-w-3xl", className)}>
      <p
        className={cn(
          "inline-flex rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] md:text-[0.8125rem]",
          inverse ? "bg-white/10 text-white" : "bg-brand-soft text-brand",
        )}
      >
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className={cn(
          "text-[1.75rem] font-semibold leading-tight tracking-tight md:text-[2.5rem]",
          inverse ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("text-base leading-relaxed md:text-lg", inverse ? "text-white/75" : "text-ink-soft")}>{description}</p>
      ) : null}
    </div>
  )
}
