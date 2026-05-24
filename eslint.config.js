const js = require("@eslint/js");
const prettier = require("eslint-config-prettier");
const noOnlyTests = require("eslint-plugin-no-only-tests");

module.exports = [
  {
    ignores: [
      "node_modules/",
      "test-results/",
      "playwright-report/",
      "allure-report/",
      "allure-results/",
      ".husky/",
      "dist/",
      "build/",
    ],
  },
  js.configs.recommended,
  prettier,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        test: "readonly",
        expect: "readonly",
        describe: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
      },
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "warn",
      eqeqeq: ["error", "always"],
      "no-empty-function": "warn",
      "no-duplicate-imports": "error",
    },
  },
  {
    files: [
      "**/*.config.js",
      "**/playwright.config.js",
      "**/e2e.config.js",
      "**/saucelabs.config.js",
    ],
    rules: {
      "no-unused-vars": "off",
      "no-console": "off",
    },
  },
  {
    files: ["**/*reporter*.js"],
    rules: {
      "no-console": "off",
    },
  },
  {
    files: ["**/*.spec.js", "**/*.test.js"],
    plugins: {
      "no-only-tests": noOnlyTests,
    },
    rules: {
      "no-unused-expressions": "off",
      "no-only-tests/no-only-tests": "error",
    },
  },
];
