class InventoryPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.inventoryItems = page.locator('.inventory_item');
    this.productPrices = page.locator('.inventory_item_price');
    this.sortDropdown = page.getByRole('combobox', { name: 'Sort products' });
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  getProduct(productName) {
    return this.inventoryItems.filter({ hasText: productName });
  }

  async addProductToCart(productName) {
    const product = this.getProduct(productName);
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async sortBy(value) {
    await this.sortDropdown.selectOption(value);
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };
