/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ["expo", "prettier"],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: [
    "node_modules",
    "dist",
    "ios",
    "android",
    ".expo",
    "coverage",
    "*.config.js",
    "*.config.cjs",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],
    "react-hooks/exhaustive-deps": "warn",
    "no-restricted-syntax": [
      "error",
      {
        selector: "TSAnyKeyword",
        message: "`any` is banned. Use `unknown` or a concrete type.",
      },
    ],
  },
};
