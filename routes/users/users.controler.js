let mysql = require('mysql');
let config = require('/helper/config');
let connection = mysql.createConnection(config);

async function getUserFormattedAddress(addressData) {
    
}

module.exports = class {
    constructor(req = {}, res = {}, params = {}) {
        this.req = req;
        this.res = res;
        this.params = params;
    }
    async UsersResolveAddress(req, res) {
        try {
            const userID = parseInt(req.params['UserID']);
            let results = await connection.query("FN_UsersResolveAddress(?)",[userID]);
            const addressData = JSON.parse(results.Data);
            const formattedAddress = await getUserFormattedAddress(addressData);
            results = await connection.query("SP_UsersResolveAddress(?, ?)",[userID, addressData]);
            res.code(results.Status).send(results);
        } catch (error) {
            console.error(`Error in UsersResolveAddress: ${error.message}`);
            res.code(500).send({
                Status: 500,
                Message: 'Error in UsersResolveAddress',
                Description: error.message,
            });
        }
    }
    async FormattedAddressUpdate(req, res) {
        try {
            const formattedAddress = JSON.parse(req.params['FormattedAddress']);

            results = await connection.query("SP_UsersResolveAddress(?, ?)",[userID, formattedAddress]);
            res.code(results.Status).send(addressData);
        } catch (error) {
            console.error(`Error in FormattedAddressUpdate: ${error.message}`);
            res.code(500).send({
                Status: 500,
                Message: 'Error in FormattedAddressUpdate',
                Description: error.message,
            });
        }
    }
};
