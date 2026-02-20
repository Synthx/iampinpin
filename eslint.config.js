import { defineConfig, globalIgnores } from "eslint/config";
import astro from "eslint-plugin-astro";
import js from "@eslint/js";
import tsEslint from "eslint-plugin-astro";

export default defineConfig([
  globalIgnores([".astro", "dist", ".netlify"]),
  js.configs.recommended,
  tsEslint.configs.recommended,
  astro.configs.recommended,
  astro.configs["jsx-a11y-strict"],
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astro.parser,
      parserOptions: {
        parser: tsEslint.parser,
        extraFileExtensions: [".astro"],
        sourceType: "module",
        ecmaVersion: "latest",
        project: "./tsconfig.json",
      },
    },
  },
]);
