# Code Quality Guardrails

This document describes the automated code quality checks and standards enforced by this framework.

## Overview

Quality guardrails are enforced at three levels:

1. **Pre-commit (Git Hooks)** — Blocks commits with code quality issues
2. **Lint (ESLint)** — Detects code smells, unused variables, and best practices
3. **Format (Prettier)** — Enforces consistent code style

## Scripts

```bash
# Code Quality Checks
npm run lint              # Run ESLint; report all issues
npm run lint:fix         # Auto-fix ESLint issues where possible
npm run format           # Auto-format all JS/JSON/MD with Prettier
npm run format:check     # Check formatting without modifying
npm run test:ci          # Run tests in CI mode (includes quality checks via hooks)
```

## Pre-Commit Hooks (Husky + Lint-Staged)

**What:** Automatically runs linting and formatting on staged files before commits.

**Install:** `npm install` (auto-installs via `prepare` script)

**How it works:**

```bash
git add e2e-tests/home.spec.js
git commit -m "Add new home test"
# → Automatically runs:
#   eslint --fix e2e-tests/home.spec.js
#   prettier --write e2e-tests/home.spec.js
# → If issues remain, commit is blocked
```

**Bypass (⚠️ not recommended):**

```bash
git commit --no-verify  # Skip hooks entirely
```

---

## ESLint Setup

**Configuration:** `eslint.config.js` (flat config format)

**Rules enforced:**

| Rule                    | Level | Purpose                                                              |
| ----------------------- | ----- | -------------------------------------------------------------------- |
| `no-console`            | warn  | Logs should use error/warn; log/info should be removed before commit |
| `no-unused-vars`        | error | Catch dead code and accidental assignments                           |
| `no-var`                | error | Use `const`/`let` instead of `var`                                   |
| `prefer-const`          | error | Mark immutable variables as `const`                                  |
| `prefer-arrow-callback` | warn  | Use arrow functions in callbacks                                     |
| `eqeqeq`                | error | Use `===` instead of `==`                                            |
| `no-empty-function`     | warn  | Flag functions with no implementation                                |
| `no-duplicate-imports`  | error | Combine multiple imports from same source                            |

**Playwright-specific:** Globals like `test`, `expect`, `describe`, `beforeEach`, etc. are pre-defined.

**Test files:** Override `no-unused-expressions` to allow `expect()` assertions.

---

## Prettier Setup

**Configuration:** `.prettierrc.json`

**Global format rules:**

- Semicolons: ✅ enabled
- Quotes: `"double"` for consistency
- Tab width: 2 spaces
- Trailing commas: ES5 compatible (`{a, b,}`)
- Line length: 100 characters max
- Arrow function parens: always (`(x) =>` not `x =>`)
- Line endings: LF (Unix)

**Run formatting:**

```bash
npm run format              # Format all files
npm run format:check       # Check without modifying
prettier --write file.js   # Format single file
```

---

## Lint-Staged Setup

**Configuration:** `.lintstagedrc.json`

**What files are checked:**

| Files    | Tools                           |
| -------- | ------------------------------- |
| `*.js`   | ESLint (with `--fix`), Prettier |
| `*.json` | Prettier                        |
| `*.md`   | Prettier                        |

**Example workflow (on commit):**

```bash
# You run:
git commit -m "my change"

# Lint-staged automatically runs:
eslint --fix <staged .js files>
prettier --write <staged .js, .json, .md files>

# If no issues remain → ✅ commit succeeds
# If issues remain → ❌ commit blocked; fix and re-commit
```

---

## Using ESLint Disable Comments

For legitimate exceptions, use inline ESLint disable comments:

```javascript
// Disable a single rule for one line
const unused = require("something"); // eslint-disable-line no-unused-vars

// Disable for a block
/* eslint-disable no-console */
console.log("Debug info");
/* eslint-enable no-console */

// Disable for entire file (top of file)
/* eslint-disable no-unused-vars */
```

**⚠️ Use sparingly.** Overusing disable comments defeats the purpose of guardrails.

---

## Test Naming & Tagging Conventions

Tests should follow these naming patterns for clarity and traceability:

### Test Suite Names

```javascript
test.describe("Feature: [Feature Name]", () => {
  test.describe("Positive Cases", () => {
    // Happy path tests
  });

  test.describe("Negative Cases", () => {
    // Edge case and error tests
  });
});
```

### Test Case Naming

```javascript
// Good: Clear action and expected outcome
test("should add product to cart when size and color are selected");
test("should show error message when cart is empty");

// Avoid: Vague or implementation-specific
test("test cart functionality");
test("check the button");
```

### Tags (Future)

When ready to expand, add test categorization:

```javascript
test("@smoke @critical should load home page", async ({ page }) => {
  // Test code
});

// Run tagged tests:
// npx playwright test --grep "@smoke"
```

---

## CI/CD Integration

In CI pipelines, guardrails are enforced as quality gates:

```bash
# All three checks must pass before merge
npm run format:check  # Fail if formatting is incorrect
npm run lint         # Fail if code quality issues exist
npm run test:ci      # Fail if tests don't pass
```

**GitHub Actions Example:**

```yaml
- name: Check Formatting
  run: npm run format:check

- name: Lint Code
  run: npm run lint

- name: Run Tests
  run: npm run test:ci
```

---

## Common Issues & Fixes

### Issue: `no-unused-vars` error on Playwright config `devices`

**Why:** `devices` is imported but not used in simple configs.

**Fix options:**

1. **Use underscore prefix:** `const _devices = require(...)`
2. **Add inline disable:** `const devices = require(...); // eslint-disable-line`
3. **Remove if truly unused:**

   ```javascript
   // Before
   const { devices } = require("@playwright/test");

   // After (if not needed)
   // No import needed
   ```

### Issue: `no-console` warns on test reporter logs

**Why:** Reporter logs via `console.log()`.

**Fix:** Change to allowed methods:

```javascript
// Change from:
console.log("Test started");

// To:
console.error("Test error"); // or console.warn()
```

Or, disable for reporter file:

```javascript
/* eslint-disable no-console */
// reporter code
```

### Issue: Pre-commit hook blocks commit with autofixable issues

**Solution:** The hook actually auto-fixes issues then re-runs checks. If it still blocks:

1. Check the error messages
2. Fix manually where auto-fix couldn't help
3. `git add` the fixed files again
4. `git commit` again

---

## Disabling Guardrails (⚠️ Not Recommended)

### Skip pre-commit hooks (one-time)

```bash
git commit --no-verify
```

### Disable hooks permanently

```bash
npx husky uninstall
```

**⚠️ This removes all quality gates and is not recommended.**

---

## Future Enhancements

- [ ] Test.only() detection (prevent accidental test skipping)
- [ ] Coverage thresholds (require min code coverage %)
- [ ] Commit message linting (enforce semantic commits)
- [ ] Security scanning (detect vulnerable dependencies)
- [ ] Performance budgets (monitor test execution time)

---

## Support

For questions or issues with guardrails:

1. Check this document
2. Run `npm run lint:fix` to auto-resolve issues
3. Review specific rule docs: `eslint.config.js` comments
4. Open an issue with details about the blocked commit
