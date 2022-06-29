/* auto-generated: DeliveriesInfo.js */

module.exports = class {
  constructor(req = {}, res = {}, params = {}) {
    this.req = req;
    this.res = res;
    this.params = params;
    this.data = {};

    this['Deliveries'] = new global.classes['Deliveries'](req, res, params['Data']);
    this.data['Data'] = this['Deliveries'].data;

    this.data['Status'] = params['Status'];
    this.data['Description'] = params['Description'];
    this.schema = {
      type: 'object',
      properties: {
        Data: {
          '$ref': '#/definitions/Deliveries'
        },
        Status: {
          type: 'integer',
          example: 200
        },
        Description: {
          type: 'string',
          example: 'OK'
        }
      }
    };
  }

};