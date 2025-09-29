import BasePage from './BasePage';
import { Page, Locator, expect } from '@playwright/test';

export default class AuthPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);

    // Register form locators
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('button#register-button');

    // Login form locators
    this.loginEmailInput = page.locator('#Email');
    this.loginPasswordInput = page.locator('#Password');
    this.loginButton = page.locator('button.login-button');

    // Logout link
    this.logoutLink = page.locator('a:has-text("Log out")');
  }

  // Navigate to registration page
  async gotoRegister() {
    await this.page.goto('/register');
  }

  // Fill registration form and submit
  async register(user: { firstName: string; lastName: string; email: string; password: string }) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.registerButton.click();
  }

  // Navigate to login page
  async gotoLogin() {
    await this.page.goto('/login');
  }

  // Fill login form and submit
  async login(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  // Logout the current user
  async logout() {
    await this.logoutLink.click();
  }

  // Optional: check if logged in by looking for "My account"
  async isLoggedIn() {
    const accountLink = this.page.locator('a:has-text("My account")');
    return await accountLink.isVisible();
  }
}