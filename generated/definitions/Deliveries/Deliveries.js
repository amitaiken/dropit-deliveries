/* auto-generated: Deliveries.js */

module.exports = class {
  constructor(req = {}, res = {}, params = {}) {
    this.req = req;
    this.res = res;
    this.params = params;
    this.data = {};

    this.data['notes'] = params['notes'];
    this.data['DeliveryID'] = params['DeliveryID'];
    this.data['DeliverStatusID'] = params['DeliverStatusID'];
    this.data['FormatedAddress'] = params['FormatedAddress'];
    this.data['Scheduletimeslot'] = params['Scheduletimeslot'].replace(/T/, ' ').replace('Z', '');
    this.schema = {
      type: 'object',
      properties: {
        notes: {
          type: 'string'
        },
        DeliveryID: {
          type: 'integer',
          example: 1
        },
        DeliverStatusID: {
          type: 'integer',
          example: 1
        },
        FormatedAddress: {
          type: 'object',
          additionalProperties: true
        },
        Scheduletimeslot: {
          type: 'string',
          format: 'date-time'
        }
      }
    };
  }

};