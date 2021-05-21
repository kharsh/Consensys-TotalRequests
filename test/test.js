var assert = require('assert')
var chai = require('chai')
var expect = chai.expect;
var assertChai = chai.assert;

const httpHelper = require('./helpers/httpHelper')
const data = require('./helpers/data.json')
const dashboardPage = require('./ui/dashboard')

describe('eth_getBlockByNumber', function(){
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

  it('Make 1000 requests', async function() {
    await httpHelper.getNumberOfMostRecentEthBlocks(latestBlockNumber)
  });

    it("Make sure total requests match", async function() {
      var latestNumberOfRequestsonDashBoard = await dashboardPage.readTotalNumberOfRequests()
      //**data.number_of_block_requests +1** count one request made to get latest block
      assert.strictEqual(parseInt(latestNumberOfRequestsonDashBoard), (parseInt(totalRequestsSeenOnDashboardUI) + data.number_of_block_requests +1), "Numbers do match")
      
      console.log("Latest number of Dashboard requests on UI" +latestNumberOfRequestsonDashBoard)
    })
});
