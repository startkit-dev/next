import { NextResponse } from "next/server"
import type { Handler } from "typed-route-handler"

export const runtime = "edge"

type ResponseBody = {
  pong: string
}

export const GET: Handler<ResponseBody> = () => {
  return NextResponse.json({
    pong: new Date().toISOString()
  })
}
