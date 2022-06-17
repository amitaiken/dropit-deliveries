/* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
const XLSX = require('xlsx');
const fs = require('fs');

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function reverseString(str) {     // program to reverse a string
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}

function convertToAbBase(columnNumber) {
    let columnName = '';
    while (columnNumber > 0) {
        let Zremainder = columnNumber % 26;
        if (Zremainder == 0) {                  // If remainder is 0, then a 'Z' must be there in output
            columnName = columnName + "Z"
            columnNumber = Math.floor(columnNumber / 26) - 1;
        }
        else {                                  // If remainder is non-zero
            columnName = columnName + String.fromCharCode((Zremainder - 1) + 'A'.charCodeAt(0))
            columnNumber = Math.floor(columnNumber / 26);
        }
    }
    columnName = reverseString(columnName)
    return columnName
}

function getDatesBetween(startDate, stopDate) {
    let dateArray = new Array();
    let currentDate =  new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDay());
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

class XLSXGenerator {
    constructor(req, res) {
        console.log("XLSXGenerator Class is loading ... ");
        this.reportData = req;
    }
    async createExcelAttendanceReport(reportData, holidaysTimeslots, fileName){
        try {
            let wb = XLSX.utils.book_new();
            wb.Props = {
                Title: fileName,
                Author: "Generate by voiCenter machine",
                CreatedDate: new Date(Date.now())
            };
            const startDate =  new Date(this.reportData.StartDate); //new Date((Date.now()) - DayMultiplier*30 );//if() issuesIntervalData.StartDate;
            const endDate = new Date(this.reportData.EndDate); //new Date(Date.now());
            console.log('EndDate', endDate, 'StartDate', startDate)
            const headers = getDatesBetween(startDate, endDate);
            let issuesIntervalData = this.reportData.Data;
            Object.keys(issuesIntervalData).forEach(key => {
                const workerData = issuesIntervalData[key];
                const workerSheetData = new WorkerTableSheet(headers);
                /* fill jira issue lines */
                workerSheetData.fillJiraLines(workerData, holidaysTimeslots);
                /* Add total line */
                workerSheetData.summarizeDateTimeWork(workerData);
                //workerSheetData.defineCellsAsTime(workerData);
                XLSX.utils.book_append_sheet(wb, workerSheetData.worksheet, key);
            });
            const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'} );
            const date = Date.now();
            let f = XLSX.writeFile(wb, String(date + fileName));
            const excelFile = new Buffer.from(excelBuffer, "binary");
            return excelFile;
        } catch (e) {
            console.log(e);
        }
    }
}

class WorkerTableSheet {
    countHeaders = 0;
    countLines = 0;
    headers = [];
    workerXLSXLines = [];
    headerLine = [];
    firstColumn = {name: 'JiraIssues/Dates'};
    lineNames = [];
    worksheet = [];

    constructor(headers) {
        this.headers = headers;
        headers.forEach(header => {
            const date = header;
            this.headerLine.push(date);
            this.countHeaders += 1;
        });
        this.worksheet = XLSX.utils.json_to_sheet(this.headerLine);
        /* fix headers */
        XLSX.utils.sheet_add_aoa(this.worksheet, [this.headerLine], {origin: "A1"});
        XLSX.utils.sheet_add_aoa(this.worksheet, [['deliveries/Dates']], {origin: "A1"});
        XLSX.utils.sheet_add_aoa(this.worksheet, [['total deliveries']], {origin: {c: this.countHeaders, r: 0}});
        /* column width */
        this.worksheet["!cols"] = [{wch: 25}];
        for (let i = 0; i < headers.length; i++) {
            this.worksheet["!cols"].push({wch: 15});
        }
    }

    fillJiraLines(weekData, holidaysTimeslots) {
        weekData.forEach((workerJira, index) => {
            let issueTotalWork = 0;
            let freeTimeSlot = 1;
            const cellLine = index + 2;
            const letterIndex = "B"
            const cellAddress = letterIndex + cellLine;
            const jiraIssue = workerJira.project_name + '-' + workerJira.issueid;
            XLSX.utils.sheet_add_aoa(this.worksheet, [[jiraIssue]], {origin: cellAddress});
            const jiraTaskList = workerJira.TaskList;
            const taskListLength = jiraTaskList.length;
            let taskIndex = 0;
            for (let i = 1; i < this.countHeaders; i++) {
                let timeWork = 0;
                if (taskIndex < taskListLength) {
                    let currentTaskDate = new Date(jiraTaskList[taskIndex].logYear, (jiraTaskList[taskIndex].logMonth - 1), jiraTaskList[taskIndex].logDay);
                    if ((this.headers[i]).getTime() === currentTaskDate.getTime()) {
                        timeWork = jiraTaskList[taskIndex].timeworked // /3600
                        issueTotalWork += timeWork;
                        if ((issueTotalWork > 2 || (holidaysTimeslots.date == currentTaskDate))) freeTimeSlot = 0;
                        taskIndex += 1;
                    }
                }
                let cellAddress = {
                    c: i,
                    r: (cellLine - 1),
                };
                XLSX.utils.sheet_add_aoa(this.worksheet, [[freeTimeSlot]], {origin: cellAddress});
                let cell = this.worksheet[cellAddress];
                cell.z = 'h:mm:ss';
                XLSX.utils.format_cell(cell);

            }
        });
    }

    summarizeDateTimeWork(workerData) {
        let sumLine = [];
        const totalLineIndex = workerData.length;
        for (let i = 1; i < (this.countHeaders + 1); i++) {
            let totalDateTime = 0;
            for (let j = 0; j < totalLineIndex; j++) {
                if (this.workerXLSXLines[j][i]) totalDateTime += this.workerXLSXLines[j][i];    //&& this.workerXLSXLines[i][j]>0
            }
            sumLine.push(totalDateTime);
        }
        const targetCell = {c: 1, r: (totalLineIndex + 1), z: 'h:mm:ss'};
        XLSX.utils.sheet_add_aoa(this.worksheet, [sumLine], {origin: targetCell});
        const totalTitleIndex = {c: 0, r: (totalLineIndex + 1)};
        XLSX.utils.sheet_add_aoa(this.worksheet, [['Total']], {origin: totalTitleIndex});
    }
}
module.exports = XLSXGenerator;

