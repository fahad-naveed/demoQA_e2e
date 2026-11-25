const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { InventoryPage } = require('../pages/inventory-page');
const testData = require('../test-data/saucedemo.json');

test.describe('Inventory page', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login(
      testData.standardUser.username,
      testData.standardUser.password
    );
  });

  test('shows the product catalog', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await expect(inventoryPage.pageTitle).toHaveText('Products');
    await expect(inventoryPage.inventoryItems).toHaveCount(testData.inventoryCount);
  });

  test('sorts products from lowest to highest price', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortBy('lohi');

    await expect(inventoryPage.productPrices).toHaveText(
      testData.lowToHighPrices
    );
  });

  test('adding a product updates its action and the cart badge', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const product = inventoryPage.getProduct(testData.productName);

    await inventoryPage.addProductToCart(testData.productName);

    await expect(product.getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
