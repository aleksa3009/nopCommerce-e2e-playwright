# Daily Report -- 01-10-2025 (Day 3)

---

## Activities:

-   Continued development of **nopcommerce-e2e-playwright** project with
    focus on **cart and checkout flow**.\
-   Created **CartPage** POM class with actions:
    -   `viewCart()`, `getCartItems()`,
        `updateQuantity(productName, qty)`, `removeItem(productName)`,
        `getTotalPrice()`
-   Created **CheckoutPage** POM class with actions:
    -   `fillBillingAddress(address)`, `selectShippingMethod(method)`,
        `selectPaymentMethod(method)`, `confirmOrder()`,
        `getOrderConfirmation()`
-   Added **fixtures**:
    -   `addresses.json` -- contains test addresses for
        billing/shipping.
    -   `payment.json` -- contains dummy payment methods for checkout
        simulation.
-   Implemented **cart.spec.ts** tests:
    -   Add product to cart and verify it appears with correct price.
    -   Update quantity and verify total price calculation.
    -   Remove product and check cart is empty.
    -   Edge case: invalid quantity (e.g., `0` or negative) handled
        gracefully.
-   Implemented **checkout.spec.ts** tests:
    -   Guest checkout with valid billing and payment ➔ shows
        confirmation page.
    -   Registered user checkout flow with stored address.
    -   Simulated payment methods using fixture data (dummy gateways).
-   Introduced **utils/priceUtils.ts** helper with:
    -   `parsePrice(string)`, `toCurrency(number)`
-   Added **priceUtils.spec.ts** unit tests to validate helper logic.
-   Fixed **TypeScript Locator vs string errors** by ensuring
    `.innerText()` or `.textContent()` are awaited before parsing
    prices.
-   Configured **global afterEach hook** for screenshots on failure +
    Allure attachments.
-   Verified **Allure integration**:
    -   Failures produce screenshots in `reports/failures/`\
    -   Results collected in `allure-results/`

---

## Environment:

-   **OS:** Linux Ubuntu 22.04 LTS\
-   **Node.js:** 22.17.0\
-   **NPM:** 11.4.2\
-   **IDE:** VSCode 1.99.0\
-   **Browsers:** Chromium, Firefox, Webkit (via Playwright)\
-   **Tools/Libraries:** Playwright Test 1.55.0, TypeScript 5.9.2,
    ESLint 9.36.0, Prettier 3.6.2, Allure Playwright

---

## Issues:

-   Minor TypeScript typing errors with Locators vs strings resolved by
    wrapping values in `await locator.textContent()` and null checks.\
-   Some checkout steps on demo site don't work consistently (e.g., real
    payment integration missing), so fixtures simulate realistic flow.\
-   No major blockers; suite is stable and producing Allure reports.

---

## Next Steps (Day 4):

1.  Implement **ProfilePage** with actions for viewing order history and
    editing account details.\
2.  Write **profile.spec.ts** tests: order history shows recent
    checkout, profile updates persist.\
3.  Add **data-driven tests** using multiple users/addresses from
    fixtures.\
4.  Refactor repeated code into **base POM class** for reusability.\
5.  Finalize **Allure reporting setup** (categories.json,
    environment.properties).\
6.  Prepare **Day 4 Daily Report** with summary and outcomes.

---

### Notes:

-   Some checkout flows are **stubbed or simulated** with fixture data
    due to demo site limitations.\
-   Price verification now reliable thanks to `priceUtils`.\
-   Project is increasingly **modular**: helpers, fixtures, and POM
    classes separate concerns cleanly.\
-   Demonstrates **junior QA automation workflow** with real-world
    patterns: POM, fixtures, utilities, reporting, and CI integration.