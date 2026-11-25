const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { InventoryPage } = require('../pages/inventory-page');
const { CartPage } = require('../pages/cart-page');
const testData = require('../test-data/saucedemo.json');

test('standard user can access the inventory', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await page.goto('/');
  await loginPage.login(
    testData.standardUser.username,
    testData.standardUser.password
  );

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(inventoryPage.pageTitle).toHaveText('Products');
  await expect(inventoryPage.inventoryItems).toHaveCount(6);
});

test('standard user can add a product and see it in the cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await page.goto('/');
  await loginPage.login(
    testData.standardUser.username,
    testData.standardUser.password
  );

  await inventoryPage.addProductToCart(testData.productName);
  await expect(inventoryPage.cartBadge).toHaveText('1');

  await inventoryPage.openCart();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(cartPage.pageTitle).toHaveText('Your Cart');
  await expect(cartPage.items).toHaveCount(1);
  await expect(cartPage.getItem(testData.productName)).toBeVisible();
});

test('invalid credentials show an error and keep the user on login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/');
  await loginPage.login(
    testData.invalidUser.username,
    testData.invalidUser.password
  );

  await expect(loginPage.errorMessage).toHaveText(testData.invalidUser.error);
  await expect(page).toHaveURL('/');
});
