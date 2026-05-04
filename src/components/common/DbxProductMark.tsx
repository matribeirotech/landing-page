import { cn } from "@/utils/cn"

type DbxProductMarkProps = {
  className?: string
  version?: string
  subtitle?: string
}

export function DbxProductMark({
  className,
  version = "V4",
  subtitle = "Desktop operacional e evolução web",
}: DbxProductMarkProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="relative shrink-0">
        <img
          src="/DBX/dbx-v3-logo.png"
          alt="DBX"
          className="h-16 w-16 rounded-[18px] object-cover shadow-lg md:h-20 md:w-20"
        />
        <span className="absolute -bottom-1 -right-1 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary shadow">
          {version}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-xl font-extrabold tracking-tight md:text-2xl">DBX-{version}</p>
        <p className="text-xs uppercase tracking-[0.24em] text-current/70 md:text-sm">{subtitle}</p>
      </div>
    </div>
  )
}
