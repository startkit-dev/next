// @ts-check

import { fixupPluginRules, includeIgnoreFile } from "@eslint/compat"
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import prettier from "eslint-config-prettier"
import pluginSort from "eslint-plugin-sort-keys-fix"
import tailwind from "eslint-plugin-tailwindcss"
import path from "node:path"
import { fileURLToPath } from "node:url"
import tseslint from "typescript-eslint"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, ".gitignore")

// Compatibility with ESLint 8 config (for next.js)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
})

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals"),
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...compat.extends("plugin:import/typescript"),
  ...tailwind.configs["flat/recommended"],
  prettier,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigDirName: import.meta.dirname
      }
    },
    plugins: {
      "sort-keys-fix": fixupPluginRules(pluginSort)
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" }
      ],
      "@typescript-eslint/no-misused-promises": [
        "warn",
        {
          checksVoidReturn: false
        }
      ],
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc"
          },
          groups: [
            ["builtin", "external"],
            "internal",
            ["sibling", "parent"],
            "index",
            "object",
            "type"
          ],
          "newlines-between": "always"
        }
      ],
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          ignoreCase: true,
          reservedFirst: true,
          shorthandLast: true
        }
      ],
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true
        }
      ],
      "sort-keys-fix/sort-keys-fix": "warn"
    },
    settings: {
      "import/resolver": {
        typescript: true
      },
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
   * Config files
   */
  {
    files: ["**/*.config.{js,mjs}"],
    rules: {
      "import/no-anonymous-default-export": "off"
    }
  },
  /**
   * Javascript files
   */
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked
  }
)
