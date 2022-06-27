let mysql = require('mysql');
let config = require('config');
let connection = mysql.createConnection(config);
const axios = require('axios').default;
//const XLSXGenerator = require('../../helpers/create-xlsx.js');

async function getHolidaysTimeslots(sunday) {
    const baseURL = 'https://holidayapi.com/v1/holidays?pretty&key='
    const key = process.env.HOLIDAY_API_KEY;
    const country = 'IL'
    const days = 5;
    const urlString = baseURL + key + '&country=' + country + '&start=' + sunday + '&days=' + days;
    let daysTimeslots = await axios(urlString);
    return daysTimeslots;
}

class DaySchedule {
    scheduleDate;
    isHoliday;
    availableTimeslots = [];
    deliveriesCount = 0;
    constructor(date) {
        this.scheduleDate = date;
        let currentTimeslot = new Date(date)
        currentTimeslot.setHours(9);
        for (let i = 0; i<7; i++){
            currentTimeslot = new Date(currentTimeslot);
            currentTimeslot.setHours(1.5*i);
            this.availableTimeslots.push(currentTimeslot);
        }
    }
    markAsHoliday(){
        this.isHoliday = 1;
        this.availableTimeslots = [];
    };
    markBookedTimeslots(bookedTimeslots){

    }

}

class ScheduleTimeslots {
    startDate
    endDate
    daysArray = [];
    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
        let daysLoop = startDate;
        while (daysLoop >= endDate){
            let currentDay = new DaySchedule(daysLoop);
            this.daysArray.push(currentDay)
        }
    }
    getAvailableTimeslots(bookedTimeslots, holidaysTimeslots) {
        function isHoliday(holidaysTimeslots) {
            return false;
        }

        this.daysArray.forEach(day => {
           if (isHoliday(holidaysTimeslots)) day.markAsHoliday();
           day.markBookedTimeslots(bookedTimeslots)
        });
    }
}

module.exports = class {
    constructor(req = {}, res = {}, params = {}) {
        this.req = req;
        this.res = res;
        this.params = params;
    }
    async ScheduleTimeslots(req, res) {
        try {
            const results = await connection.query("FN_ScheduleTimeslots()");
            const bookedTimeslots = JSON.parse(results.Data);
            const holidaysTimeslots = await getHolidaysTimeslots(results.NextSunday);
            const scheduleTimeslots = new ScheduleTimeslots(results.NextSunday, results.NextThursday)
            scheduleTimeslots.getAvailableTimeslots(bookedTimeslots, holidaysTimeslots);
            res.code(200).send(scheduleTimeslots).header('Content-Type', 'application/vnd.ms-excel');
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
