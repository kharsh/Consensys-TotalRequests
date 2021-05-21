const loginpage = require('../../pageObjects/loginpage')
const data = require('../helpers/data.json')

class DashBoard {
    async readTotalNumberOfRequests() {
        loginpage.go_to_url(data.baseUrl);
        return loginpage.getTotalRequests(data.email, data.password).then(function(requests) {
            console.log("Final total requests "+requests)
            return requests;
        })
    }
}

module.exports = new DashBoard()