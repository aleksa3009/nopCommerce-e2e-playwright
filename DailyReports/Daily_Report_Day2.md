# Daily Report – 30-09-2025 (Day 2)

---

## Activities:
- Continued development of **nopcommerce-e2e-playwright** project.
- Created **helper** `userFactory.ts` to generate unique users for registration tests.
- Implemented **AuthPage** POM class with full actions:
    - `gotoRegister()`, `register()`, `gotoLogin()`, `login()`, `logout()`, `isLoggedIn()`
- Wrote **auth.spec.ts** tests covering:
    - Register new user ➔ auto-login
    - Duplicate email registration ➔ validation error
    - Valid login ➔ redirects to home
    - Invalid login ➔ error message
    - Logout ➔ session cleared and protected pages redirect
- Added **global test hooks** in `auth.spec.ts`:
    - `beforeEach` clears cookies and navigates to home
    - `afterEach` captures screenshot on test failure in `reports/failures/`
- Created **CatalogPage** POM class:
    - `search(term)`, `getResults()`, `applySort(option)`, `applyFilter(filterName, value)`, `openProduct(productName)`
- Created **ProductPage** POM class:
    - `getTitle()`, `getPrice()`, `addToCart(quantity)`
- Added **fixtures**:
    - `products.json` (example products for deterministic tests)
    - `search-results-term.json` (used for stubbing search API)
- Implemented **catalog.spec.ts** tests:
    - Search returns results (stubbed with fixture)
    - Sort products by price descending
    - Open product shows details
    - Search returns no results
- Used **deterministic stubs** with `page.route()` to ensure tests are stable and predictable.
- Fixed **.length issue** in catalog tests by using `await locator.count()` and safely checking fixture arrays with `Array.isArray()`.
- Added **npm script** `test:auth` in `package.json` for running authentication tests individually.
- Updated **notes** for dummy/stubbed tests:
    - Some tests use stubbed network responses or fixed selectors because the demo site may change over time.
    - This project is a **showcase** for junior QA skills; some selectors or products are not real but simulate realistic scenarios.
- Verified that Playwright async/await patterns and locators work as expected in junior-friendly style.

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
- Some selectors on the demo site may change, so a few tests are stubbed or simplified.  
- `.length` property on fixtures initially caused TypeScript errors — resolved using `Array.isArray()` and `await locator.count()`.  
- No major blockers; project running locally with deterministic tests.

---

## Next Steps (Day 3):
1. Implement **CartPage** and **CheckoutPage** with POM actions for add/remove products and checkout flow.
2. Write **cart and checkout tests**, including quantity changes and price verification.
3. Add **user profile and order history tests** using AuthPage and ProfilePage.
4. Continue **enhancing selectors and locators** based on demo site behavior.
5. Run full **Playwright test suite** and verify Allure HTML and CLI reports.
6. Prepare **Day 3 Daily Report** documenting progress and lessons learned.

---

### Notes:
- Some tests are **dummy / simulated** due to demo site limitations (changing product catalog, lack of real payment gateway, etc.).
- Fixtures and stubbed network responses ensure **stable, reproducible tests** for demonstration purposes.
- Project showcases **junior QA skills**, including Page Object Model, deterministic testing, and reporting with Allure.
