# Daily Report -- 02-10-2025 (Day 4)

---

## Activities:

-   Continued development of **nopcommerce-e2e-playwright** project with focus on **ProfilePage and account management**.\
-   Created **ProfilePage** POM class with actions:
    -   `gotoAccount()`, `getFirstName()`, `getLastName()`,
        `updateName(firstName, lastName)`, `viewOrderHistory()`,
        `getOrderItemsCount()`, `expectUpdated()`
-   Added **fixtures**:
    -   `profile.json` -- contains test data for updating account info.
    -   `orders.json` -- stubbed order history for deterministic tests.
-   Implemented **profile.spec.ts** tests (without global-setup):
    -   Login via UI at the start of each test.
    -   Update profile basic info and verify persisted changes.
    -   Rollback profile changes to keep test state clean.
    -   View order history using stubbed API and verify item count.
    -   Attach screenshots to Allure for both profile update and orders page.
-   Updated **playwright.config.ts**:
    -   Retained ES module setup without global-setup due to removal.
    -   Simplified configuration; all test environments and browsers configured.
-   Ensured **tests run deterministically** with fixtures for profile and orders.
-   Maintained **esencial comments** in test files for clarity and Allure attachments.

---

## Environment:

-   **OS:** Linux Ubuntu 22.04 LTS\
-   **Node.js:** 22.17.0\
-   **NPM:** 11.4.2\
-   **IDE:** VSCode 1.99.0\
-   **Browsers:** Chromium, Firefox, Webkit (via Playwright)\
-   **Tools/Libraries:** Playwright Test 1.55.0, TypeScript 5.9.2, ESLint 9.36.0, Prettier 3.6.2, Allure Playwright

---

## Issues:

-   Removed **global-setup** for simplicity; login is now performed via UI in each test.\
-   Minor detours in stubbed order history API; handled deterministically with fixtures.\
-   No major blockers; test suite stable and screenshots properly attached for Allure.

---

## Next Steps (Day 5):

1.  Add **additional profile scenarios** (e.g., email/password update, invalid input).\
2.  Introduce **more data-driven tests** using multiple user profiles.\
3.  Write **final report** summarizing project, tests, and outcomes.\
4.  Prepare **README.md** with project description, setup, and usage instructions.\
5.  Complete **project wrap-up**, ensuring all tests, fixtures, and POMs are finalized.\
6.  Prepare **Day 5 Daily Report** with summary of final steps and project completion.

---

### Notes:

-   Profile and order history flows are **stubbed/deterministic** for showcase purposes.\
-   Screenshots and Allure attachments demonstrate **basic reporting workflow**.\
-   Project structure increasingly **modular**: POM classes, fixtures, and test files separated clearly.\
-   Demonstrates **junior QA automation skills**: POM, fixtures, UI login, stubbing, reporting, and ES module configuration.