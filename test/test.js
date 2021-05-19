var assert = require('assert')
var chai = require('chai')
var chaiHttp = require('chai-http')
var expect = chai.expect;
var assertChai = chai.assert;
var axios = require('axios')
const loginpage = require('../pageObjects/loginpage')
const dashboard = require('../pageObjects/dashboardpage');
const { doesNotMatch } = require('assert')


describe('eth_getBlockByNumber', function(){
  var latestBlockNumber = 0;
  var totalRequests;
  var baseUrl = 'https://infura.io/login';

  before(async function() {
    loginpage.go_to_url(baseUrl);
    return loginpage.getTotalRequests('hkproject05@gmail.com', 'Atharva#179').then(function(requests) {
      totalRequests = requests;
      console.log("Final total requests "+totalRequests)
      return totalRequests;
    })
    
  })
  
  it('should return the latest block', async function() {
      var response = await axios({
              method: 'post',
              url: 'https://ropsten.infura.io/v3/4cc02ca8b4fd4eb19955757564ffc15f',
              data: {
                id: 0,
                jsonrpc: '2.0',
                method: "eth_getBlockByNumber",
                params:["latest", true]
              }
          })
          hex = response.data.result.number;
          latestBlockNumber = parseInt(hex, 16)
          assertChai.isNumber(latestBlockNumber, "Got the latest block number")
          console.log("Latest block number", latestBlockNumber)
    });

    it('Make 1000 requests', async function() {
      latestBlockNumberHex = latestBlockNumber.toString(16);
      latestBlockNumberHex = "0x"+latestBlockNumberHex
      console.log("Latest Block number Hex found" +latestBlockNumberHex)
      var requests = []
      var config = {
        method: 'post',
        url: 'https://ropsten.infura.io/v3/4cc02ca8b4fd4eb19955757564ffc15f',
        data: {
          id: 0,
          jsonrpc: '2.0',
          method: "eth_getBlockByNumber",
          params:[]
        }
      };
      var promises = [];
      blockNumber = latestBlockNumber
      while(latestBlockNumber > (blockNumber - 2)) {
        var obj = JSON.parse(JSON.stringify(config))
        latestBlockNumberHex = latestBlockNumber.toString(16);
        latestBlockNumberHex = "0x"+latestBlockNumberHex
        obj.data.params.push(latestBlockNumberHex)
        obj.data.params.push(true)
        requests.push(obj)
        latestBlockNumber = latestBlockNumber - 1;
        promises.push(obj)
      }

      await axios(requests[0]).then(response => {
        console.log(response)
      }).then(async function() {
        loginpage.go_to_url(baseUrl);
          return loginpage.getTotalRequests('hkproject05@gmail.com', 'Atharva#179').then(function(requests) {
          totalRequests = requests;
          console.log("Final total requests "+totalRequests)
          return totalRequests;
        })
      })
      .catch(errors => {
        console.log("Errors - "+errors)
      })

});
});
