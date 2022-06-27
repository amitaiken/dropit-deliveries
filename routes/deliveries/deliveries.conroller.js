let mysql = require('mysql');
let config = require('config');
let connection = mysql.createConnection(config);

module.exports = class {
    constructor(req = {}, res = {}, params = {}) {
        this.req = req;
        this.res = res;
        this.params = params;
    }
    async DeliveriesWeekly(req, res) {
        try {
            let results = await connection.Query("FN_DeliveriesWeekly()");
            results = JSON.parse(results)
            res.code(results.Status).send(results);
        } catch (error) {
            console.error(`Error in DeliveriesWeekly: ${error.message}`);
            res.code(500).send({
                Status: 500,
                Message: 'Error in DeliveriesWeekly',
                Description: error.message,
            });
        }
    }
    async DeliveriesDaily(req, res) {
        try {
            let results = await connection.Query("FN_DeliveriesDaily()");
            results = JSON.parse(results)
            res.code(results.Status).send(results);
        } catch (error) {
            console.error(`Error in DeliveriesDaily: ${error.message}`);
            res.code(500).send({
                Status: 500,
                Message: 'Error in DeliveriesDaily',
                Description: error.message,
            });
        }
    }
    async DeliveriesCancel(req, res) {
        try {
            const DeliveryID = parseInt(req.params['DeliveryID']);
            let results = await connection.query("CALL SP_DeliveriesCancel(?)", [DeliveryID]);
            results = JSON.parse(results)
            res.code(results.Status).send(results);
        } catch (error) {
            console.error(`Error in DeliveriesCancel: ${error.message}`);

            res.code(500).send({
                Status: 500,
                Message: 'Error in DeliveriesCancel',
                Description: error.message,
            });
        }
    }
    async DeliveriesCompleted(req, res) {
        try {
            const DeliveryID = parseInt(req.params['DeliveryID']);
            let results = await connection.query("CALL SP_DeliveriesCompleted(?)", [DeliveryID]);
            results = JSON.parse(results);
            res.code(results.Status).send(results);
        } catch (error) {
            console.error(`Error in DeliveriesCompleted: ${error.message}`);
            res.code(500).send({
                Status: 500,
                Message: 'Error in DeliveriesCompleted',
                Description: error.message,
            });
        }
    }
    async DeliveriesBookDelivery(req, res) {
        try {
            let bookDelivery = new global.classes['BookDelivery'](req, res, req.body);
            bookDelivery = JSON.parse(JSON.stringify(bookDelivery.params));
            //await DeliveriesBookDelivery.validate();
            let results = await connection.Query("SP_DeliveriesBookDelivery(?)", [bookDelivery]);
            results = JSON.parse(results)
            res.code(results.Status).send(results);
        } catch (error) {
            console.error(`Error in DeliveriesBookDelivery: ${error.message}`);
            res.code(500).send({
                Status: 500,
                Message: 'Error in DeliveriesBookDelivery',
                Description: error.message,
            });
        }
    }
};
