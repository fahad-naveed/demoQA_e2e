class CartPage {
  constructor(page) {
    this.pageTitle = page.locator('.title');
    this.items = page.locator('.cart_item');
  }

  getItem(productName) {
    return this.items.filter({ hasText: productName });
  }
}

module.exports = { CartPage };
