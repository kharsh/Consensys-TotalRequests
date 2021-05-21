const {WebElement,Builder, By, Key, until} = require('selenium-webdriver');
var BasePage = require('./basepage');
var webdriver = require('selenium-webdriver');
const { elementLocated } = require('selenium-webdriver/lib/until');

class LoginPage extends BasePage {
/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns promise 
 * 
 * getTotalRequests Function performs following steps
  1. User login using credentials 
  2. Navigate to Dashboard page
  3. Navigate to Project Page
  4. Read the text to get number of requests.
  5. Parse number of requests and return in the promise the 
     total number of requests found on UI Dashboard page "totalRequests"
 */
 getTotalRequests(email, password) {
  let promise = new Promise(function(resolve, reject) {
    var totalRequests;
  
  //find email text field and enter email
  driver.wait(until.elementLocated(By.id('email')), 5 * 1000).then(el => {
      el.sendKeys(email);
  });

  //find password text field and enter password
  driver.wait(until.elementLocated(By.id('password')), 5 * 1000).then(el => {
      return el.sendKeys(password);
    });
  
  //Submit the login form to login and navigate to next page
  driver.wait(until.elementLocated(By.xpath("//*[text()='Submit']")), 5 * 1000).then(el => {
    return el.click();
  });
  
  /**
   * This is promise chain, each then handler performs selenium action to simulate user navigation
    behavior.
   */
  driver.wait(until.elementsLocated(By.className("mt-2"), 5 * 1000)).then(function(elements){
    //Click on Ethereum icon in left flex panel
    return elements[0].click();
  }).then(function() {
      /**
       * Iterate through each Project listing(This has to be done for selenium to run reliably)
        Once iteration is complete click on first project in the list
       */
      driver.wait(until.elementsLocated(By.className("mb-1"), 5 * 1000)).then(function(elements){
        elements.forEach(function (element) {
          element.getText().then(function(text){
            console.log(text);
          });
        });
        return elements[0].click();
      }).then(function() {
        /**
         * There should be 2 iterations pefromed on class 'text-4xl', which gives the text values for request 
          stats, in order for selenium to wait for the project page to load properly. 
          **IN FIRST ITERATION IF YOU OBSERVE CAREFULLY ALL THE ELEMENT TEXT VALUE 
          RETURN 0 TEXT**.
          In the second iteration we get the actual values that are finally displayed.
         */
        driver.wait(until.elementsLocated(By.className("text-4xl"), 5 * 1000)).then(function(elements){
          elements.forEach(function (element) {
            element.getText().then(function(text){
              console.log(text);
            });
          });
          return elements[0].click()
        }).then(function() {
          //Iteration gives final values displayed on UI
          driver.wait(until.elementsLocated(By.className("text-4xl"), 5 * 1000)).then(function(elements){
            elements.forEach(function (element) {
              element.getText().then(function(text){
                console.log(text);
              });
            });
            elements[0].getText().then(function(text) {
              totalRequests = text
              //console.log("Total requests first "+totalRequests)
            })
            return elements[0].click()
          }).then(function() {
            /**
             * Gives the entire stat text which has to be parsed in order to extract
             * only total number of requests
             */
            driver.wait(until.elementsLocated(By.className("text-gray-700"), 5 * 1000)).then(function(elements){
              elements.forEach(function (element) {
                element.getText().then(function(text){
                    console.log("Stats text - " +text);
                });
              });
              elements[0].getText().then(function(text) {
                /**
                 * The final value representing total requests has to parsed since
                 * it contains the additional percentage text for example (11994.41%)
                 */

                totalRequests = totalRequests.replace(text,'')
                console.log("Total requests found "+totalRequests)
                resolve(totalRequests)
              })
              return elements[0].click()
            })
          })
        })
      })
    });
  })
  return promise;
 }
}
module.exports = new LoginPage();
