/* auto-generated: Response.js */

module.exports = class {
  constructor(req = {}, res = {}, params = {}) {
    this.req = req;
    this.res = res;
    this.params = params;
    this.data = {};

    this.data['Status'] = params['Status'];
    this.schema = {
      type: 'object',
      required: ['Status'],
      properties: {
        Status: {
          type: 'integer',
          example: 200,
          description: 'The code associated with the result of the response'
        }
      }
    };
  }

};