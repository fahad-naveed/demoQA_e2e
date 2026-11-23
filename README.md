# Playwright E2E Automation

JavaScript end-to-end automation using Playwright Test. The current example
tests the Sauce Demo inventory and cart flow.

## Setup

```bash
npm install
npx playwright install chromium
```

## Commands

- `npm test` runs the tests.
- `npm run test:headed` runs tests with a visible browser.
- `npm run test:ui` opens Playwright's interactive test runner.
- `npm run report:playwright` opens the latest Playwright HTML report.
- `npm run report:allure` generates an Allure report from `allure-results`.
- `npm run report:allure:open` opens the generated Allure report.

Allure results and reports, as well as Playwright reports and test artifacts,
are generated locally and ignored by Git.

## Project layout

- `pages/` — Page Object Model page classes.
- `tests/` — Playwright test files.
- `test-data/` — reusable test data.
- `playwright.config.js` — browser, Sauce Demo base URL, execution, and reporter settings.
