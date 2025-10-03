# nopCommerce Demo – Playwright E2E Automation Project

This project demonstrates comprehensive end-to-end automation testing of the **nopCommerce Demo e-commerce portal** ([https://demo.nopcommerce.com](https://demo.nopcommerce.com)) using **Playwright, TypeScript, Page Object Model (POM), Allure Reporting, and GitHub Actions CI/CD**. The main goal was to validate critical user journeys such as authentication, product browsing, cart management, checkout, and profile updates in a deterministic and maintainable manner.  

All tests were implemented with **modularity, clarity, and professional QA practices** suitable for a junior-level portfolio.

---

## Project Overview

The repository contains all artifacts produced during a five-day automation testing engagement. Each module was carefully planned and implemented to demonstrate proper end-to-end testing workflow:

- **Authentication:** Covered registration, login, logout, and handling of invalid credentials. Tests verify both success and failure paths to ensure robust coverage.  
- **Catalog:** Implemented product search, filtering, sorting, and product detail validation. Since the demo site catalog changes frequently, **generic locators** were used to maintain test stability while demonstrating proper structure.  
- **Cart:** Verified adding, updating, and removing products, as well as recalculation of totals. The flows follow correct business logic and provide reliable validation of cart functionality.  
- **Checkout:** Automated address input, payment simulation, and order confirmation. The checkout tests reflect actual user processes and ensure data is handled correctly.  
- **Profile:** Covered account updates and viewing of order history using fixture-based deterministic tests. This module demonstrates how to safely update user data and validate outcomes without polluting test state.  

The project includes **32 structured test cases**, covering positive, negative, and deterministic scenarios, executed with Allure reporting and GitHub Actions CI/CD integration.

---

## Repository Structure (Overview)

> This is an overview of the main repository structure. Not all files and folders are listed to avoid excessive detail.

```bash
~/nopcommerce-e2e-playwright/
├── README.md
├── package.json
├── playwright.config.ts
├── pages/          # POM classes for each module (Auth, Catalog, Cart, Checkout, Profile)
├── tests/          # Feature-specific tests organized by module
├── fixtures/       # Test data (users, products) for deterministic execution
├── reports/        # Allure HTML reports and screenshots
├── .github/        # CI/CD workflows for GitHub Actions
├── FinalReport.md  # Comprehensive final report summarizing project and results
└── DailyReports/   # Individual daily reports documenting progress
```

This structure emphasizes **modularity and maintainability**, separating reusable page objects, test scripts, and test data while allowing easy generation of reports and CI/CD integration.

---

## Tools & Environment

- **Operating System:** Ubuntu 22.04 LTS  
- **Browsers:** Chromium, Firefox, Webkit (managed by Playwright)  
- **Programming Language:** TypeScript 5.9.2  
- **Automation Framework:** Playwright Test 1.55.0  
- **Reporting:** Allure Playwright with step-by-step visualization and screenshots on failure  
- **Code Quality:** ESLint 9.36.0 and Prettier 3.6.2 for consistent formatting  
- **IDE:** Visual Studio Code  
- **CI/CD:** GitHub Actions workflow executes full test suite automatically on pushes and pull requests  
- **Version Control:** Git & GitHub  

---

## Test Planning & Execution Flow

The project was executed over five days, following a structured plan:

1. **Day 1:** Repository initialization, dependency installation, Playwright configuration, and setup of BasePage and Smoke tests.  
2. **Day 2:** Implementation of Authentication tests, including registration, login, logout, and validation of error messages.  
3. **Day 3:** Catalog and Cart tests: product search, filtering, sorting, adding to cart, updating quantities, and removing items.  
4. **Day 4:** Profile tests: updating account information, viewing order history, and ensuring deterministic execution with fixture data.  
5. **Day 5:** Project wrap-up: preparation of **FinalReport.md**, creation of **README.md**, review of all test files, execution of full test suite, and final Daily Report.

All detailed progress notes are stored under **DailyReports/**, and complete Allure reports with screenshots are available under **reports/allure-report/**.

---

## Test Coverage & Metrics

| Module          | Test Cases | PASS | FAIL |
|-----------------|------------|------|------|
| Authentication  | 8          | 8    | 0    |
| Catalog         | 7          | 7    | 0    |
| Cart            | 6          | 6    | 0    |
| Checkout        | 6          | 6    | 0    |
| Profile         | 5          | 5    | 0    |
| **Total**       | 32         | 32   | 0    |

- **Average Duration per Test Case:** ~12 minutes  
- **Overall Test Pass Rate:** 100%  

---

## Notable Implementations

- **Page Object Model (POM):** All modules implemented with reusable classes to reduce duplication and increase maintainability.  
- **Deterministic Tests:** Fixture files (`users.json` and `products.json`) were used to stabilize tests despite the dynamic demo catalog.  
- **Generic Product Locators:** Since the demo site frequently changes products, generic locators were applied to illustrate proper testing structure. This ensures that tests demonstrate methodology, even if some product-specific tests might fail in the future.  
- **Allure Reporting:** Step-by-step reports with screenshots for better visualization of test execution and failures.  
- **CI/CD Integration:** GitHub Actions workflow runs the entire test suite automatically and archives reports for review.  

---

## Notes

- Tests reflect real user flows and correct process for authentication, catalog, cart, checkout, and profile modules.  
- Generic locators for products were intentionally used due to demo site variability, showing how tests should be structured in principle.  
- Future changes in the demo site catalog may cause some tests to fail; this does not indicate a flaw in the automation process.  
- All artifacts are structured for **portfolio presentation**, demonstrating junior QA skills in automated E2E testing.  

---

## Conclusion

The **nopCommerce E2E Playwright Automation Project** successfully demonstrates:

- Professional setup and configuration of an automated E2E testing framework  
- Modular Page Object Model and maintainable test scripts  
- Deterministic, fixture-driven tests that handle dynamic content  
- End-to-end coverage of core e-commerce flows  
- Reporting, screenshot capture, and CI/CD automation for robust validation  

All test artifacts, reports, and workflow files are included for review and portfolio purposes. This project illustrates **foundational QA automation skills suitable for a junior tester level**, providing a clear and professional example of automated testing best practices.