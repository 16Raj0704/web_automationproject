const { getDriver } = require('../utils/driver');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const { assert } = require('chai');
const { By } = require('selenium-webdriver');
const { takeScreenshot } = require('../utils/helpers');

describe('Checkout Process', function() {
  this.timeout(10000);
  let driver, loginPage, inventoryPage, cartPage;

  before(async () => {
    driver = await getDriver();
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
    cartPage = new CartPage(driver);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  after(async () => {
    await driver.quit();
  });

  afterEach(async function() {
    if (this.currentTest.state === 'failed') {
      await takeScreenshot(driver, this.currentTest.title.replace(/\s+/g, '_'));
    }
  });

  it('should add item to cart', async () => {
    await inventoryPage.addFirstItemToCart();
    const badge = await driver.findElement(By.css('.shopping_cart_badge')).getText();
    assert.equal(badge, '1');
  });

  it('should proceed to checkout', async () => {
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
    const url = await driver.getCurrentUrl();
    assert.include(url, 'checkout-step-one.html');
  });
});
