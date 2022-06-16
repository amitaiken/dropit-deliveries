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

async function getNextThursdayDate(){
    let today = new Date();
    let nextSundayDate = new Date(today. getFullYear(), today. getMonth(), today. getDate()+12);
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

module.exports = class {
    constructor(req = {}, res = {}, params = {}) {
        this.req = req;
        this.res = res;
        this.params = params;
    }
    async ScheduleTimeslots(req, res) {
        function checkFreeTimeslots(bookedTimeslots, holidaysTimeslots) {
            let scheduleData;
            return scheduleData;
        }
        try {
            const results = await connection.query("FN_ScheduleTimeslots()");
            const bookedTimeslots = results.Data;
            const holidaysTimeslots = await getHolidaysTimeslots();
            const scheduleData = checkFreeTimeslots(bookedTimeslots, holidaysTimeslots)
            const weekTimeslots = new XLSXGenerator(scheduleData);
            const exelFile = await weekTimeslots.createExcelAttendanceReport(weekTimeslots.reportData, 'week-deliveries-schedule.xlsx');
            res.code(200).send(exelFile).header('Content-Type', 'application/vnd.ms-excel');
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
