# Daily Report – 29-09-2025 (Day 1)

---

## Activities:
- Created project repository **nopcommerce-e2e-playwright** locally and on GitHub.
- Initialized Node.js project with `npm init -y`.
- Installed dev dependencies: `@playwright/test`, `typescript`, `ts-node`, `@types/node`, `eslint`, `prettier`, `eslint-config-prettier`, `eslint-plugin-playwright`, `allure-playwright`, `allure-commandline`.
- Installed Playwright browsers using `npx playwright install`.
- Added **useful npm scripts** in `package.json`:
    - `test`, `test:headed`, `test:debug`, `report:html`, `report:allure`.
- Configured **TypeScript** (`tsconfig.json`) for Node.js + Playwright with strict type checking.
- Configured **Playwright Test Runner** (`playwright.config.ts`) with:
    - Base URL: `https://demo.nopcommerce.com`
    - Retries, parallel execution, screenshots, trace and video recording
    - Projects: chromium, firefox, webkit
    - Allure + HTML reporter
- Set up **ESLint + Prettier** for code quality and formatting:
    - `.eslintrc.cjs` and `.prettierrc`
- Created **project folder structure**:
    - `/tests`, `/pages`, `/fixtures`, `/helpers`, `/configs`, `/reports`, `.github/workflows/`
- Added **.gitignore** to exclude `node_modules/`, `dist/`, `allure-report/`, `allure-results/`, `playwright-report/`, `.vscode/`, `.env`.
- Created `.env` file template for `BASE_URL`, `USER_EMAIL`, `USER_PASSWORD`.
- Implemented **BasePage**, **HomePage**, and **AuthPage** skeletons with Page Object Model pattern.
- Created **fixture files**: `users.json` and `search-results-term.json`.
- Wrote **starter authentication test** (`auth.spec.ts`) for:
    - Register, login, logout flow with smoke scenario
- Added **example of deterministic test stub** using `page.route` and fixture for search tests.
- Configured **VSCode settings** (`.vscode/settings.json`) for format-on-save, ESLint validation, and folder exclusions.
- Prepared **GitHub Actions workflow** (`.github/workflows/playwright.yml`) for CI on push/PR.

---

## Environment:
- **OS:** Linux Ubuntu 22.04 LTS
- **Node.js:** 22.17.0
- **NPM:** 11.4.2
- **IDE:** VSCode 1.99.0
- **Browsers:** Chromium, Firefox, Webkit (via Playwright)
- **Tools/Libraries:** Playwright Test 1.55.0, TypeScript 5.9.2, ESLint 9.36.0, Prettier 3.6.2, Allure Playwright

---

## Issues:
- Minor TypeScript type errors when using `getByRole` in BasePage (fixed with correct typing).  
- Initial `.tsconfig.json` paths triggered warnings, to be resolved once first test files exist.  
- No major blockers; project setup stable and ready for first real test development.

---

## Next Steps (Day 2):
1. **Add remaining POM classes**: `ProductPage`, `CartPage`, `CheckoutPage`, `ProfilePage` with actions and locators.
2. **Write catalog/search tests** using deterministic fixture data and stubbed routes.
3. **Expand authentication tests** to cover duplicate email, invalid login, logout validations (all 5 TC scenarios).
4. **Implement Cart & Checkout flow tests** using POM methods.
5. **Run Playwright tests locally** and verify Allure HTML report generation.
6. **Prepare Day 2 Daily Report** documenting progress.
