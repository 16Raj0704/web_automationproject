const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

const getDriver = () => {
  const chromeOptions = new chrome.Options();

  const headless = process.env.HEADLESS !== 'false';
  if (headless) {
    chromeOptions.addArguments('--headless', '--disable-gpu');
  }

  const service = new chrome.ServiceBuilder(chromedriver.path);

  return new Builder()
    .forBrowser('chrome')
    .setChromeService(service)
    .setChromeOptions(chromeOptions)
    .build();
};

module.exports = { getDriver };