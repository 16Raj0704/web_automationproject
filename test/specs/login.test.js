const { getDriver } = require('../utils/driver');
const LoginPage = require('../pages/LoginPage');
const { assert } = require('chai');
const { takeScreenshot } = require('../utils/helpers');

describe('SauceDemo Login Tests', function() {
  let driver, loginPage;
  this.timeout(10000);
  before(async () => {
    driver = await getDriver();
    loginPage = new LoginPage(driver);
  });

  after(async () => {
    await driver.quit();
  });

  afterEach(async function() {
    if (this.currentTest.state === 'failed') {
      await takeScreenshot(driver, this.currentTest.title.replace(/\s+/g, '_'));
    }
  });

  it('should login with valid credentials', async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    const url = await driver.getCurrentUrl();
    assert.include(url, 'inventory.html');
  });

  it('should show error with invalid credentials', async () => {
    await loginPage.open();
    await loginPage.login('invalid_user', 'wrong_pass');
    const errorText = await loginPage.getErrorMessage();
    assert.include(errorText.toLowerCase(), 'epic sadface');
  });
});
