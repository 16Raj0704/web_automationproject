const { By } = require('selenium-webdriver');

class CartPage {
  constructor(driver) {
    this.driver = driver;
    this.locators = {
      cartItems: By.css('.cart_item'),
      checkoutBtn: By.id('checkout')
    };
  }

  async getCartItemCount() {
    return (await this.driver.findElements(this.locators.cartItems)).length;
  }

  async proceedToCheckout() {
    await this.driver.findElement(this.locators.checkoutBtn).click();
  }
}

module.exports = CartPage;
