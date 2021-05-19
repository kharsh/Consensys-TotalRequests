const {WebElement,Builder, By, Key, until} = require('selenium-webdriver');
var BasePage = require('./basepage');
var DashBoardPage = require('./dashboardpage');
var webdriver = require('selenium-webdriver');
const { elementLocated } = require('selenium-webdriver/lib/until');

class LoginPage extends BasePage {
  
 getTotalRequests(email, password) {
  
  var totalRequests;
  driver.wait(until.elementLocated(By.id('email')), 5 * 1000).then(el => {
      el.sendKeys(email);
  });

    driver.wait(until.elementLocated(By.id('password')), 5 * 1000).then(el => {
      return el.sendKeys(password);
    });
    
    driver.wait(until.elementLocated(By.xpath("//*[text()='Submit']")), 5 * 1000).then(el => {
      return el.click();
    });
    
    driver.wait(until.elementsLocated(By.className("mt-2"), 5 * 1000)).then(function(elements){
      return elements[0].click();
    }).then(function() {
        driver.wait(until.elementsLocated(By.className("mb-1"), 5 * 1000)).then(function(elements){
          elements.forEach(function (element) {
            element.getText().then(function(text){
                console.log(text);
            });
        });
        return elements[0].click();
      }).then(function() {
        driver.wait(until.elementsLocated(By.className("text-4xl"), 5 * 1000)).then(function(elements){
          elements.forEach(function (element) {
              element.getText().then(function(text){
                  console.log(text);
              });
          });
            return elements[0].click()
        }).then(function() {
          driver.wait(until.elementsLocated(By.className("text-4xl"), 5 * 1000)).then(function(elements){
            elements.forEach(function (element) {
                element.getText().then(function(text){
                    console.log(text);
                });
            });
            elements[0].getText().then(function(text) {
              totalRequests = text
              console.log("Total requests first "+totalRequests)
            })
            return elements[0].click()
          }).then(function() {
            driver.wait(until.elementsLocated(By.className("text-gray-700"), 5 * 1000)).then(function(elements){
              elements.forEach(function (element) {
                  element.getText().then(function(text){
                      console.log("In gray" +text);
                  });
              });
              elements[0].getText().then(function(text) {
                totalRequests = totalRequests.replace(text,'')
                console.log("Total requests second "+totalRequests)
              })
                
                return elements[0].click()
            })
          })
        })
      })
  });

  
  return promise;
 }
}



module.exports = new LoginPage();
