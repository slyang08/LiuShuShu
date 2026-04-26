// root eslint.config.mjs
import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
  plugins: {
    import: importPlugin,
  },
  rules: {
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal", ["parent", "sibling"], "index"],
        pathGroups: [
          {
            pattern: "@liushushu/**",
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        "newlines-between": "never",
        alphabetize: { order: "asc" },
      },
    ],
  },
});
