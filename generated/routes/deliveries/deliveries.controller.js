// const dal = require('../../helpers/dal'); 

module.exports = class {
  async DeliveriesDaily(req, res) {
    try {
      console.log('===> Executing generated route: DeliveriesDaily');

      //const results = await dal.query("SELECT FN_DeliveriesDaily() as Response", [], { redis: true });

      //res.code(results.Status).send(results);

      res.code(200).send({
        Data: [{
          notes: 'string',
          DeliveryID: 1,
          DeliverStatusID: 1,
          FormatedAddress: {},
          Scheduletimeslot: 'string'
        }],
        Status: 200,
        Description: 'OK'
      }, null);
    } catch (error) {
      console.error(`Error in DeliveriesDaily: ${error.message}`);

      res.code(500).send({
        Status: 500,
        Message: 'Error in DeliveriesDaily',
        Description: error.message,
      });
    }
  }
  async DeliveriesWeekly(req, res) {
    try {
      console.log('===> Executing generated route: DeliveriesWeekly');

      //const results = await dal.query("SELECT FN_DeliveriesWeekly() as Response", [], { redis: true });

      //res.code(results.Status).send(results);

      res.code(200).send({
        Data: [{
          notes: 'string',
          DeliveryID: 1,
          DeliverStatusID: 1,
          FormatedAddress: {},
          Scheduletimeslot: 'string'
        }],
        Status: 200,
        Description: 'OK'
      }, null);
    } catch (error) {
      console.error(`Error in DeliveriesWeekly: ${error.message}`);

      res.code(500).send({
        Status: 500,
        Message: 'Error in DeliveriesWeekly',
        Description: error.message,
      });
    }
  }
  async DeliveriesCancel(req, res) {
    try {
      console.log('===> Executing generated route: DeliveriesCancel');

      const DeliveryID = req.params['DeliveryID'];
      //const results = await dal.query("SELECT FN_DeliveriesCancel(?) as Response", [DeliveryID], { redis: true });

      //res.code(results.Status).send(results);

      res.code(200).send({
        Status: 200,
        Description: 'Delivery XXX Canceled'
      }, null);
    } catch (error) {
      console.error(`Error in DeliveriesCancel: ${error.message}`);

      res.code(500).send({
        Status: 500,
        Message: 'Error in DeliveriesCancel',
        Description: error.message,
      });
    }
  }
  async DeliveriesComplete(req, res) {
    try {
      console.log('===> Executing generated route: DeliveriesComplete');

      const DeliveryID = req.params['DeliveryID'];
      //const results = await dal.query("SELECT FN_DeliveriesComplete(?) as Response", [DeliveryID], { redis: true });

      //res.code(results.Status).send(results);

      res.code(200).send({
        Status: 200,
        Description: 'Delivery XXX Complited'
      }, null);
    } catch (error) {
      console.error(`Error in DeliveriesComplete: ${error.message}`);

      res.code(500).send({
        Status: 500,
        Message: 'Error in DeliveriesComplete',
        Description: error.message,
      });
    }
  }
};
