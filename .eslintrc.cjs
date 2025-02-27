module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "**/*.{ts,tsx}"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "@typescript-eslint"],
  rules: {
    "react-refresh/only-export-components": ["off", { allowConstantExport: true }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
};
