const {Builder, By, Key, until} = require('selenium-webdriver');
var BasePage = require('./basepage');
var webdriver = require('selenium-webdriver');

class DashboardPage extends BasePage {
     navigateToDashBoard() {
        console.log("i m in navigate to dashboard")
        driver.wait(until.elementLocated(By.linkText('/dashboard/ethereum')), 5 * 1000).then(el => {
            console.log("found element");
            return el.click();
          });
        
    }
}

module.exports = new DashboardPage()