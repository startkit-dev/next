"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { ThemeProvider, useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export function ThemeDropdown() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-8 px-0" variant="ghost">
          <SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem
          checked={theme === "light"}
          onCheckedChange={() => {
            setTheme("light")
          }}
        >
          Light
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "dark"}
          onCheckedChange={() => {
            setTheme("dark")
          }}
        >
          Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "system"}
          onCheckedChange={() => {
            setTheme("system")
          }}
        >
          System
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * A Theme dropdown with the provider wrapping it. The provider is included here
 * because the theme is not requierd to be used anywhere else in the app by
 * default.
 *
 * If you need this theme variable elsewhere, you can move the ThemeProvider up
 * higher in the app stack.
 */
export function ThemeToggle() {
  return (
    <ThemeProvider attribute="class">
      <ThemeDropdown />
    </ThemeProvider>
  )
}
