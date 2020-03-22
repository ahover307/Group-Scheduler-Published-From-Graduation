const admin = require('firebase-admin');
const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.testkey)

//This file is all of the server side work done on the project

// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.paymentIntent = functions.https.onCall((data, context) => {
    const stripe = require('stripe')('sk_test_v9k8fKhH1oq3R0EnF2vg8n7M00zReeGEZs');

    (async () => {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1099,
            currency: 'usd',
        });
        const clientSecret = paymentIntent.client_secret;
        // Pass the client secret to the client
        return {clientSecret: clientSecret};
    })();
});

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
        let partiesRef = db.collection('Parties');
        partiesRef = partiesRef.where('date', '==', partyDate);

        //Create reference to the special events table
        let specialEventsRef = db.collection('SpecialReservedTimes');
        specialEventsRef = specialEventsRef.where('date', '==', partyDate);

        //Based on the room we are looking for, a few different things need to happen.
        // 1. find the open hours of that room
        // 2. Find any other parties that would reserve that room
        // 3. Find any reserved times based in that room from our special events table
        //The follow switch will set up all of the references into the DB
        let openHoursRef;
        switch (roomsRequested[0]) {
            case 1:
                /* 1. */
                openHoursRef = db.collection('MainGymNormal').doc(dayOfWeek);
                /* 2. */
                partiesRef = partiesRef.where('roomsRequested', 'array-contains', '1');
                /* 3. */
                specialEventsRef = specialEventsRef.where('area', '==', '1');
                break;
            case 2:
                /* 1. */
                openHoursRef = db.collection('KMNormal').doc(dayOfWeek);
                /* 2. */
                partiesRef = partiesRef.where('roomsRequested', 'array-contains', '2');
                /* 3. */
                specialEventsRef = specialEventsRef.where('area', '==', '2');
                break;
            case 3:
                /* 1. */
                openHoursRef = db.collection('RWNormal').doc(dayOfWeek);
                /* 2. */
                partiesRef = partiesRef.where('roomsRequested', 'array-contains', '3');
                /* 3. */
                specialEventsRef = specialEventsRef.where('area', '==', '3');
                break;
            case 4:
                /* 1. */
                openHoursRef = db.collection('PreschoolNormal').doc(dayOfWeek);
                /* 2. */
                partiesRef = partiesRef.where('roomsRequested', 'array-contains', '4');
                /* 3. */
                specialEventsRef = specialEventsRef.where('area', '==', '4');
                break;
            case 5:
                /* 1. */
                openHoursRef = db.collection('NinjaNormal').doc(dayOfWeek);
                /* 2. */
                partiesRef = partiesRef.where('roomsRequested', 'array-contains', '5');
                /* 3. */
                specialEventsRef = specialEventsRef.where('area', '==', '5');
                break;
            default:
                throw new functions.https.HttpsError('bad-room-code', 'Could not create reference based on the requested room')
        }
        //Make the call to the DB looking for the open hours in that room
        let getDoc = openHoursRef.get()
            .then(doc => {
                if (!doc.exists) {
                    //If it could not find a page with open hours for the given day of the week return an error
                    throw new functions.https.HttpsError('no-open-hours', 'Building not open on this day');
                } else {
                    //Return the open and close hours of this day
                    return [doc.data().start, doc.data().end];
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
                times.push([i, i + requiredPartyLength]);
            }
        }

    }
    // //If it has two rooms to handle
    // else if (partyPackage === 2 || partyPackage === 6 || partyPackage === 7 || partyPackage === 8) {
    //
    // }
    // //If it has a three rooms to handle
    // else if (partyPackage === 3) {
    //
    // }


    //Return list of available times.
    return {availableTimes: times};

});