const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { InventoryPage } = require('../pages/inventory-page');
const testData = require('../test-data/saucedemo.json');

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('standard user can log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login(
      testData.standardUser.username,
      testData.standardUser.password
    );

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test('requires a username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toHaveText(testData.errors.usernameRequired);
  });

  test('requires a password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(testData.standardUser.username, '');

    await expect(loginPage.errorMessage).toHaveText(testData.errors.passwordRequired);
  });

  test('rejects invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      testData.invalidUser.username,
      testData.invalidUser.password
    );

    await expect(loginPage.errorMessage).toHaveText(testData.invalidUser.error);
    await expect(page).toHaveURL('/');
  });

  test('shows an error for a locked-out user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      testData.lockedOutUser.username,
      testData.standardUser.password
    );

    await expect(loginPage.errorMessage).toHaveText(testData.lockedOutUser.error);
    await expect(page).toHaveURL('/');
  });
});
