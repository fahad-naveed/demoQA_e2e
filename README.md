# Playwright E2E Automation

JavaScript end-to-end automation using Playwright Test. The tests cover
login validation, inventory listing and sorting, and cart operations. Specs
are separated by page in `tests/`.

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
- `tests/login.spec.js` — login success and validation.
- `tests/inventory.spec.js` — catalog, sorting, and add-to-cart behavior.
- `tests/cart.spec.js` — cart contents, quantities, and removal.
- `test-data/` — reusable test data in JSON.
- `playwright.config.js` — browser, Sauce Demo base URL, execution, and reporter settings.
