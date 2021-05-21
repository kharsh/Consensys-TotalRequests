var axios = require('axios')
const dataHelper = require('./dataHelper')
const data = require('./data.json')

class HttpHelper {
    
    async getLatestEthBlockByNumber() {
        var response = await axios(dataHelper.getLatestBlockNumberByPostReq())
        return(parseInt(response.data.result.number, data.hex))
    }

    async getNumberOfMostRecentEthBlocks(latestBlockNumber) {
        let latestBlockNumberHex = dataHelper.getBlockNumberInHex(latestBlockNumber)
        console.log("Latest Block number Hex found" +latestBlockNumberHex)
        
        var numberOfValidResponses = 1
        var requestBlockNumber = latestBlockNumber
        while(requestBlockNumber > (latestBlockNumber - data.number_of_block_requests)) {   
            await axios(dataHelper.getBlockNumberPostReq(requestBlockNumber)).then(response => {
                numberOfValidResponses = numberOfValidResponses + 1
                console.log(response.data.result)
            }).catch(errors => {
              console.log("Errors - "+errors)
            })
            requestBlockNumber = requestBlockNumber - 1;
        } 
        console.log("Total number of requests "+numberOfValidResponses)
    }
}

module.exports = new HttpHelper()