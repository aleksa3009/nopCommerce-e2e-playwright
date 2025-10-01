// tests/checkout.spec.ts
import { test, expect } from '@playwright/test';
import CatalogPage from '../pages/CatalogPage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import addresses from '../fixtures/addresses.json';
import payment from '../fixtures/payment.json';
import searchResults from '../fixtures/search-results-term.json';

test.describe('Checkout tests', () => {

  // Stub endpoints and search before each test
  test.beforeEach(async ({ page }) => {
    // Stub search endpoint to reuse fixture
    await page.route('**/search*', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(searchResults)
      })
    );

    // Stub payment authorization endpoint
    await page.route('**/payment/authorize**', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(payment.gatewayResponse)
      })
    );

    // Stub order creation endpoint
    await page.route('**/order/create**', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ orderNumber: '10001234', success: true })
      })
    );
  });

  test('complete checkout as logged in user (happy path)', async ({ page }) => {
    const catalog = new CatalogPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    // Go to homepage and search
    await catalog.goto('/');
    await catalog.search('computer');
    await catalog.openProduct('Build your own computer');

    // Add product to cart
    await product.addToCart(1);
    await cart.gotoCart();
    await cart.proceedToCheckout();

    // Fill billing address (from fixture)
    await checkout.fillBillingAddress(addresses.billing);

    // Select shipping method (label must match site)
    await checkout.selectShippingMethod('Ground');

    // Select payment method (stubbed)
    await checkout.selectPaymentMethod('Credit Card');

    // Fill card details (stubbed gateway)
    await checkout.fillCardDetails(payment.card);

    // Confirm order
    await checkout.confirmOrder();

    // Assert order number is returned
    const orderNumber = await checkout.getOrderNumber();
    expect(orderNumber).toBeTruthy();

    // Sanity check: thank you message visible
    await expect(page.locator('text=Thank you')).toBeVisible();
  });

  // Optional simple stubbed test: guest checkout
  test('guest checkout happy path', async ({ page }) => {
    const catalog = new CatalogPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await catalog.goto('/');
    await catalog.search('computer');
    await catalog.openProduct('Build your own computer');
    await product.addToCart(1);
    await cart.gotoCart();
    await cart.proceedToCheckout();

    // Fill billing address
    await checkout.fillBillingAddress(addresses.billing);
    await checkout.selectShippingMethod('Ground');
    await checkout.selectPaymentMethod('Credit Card');
    await checkout.fillCardDetails(payment.card);
    await checkout.confirmOrder();

    const orderNumber = await checkout.getOrderNumber();
    expect(orderNumber).toBeTruthy();
    await expect(page.locator('text=Thank you')).toBeVisible();
  });

});
