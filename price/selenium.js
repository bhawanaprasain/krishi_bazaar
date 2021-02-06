const { Builder ,By,WebDriver} = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/firefox');

const websiteURL = "https://kalimatimarket.gov.np/price"

const options = new Options()
const driver = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(options)
  .build();
  
driver.get(websiteURL )
const data = driver.findElement(By.name("tr"));
console.log(data);


