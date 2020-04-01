const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);

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
exports.checkPartyTimeOne = functions.https.onCall(async (data, context) => {
    //Pull params into function
    const partyPackage = parseInt(data.partyPackage);
    const dayOfWeek = parseInt(data.dayOfWeek);
    let roomsRequested = [];
    data.roomsRequested.forEach(element => roomsRequested.push(parseInt(element)));
    const partyDateDay = parseInt(data.dateDay);
    const partyDateMonth = parseInt(data.dateMonth);
    const partyDateYear = parseInt(data.dateYear);

    //Array to return
    let times = [[]];

    //If it has a single room to handle
    if (partyPackage === 0 || partyPackage === 1 || partyPackage === 5) {
        //Length of play each party offers
        let requiredPartyLength;
        switch (partyPackage) {
            case 0:
                requiredPartyLength = 12;
                break;
            case 1:
                requiredPartyLength = 16;
                break;
            case 5:
                requiredPartyLength = 10;
                break;
            default:
                throw new functions.https.HttpsError('bad-package-code', 'Party Package code unusable')

        }

        //Create reference to parties table
        let partiesRef = db.collection('Parties').where('dateDay', '==', partyDateDay).where('dateMonth', '==', partyDateMonth).where('dateYear', '==', partyDateYear);

        //Create reference to the special events table
        let specialEventsRef = db.collection('SpecialReservedTimes').where('dateDay', '==', partyDateDay).where('dateMonth', '==', partyDateMonth).where('dateYear', '==', partyDateYear);

        let openHoursRef = db.collection('OpenHours').where('dayOfWeek', '==', dayOfWeek);

        //Based on the room we are looking for, a few different things need to happen.
        // 1. find the open hours of that room
        openHoursRef = openHoursRef.where('room', '==', roomsRequested[0]);
        // 2. Find any other parties that would reserve that room
        partiesRef = partiesRef.where('roomsRequested', 'array-contains', roomsRequested[0]);
        // 3. Find any reserved times based in that room from our special events table
        specialEventsRef = specialEventsRef.where('area', '==', roomsRequested[0]);

        //Make the call to the DB looking for the open hours in that room
        //The odd hours are the open, close hours are closed. The should be paired up matched, but not necessarily in order outside of that
        let openHours = await openHoursRef.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                temp.push(doc.data().start);
                temp.push(doc.data().end);
            });
            return temp;
        }).catch(err => {
            // Error with the database
            throw new functions.https.HttpsError('database-failure', 'Could not find open hours: ' + err);
        });

        //Query the database. Save one list for area requested.
        let filledTimes = await partiesRef.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                let index = doc.data().roomsRequested.getIndex(roomsRequested[0]);
                temp.push(doc.data().roomTimes[index]);
                temp.push(doc.data().roomTimes[index + 1]);
            });
            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('parties-reference-break', 'Failed looking for the previous party times: ' + err);
        });

        //Make the call to the special reserved times db
        let specialTimes = await specialEventsRef.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                temp.push(doc.data().start);
                temp.push(doc.data().end);
            });
            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('special-times-reference-break', 'Failed looking for reserved times: ' + err);
        });

        //Array of available times for party room - Must check rules for these times
        let availableTimes = [];
        for (let i = 0; i < 288; i++) {
            availableTimes.push(false);
        }

        //Mark each hour that the room is open
        //There may be multiple open hours for the room
        for (let loop = 0; loop < (openHours.length / 2); loop += 2) {
            for (let i = openHours[loop]; i < openHours[loop + 1]; i++) {
                availableTimes[i] = true;
            }
        }

        //Mark off all special reserved times
        for (let loop = 0; loop < (specialTimes.length / 2); loop += 2) {
            for (let i = specialTimes[loop]; i < specialTimes[loop + 1]; i++) {
                availableTimes[i] = false;
            }
        }

        //Mark off the other parties from the reserved times
        for (let loop = 0; loop < (filledTimes.length / 2); loop += 2) {
            for (let i = filledTimes[loop]; i < filledTimes[loop + 1]; i++) {
                availableTimes[i] = false;
            }
        }

        //check rules on each time and store each positive result
        //Available time needs to be long enough
        //Rooms need to be consecutive in either order
        for (let loop = 0; loop < availableTimes.length; loop++) {
            let timeIsGood = true;

            //Look ahead and check if the party room will be long enough. If there is not enough time, mark it as false
            for (let i = 0; i < requiredPartyLength; i++) {
                if (!availableTimes[loop + i]) {
                    timeIsGood = false;
                    break;
                }
            }

            //If the time stays good in that window, keep that window. Keep all of the available times.
            if (timeIsGood) {
                times.push(roomsRequested[0]);
                times.push(loop);
                times.push(loop + requiredPartyLength);
            }
        }
    }

    //Return list of available times.
    return times;
});

exports.checkPartyTimeTwo = functions.https.onCall(async (data, context) => {
    //Pull params into function
    const partyPackage = parseInt(data.partyPackage);
    const dayOfWeek = parseInt(data.dayOfWeek);
    let roomsRequested = [];
    data.roomsRequested.forEach(element => roomsRequested.push(parseInt(element)));
    const partyDateDay = parseInt(data.dateDay);
    const partyDateMonth = parseInt(data.dateMonth);
    const partyDateYear = parseInt(data.dateYear);

    //Array to return
    let times = [];

    //If it has two rooms to handle
    if (partyPackage === 2 || partyPackage === 6 || partyPackage === 7 || partyPackage === 8) {
        //Length of play each party offers
        let requiredPartyLength1;
        let requiredPartyLength2;
        switch (partyPackage) {
            case 2:
                requiredPartyLength1 = 8;
                requiredPartyLength2 = 8;
                break;
            case 6:
                requiredPartyLength1 = 6;
                requiredPartyLength2 = 6;
                break;
            case 7:
                requiredPartyLength1 = 8;
                requiredPartyLength2 = 8;
                break;
            case 8:
                requiredPartyLength1 = 10;
                requiredPartyLength2 = 12;
                break;
            default:
                throw new functions.https.HttpsError('bad-package-code', 'Party Package code unusable')

        }

        //Create reference to parties table
        let partiesRef1 = db.collection('Parties').where('dateDay', '==', partyDateDay).where('dateMonth', '==', partyDateMonth).where('dateYear', '==', partyDateYear);
        let partiesRef2 = db.collection('Parties').where('dateDay', '==', partyDateDay).where('dateMonth', '==', partyDateMonth).where('dateYear', '==', partyDateYear);

        //Create reference to the special events table
        let specialEventsRef1 = db.collection('SpecialReservedTimes').where('dateDay', '==', partyDateDay).where('dateMonth', '==', partyDateMonth).where('dateYear', '==', partyDateYear);
        let specialEventsRef2 = db.collection('SpecialReservedTimes').where('dateDay', '==', partyDateDay).where('dateMonth', '==', partyDateMonth).where('dateYear', '==', partyDateYear);

        let openHoursRef1 = db.collection('OpenHours').where('dayOfWeek', '==', dayOfWeek);
        let openHoursRef2 = db.collection('OpenHours').where('dayOfWeek', '==', dayOfWeek);

        //Based on the room we are looking for, a few different things need to happen.
        // 1. find the open hours of that room
        openHoursRef1 = openHoursRef1.where('room', '==', roomsRequested[0]);
        openHoursRef2 = openHoursRef2.where('room', '==', roomsRequested[1]);
        // 2. Find any other parties that would reserve that room
        partiesRef1 = partiesRef1.where('roomsRequested', 'array-contains', roomsRequested[0]);
        partiesRef2 = partiesRef2.where('roomsRequested', 'array-contains', roomsRequested[1]);
        // 3. Find any reserved times based in that room from our special events table
        specialEventsRef1 = specialEventsRef1.where('area', '==', roomsRequested[0]);
        specialEventsRef2 = specialEventsRef2.where('area', '==', roomsRequested[1]);


        //Make the call to the DB looking for the open hours in that room
        let openHours1 = await openHoursRef1.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                temp.push(doc.data().start);
                temp.push(doc.data().end);
            });
            return temp;
        }).catch(err => {
            // Error with the database
            throw new functions.https.HttpsError('database-failure', 'Could not find open hours: ' + err);
        });
        let openHours2 = await openHoursRef2.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                temp.push(doc.data().start);
                temp.push(doc.data().end);
            });
            return temp;
        }).catch(err => {
            // Error with the database
            throw new functions.https.HttpsError('database-failure', 'Could not find open hours: ' + err);
        });

        //Query the database. Save one list for area requested.
        let filledTimes1 = await partiesRef1.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                let index = doc.data().roomsRequested.getIndex(roomsRequested[0]);
                temp.push(doc.data().roomTimes[index]);
                temp.push(doc.data().roomTimes[index + 1]);
            });
            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('parties-reference-break', 'Failed looking for the previous party times: ' + err);
        });
        let filledTimes2 = await partiesRef2.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                let index = doc.data().roomsRequested.getIndex(roomsRequested[0]);
                temp.push(doc.data().roomTimes[index]);
                temp.push(doc.data().roomTimes[index + 1]);
            });
            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('parties-reference-break', 'Failed looking for the previous party times: ' + err);
        });

        //Make the call to the special reserved times db
        let specialTimes1 = await specialEventsRef1.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                temp.push(doc.data().start);
                temp.push(doc.data().end);
            });
            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('special-times-reference-break', 'Failed looking for reserved times: ' + err);
        });
        let specialTimes2 = specialEventsRef2.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                temp.push(doc.data().start);
                temp.push(doc.data().end);
            });
            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('special-times-reference-break', 'Failed looking for reserved times: ' + err);
        });

        //Array of available times for party room - Must check rules for these times
        let availableTimes1 = [];
        let availableTimes2 = [];
        for (let i = 0; i < 288; i++) {
            availableTimes1.push(false);
            availableTimes2.push(false);
        }

        //Mark each hour that the room is open
        for (let loop = 0; loop < (openHours1.length / 2); loop += 2) {
            for (let i = openHours1[loop]; i < openHours1[loop + 1]; i++) {
                availableTimes1[i] = true;
            }
        }
        for (let loop = 0; loop < (openHours2.length / 2); loop += 2) {
            for (let i = openHours2[loop]; i < openHours2[loop + 1]; i++) {
                availableTimes2[i] = true;
            }
        }

        //Mark off all special reserved times
        for (let loop = 0; loop < (specialTimes1.length / 2); loop += 2) {
            for (let i = specialTimes1[loop]; i < specialTimes1[loop + 1]; i++) {
                availableTimes1[i] = false;
            }
        }
        for (let loop = 0; loop < (specialTimes2.length / 2); loop += 2) {
            for (let i = specialTimes2[loop]; i < specialTimes2[loop + 1]; i++) {
                availableTimes2[i] = false;
            }
        }

        //Mark off the other parties from the reserved times
        for (let loop = 0; loop < (filledTimes1.length / 2); loop += 2) {
            for (let i = filledTimes1[loop]; i < filledTimes1[loop + 1]; i++) {
                availableTimes1[i] = false;
            }
        }
        for (let loop = 0; loop < (filledTimes2.length / 2); loop += 2) {
            for (let i = filledTimes2[loop]; i < filledTimes2[loop + 1]; i++) {
                availableTimes2[i] = false;
            }
        }

        //check rules on each time and store each positive result
        //Available time needs to be long enough
        //Rooms need to be consecutive in either order
        for (let loop = 0; loop < availableTimes1.length; loop++) {
            let timeIsGood1 = true;
            let timeIsGood2 = true;

            //Look ahead and check if the party room will be long enough. If there is not enough time, mark it as false
            for (let j = 0; j < requiredPartyLength1; j++) {
                if (!availableTimes1[loop + j]) {
                    timeIsGood1 = false;
                    break;
                }
                if (!availableTimes1[loop + j + requiredPartyLength2]) {
                    timeIsGood2 = false;
                    break;
                }
            }
            for (let k = 0; k < requiredPartyLength2; k++) {
                if (!availableTimes1[loop + requiredPartyLength1 + k]) {
                    timeIsGood1 = false;
                    break;
                }
                if (!availableTimes1[loop + k]) {
                    timeIsGood2 = false;
                    break;
                }
            }

            //If the time stays good in that window, keep that window. Keep all of the available times.
            if (timeIsGood1) {
                times.push(roomsRequested[0], roomsRequested[1]);
                times.push(loop, loop + requiredPartyLength1);
                times.push(requiredPartyLength1 + loop, loop + requiredPartyLength1 + requiredPartyLength2);
            }
            if (timeIsGood2) {
                times.push(roomsRequested[1], roomsRequested[0]);
                times.push(i, i + requiredPartyLength2);
                times.push(requiredPartyLength2 + i, i + requiredPartyLength1 + requiredPartyLength2);
            }
        }
    }

    //Return list of available times.
    return times;
});

//Function to check in case of 3 rooms
exports.checkPartyTimeThree = functions.https.onCall(async (data, context) => {
    //Pull params into function
    const partyPackage = parseInt(data.partyPackage);
    const dayOfWeek = parseInt(data.dayOfWeek);
    let roomsRequested = [];
    data.roomsRequested.forEach(element => roomsRequested.push(parseInt(element)));
    const partyDateDay = parseInt(data.dateDay);
    const partyDateMonth = parseInt(data.dateMonth);
    const partyDateYear = parseInt(data.dateYear);

    //Array to return
    let times = [[]];
    //If it has a three rooms to handle
    if (partyPackage === 3) {
        //Length of play each party offers
        let requiredPartyLength1 = 8;
        let requiredPartyLength2 = 8;
        let requiredPartyLength3 = 8;

        //Create reference to parties table
        let partiesRef1 = db.collection('Parties').where('dateDay', '==', partyDateDay).where('dateMonth', '==', partyDateMonth).where('dateYear', '==', partyDateYear);
        let partiesRef2 = db.collection('Parties').where('dateDay', '==', partyDateDay).where('dateMonth', '==', partyDateMonth).where('dateYear', '==', partyDateYear);
        let partiesRef3 = db.collection('Parties').where('dateDay', '==', partyDateDay).where('dateMonth', '==', partyDateMonth).where('dateYear', '==', partyDateYear);

        //Create reference to the special events table
        let specialEventsRef1 = db.collection('SpecialReservedTimes').where('dateDay', '==', partyDateDay).where('dateMonth', '==', partyDateMonth).where('dateYear', '==', partyDateYear);
        let specialEventsRef2 = db.collection('SpecialReservedTimes').where('dateDay', '==', partyDateDay).where('dateMonth', '==', partyDateMonth).where('dateYear', '==', partyDateYear);
        let specialEventsRef3 = db.collection('SpecialReservedTimes').where('dateDay', '==', partyDateDay).where('dateMonth', '==', partyDateMonth).where('dateYear', '==', partyDateYear);

        let openHoursRef1 = db.collection('OpenHours').where('dayOfWeek', '==', dayOfWeek);
        let openHoursRef2 = db.collection('OpenHours').where('dayOfWeek', '==', dayOfWeek);
        let openHoursRef3 = db.collection('OpenHours').where('dayOfWeek', '==', dayOfWeek);

        //Based on the room we are looking for, a few different things need to happen.
        // 1. find the open hours of that room
        openHoursRef1 = openHoursRef1.where('room', '==', roomsRequested[0]);
        openHoursRef2 = openHoursRef2.where('room', '==', roomsRequested[1]);
        openHoursRef3 = openHoursRef3.where('room', '==', roomsRequested[2]);
        // 2. Find any other parties that would reserve that room
        partiesRef1 = partiesRef1.where('roomsRequested', 'array-contains', roomsRequested[0]);
        partiesRef2 = partiesRef2.where('roomsRequested', 'array-contains', roomsRequested[1]);
        partiesRef3 = partiesRef3.where('roomsRequested', 'array-contains', roomsRequested[2]);
        // 3. Find any reserved times based in that room from our special events table
        specialEventsRef1 = specialEventsRef1.where('area', '==', roomsRequested[0]);
        specialEventsRef2 = specialEventsRef2.where('area', '==', roomsRequested[1]);
        specialEventsRef3 = specialEventsRef3.where('area', '==', roomsRequested[2]);


        //Make the call to the DB looking for the open hours in that room
        let openHours1 = await openHoursRef1.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                temp.push(doc.data().start);
                temp.push(doc.data().end);
            });
            return temp;
        }).catch(err => {
            // Error with the database
            throw new functions.https.HttpsError('database-failure', 'Could not find open hours: ' + err);
        });
        let openHours2 = await openHoursRef2.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                temp.push(doc.data().start);
                temp.push(doc.data().end);
            });
            return temp;
        }).catch(err => {
            // Error with the database
            throw new functions.https.HttpsError('database-failure', 'Could not find open hours: ' + err);
        });
        let openHours3 = await openHoursRef3.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                temp.push(doc.data().start);
                temp.push(doc.data().end);
            });
            return temp;
        }).catch(err => {
            // Error with the database
            throw new functions.https.HttpsError('database-failure', 'Could not find open hours: ' + err);
        });

        //Query the database. Save one list for area requested.
        let filledTimes1 = await partiesRef1.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                let index = doc.data().roomsRequested.getIndex(roomsRequested[0]);
                temp.push(doc.data().roomTimes[index]);
                temp.push(doc.data().roomTimes[index + 1]);
            });
            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('parties-reference-break', 'Failed looking for the previous party times: ' + err);
        });
        let filledTimes2 = await partiesRef2.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                let index = doc.data().roomsRequested.getIndex(roomsRequested[0]);
                temp.push(doc.data().roomTimes[index]);
                temp.push(doc.data().roomTimes[index + 1]);
            });
            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('parties-reference-break', 'Failed looking for the previous party times: ' + err);
        });
        let filledTimes3 = await partiesRef2.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                let index = doc.data().roomsRequested.getIndex(roomsRequested[0]);
                temp.push(doc.data().roomTimes[index]);
                temp.push(doc.data().roomTimes[index + 1]);
            });
            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('parties-reference-break', 'Failed looking for the previous party times: ' + err);
        });

        //Make the call to the special reserved times db
        let specialTimes1 = await specialEventsRef1.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                temp.push(doc.data().start);
                temp.push(doc.data().end);
            });
            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('special-times-reference-break', 'Failed looking for reserved times: ' + err);
        });
        let specialTimes2 = specialEventsRef2.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                temp.push(doc.data().start);
                temp.push(doc.data().end);
            });
            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('special-times-reference-break', 'Failed looking for reserved times: ' + err);
        });
        let specialTimes3 = specialEventsRef3.get().then((snapshot) => {
            let temp = [];
            snapshot.forEach(doc => {
                temp.push(doc.data().start);
                temp.push(doc.data().end);
            });
            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('special-times-reference-break', 'Failed looking for reserved times: ' + err);
        });

        //Array of available times for party room - Must check rules for these times
        let availableTimes1 = [];
        let availableTimes2 = [];
        let availableTimes3 = [];
        for (let i = 0; i < 288; i++) {
            availableTimes1.push(false);
            availableTimes2.push(false);
            availableTimes3.push(false);
        }

        //Mark each hour that the room is open
        for (let loop = 0; loop < (openHours1.length / 2); loop += 2) {
            for (let i = openHours1[loop]; i < openHours1[loop + 1]; i++) {
                availableTimes1[i] = true;
            }
        }
        for (let loop = 0; loop < (openHours2.length / 2); loop += 2) {
            for (let i = openHours2[loop]; i < openHours2[loop + 1]; i++) {
                availableTimes2[i] = true;
            }
        }
        for (let loop = 0; loop < (openHours3.length / 2); loop += 2) {
            for (let i = openHours3[loop]; i < openHours3[loop + 1]; i++) {
                availableTimes3[i] = true;
            }
        }

        //Mark off all special reserved times
        for (let loop = 0; loop < (specialTimes1.length / 2); loop += 2) {
            for (let i = specialTimes1[loop]; i < specialTimes1[loop + 1]; i++) {
                availableTimes1[i] = false;
            }
        }
        for (let loop = 0; loop < (specialTimes2.length / 2); loop += 2) {
            for (let i = specialTimes2[loop]; i < specialTimes2[loop + 1]; i++) {
                availableTimes2[i] = false;
            }
        }
        for (let loop = 0; loop < (specialTimes3.length / 2); loop += 2) {
            for (let i = specialTimes3[loop]; i < specialTimes3[loop + 1]; i++) {
                availableTimes3[i] = false;
            }
        }

        //Mark off the other parties from the reserved times
        for (let loop = 0; loop < (filledTimes1.length / 2); loop += 2) {
            for (let i = filledTimes1[loop]; i < filledTimes1[loop + 1]; i++) {
                availableTimes1[i] = false;
            }
        }
        for (let loop = 0; loop < (filledTimes2.length / 2); loop += 2) {
            for (let i = filledTimes2[loop]; i < filledTimes2[loop + 1]; i++) {
                availableTimes2[i] = false;
            }
        }
        for (let loop = 0; loop < (filledTimes3.length / 2); loop += 2) {
            for (let i = filledTimes3[loop]; i < filledTimes3[loop + 1]; i++) {
                availableTimes3[i] = false;
            }
        }

        //check rules on each time and store each positive result
        //Available time needs to be long enough
        //Rooms need to be consecutive in either order
        for (let loop = 0; loop < availableTimes1.length; loop++) {
            let timeIsGood = [true, true, true, true, true, true];

            //Look ahead and check if the party room will be long enough. If there is not enough time, mark it as false
            for (let j = 0; j < requiredPartyLength1; j++) {
                if (!availableTimes1[loop + j]) {
                    timeIsGood[0] = false;
                    timeIsGood[1] = false;
                    break;
                }
                if (!availableTimes1[loop + j + requiredPartyLength2]) {
                    timeIsGood[2] = false;
                    break;
                }
                if (!availableTimes1[loop + j + requiredPartyLength3]) {
                    timeIsGood[4] = false;
                    break;
                }
                if (!availableTimes1[loop + j + requiredPartyLength2 + requiredPartyLength3]) {
                    timeIsGood[3] = false;
                    timeIsGood[5] = false;
                    break;
                }
            }
            for (let j = 0; j < requiredPartyLength2; j++) {
                if (!availableTimes2[loop + j]) {
                    timeIsGood[2] = false;
                    timeIsGood[3] = false;
                    break;
                }
                if (!availableTimes2[loop + j + requiredPartyLength1]) {
                    timeIsGood[0] = false;
                    break;
                }
                if (!availableTimes2[loop + j + requiredPartyLength3]) {
                    timeIsGood[5] = false;
                    break;
                }
                if (!availableTimes2[loop + j + requiredPartyLength2 + requiredPartyLength3]) {
                    timeIsGood[1] = false;
                    timeIsGood[4] = false;
                    break;
                }
            }
            for (let j = 0; j < requiredPartyLength3; j++) {
                if (!availableTimes3[loop + j]) {
                    timeIsGood[4] = false;
                    timeIsGood[5] = false;
                    break;
                }
                if (!availableTimes3[loop + j + requiredPartyLength1]) {
                    timeIsGood[1] = false;
                    break;
                }
                if (!availableTimes3[loop + j + requiredPartyLength2]) {
                    timeIsGood[3] = false;
                    break;
                }
                if (!availableTimes3[loop + j + requiredPartyLength2 + requiredPartyLength3]) {
                    timeIsGood[0] = false;
                    timeIsGood[2] = false;
                    break;
                }
            }

            //If the time stays good in that window, keep that window. Keep all of the available times.
            if (timeIsGood[0]) {
                times.push(roomsRequested[0]);
                times.push(roomsRequested[1]);
                times.push(roomsRequested[2]);
                times.push(loop);
                times.push(loop + requiredPartyLength1);
                times.push(loop + requiredPartyLength1 + requiredPartyLength2);
                times.push(loop + requiredPartyLength1 + requiredPartyLength2);
                times.push(loop + requiredPartyLength1 + requiredPartyLength2 + requiredPartyLength3);
            }
            if (timeIsGood[1]) {
                times.push(roomsRequested[0]);
                times.push(roomsRequested[2]);
                times.push(roomsRequested[1]);
                times.push(loop);
                times.push(loop + requiredPartyLength1);
                times.push(loop + requiredPartyLength1 + requiredPartyLength3);
                times.push(loop + requiredPartyLength1 + requiredPartyLength2 + requiredPartyLength3);
            }
            if (timeIsGood[2]) {
                times.push(roomsRequested[1]);
                times.push(roomsRequested[0]);
                times.push(roomsRequested[2]);
                times.push(loop);
                times.push(loop + requiredPartyLength2);
                times.push(loop + requiredPartyLength2 + requiredPartyLength1);
                times.push(loop + requiredPartyLength1 + requiredPartyLength2 + requiredPartyLength3);
            }
            if (timeIsGood[3]) {
                times.push(roomsRequested[1]);
                times.push(roomsRequested[2]);
                times.push(roomsRequested[0]);
                times.push(loop);
                times.push(loop + requiredPartyLength2);
                times.push(loop + requiredPartyLength2 + requiredPartyLength3);
                times.push(loop + requiredPartyLength1 + requiredPartyLength2 + requiredPartyLength3);
            }
            if (timeIsGood[4]) {
                times.push(roomsRequested[2]);
                times.push(roomsRequested[0]);
                times.push(roomsRequested[1]);
                times.push(loop);
                times.push(loop + requiredPartyLength3);
                times.push(loop + requiredPartyLength3 + requiredPartyLength1);
                times.push(loop + requiredPartyLength1 + requiredPartyLength2 + requiredPartyLength3);
            }
            if (timeIsGood[5]) {
                times.push(roomsRequested[2]);
                times.push(roomsRequested[1]);
                times.push(roomsRequested[0]);
                times.push(loop);
                times.push(loop + requiredPartyLength3);
                times.push(loop + requiredPartyLength3 + requiredPartyLength2);
                times.push(loop + requiredPartyLength1 + requiredPartyLength2 + requiredPartyLength3);
            }
        }
    }

    //Return list of available times.
    return times;
});