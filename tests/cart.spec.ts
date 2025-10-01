// tests/cart.spec.ts
import { test, expect } from '@playwright/test';
import CatalogPage from '../pages/CatalogPage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import { parsePrice } from '../helpers/priceUtils';
import searchResults from '../fixtures/search-results-term.json';

// Helper to guarantee a string for parsePrice
const safeString = (str: string | null | undefined, defaultVal = '$0.00') => str ?? defaultVal;

test.describe('Cart tests', () => {

  // Stub search endpoint for deterministic results
  test.beforeEach(async ({ page }) => {
    await page.route('**/search*', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(searchResults)
      })
    );
  });

  test('add items to cart and verify subtotal', async ({ page }) => {
    const catalog = new CatalogPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    // Navigate and search for product
    await catalog.goto('/');
    await catalog.search('computer');
    await catalog.openProduct('Build your own computer');

    // Add 1 item to cart
    await product.addToCart(1);
    await cart.gotoCart();

    // Verify 1 item in cart using Locator + toHaveCount()
    await expect(cart.cartItems).toHaveCount(1);

    // Read product price safely from Locator
    const priceLocator = await product.getPrice(); // returns Locator
    const priceText = await priceLocator.textContent();
    const price = parsePrice(safeString(priceText));

    // Read subtotal safely from Locator
    const subtotalLocator = await cart.subtotalLocator;
    const subtotalText = await subtotalLocator.textContent();
    const subtotal = parsePrice(safeString(subtotalText));

    // Verify subtotal matches product price
    expect(subtotal).toBeCloseTo(price, 2);

    // Increase quantity to 2 and verify subtotal
    await cart.updateQuantity('Build your own computer', 2);
    const subtotalAfterText = await (await cart.subtotalLocator).textContent();
    const subtotalAfter = parsePrice(safeString(subtotalAfterText));
    expect(subtotalAfter).toBeCloseTo(price * 2, 2);
  });

  test('remove item from cart', async ({ page }) => {
    const catalog = new CatalogPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await catalog.goto('/');
    await catalog.search('computer');
    await catalog.openProduct('Build your own computer');
    await product.addToCart(1);

    await cart.gotoCart();

    // Verify cart has items
    await expect(cart.cartItems).toHaveCount(1);

    // Remove item and verify cart is empty
    await cart.removeItem('Build your own computer');
    await expect(cart.cartItems).toHaveCount(0);
  });

  // Simple test: cart is empty on first visit
  test('cart is empty on first visit', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.gotoCart();
    await expect(cart.cartItems).toHaveCount(0);
  });

  // Simple test: subtotal is $0.00 when cart is empty
  test('subtotal is $0.00 when cart is empty', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.gotoCart();
    const subtotalText = await (await cart.subtotalLocator).textContent();
    expect(safeString(subtotalText)).toBe('$0.00');
  });

});
