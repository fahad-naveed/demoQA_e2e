class CartPage {
  constructor(page) {
    this.pageTitle = page.locator('.title');
    this.items = page.locator('.cart_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  getItem(productName) {
    return this.items.filter({ hasText: productName });
  }

  getItemQuantity(productName) {
    return this.getItem(productName).locator('.cart_quantity');
  }

  async removeItem(productName) {
    await this.getItem(productName).getByRole('button', { name: 'Remove' }).click();
  }
}

module.exports = { CartPage };
