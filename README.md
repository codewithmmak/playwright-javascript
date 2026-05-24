# Playwright and JavaScript Test Automation Framework

**Status:** ✅ Hardened & Production-Ready


## Features of this framework

- [Design Pattern: Page Object Model](https://playwright.dev/docs/test-pom) — Clean separation of test logic and UI interactions
- [Resilient Selectors](https://playwright.dev/docs/locators) — Prefer role-based and attribute-based locators over brittle XPath
- [Reporting: Allure](https://www.npmjs.com/package/allure-playwright) — Rich HTML/Allure reports with traces and screenshots
- [Cloud Integration: SauceLabs](https://saucelabs.com/) — Multi-browser cloud execution support
- [CI/CD-Optimized](#cicd-execution) — Headless by default, artifact capture only on failure
- [State-Based Waits](https://playwright.dev/docs/test-assertions) — No hard `waitForTimeout` calls; all delays are deterministic

---

## Getting started

### Pre-requisites

- Node.js 18+ and npm 8+
- Git (recommended)
- Visual Studio Code with [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) and [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

### Setup

```bash
# Clone and install
git clone <repo-url>
cd playwright-javascript
npm install

# Verify environment
npm run sauce:check

# Run tests
npm test                    # Headless, all reporters
npm run test:ci              # For CI pipelines
npm run e2e                 # E2E config variant
HEADED=true npm test        # Interactive (headed) mode

# Run by environment
npm run test:dev
npm run test:qa
npm run test:uat

npm run e2e:dev
npm run e2e:qa
npm run e2e:uat
```

---

## How to write Tests

- Add new spec under `e2e-tests/` folder as `<feature>.spec.js`
- Create or reuse a page object module in `e2e-tests/page-objects/<Feature>Page.js`
- **Use robust selectors:** `getByRole()`, `getByLabel()`, `getByPlaceholder()`, or stable CSS/attribute selectors
- **Avoid brittle selectors:** XPath with text content, CSS module class names, DOM structure dependencies
- **Use state-based waits:** `expect(locator).toBeVisible/Enabled/Disabled()`, `page.waitForFunction()`, never raw `waitForTimeout()`

### Example Test

```javascript
const { test, expect } = require("@playwright/test");
const { HomePage } = require("./page-objects/HomePage");

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.navigate();
  });

  test("should display home page title", async ({ page }) => {
    const home = new HomePage(page);
    await expect(page).toHaveTitle("Acme Store");
  });
});
```

---

## Running Tests

### Local Development

```bash
npm test                     # Run all tests headless
HEADED=true npm test         # Headed mode (watch UI)
npm run headedTest           # Alias for headed mode
npx playwright test --debug  # Debug mode with inspector
```

### CI/CD Pipelines

```bash
npm run test:ci              # Optimized for CI: headless=true, artifacts=on-failure
CI=true npm test             # Sets CI env var for config conditions
```

### Specific Test Files

```bash
npx playwright test e2e-tests/home.spec.js
npx playwright test e2e-tests/cart.spec.js
```

### Reporter Options

```bash
npm run test-list-reporter   # Minimal output
npm run test-line-reporter   # Single-line per test
npm run test-html-reporter   # Full HTML report
npm run e2e-commandline-reporter  # Multiple reporters + Allure
```

---

## Reports and Artifacts

### HTML Report

```bash
npx playwright show-report              # Open latest HTML report
# Or navigate to: ./playwright-report/index.html
```

### Allure Report

```bash
npm run allure-report        # Generate and open Allure report
npx allure generate ./allure-results && allure open  # Manual
```

### Screenshots & Traces

- Captured in `./test-results/` on test failure
- Traces can be viewed with: `npx playwright show-trace <trace-file>.zip`

---

## CI/CD Execution

### Environment Variables

- `CI=true` — Triggers CI-specific config (headless, single worker, retries=2)
- `HEADED=true` — Forces headed mode even in CI (for debugging)
- `DEBUG=pw:api` — Enable Playwright debug logging
- `ENV_FILE=.env.dev|.env.qa|.env.uat` — Selects environment file for base URL and env-specific values

### Environment Files

- `.env.dev` for development testing
- `.env.qa` for QA validation
- `.env.uat` for UAT validation
- `.env.example` as template for creating environment files

### Example GitHub Actions

```yaml
- name: Run tests
  run: npm run test:ci
  env:
    CI: true

- name: Upload test results
  if: failure()
  uses: actions/upload-artifact@v3
  with:
    name: test-results
    path: test-results/
```

---

## Cloud Execution: SauceLabs

### Setup

1. Obtain SauceLabs credentials from https://saucelabs.com/
2. Set environment variables:
   - **Windows PowerShell:** `$env:SAUCE_USERNAME="YOUR_USERNAME"` and `$env:SAUCE_ACCESS_KEY="YOUR_KEY"`
   - **macOS/Linux:** `export SAUCE_USERNAME="YOUR_USERNAME"` and `export SAUCE_ACCESS_KEY="YOUR_KEY"`

3. Validate config:
   ```bash
   npm run sauce:check
   ```

### Run on SauceLabs

```bash
saucectl run -c saucelabs.config.js
```

See [SauceLabs Playwright Docs](https://docs.saucelabs.com/web-apps/automated-testing/playwright/quickstart/) for advanced setup.

---

## Best Practices

1. **Selectors First:** Always prefer accessibility locators (`getByRole`) over implementation details
2. **No Magic Waits:** Remove `waitForTimeout()`; use `expect()` assertions which include waits
3. **POM Cleanliness:** Keep page objects focused on UI interactions, not test logic
4. **Parallel Testing:** Leverage `workers: auto` in config; ensure tests are isolated
5. **CI-First Config:** Default settings support CI; developers opt-in to headed mode

---

## Project Structure

```
playwright-javascript/
├── e2e-tests/
│   ├── home.spec.js           # Home page test suite
│   ├── search.spec.js         # Search/navigation test suite
│   ├── cart.spec.js           # Cart/add-to-cart test suite
│   └── page-objects/
│       ├── HomePage.js
│       ├── SearchPage.js
│       └── CartPage.js
├── playwright.config.js       # Main Playwright config
├── e2e.config.js              # E2E-specific config variant
├── saucelabs.config.js        # Cloud execution config
├── my-awesome-reporter.js     # Custom test reporter
├── package.json
├── README.md
└── test-results/              # Test artifacts (gitignored)
```

---

## Support & Contributions

For issues, feature requests, or improvements, please:

1. Check existing test logs in `./test-results/`
2. Run `npm run sauce:check` to validate external config
3. Review recent changes in git history
4. Submit an issue or PR with test logs and environment details

---

**Last Updated:** May 2026 | **Framework Version:** 1.0.0 (Hardened)
