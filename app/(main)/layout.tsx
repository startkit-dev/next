import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import type { PropsWithChildren } from "react"

export default function MainLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
