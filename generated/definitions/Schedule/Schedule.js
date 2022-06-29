/* auto-generated: Schedule.js */

module.exports = class {
  constructor(req = {}, res = {}, params = {}) {
    this.req = req;
    this.res = res;
    this.params = params;
    this.data = {};

    this.data['TimeSlotID'] = params['TimeSlotID'];
    this.data['DeliveriesCount'] = params['DeliveriesCount'];
    this.schema = {
      type: 'object',
      properties: {
        TimeSlotID: {
          type: 'integer',
          example: 1
        },
        DeliveriesCount: {
          type: 'integer',
          example: 1
        }
      }
    };
  }

};