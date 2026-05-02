// root eslint.config.mjs
import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["**/*.cjs", "**/*.mjs", "**/dist/**", "**/.next/**"] },
  eslint.configs.recommended,
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "next{,/**}",
              group: "external",
              position: "after",
            },
            {
              pattern: "@liushushu/**", // 👈 monorepo
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
    },
  }
);
