import { test, expect } from '@playwright/test';
import CatalogPage from '../pages/CatalogPage';
import ProductPage from '../pages/ProductPage';
import searchResults from '../fixtures/search-results-term.json';

test.describe('Catalog / Product tests', () => {

  test.beforeEach(async ({ page }) => {
    // Stub search network call for deterministic results
    await page.route('**/search*', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(searchResults)
      });
    });
  });

  test('Search returns results', async ({ page }) => {
    const catalog = new CatalogPage(page);
    await page.goto('/');
    await catalog.search('computer');
    const results = catalog.getResults();
    const count = await results.count();

    // Safe way to get expected count from JSON fixture
    const expectedCount = Array.isArray(searchResults) ? searchResults.length : 0;
    expect(count).toBe(expectedCount);
  });

  test('Sort products by price descending', async ({ page }) => {
    const catalog = new CatalogPage(page);
    await page.goto('/');
    await catalog.search('computer');
    await catalog.applySort('Price: High to Low');

    const results = catalog.getResults();
    const firstTitle = await results.first().locator('h2').textContent();
    expect(firstTitle).toBe('Apple MacBook Pro 13-inch');
  });

  test('Open product shows details', async ({ page }) => {
    const catalog = new CatalogPage(page);
    const productPage = new ProductPage(page);

    await page.goto('/');
    await catalog.search('computer');
    await catalog.openProduct('Build your own computer');

    const title = await productPage.getTitle().innerText();
    const price = await productPage.getPrice().innerText();

    expect(title).toContain('Build your own computer');
    expect(price).toBe('$1,200.00');
  });

  test('Search returns no results', async ({ page }) => {
    const catalog = new CatalogPage(page);

    // Stub search for a non-existent term
    await page.route('**/search?q=nonexistent**', route => {
      route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
    });

    await page.goto('/');
    await catalog.search('nonexistent');
    const results = catalog.getResults();
    const count = await results.count();
    expect(count).toBe(0);
  });

});
