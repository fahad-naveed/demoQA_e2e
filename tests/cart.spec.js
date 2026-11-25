const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { InventoryPage } = require('../pages/inventory-page');
const { CartPage } = require('../pages/cart-page');
const testData = require('../test-data/saucedemo.json');

test.describe('Cart page', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await page.goto('/');
    await loginPage.login(
      testData.standardUser.username,
      testData.standardUser.password
    );
    await inventoryPage.addProductToCart(testData.productName);
    await inventoryPage.openCart();
  });

  test('shows the added product and quantity', async ({ page }) => {
    const cartPage = new CartPage(page);
    const item = cartPage.getItem(testData.productName);

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.pageTitle).toHaveText('Your Cart');
    await expect(cartPage.items).toHaveCount(1);
    await expect(item).toBeVisible();
    await expect(cartPage.getItemQuantity(testData.productName)).toHaveText('1');
  });

  test('removing the product empties the cart and clears the badge', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.removeItem(testData.productName);

    await expect(cartPage.items).toHaveCount(0);
    await expect(cartPage.cartBadge).toBeHidden();
  });
});
