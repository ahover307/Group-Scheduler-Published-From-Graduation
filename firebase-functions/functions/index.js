const admin = require('firebase-admin');
const functions = require('firebase-functions');

//This file is all of the server side work done on the project

// // https://firebase.google.com/docs/functions/write-firebase-functions

//Creates a list of times for the checked party.
// Because it returns a sanitized list of just the times available, the security risk of not being authenticated is allowable in this scope
/*
 * Required params:
 *      partyPackage:   int (code defined in reference file)
 *      dayOfWeek:      int (code defined in reference file)
 *      roomsRequested: int[] (codes defined in reference file)
 *      partyDate:      Timestamp
 * return   :   available times - 2D array containing the ordered rooms to use, and available start and end times of each time
 */
exports.checkPartyTime = functions.https.onCall((data, context) => {
    //Pull params into function
    const partyPackage = data.partyPackage;
    const dayOfWeek = data.dayOfWeek;
    const roomsRequested = data.roomsRequested;
    const partyDate = data.partyDate;

    //Create reference into the firebase database.
    admin.initializeApp(functions.config().firebase);
    const db = admin.firestore();

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
        let partiesRef = db.collection('Parties').where('date', '==', partyDate);

        //Create reference to the special events table
        let specialEventsRef = db.collection('SpecialReservedTimes').where('date', '==', partyDate);

        let openHoursRef = db.collection('OpenHours').where('dayOfWeek', '==', dayOfWeek);

        //Based on the room we are looking for, a few different things need to happen.
        // 1. find the open hours of that room
        openHoursRef = openHoursRef.where('room', '==', roomsRequested[0]);
        // 2. Find any other parties that would reserve that room
        partiesRef = partiesRef.where('roomsRequested', 'array-contains', roomsRequested[0]);
        // 3. Find any reserved times based in that room from our special events table
        specialEventsRef = specialEventsRef.where('area', '==', roomsRequested[0]);

        //Make the call to the DB looking for the open hours in that room
        let getDoc = openHoursRef.get()
            .then(doc => {
                if (doc.exists) {
                    //Return the open and close hours of this day
                    return [doc.data().start, doc.data().end];
                } else {
                    //If it could not find a page with open hours for the given day of the week return an error
                    throw new functions.https.HttpsError('no-open-hours', 'Building not open on this day');
                }
            }).catch(err => {
                // Error with the database
                throw new functions.https.HttpsError('database-failure', 'Could not find open hours: ' + err);
            });
        //Create variables to hold the open hours
        const openHours = getDoc[0];
        const closeHours = getDoc[1];

        //Query the database. Save one list for area requested.
        let filledTimes = partiesRef.get().then((snapshot) => {
            //Get and return the shit
            let temp = [];
            //Put each into a list that we will keep
            snapshot.forEach(doc => {
                let index = doc.data().getKey('roomsRequested').getIndex(roomsRequested[0]);
                temp.push([doc.data().getKey('roomTimes')[index][0], doc.data().getKey('roomTimes')[index][1]])
            });

            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('parties-reference-break', 'Failed looking for the previous party times: ' + err);
        });

        //Make the call to the special reserved times db
        let specialTimes = specialEventsRef.get().then((data) => {
            let temp = [];

            data.forEach(doc => {
                temp.push([doc.data().getKey('start'), doc.data().getKey('end')]);
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
        for (let i = openHours; i < closeHours; i++) {
            availableTimes[i] = true;
        }

        //Mark off all special reserved times
        for (let i = 0; i < specialTimes.length; i++) {
            let start = specialTimes[i][0];
            let finish = specialTimes[i][1];

            for (let j = start; j < finish; j++) {
                availableTimes[j] = false;
            }
        }

        //Mark off the other parties from the reserved times
        for (let i = 0; i < filledTimes.length; i++) {
            let start = filledTimes[i][0];
            let finish = filledTimes[i][1];

            for (let j = start; j < finish; j++) {
                availableTimes[j] = false;
            }
        }

        //check rules on each time and store each positive result
        //Available time needs to be long enough
        //Rooms need to be consecutive in either order
        for (let i = 0; i < availableTimes.length; i++) {
            let timeIsGood = true;

            //Look ahead and check if the party room will be long enough. If there is not enough time, mark it as false
            for (let j = 0; j < requiredPartyLength; j++) {
                if (!availableTimes[i + j]) {
                    timeIsGood = false;
                    break;
                }
            }

            //If the time stays good in that window, keep that window. Keep all of the available times.
            if (timeIsGood) {
                times.push([[roomsRequested[0]], [i, i + requiredPartyLength]]);
            }
        }
    }
    //If it has two rooms to handle
    else if (partyPackage === 2 || partyPackage === 6 || partyPackage === 7 || partyPackage === 8) {
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
        let partiesRef1 = db.collection('Parties').where('date', '==', partyDate);
        let partiesRef2 = db.collection('Parties').where('date', '==', partyDate);

        //Create reference to the special events table
        let specialEventsRef1 = db.collection('SpecialReservedTimes').where('date', '==', partyDate);
        let specialEventsRef2 = db.collection('SpecialReservedTimes').where('date', '==', partyDate);

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
        let getDoc1 = openHoursRef1.get()
            .then(doc => {
                if (doc.exists) {
                    //Return the open and close hours of this day
                    return [doc.data().start, doc.data().end];
                } else {
                    //If it could not find a page with open hours for the given day of the week return an error
                    throw new functions.https.HttpsError('no-open-hours', 'Building not open on this day');
                }
            }).catch(err => {
                // Error with the database
                throw new functions.https.HttpsError('database-failure', 'Could not find open hours: ' + err);
            });
        //Create variables to hold the open hours
        const openHours1 = getDoc1[0];
        const closeHours1 = getDoc1[1];
        //Make the call to the DB looking for the open hours in that room
        let getDoc2 = openHoursRef2.get()
            .then(doc => {
                if (doc.exists) {
                    //Return the open and close hours of this day
                    return [doc.data().start, doc.data().end];
                } else {
                    //If it could not find a page with open hours for the given day of the week return an error
                    throw new functions.https.HttpsError('no-open-hours', 'Building not open on this day');
                }
            }).catch(err => {
                // Error with the database
                throw new functions.https.HttpsError('database-failure', 'Could not find open hours: ' + err);
            });
        //Create variables to hold the open hours
        const openHours2 = getDoc2[0];
        const closeHours2 = getDoc2[1];

        //Query the database. Save one list for area requested.
        let filledTimes1 = partiesRef1.get().then((snapshot) => {
            //Get and return the shit
            let temp = [];
            //Put each into a list that we will keep
            snapshot.forEach(doc => {
                let index = doc.data().roomsRequested.getIndex(roomsRequested[0]);
                temp.push([doc.data().roomTimes[index][0], doc.data().roomTimes[index][1]])
            });

            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('parties-reference-break', 'Failed looking for the previous party times: ' + err);
        });
        let filledTimes2 = partiesRef2.get().then((snapshot) => {
            //Get and return the shit
            let temp = [];
            //Put each into a list that we will keep
            snapshot.forEach(doc => {
                let index = doc.data().roomsRequested.getIndex(roomsRequested[1]);
                temp.push([doc.data().roomTimes[index][0], doc.data().roomTimes[index][1]])
            });

            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('parties-reference-break', 'Failed looking for the previous party times: ' + err);
        });

        //Make the call to the special reserved times db
        let specialTimes1 = specialEventsRef1.get().then((data) => {
            let temp = [];

            data.forEach(doc => {
                temp.push([doc.data().getKey('start'), doc.data().getKey('end')]);
            });

            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('special-times-reference-break', 'Failed looking for reserved times: ' + err);
        });
        let specialTimes2 = specialEventsRef2.get().then((data) => {
            let temp = [];

            data.forEach(doc => {
                temp.push([doc.data().getKey('start'), doc.data().getKey('end')]);
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
        for (let i = openHours1; i < closeHours1; i++) {
            availableTimes1[i] = true;
        }
        for (let i = openHours2; i < closeHours2; i++) {
            availableTimes2[i] = true;
        }

        //Mark off all special reserved times
        for (let i = 0; i < specialTimes1.length; i++) {
            let start = specialTimes1[i][0];
            let finish = specialTimes1[i][1];

            for (let j = start; j < finish; j++) {
                availableTimes1[j] = false;
            }
        }
        for (let i = 0; i < specialTimes2.length; i++) {
            let start = specialTimes2[i][0];
            let finish = specialTimes2[i][1];

            for (let j = start; j < finish; j++) {
                availableTimes2[j] = false;
            }
        }

        //Mark off the other parties from the reserved times
        for (let i = 0; i < filledTimes1.length; i++) {
            let start = filledTimes1[i][0];
            let finish = filledTimes1[i][1];

            for (let j = start; j < finish; j++) {
                availableTimes1[j] = false;
            }
        }
        for (let i = 0; i < filledTimes2.length; i++) {
            let start = filledTimes2[i][0];
            let finish = filledTimes2[i][1];

            for (let j = start; j < finish; j++) {
                availableTimes2[j] = false;
            }
        }

        //check rules on each time and store each positive result
        //Available time needs to be long enough
        //Rooms need to be consecutive in either order
        for (let i = 0; i < availableTimes1.length; i++) {
            let timeIsGood1 = true;
            let timeIsGood2 = true;

            //Look ahead and check if the party room will be long enough. If there is not enough time, mark it as false
            for (let j = 0; j < requiredPartyLength1; j++) {
                if (!availableTimes1[i + j]) {
                    timeIsGood1 = false;
                    break;
                }
                if (!availableTimes1[i + j + requiredPartyLength2]) {
                    timeIsGood2 = false;
                    break;
                }
            }
            for (let k = 0; k < requiredPartyLength2; k++) {
                if (!availableTimes1[i + requiredPartyLength1 + k]) {
                    timeIsGood1 = false;
                    break;
                }
                if (!availableTimes1[i + k]) {
                    timeIsGood2 = false;
                    break;
                }
            }

            //If the time stays good in that window, keep that window. Keep all of the available times.
            if (timeIsGood1) {
                times.push([[roomsRequested[0], roomsRequested[1]], [i, i + requiredPartyLength1], [requiredPartyLength1 + i, i + requiredPartyLength1 + requiredPartyLength2]])
            }
            if (timeIsGood2) {
                times.push([[roomsRequested[1], roomsRequested[0]], [i, i + requiredPartyLength2], [requiredPartyLength2 + i, i + requiredPartyLength1 + requiredPartyLength2]])
            }
        }
    }
    //If it has a three rooms to handle
    else if (partyPackage === 3) {
        //Length of play each party offers
        let requiredPartyLength1 = 8;
        let requiredPartyLength2 = 8;
        let requiredPartyLength3 = 8;

        //Create reference to parties table
        let partiesRef1 = db.collection('Parties').where('date', '==', partyDate);
        let partiesRef2 = db.collection('Parties').where('date', '==', partyDate);
        let partiesRef3 = db.collection('Parties').where('date', '==', partyDate);

        //Create reference to the special events table
        let specialEventsRef1 = db.collection('SpecialReservedTimes').where('date', '==', partyDate);
        let specialEventsRef2 = db.collection('SpecialReservedTimes').where('date', '==', partyDate);
        let specialEventsRef3 = db.collection('SpecialReservedTimes').where('date', '==', partyDate);

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
        let getDoc1 = openHoursRef1.get()
            .then(doc => {
                if (doc.exists) {
                    //Return the open and close hours of this day
                    return [doc.data().start, doc.data().end];
                } else {
                    //If it could not find a page with open hours for the given day of the week return an error
                    throw new functions.https.HttpsError('no-open-hours', 'Building not open on this day');
                }
            }).catch(err => {
                // Error with the database
                throw new functions.https.HttpsError('database-failure', 'Could not find open hours: ' + err);
            });
        //Create variables to hold the open hours
        const openHours1 = getDoc1[0];
        const closeHours1 = getDoc1[1];
        let getDoc2 = openHoursRef2.get()
            .then(doc => {
                if (doc.exists) {
                    //Return the open and close hours of this day
                    return [doc.data().start, doc.data().end];
                } else {
                    //If it could not find a page with open hours for the given day of the week return an error
                    throw new functions.https.HttpsError('no-open-hours', 'Building not open on this day');
                }
            }).catch(err => {
                // Error with the database
                throw new functions.https.HttpsError('database-failure', 'Could not find open hours: ' + err);
            });
        //Create variables to hold the open hours
        const openHours2 = getDoc2[0];
        const closeHours2 = getDoc2[1];
        let getDoc3 = openHoursRef3.get()
            .then(doc => {
                if (doc.exists) {
                    //Return the open and close hours of this day
                    return [doc.data().start, doc.data().end];
                } else {
                    //If it could not find a page with open hours for the given day of the week return an error
                    throw new functions.https.HttpsError('no-open-hours', 'Building not open on this day');
                }
            }).catch(err => {
                // Error with the database
                throw new functions.https.HttpsError('database-failure', 'Could not find open hours: ' + err);
            });
        //Create variables to hold the open hours
        const openHours3 = getDoc3[0];
        const closeHours3 = getDoc3[1];

        //Query the database. Save one list for area requested.
        let filledTimes1 = partiesRef1.get().then((snapshot) => {
            //Get and return the shit
            let temp = [];
            //Put each into a list that we will keep
            snapshot.forEach(doc => {
                let index = doc.data().roomsRequested.getIndex(roomsRequested[0]);
                temp.push([doc.data().roomTimes[index][0], doc.data().roomTimes[index][1]])
            });

            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('parties-reference-break', 'Failed looking for the previous party times: ' + err);
        });
        let filledTimes2 = partiesRef2.get().then((snapshot) => {
            //Get and return the shit
            let temp = [];
            //Put each into a list that we will keep
            snapshot.forEach(doc => {
                let index = doc.data().roomsRequested.getIndex(roomsRequested[1]);
                temp.push([doc.data().roomTimes[index][0], doc.data().roomTimes[index][1]])
            });

            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('parties-reference-break', 'Failed looking for the previous party times: ' + err);
        });
        let filledTimes3 = partiesRef3.get().then((snapshot) => {
            //Get and return the shit
            let temp = [];
            //Put each into a list that we will keep
            snapshot.forEach(doc => {
                let index = doc.data().roomsRequested.getIndex(roomsRequested[2]);
                temp.push([doc.data().roomTimes[index][0], doc.data().roomTimes[index][1]])
            });

            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('parties-reference-break', 'Failed looking for the previous party times: ' + err);
        });

        //Make the call to the special reserved times db
        let specialTimes1 = specialEventsRef1.get().then((data) => {
            let temp = [];

            data.forEach(doc => {
                temp.push([doc.data().getKey('start'), doc.data().getKey('end')]);
            });

            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('special-times-reference-break', 'Failed looking for reserved times: ' + err);
        });
        let specialTimes2 = specialEventsRef2.get().then((data) => {
            let temp = [];

            data.forEach(doc => {
                temp.push([doc.data().getKey('start'), doc.data().getKey('end')]);
            });

            return temp;
        }).catch((err) => {
            throw new functions.https.HttpsError('special-times-reference-break', 'Failed looking for reserved times: ' + err);
        });
        let specialTimes3 = specialEventsRef3.get().then((data) => {
            let temp = [];

            data.forEach(doc => {
                temp.push([doc.data().getKey('start'), doc.data().getKey('end')]);
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
        for (let i = openHours1; i < closeHours1; i++) {
            availableTimes1[i] = true;
        }
        for (let i = openHours2; i < closeHours2; i++) {
            availableTimes2[i] = true;
        }
        for (let i = openHours3; i < closeHours3; i++) {
            availableTimes3[i] = true;
        }

        //Mark off all special reserved times
        for (let i = 0; i < specialTimes1.length; i++) {
            let start = specialTimes1[i][0];
            let finish = specialTimes1[i][1];

            for (let j = start; j < finish; j++) {
                availableTimes1[j] = false;
            }
        }
        for (let i = 0; i < specialTimes2.length; i++) {
            let start = specialTimes2[i][0];
            let finish = specialTimes2[i][1];

            for (let j = start; j < finish; j++) {
                availableTimes2[j] = false;
            }
        }
        for (let i = 0; i < specialTimes3.length; i++) {
            let start = specialTimes3[i][0];
            let finish = specialTimes3[i][1];

            for (let j = start; j < finish; j++) {
                availableTimes3[j] = false;
            }
        }

        //Mark off the other parties from the reserved times
        for (let i = 0; i < filledTimes1.length; i++) {
            let start = filledTimes1[i][0];
            let finish = filledTimes1[i][1];

            for (let j = start; j < finish; j++) {
                availableTimes1[j] = false;
            }
        }
        for (let i = 0; i < filledTimes2.length; i++) {
            let start = filledTimes2[i][0];
            let finish = filledTimes2[i][1];

            for (let j = start; j < finish; j++) {
                availableTimes2[j] = false;
            }
        }
        for (let i = 0; i < filledTimes3.length; i++) {
            let start = filledTimes3[i][0];
            let finish = filledTimes3[i][1];

            for (let j = start; j < finish; j++) {
                availableTimes3[j] = false;
            }
        }

        //check rules on each time and store each positive result
        //Available time needs to be long enough
        //Rooms need to be consecutive in either order
        for (let i = 0; i < availableTimes1.length; i++) {
            let timeIsGood = [true, true, true, true, true, true];

            //Look ahead and check if the party room will be long enough. If there is not enough time, mark it as false
            for (let j = 0; j < requiredPartyLength1; j++) {
                if (!availableTimes1[i + j]) {
                    timeIsGood[0] = false;
                    timeIsGood[1] = false;
                    break;
                }
                if (!availableTimes1[i + j + requiredPartyLength2]) {
                    timeIsGood[2] = false;
                    break;
                }
                if (!availableTimes1[i + j + requiredPartyLength3]) {
                    timeIsGood[4] = false;
                    break;
                }
                if (!availableTimes1[i + j + requiredPartyLength2 + requiredPartyLength3]) {
                    timeIsGood[3] = false;
                    timeIsGood[5] = false;
                    break;
                }
            }
            for (let j = 0; j < requiredPartyLength2; j++) {
                if (!availableTimes2[i + j]) {
                    timeIsGood[2] = false;
                    timeIsGood[3] = false;
                    break;
                }
                if (!availableTimes2[i + j + requiredPartyLength1]) {
                    timeIsGood[0] = false;
                    break;
                }
                if (!availableTimes2[i + j + requiredPartyLength3]) {
                    timeIsGood[5] = false;
                    break;
                }
                if (!availableTimes2[i + j + requiredPartyLength2 + requiredPartyLength3]) {
                    timeIsGood[1] = false;
                    timeIsGood[4] = false;
                    break;
                }
            }
            for (let j = 0; j < requiredPartyLength3; j++) {
                if (!availableTimes3[i + j]) {
                    timeIsGood[4] = false;
                    timeIsGood[5] = false;
                    break;
                }
                if (!availableTimes3[i + j + requiredPartyLength1]) {
                    timeIsGood[1] = false;
                    break;
                }
                if (!availableTimes3[i + j + requiredPartyLength2]) {
                    timeIsGood[3] = false;
                    break;
                }
                if (!availableTimes3[i + j + requiredPartyLength2 + requiredPartyLength3]) {
                    timeIsGood[0] = false;
                    timeIsGood[2] = false;
                    break;
                }
            }

            //If the time stays good in that window, keep that window. Keep all of the available times.
            if (timeIsGood[0]) {
                times.push([[roomsRequested[0], roomsRequested[1], roomsRequested[2]], [i, i + requiredPartyLength1], [i + requiredPartyLength1, i + requiredPartyLength1 + requiredPartyLength2], [i + requiredPartyLength1 + requiredPartyLength2, i + requiredPartyLength1 + requiredPartyLength2 + requiredPartyLength3]]);
            }
            if (timeIsGood[1]) {
                times.push([[roomsRequested[0], roomsRequested[2], roomsRequested[1]], [i, i + requiredPartyLength1], [i + requiredPartyLength1, i + requiredPartyLength1 + requiredPartyLength3], [i + requiredPartyLength1 + requiredPartyLength3, i + requiredPartyLength1 + requiredPartyLength2 + requiredPartyLength3]]);
            }
            if (timeIsGood[2]) {
                times.push([[roomsRequested[1], roomsRequested[0], roomsRequested[2]], [i, i + requiredPartyLength2], [i + requiredPartyLength2, i + requiredPartyLength2 + requiredPartyLength1], [i + requiredPartyLength2 + requiredPartyLength1, i + requiredPartyLength1 + requiredPartyLength2 + requiredPartyLength3]]);
            }
            if (timeIsGood[3]) {
                times.push([[roomsRequested[1], roomsRequested[2], roomsRequested[0]], [i, i + requiredPartyLength2], [i + requiredPartyLength2, i + requiredPartyLength2 + requiredPartyLength3], [i + requiredPartyLength2 + requiredPartyLength3, i + requiredPartyLength1 + requiredPartyLength2 + requiredPartyLength3]]);
            }
            if (timeIsGood[4]) {
                times.push([[roomsRequested[2], roomsRequested[0], roomsRequested[1]], [i, i + requiredPartyLength3], [i + requiredPartyLength3, i + requiredPartyLength3 + requiredPartyLength1], [i + requiredPartyLength3 + requiredPartyLength1, i + requiredPartyLength1 + requiredPartyLength2 + requiredPartyLength3]]);
            }
            if (timeIsGood[5]) {
                times.push([[roomsRequested[2], roomsRequested[1], roomsRequested[0]], [i, i + requiredPartyLength3], [i + requiredPartyLength3, i + requiredPartyLength3 + requiredPartyLength2], [i + requiredPartyLength3 + requiredPartyLength2, i + requiredPartyLength1 + requiredPartyLength2 + requiredPartyLength3]]);
            }
        }
    }

    //Return list of available times.
    return {availableTimes: times};
});


exports.fillMainGymOpenHours = functions.https.onCall((data, context) => {
    admin.initializeApp(functions.config().firebase);
    const db = admin.firestore();

    const openHoursRef = db.collection('OpenHours');

    openHoursRef.doc('MainGymSunday').set({
        room: 1,
        dayOfWeek: 1,
        start: 132,
        end: 228
    });
    openHoursRef.doc('MainGymMonday').set({
        room: 1,
        dayOfWeek: 2,
        start: 0,
        end: 0
    });
    openHoursRef.doc('MainGymTuesday').set({
        room: 1,
        dayOfWeek: 3,
        start: 0,
        end: 0
    });
    openHoursRef.doc('MainGymWednesday').set({
        room: 1,
        dayOfWeek: 4,
        start: 0,
        end: 0
    });
    openHoursRef.doc('MainGymThursday').set({
        room: 1,
        dayOfWeek: 5,
        start: 0,
        end: 0
    });
    openHoursRef.doc('MainGymFriday').set({
        room: 1,
        dayOfWeek: 6,
        start: 0,
        end: 0
    });
    openHoursRef.doc('MainGymSaturday').set({
        room: 1,
        dayOfWeek: 7,
        start: 156,
        end: 252
    });
});
