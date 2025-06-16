const { By } = require('selenium-webdriver');

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.locators = {
      inventoryItems: By.css('.inventory_item'),
      addToCartButtons: By.css('.btn_inventory'),
      cartBadge: By.css('.shopping_cart_badge'),
      cartLink: By.css('.shopping_cart_link')
    };
  }

  async getItemCount() {
    return (await this.driver.findElements(this.locators.inventoryItems)).length;
  }

  async addFirstItemToCart() {
    const buttons = await this.driver.findElements(this.locators.addToCartButtons);
    if (buttons.length > 0) {
      await buttons[0].click();
    }
  }

  async openCart() {
    await this.driver.findElement(this.locators.cartLink).click();
  }
}

module.exports = InventoryPage;
