/* auto-generated: TimeSlot.js */

module.exports = class {
  constructor(req = {}, res = {}, params = {}) {
    this.req = req;
    this.res = res;
    this.params = params;
    this.data = {};

    this.data['Status'] = params['Status'];
    this.data['TimeSlots'] = params['TimeSlots'].replace(/T/, ' ').replace('Z', '');
    this.data['Description'] = params['Description'];
    this.schema = {
      type: 'object',
      properties: {
        Status: {
          type: 'integer',
          example: 200
        },
        TimeSlots: {
          type: 'string',
          format: 'date-time'
        },
        Description: {
          type: 'string',
          example: 'OK'
        }
      }
    };
  }

};