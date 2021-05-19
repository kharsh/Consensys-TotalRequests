const loginpage = require('../pageObjects/loginpage')
const dashboard = require('../pageObjects/dashboardpage');
const { request } = require('chai');
describe('This is my Dashboard', function() {
  beforeEach(function() {

  });

  afterEach(function() {
    //loginpage.closeDriver()
  });

  it('Number of requests test', async function() {
    var baseUrl = 'https://infura.io/login';
    loginpage.go_to_url(baseUrl);
    loginpage.getTotalRequests('hkproject05@gmail.com', 'Atharva#179').then(function(requests) {
      console.log("Final total requests "+requests);
    }).catch(err =>{
      console.log(err)
    })
    
  })
})
