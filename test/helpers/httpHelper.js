var axios = require('axios')
const dataHelper = require('./dataHelper')
const data = require('./data.json')
/**
 * Helper class, it sends all json RPC requests to ropsten network
 */
class HttpHelper {
    async getLatestEthBlockByNumber() {
        var response = await axios(dataHelper.getLatestBlockNumberByPostReq())
        return(parseInt(response.data.result.number, data.hex))
    }

    /**
     * 
     * @param {*} latestBlockNumber 
     * @returns responses
     * 
     * This method makes given number of requests to retrive the most latest
     * block numbers for example - if the latestBlockNumber is 10000 and we mentioned
     * 1000 number_of_block_requests the this method returns an array of 1000 response data
     * with blocks from 9000 to 10000.
     */
    async getNumberOfMostRecentEthBlocks(latestBlockNumber) {
        var responses = []
        let latestBlockNumberHex = dataHelper.getBlockNumberInHex(latestBlockNumber)
        console.log("Latest Block number Hex found" +latestBlockNumberHex)
        var requestBlockNumber = latestBlockNumber
        while(requestBlockNumber > (latestBlockNumber - data.number_of_block_requests)) {   
            await axios(dataHelper.getBlockNumberPostReq(requestBlockNumber)).then(response => {  
                responses.push(response.data)
                console.log(response.data.result.number)
                console.log(parseInt(response.data.result.number))
            }).catch(errors => {
              console.log("Errors - "+errors)
            })
            requestBlockNumber = requestBlockNumber - 1;
        } 
        return responses
    }
}

module.exports = new HttpHelper()