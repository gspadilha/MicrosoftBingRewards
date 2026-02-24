import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

import js from "@eslint/js";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. Side-effect imports (e.g. CSS)
            ["^\\u0000"],
            // 2. Node built-ins
            ["^node:"],
            // 3. External packages (react first, then others)
            ["^react", "^\\w"],
            // 4. Internal aliases / absolute paths
            ["^@/"],
            // 5. Relative imports (parents before siblings)
            ["^\\.\\./"],
            // 6. Relative imports (same folder)
            ["^\\./", "^\\./(?!.*\\.(css|scss|sass|less)$)"],
            // 7. Style imports
            ["\\.css$", "\\.scss$", "\\.sass$", "\\.less$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
]);
