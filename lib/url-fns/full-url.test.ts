import { describe, expect, test } from "bun:test"

import { env } from "@/env/client"

import { fullURL } from "./full-url"

describe("fullURL()", () => {
  test("returns a full URL by appending the path to the host", () => {
    const oldHost = env.NEXT_PUBLIC_HOST

    // @ts-expect-error - env vars are readonly
    env.NEXT_PUBLIC_HOST = "https://example.com"
    expect(fullURL("/path").toString()).toBe("https://example.com/path")

    // @ts-expect-error - env vars are readonly
    env.NEXT_PUBLIC_HOST = oldHost
  })
})
