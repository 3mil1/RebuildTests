module.exports = {
  extends: ["react-app", "prettier", "eslint:recommended"],
  plugins: ["prettier", "jest", "cypress", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    "cypress/globals": true,
    es6: true,
    "jest/globals": true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "prettier/prettier": "warn",
  },
};
