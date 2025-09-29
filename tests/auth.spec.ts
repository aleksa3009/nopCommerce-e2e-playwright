import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';

test.describe('Authentication', () => {
  let home: HomePage;
  let auth: AuthPage;

  // Runs before each test
  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    auth = new AuthPage(page);
    await home.goto('/');
  });

  // TC01: Signup new user → success + auto-login
  test('TC01 - Register new user and auto-login', async ({ page }) => {
    await auth.gotoRegister();
    const timestamp = Date.now();
    const user = {
      email: `aleksatest+${timestamp}@example.com`,
      password: 'Aa!2345678',
      firstName: 'Aleksa',
      lastName: 'Aleksic'
    };
    await auth.register(user);
    await expect(page).toHaveURL(/registerresult/);
    // Check user is logged in
    await expect(page.locator('a:has-text("My account")')).toBeVisible();
  });

  // TC02: Signup duplicate email → validation error
  test('TC02 - Register with duplicate email shows error', async ({ page }) => {
    await auth.gotoRegister();
    const user = {
      email: 'aleksatest+duplicate@example.com',
      password: 'Aa!2345678',
      firstName: 'Aleksa',
      lastName: 'Aleksic'
    };
    // First registration
    await auth.register(user);
    await expect(page).toHaveURL(/registerresult/);
    await auth.logout();
    // Try registering again with same email
    await auth.gotoRegister();
    await auth.register(user);
    const errorMessage = page.locator('text=The specified email already exists');
    await expect(errorMessage).toBeVisible();
  });

  // TC03: Valid login → redirected to home
  test('TC03 - Valid login redirects to home', async ({ page }) => {
    await auth.gotoLogin();
    const user = { email: 'aleksatest+validlogin@example.com', password: 'Aa!2345678' };
    // Make sure the user exists (can register first if needed)
    await auth.register({ firstName: 'Aleksa', lastName: 'Aleksic', ...user });
    await auth.logout();
    await auth.gotoLogin();
    await auth.login(user.email, user.password);
    await expect(page.locator('a:has-text("My account")')).toBeVisible();
  });

  // TC04: Invalid login → error message
  test('TC04 - Invalid login shows error', async ({ page }) => {
    await auth.gotoLogin();
    await auth.login('nonexistent@example.com', 'wrongpassword');
    const error = page.locator('text=Login was unsuccessful. Please correct the errors and try again.');
    await expect(error).toBeVisible();
  });

  // TC05: Logout clears session and protected pages redirect
  test('TC05 - Logout clears session and protected pages redirect', async ({ page }) => {
    await auth.gotoRegister();
    const timestamp = Date.now();
    const user = {
      email: `aleksatest+${timestamp}@example.com`,
      password: 'Aa!2345678',
      firstName: 'Aleksa',
      lastName: 'Aleksic'
    };
    await auth.register(user);
    await auth.logout();

    // After logout, try to access My Account page
    await page.goto('/customer/info');
    // Should redirect to login page
    await expect(page).toHaveURL(/login/);
  });
});