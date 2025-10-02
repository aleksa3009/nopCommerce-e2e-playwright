import { test, expect } from '@playwright/test';
import ProfilePage from '../pages/ProfilePage';
import profileData from '../fixtures/profile.json';

test.describe('Profile / Reporting tests', () => {
  const testEmail = 'aleksatest@example.com'; // test user
  const password = 'Aa!2345678';

  test('update profile basic info', async ({ page }) => {
    const profile = new ProfilePage(page);

    // login via UI
    await page.goto('/login');
    await page.getByLabel('Email').fill(testEmail);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: /Log in/i }).click();
    await page.waitForLoadState('networkidle');

    // go to account page
    await profile.gotoAccount();

    const oldFirst = await profile.getFirstName();
    const oldLast = await profile.getLastName();

    // update name and save
    await profile.updateName(profileData.updatedProfile.firstName, profileData.updatedProfile.lastName);
    await profile.expectUpdated();

    // verify updated values
    expect(await profile.getFirstName()).toBe(profileData.updatedProfile.firstName);
    expect(await profile.getLastName()).toBe(profileData.updatedProfile.lastName);

    // attach screenshot
    await test.info().attach('profile-updated-screenshot.png', { body: await page.screenshot(), contentType: 'image/png' });

    // rollback to original (optional)
    await profile.updateName(oldFirst, oldLast);
    await profile.expectUpdated();
  });

  test('view order history (stubbed)', async ({ page }) => {
    // stub order-history API
    await page.route('**/orderhistory*', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { orderNumber: '10001234', date: '2025-09-29', total: '$1200.00' },
          { orderNumber: '10001235', date: '2025-09-30', total: '$1800.00' }
        ])
      });
    });

    const profile = new ProfilePage(page);

    // login via UI
    await page.goto('/login');
    await page.getByLabel('Email').fill(testEmail);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: /Log in/i }).click();
    await page.waitForLoadState('networkidle');

    await profile.gotoAccount();

    // open orders page
    await profile.viewOrderHistory();

    // verify order count
    await expect(page.locator('.order-list .order-item')).toHaveCount(2);

    // attach screenshot
    await test.info().attach('orders-page-screenshot.png', { body: await page.screenshot(), contentType: 'image/png' });
  });
});