import { describe, expect, test } from "bun:test"
import { cn } from "./cn"

describe("cls()", () => {
  test("merges class names", () => {
    const result = cn("text-black", "bg-white")
    expect(result).toBe("text-black bg-white")
  })

  test("removes conflicting tailwind classes", () => {
    // eslint-disable-next-line tailwindcss/no-contradicting-classname -- testing contradictory classes
    const result = cn("p-4", "p-6")
    expect(result).toBe("p-6")
  })
})
