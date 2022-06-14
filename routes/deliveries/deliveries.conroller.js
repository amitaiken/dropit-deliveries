let mysql = require('mysql');
let config = require('/helper/config');
let connection = mysql.createConnection(config);

module.exports = class {
    async DeliveriesWeekly(req, res) {
        try {
            //let childrenListFilter = new global.classes['ChildrenListFilter'](req, res, req.body);
            //childrenListFilter = JSON.parse(JSON.stringify(childrenListFilter.params));
            //await ChildrenListFilter.validate();

            const results = await connection.Query("FN_DeliveriesWeekly()");
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
            const results = await connection.Query("FN_DeliveriesDaily()");
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
            const results = await connection.query("CALL SP_DeliveriesCancel(?)", [DeliveryID]);
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
            const results = await connection.query("CALL SP_DeliveriesCompleted(?)", [DeliveryID]);
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
            let BookDelivery = new global.classes['BookDelivery'](req, res, req.body);
            BookDelivery = JSON.parse(JSON.stringify(childrenListFilter.params));
            //await DeliveriesBookDelivery.validate();
            const results = await connection.Query("SP_DeliveriesBookDelivery(?)", [BookDelivery]);
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
