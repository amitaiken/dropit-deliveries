let mysql = require('mysql');
let config = require('/helper/config');
let connection = mysql.createConnection(config);
const axios = require('axios').default;
const XLSXGenerator = require('./helpers/create-xlsx.js');



async function getNextSundayDate(){
    let today = new Date();
    let nextSundayDate = new Date(today. getFullYear(), today. getMonth(), today. getDate()+7);
    return nextSundayDate;
}

async function getHolidaysTimeslots() {
    //https://holidayapi.com/v1/workday?pretty&key=__YOUR_API_KEY__&country=IL&start=2021-06-16&days=7
    const baseURL = 'https://holidayapi.com/v1/holidays?pretty&key='
    const key = '__YOUR_API_KEY__';
    const country = 'IL'
    const start = await getNextSundayDate();
    const days = 7;
    const urlString = baseURL + key + '&country=' + country + '&start=' + start + '&days=' + days;
    let daysTimeslots = await axios(urlString);
    return daysTimeslots;
}

class TimeSlots {
    start;
    end;
    days = {}
    constructor(bookedTimeslots, holidaysTimeslots) {
        this.start = getNextSundayDate();
        this.end = new Date();
        this.end.setDate(this.start.getDate() + 4);

    }
}

module.exports = class {
    constructor(req = {}, res = {}, params = {}) {
        this.req = req;
        this.res = res;
        this.params = params;
    }
    async ScheduleTimeslots(req, res) {
        function getAvailableTimeslots(bookedTimeslots, holidaysTimeslots) {

            return availableTimeslots;
        }

        try {
            const results = await connection.query("FN_ScheduleTimeslots()");
            const bookedTimeslots = results.Data;
            const holidaysTimeslots = await getHolidaysTimeslots();
            let weekTimeslots = new TimeSlots(bookedTimeslots, holidaysTimeslots);
            weekTimeslots = JSON.parse(weekTimeslots);
            //const WeekTimeslots = getAvailableTimeslots(bookedTimeslots, holidaysTimeslots);
            res.code(200).send(weekTimeslots);
        } catch (error) {
            console.error(`Error in ScheduleTimeslots: ${error.message}`);
            res.code(500).send({
                Status: 500,
                Message: 'Error in ScheduleTimeslots',
                Description: error.message,
            });
        }
    }
};
