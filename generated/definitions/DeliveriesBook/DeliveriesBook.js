/* auto-generated: DeliveriesBook.js */

module.exports = class {
  constructor(req = {}, res = {}, params = {}) {
    this.req = req;
    this.res = res;
    this.params = params;
    this.data = {};

    this.data['User'] = params['User'];
    this.data['Timeslot'] = params['Timeslot'].replace(/T/, ' ').replace('Z', '');
    this.schema = {
      type: 'object',
      properties: {
        User: {
          type: 'integer',
          example: 1
        },
        Timeslot: {
          type: 'string',
          format: 'date-time'
        }
      }
    };
  }

};