/* auto-generated: CompleteResponse.js */

module.exports = class {
  constructor(req = {}, res = {}, params = {}) {
    this.req = req;
    this.res = res;
    this.params = params;
    this.data = {};

    this.data['Status'] = params['Status'];
    this.data['Description'] = params['Description'];
    this.schema = {
      type: 'object',
      properties: {
        Status: {
          type: 'integer',
          example: 200
        },
        Description: {
          type: 'string',
          example: 'Delivery XXX Complited'
        }
      }
    };
  }

};