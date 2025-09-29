# Test Plan – nopCommerce E2E Playwright Automation

**Author:** Aleksa Aleksić  
**Date:** September 29, 2025  
**Project:** nopCommerce Demo – End-to-End Automation  
**Base URL:** https://demo.nopcommerce.com

---

## 1. Introduction
This document outlines the strategy and structure for automating critical user flows on the nopCommerce Demo e-commerce platform.  
The project validates end-to-end functionality, including authentication, product search, cart management, checkout, and user profile updates.  

The suite is implemented with:
- **Playwright (TypeScript)** for cross-browser automation
- **Page Object Model (POM)** for reusable and maintainable code
- **Allure Reports** for detailed execution results
- **GitHub Actions** for basic CI/CD automation

---

## 2. Scope

**In Scope:**
- Authentication: registration, login, logout, and error handling
- Catalog: product search, filtering, sorting, and product detail validation
- Cart: adding, removing, updating quantities, and recalculations
- Checkout: address input, payment, confirmation page
- Profile: updating user data, viewing order history

**Out of Scope:**
- API testing  
- Mobile or responsive testing  
- Performance and accessibility audits (planned for future)

---

## 3. Objectives
- Ensure stability and correctness of main user journeys through UI automation
- Catch UI regressions early during local and CI test runs
- Maintain readable and modular code via POM and TypeScript best practices
- Provide transparent reporting for test results and artifacts

---

## 4. Roles & Responsibilities

| Role        | Name           | Responsibility |
|-------------|----------------|----------------|
| QA Engineer | Aleksa Aleksić | Develop tests, design page models, maintain config, and generate reports |
| Reviewer    | (Optional) Peer QA | Code review and feedback |
| Stakeholder | Self (Portfolio Project) | Final validation before publishing results |

---

## 5. Test Items

| Area            | Key Scenarios | Positive Tests | Negative Tests |
|-----------------|----------------|----------------|----------------|
| Authentication  | Register, login, logout | Valid login/signup | Invalid credentials, duplicate user |
| Catalog         | Browse, search, sort | Search returns results, sorting works | No result found |
| Cart            | Add, remove, update items | Items reflect correctly | Removing from empty cart |
| Checkout        | Address, payment, confirmation | Order success | Missing address or invalid payment |
| Profile         | Update user data, order history | Success messages | Invalid inputs |

---

## 6. Test Strategy & Approach

1. **Framework:** Playwright Test Runner (TypeScript)
2. **Structure:** Tests organized by feature under `/tests/`
3. **Design Pattern:** Page Object Model with shared `BasePage` utilities
4. **Data:** Fixture files for users, addresses, and products
5. **Synchronization:** Explicit waits (`waitForSelector`) for dynamic elements
6. **Reporting:** Allure integrated for visual summaries
7. **CI/CD:** Basic GitHub Actions workflow to execute tests and archive reports

---

## 7. Environment & Tools

| Tool / Library | Version | Purpose |
|----------------|----------|----------|
| Playwright | 1.55.0 | Core test automation framework |
| TypeScript | 5.9.2 | Static typing and modern JS support |
| Allure Playwright | 2.0.0 | Reporting dashboard |
| GitHub Actions | N/A | CI/CD test execution |
| Node.js | 22.17 | Runtime environment |
| OS | Ubuntu 22.04 | Execution environment |
| IDE | Visual Studio Code | Development and debugging |

---

## 8. Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-------------|---------|-------------|
| Dynamic elements causing flaky tests | Medium | High | Use stable locators and retries |
| Slow network or server response | Medium | Medium | Use explicit waits and retries |
| CI environment differences | Low | High | Match local/CI browser configs |
| Data inconsistency on demo site | High | Medium | Use local fixture data where possible |

---

## 9. Deliverables

- `TestPlan.md` – This master plan  
- `tests/` – Feature-specific Playwright test scripts  
- `pages/` – Page Object Models  
- `fixtures/` – JSON/TS test data  
- `reports/` – Allure results and screenshots  
- `.github/workflows/playwright.yml` – Basic CI workflow  
- `README.md` – Project setup and execution guide  
- `FinalReport.md` – Summary with metrics and recommendations  

---

## 10. Schedule (6-Day Solo Plan)

| Day | Tasks | Description |
|-----|--------|-------------|
| 1 | Project Setup | Initialize repo, install dependencies, set up config and POM base |
| 2 | Authentication Tests | Implement registration/login/logout with reusable locators |
| 3 | Catalog Tests | Add product search, sorting, and details verification |
| 4 | Cart & Checkout | Cover add/update/remove cart and full checkout flow |
| 5 | Profile & Reporting | Add profile tests, configure Allure reports |
| 6 | CI & Documentation | Finalize CI run, upload reports, polish README and final report |

---

## 11. Best Practices & Guidelines

- Prefer `getByRole()` or `data-testid` locators for stability  
- Avoid hard waits; use Playwright's built-in wait conditions  
- Clean test state between runs  
- Capture screenshots only on failure  
- Group tests logically with `test.describe()`  
- Enforce ESLint and Prettier formatting  
- Generate Allure report after each run for visual traceability  

---

## 12. References

- [Playwright Documentation](https://playwright.dev/docs/intro)  
- [Allure Framework](https://docs.qameta.io/allure/)  
- [GitHub Actions CI](https://docs.github.com/en/actions)  