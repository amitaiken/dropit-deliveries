/* auto-generated: UsersList.js */

module.exports = class {
  constructor(req = {}, res = {}, params = {}) {
    this.req = req;
    this.res = res;
    this.params = params;
    this.data = {};

    this.data['Data'] = [];
    if (!params['Data']) params['Data'] = []
    if (params['Data'].length && params['Data'].length > 0) {
      params['Data'].forEach((object) => {
        const Users = new global.classes['Users'](req, res, object);
        this.data.Data.push(Users.data);
      });
    }
    this.data['Status'] = params['Status'];
    this.data['Description'] = params['Description'];
    this.schema = {
      type: 'object',
      properties: {
        Data: {
          type: 'array',
          items: {
            '$ref': '#/definitions/Users'
          }
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