const { By } = require('selenium-webdriver');
const { waitForElement } = require('../utils/helpers');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.locators = {
      username: By.id('user-name'),
      password: By.id('password'),
      loginBtn: By.id('login-button'),
      errorMsg: By.css('[data-test="error"]')
    };
  }

  async open() {
    await this.driver.get('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.driver.findElement(this.locators.loginBtn).click();
await waitForElement(this.driver, this.locators.errorMsg, 10000);
    await (await waitForElement(this.driver, this.locators.username)).sendKeys(username);
    await this.driver.findElement(this.locators.password).sendKeys(password);
    await this.driver.findElement(this.locators.loginBtn).click();
  }

  async getErrorMessage() {
    const error = await waitForElement(this.driver, this.locators.errorMsg);
    return error.getText();
  }
}

module.exports = LoginPage;
