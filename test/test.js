var assert = require('assert')
var chai = require('chai')
var expect = chai.expect;
var assertChai = chai.assert;

const httpHelper = require('./helpers/httpHelper')
const data = require('./helpers/data.json')
const dashboardPage = require('./ui/dashboard')

describe('JSON-RPC method eth_getBlockByNumber see Total requests on Infura Dashboard ', function(){
  var latestBlockNumber;
  var totalRequestsSeenOnDashboardUI;
  
  before(async function() {
    totalRequestsSeenOnDashboardUI = await dashboardPage.readTotalNumberOfRequests()
    console.log("Dashboard requests " +totalRequestsSeenOnDashboardUI)
  })
  
  it('should return the latest eth block by eth_getBlockByNumber POST request', async function() {
      latestBlockNumber = await httpHelper.getLatestEthBlockByNumber()
      assertChai.isNumber(latestBlockNumber, "Received a valid latest Eth block using eth_getBlockByNumber POST request")
      console.log("Latest block number", latestBlockNumber)
  });

  it('Retrieve most recent 1000 blocks', async function() {
    responses = await httpHelper.getNumberOfMostRecentEthBlocks(latestBlockNumber)
    /**
     * validate each response we can certainly add more asserts for each response received
     */
    
    responses.forEach(response => {
      assertChai.isNumber(parseInt(response.result.number), "Response has Eth block number")
      assertChai.isNotEmpty(response.result.nonce, "Nonce value is not empty")
      assertChai.isNotEmpty(response.result.size, "Size is not empty")
      assertChai.equal(response.jsonrpc, '2.0', "response has correct json rpc version")
      assertChai.isNumber(response.id, "response id is a number")
    });
  });

  it("Total number of requests displayed on dashboard are correct", async function() {
    var latestNumberOfRequestsonDashBoard = await dashboardPage.readTotalNumberOfRequests()
    //data.number_of_block_requests +1** count one request made to get latest block
    
    assert.strictEqual(parseInt(latestNumberOfRequestsonDashBoard.replace(',','')), (parseInt(totalRequestsSeenOnDashboardUI.replace(',','')) + data.number_of_block_requests +1), "Numbers do match")
    //Show on the terminal log the final request number 
    
  })
});
