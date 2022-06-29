/* auto-generated: Error.js */

module.exports = class {
  constructor(req = {}, res = {}, params = {}) {
    this.req = req;
    this.res = res;
    this.params = params;
    this.data = {};

    this.data['Description'] = params['Description'];
    this.data['ReasonPhrase'] = params['ReasonPhrase'];
    this.schema = {
      type: 'object',
      properties: {
        Description: {
          type: 'string',
          example: 'bad username',
          description: 'General ui of the error'
        },
        ReasonPhrase: {
          type: 'string',
          example: '1, 4',
          description: 'Specific reason for the error'
        }
      }
    };
  }

};