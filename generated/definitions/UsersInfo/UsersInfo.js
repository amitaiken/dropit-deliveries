/* auto-generated: UsersInfo.js */

module.exports = class {
  constructor(req = {}, res = {}, params = {}) {
    this.req = req;
    this.res = res;
    this.params = params;
    this.data = {};

    this['Users'] = new global.classes['Users'](req, res, params['Data']);
    this.data['Data'] = this['Users'].data;

    this.data['Status'] = params['Status'];
    this.data['Description'] = params['Description'];
    this.schema = {
      type: 'object',
      properties: {
        Data: {
          '$ref': '#/definitions/Users'
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