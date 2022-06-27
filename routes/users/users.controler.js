let mysql = require('mysql');
let config = require('config');
let connection = mysql.createConnection(config);
const axios = require('axios').default;


async function getFormattedAddress(addressData, singleLine) {
    const baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    const key = 'AIzaSyABp5ntY2-vgaLhBKyT4HWGiPXls1HAt8o';
    let locationRequest;
    if(!singleLine) {
        const city = encodeURIComponent((addressData.City).trim());
        const state = encodeURIComponent((addressData.State).trim());
        const address = encodeURIComponent((addressData.Address).trim());
        locationRequest = baseURL + address + '+' + city + '+' + state + '&key=' + key;
    } else {
        const address = encodeURIComponent((addressData).trim());
        locationRequest = baseURL + address + '&key=' + key;
    }
    const formattedAddress = await axios(locationRequest);
    return formattedAddress;
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
            const formattedAddress = await getFormattedAddress(addressData, 0);
            results = await connection.query("SP_UsersResolveAddress(?, ?)",[userID, formattedAddress]);
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
    async UsersFormattedAddressUpdate(req, res) {
        try {
            const singleLineAddress = req.params['Address'];
            const userID = req.params['UserID'];
            const formattedAddress = await getFormattedAddress(singleLineAddress, 1);
            let results = await connection.query("SP_UsersResolveAddress(?, ?)",[userID, formattedAddress]);
            results = JSON.parse(results);
            res.code(results.Status).send(results);
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
