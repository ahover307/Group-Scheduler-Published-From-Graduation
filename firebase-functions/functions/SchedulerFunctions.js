import {kickstartGenerateTimesFunction} from "./SchedulerHelperFunctions";

const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);

//Creates a list of times for the checked party.
// Because it returns a sanitized list of just the times available, the security risk of not being authenticated is allowable in this scope
/*
 * Required params:
 *      partyPackage:   int (code defined in reference file)
 *      dayOfWeek:      int (code defined in reference file)
 *      roomsRequested: int[] (codes defined in reference file)
 *      dateDay:        int
 *      dateMonth:      int
 *      dateYear:       int
 * return   :   available times - 2D array containing the ordered rooms to use, and available start and end times of each time
 */
exports.checkPartyTimes = functions.https.onCall(async (data, context) => {
    return await kickstartGenerateTimesFunction({
        partyPackage: parseInt(data.partyPackage),
        dayOfWeek: parseInt(data.dayOfWeek),
        roomsRequested: data.roomsRequested,
        dateDay: parseInt(data.dateDay),
        dateMonth: parseInt(data.dateMonth),
        dateYear: parseInt(data.dateYear)
    });
});
