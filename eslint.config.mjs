// @ts-check

import path from "node:path"
import { fileURLToPath } from "node:url"

import { fixupPluginRules, includeIgnoreFile } from "@eslint/compat"
import eslint from "@eslint/js"
import pluginNext from "@next/eslint-plugin-next"
import configPrettier from "eslint-config-prettier"
import pluginJsxA11y from "eslint-plugin-jsx-a11y"
import pluginReact from "eslint-plugin-react"
import pluginImportX from "eslint-plugin-import-x"
import pluginReactHooks from "eslint-plugin-react-hooks"
import pluginTailwind from "eslint-plugin-tailwindcss"
import globals from "globals"
import tseslint from "typescript-eslint"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, ".gitignore")

const nextFlatConfig = {
  plugins: {
    // @ts-expect-error - next plugin is not properly typed for eslint9
    "@next/next": fixupPluginRules(pluginNext)
  },
  rules: {
    ...pluginNext.configs.recommended.rules,
    ...pluginNext.configs["core-web-vitals"].rules
  }
}

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  pluginJsxA11y.flatConfigs.recommended,
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,
  ...pluginTailwind.configs["flat/recommended"],
  // @ts-expect-error - next.js plugin is not properly typed for eslint9
  nextFlatConfig,
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
      "import-x/no-unresolved": "off",
      "sort-imports": [
        "error",
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
   * React
   */
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...pluginReactHooks.configs.recommended,
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat["jsx-runtime"],
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser
      }
    }
  },
  /**
   * Config files
   */
  {
    files: ["**/*.config.{js,mjs,cjs}"],
    rules: {
      // "import-x/no-named-as-default-member": "off"
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
