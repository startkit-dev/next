import { cn } from "@/lib/utils/cn"
import { RocketIcon } from "lucide-react"
import type { HTMLAttributes } from "react"

type LogoProps = HTMLAttributes<HTMLDivElement>

export function Logo({ className, ...props }: LogoProps) {
  return (
    <span
      className={cn(
        "flex aspect-square items-center justify-center rounded-full bg-foreground transition-all hover:-rotate-12 hover:scale-105",
        className
      )}
      {...props}
    >
      <RocketIcon className="size-3/5 text-background" />
    </span>
  )
}
