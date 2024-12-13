// @ts-check

import path from "node:path"
import { fileURLToPath } from "node:url"
import { includeIgnoreFile } from "@eslint/compat"
import { FlatCompat } from "@eslint/eslintrc"
import eslint from "@eslint/js"
import configPrettier from "eslint-config-prettier"
import pluginTailwind from "eslint-plugin-tailwindcss"
import tseslint from "typescript-eslint"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, ".gitignore")
const compat = new FlatCompat({
  baseDirectory: __dirname
})

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...pluginTailwind.configs["flat/recommended"],
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  /**
   * Global config
   */
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false
        }
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "import/consistent-type-specifier-style": ["warn", "prefer-top-level"],
      "import/order": [
        "warn",
        {
          "newlines-between": "never",
          groups: [
            "builtin",
            "external",
            "internal",
            ["sibling", "parent"],
            "index",
            "object",
            "type"
          ],
          alphabetize: {
            order: "asc"
          }
        }
      ],
      "sort-imports": [
        "warn",
        {
          ignoreDeclarationSort: true
        }
      ]
    },
    settings: {
      tailwindcss: {
        callees: ["className", "clsx", "cva", "cn"]
      }
    }
  },
  /**
   * Test files
   */
  {
    files: ["**/*.test.{js,ts}"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off"
    }
  },
  /**
   * Javascript files.
   *
   * Ignore type-checking
   */
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked
  },

  /**
   * Disable rules that could conflict with prettier.
   * This should be the last rule.
   */
  configPrettier
)
