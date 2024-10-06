import { describe, expect, test } from "bun:test"
import { env } from "@/env/client"
import { appHost } from "./app-host"

describe("appHost()", () => {
  test("returns the app host", () => {
    // biome-ignore lint/style/noNonNullAssertion: allow for testing
    expect(appHost()).toBe(env.NEXT_PUBLIC_HOST!)
  })

  test("can exclude the protocol", () => {
    // biome-ignore lint/style/noNonNullAssertion: allow for testing
    const url = new URL(env.NEXT_PUBLIC_HOST!)
    expect(appHost(false)).toBe(url.host)
  })
})
