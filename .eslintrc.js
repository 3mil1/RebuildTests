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
    "import/no-anonymous-default-export": [
      "error",
      {
        allowArray: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: true, // The true value here is for backward compatibility
        allowLiteral: false,
        allowObject: false,
      },
    ],
  },
};
