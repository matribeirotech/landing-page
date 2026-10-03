import * as React from "react"
import { cn } from "@/utils/cn"

type ButtonVariant = "default" | "outline" | "ghost" | "link" | "secondary" | "inverse"
type ButtonSize = "default" | "sm" | "lg" | "icon"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

/**
 * Classes do botão, reutilizáveis em links (`<Link className={buttonVariants()}>`)
 * para manter a semântica correta de navegação.
 */
export function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(
    "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-btn font-semibold transition-[background-color,border-color,color,box-shadow,translate] duration-200 disabled:pointer-events-none disabled:opacity-50",
    {
      "bg-brand text-white shadow-[0_8px_20px_rgb(36_87_245/0.25)] hover:bg-brand-hover hover:-translate-y-0.5": variant === "default",
      "bg-night text-white hover:bg-ink hover:-translate-y-0.5": variant === "secondary",
      "border border-line bg-surface text-ink hover:border-brand/40 hover:bg-brand-soft hover:text-brand": variant === "outline",
      "bg-white text-brand shadow-[0_8px_20px_rgb(0_0_0/0.18)] hover:bg-brand-soft hover:-translate-y-0.5": variant === "inverse",
      "text-ink hover:bg-brand-soft hover:text-brand": variant === "ghost",
      "text-brand underline-offset-4 hover:underline": variant === "link",
      "min-h-11 px-5 text-[0.9375rem]": size === "default",
      "min-h-10 rounded-lg px-4 text-sm": size === "sm",
      "min-h-12 px-6 text-base": size === "lg",
      "size-11": size === "icon",
    },
    className,
  )
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
