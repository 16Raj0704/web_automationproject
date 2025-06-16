const { By, until } = require('selenium-webdriver');
const fs = require('fs');

async function waitForElement(driver, locator, timeout = 5000) {
  const element = await driver.wait(until.elementLocated(locator), timeout);
  await driver.wait(until.elementIsVisible(element), timeout);
  return element;
}

async function takeScreenshot(driver, name) {
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync(`./reports/${name}.png`, screenshot, 'base64');
}

module.exports = { waitForElement, takeScreenshot };
