import * as React from "react"
import { cn } from "@/utils/cn"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-[15px] font-semibold tracking-[0.01em] ring-offset-background shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
          {
            "bg-secondary text-primary hover:-translate-y-0.5 hover:bg-secondary/90 hover:shadow-lg": variant === "default",
            "bg-primary text-surface hover:-translate-y-0.5 hover:bg-primary/92 hover:shadow-lg": variant === "secondary",
            "border border-primary/20 bg-surface text-primary hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5": variant === "outline",
            "text-primary hover:bg-primary/6 hover:text-primary": variant === "ghost",
            "text-primary underline-offset-4 hover:underline": variant === "link",
            "h-10 px-[1.125rem] py-2 text-[14px]": size === "default",
            "h-10 rounded-lg px-4 text-sm": size === "sm",
            "h-11 rounded-xl px-6 text-[15px]": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
