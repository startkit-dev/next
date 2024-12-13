"use client"

import { useState } from "react"
import { GithubIcon } from "@/components/icons/social/github-icon"
import { Spinner } from "@/components/icons/spinner/spinner"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/cn"
import type { ButtonProps } from "@/components/ui/button"

const PROVIDERS = {
  github: {
    icon: GithubIcon,
    name: "Github",
    url: "/login/github"
  }
}

type OAuthButtonProps = {
  provider: keyof typeof PROVIDERS
} & ButtonProps

export function OAuthButton({
  provider,
  className,
  onClick,
  ...props
}: OAuthButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { url, icon: Icon } = PROVIDERS[provider]

  return (
    <Button
      className={cn("gap-2", className)}
      disabled={isSubmitting}
      size="lg"
      variant="secondary"
      asChild
      onClick={(e) => {
        onClick?.(e)
        setIsSubmitting(true)
      }}
      {...props}
    >
      <a href={url}>
        {isSubmitting ? (
          <Spinner className="size-4" />
        ) : (
          <Icon className="size-4" />
        )}

        <span>Login</span>
      </a>
    </Button>
  )
}
