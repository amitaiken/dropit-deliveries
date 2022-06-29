/* auto-generated: Users.js */

module.exports = class {
  constructor(req = {}, res = {}, params = {}) {
    this.req = req;
    this.res = res;
    this.params = params;
    this.data = {};

    this.data['City'] = params['City'];
    this.data['State'] = params['State'];
    this.data['Adress'] = params['Adress'];
    this.data['UserID'] = params['UserID'];
    this.data['Address'] = params['Address'];
    this.data['Phone_1'] = params['Phone_1'];
    this.data['Phone_2'] = params['Phone_2'];
    this.data['ZipCode'] = params['ZipCode'];
    this.data['CompanyName'] = params['CompanyName'];
    this.data['ConsulName_2'] = params['ConsulName_2'];
    this.schema = {
      type: 'object',
      properties: {
        City: {
          type: 'string',
          example: 'Natanya'
        },
        State: {
          type: 'string',
          example: 'Israel'
        },
        Adress: {
          type: 'string',
          example: 'Netiv 4'
        },
        UserID: {
          type: 'integer',
          example: 1
        },
        Address: {
          type: 'string',
          example: 'Netiv 4'
        },
        Phone_1: {
          type: 'string',
          example: '0505246951'
        },
        Phone_2: {
          type: 'string'
        },
        ZipCode: {
          type: 'string'
        },
        CompanyName: {
          type: 'string',
          example: 'Telcom'
        },
        ConsulName_2: {
          type: 'string',
          example: 'Danni'
        }
      }
    };
  }

};