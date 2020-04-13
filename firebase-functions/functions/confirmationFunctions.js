const admin = require('firebase-admin');
const functions = require('firebase-functions');

const db = admin.firestore();

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
exports.confirmTimeandCommitToDB = functions.https.onCall(async (data, context) => {
    //Data we need to pull to do this - We will need the entire state as all of it will be being pushed to the database.
    let contactName = toString(data.contactName);
    let email = toString(data.email);
    let phoneNumber = toString(data.phoneNumber);
    let wasPaid = parseInt(data.paid);
    let participantsAge = parseInt(data.participantsAge);
    let partyName = toString(data.partyName);
    let partyPackage = parseInt(data.partyPackage);
    let roomsRequested = [];
    data.roomsRequested.forEach(element => roomsRequested.push(parseInt(element)));
    let roomTimes = [];
    data.roomsRequested.forEach(element => roomTimes.push(parseInt(element)));
    let dayOfWeek = parseInt(data.dayOfWeek);
    let dateDay = parseInt(data.dateDay);
    let dateMonth = parseInt(data.dateMonth);
    let dateYear = parseInt(data.dateYear);

    let successful = false;
    //First confirm that the time is available, im not worried about this being an async call
    // and then inconsistencies from the gap of time that gives due to the volume of the website.
    //The odds of a collision are incredibly low, and can be found by periodic checks of the database

    //figure out how to nest function calls. Maybe just call the function directly from the other file?

    //Once it is confirmed that it still fits, commit this to the DB
    successful = await db.collection("parties").doc().set({
        contactName: contactName,
        email: email,
        phoneNumber: phoneNumber,
        paid: wasPaid,
        participantsAge: participantsAge,
        partyName: partyName,
        partyPackage: partyPackage,
        roomsRequested: roomsRequested,
        roomTimes: roomTimes,
        dayOfWeek: dayOfWeek,
        dateDay: dateDay,
        dateMonth: dateMonth,
        dateYear: dateYear,
    })
        .then(function () {
            return true;
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
    //Then return, if it was confirmed available and commit to the DB, or if it was not available.

    return successful;
});