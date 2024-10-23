import type { HTMLProps } from "react"

import { cn } from "@/lib/utils/cn"

type Props = HTMLProps<HTMLDivElement>

export function Header({ className, ...props }: Props) {
  return (
    <header className={cn("w-full", className)} {...props}>
      <div className="container flex items-center justify-between gap-4" />
    </header>
  )
}
