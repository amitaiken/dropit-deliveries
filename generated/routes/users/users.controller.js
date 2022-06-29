// const dal = require('../../helpers/dal'); 

module.exports = class {
  async UsersBookDelivery(req, res) {
    try {
      console.log('===> Executing generated route: UsersBookDelivery');

      //const DeliveriesBook = new global.classes['DeliveriesBook'](req, res, req.body);
      //await DeliveriesBook.validate();

      //const results = await dal.query("SELECT FN_UsersBookDelivery(?) as Response", [DeliveriesBook.data], { redis: true });

      //res.code(results.Status).send(results);

      res.code(200).send({
        Data: [{
          User: 1,
          Timeslot: 'string'
        }],
        Status: 200,
        Description: 'OK'
      }, null);
    } catch (error) {
      console.error(`Error in UsersBookDelivery: ${error.message}`);

      res.code(500).send({
        Status: 500,
        Message: 'Error in UsersBookDelivery',
        Description: error.message,
      });
    }
  }
  async UsersResolveAddress(req, res) {
    try {
      console.log('===> Executing generated route: UsersResolveAddress');

      const UserID = req.params['UserID'];
      //const results = await dal.query("CALL SP_UsersResolveAddress(?)", [UserID], { redis: false });

      //res.code(results.Status).send(results);

      res.code(200).send({
        Status: 200,
        Description: 'UserID: XXX FormatedAdress Updated'
      }, null);
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
      console.log('===> Executing generated route: UsersFormattedAddressUpdate');

      const FormattedAddress = req.params['FormattedAddress'];
      const UserID = req.params['UserID'];
      //const results = await dal.query("CALL SP_UsersFormattedAddressUpdate(?, ?)", [FormattedAddress, UserID], { redis: false });

      //res.code(results.Status).send(results);

      res.code(200).send({
        Status: 200,
        Description: 'UserID: XXX FormatedAdress Updated'
      }, null);
    } catch (error) {
      console.error(`Error in UsersFormattedAddressUpdate: ${error.message}`);

      res.code(500).send({
        Status: 500,
        Message: 'Error in UsersFormattedAddressUpdate',
        Description: error.message,
      });
    }
  }
};
