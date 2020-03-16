const admin = require('firebase-admin');
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.checkPartyTime = functions.https.onCall((data, context) => {
    const partyPackage = data.partyPackage;
    const uid = context.auth.uid;

    admin.initializeApp(functions.config().firebase);
    let db = admin.firestore();

    //Create reference to parties table
    const partiesRef = db.collection('Parties');
    let query;

    //TODO Create reference to reserved times table

    //Array to return
    let times = [[]];

    //If it has a single room to handle
    if (partyPackage === 0 || partyPackage === 1 || partyPackage === 5) {
        //Array of times that are already filled
        let filledTimes = [[]];
        //Array of times that are reserved
        let outsideReservedHours = [];
        let requiredPartyLength;
        if (partyPackage === 0) {
            requiredPartyLength = 12;
        } else if (partyPackage === 1) {
            requiredPartyLength = 16;
        } else if (partyPackage === 5) {
            requiredPartyLength = 10;
        }

        let openHours;
        let closeHours;

        const hoursRef = db.collection('NormallyAvailable').doc(data.dayOfTheWeek);
        let getDoc = hoursRef.get()
            .then(doc => {
                if (!doc.exists) {
                    //TODO throw error here
                    return 0;
                } else {
                    return [doc.data().start, doc.data().end];
                }
            }).catch(err => {
                // Throwing an HttpsError so that the client gets the error details.
                throw new functions.https.HttpsError('failed-unsuccessfully', 'Could not find open hours: ' + err);
            });
        openHours = getDoc[0];
        closeHours = getDoc[1];


        //TODO check database for any special reserved times. If the query returns an error for not finding a document, take that as not having any special times to book out.
        //Query the database. Save one list for area requested.
        if (data.party === 'main') {
            filledTimes = partiesRef.where('date', '==', data.partyDate).get()
                .then((snapshot) => {
                    let temp = [];
                    //Put each into a list that we will keep
                    snapshot.forEach(doc => {
                        //put the things in a list and keep em there
                        temp.push([doc.data().getKey('mainGymStart'), doc.data().getKey('mainGymEnd')])
                    });

                    return temp;
                })
                .catch((err) => {
                    // Throwing an HttpsError so that the client gets the error details.
                    throw new functions.https.HttpsError('failed-unsuccessfully', 'failed in mg doc search: ' + err);
                });
        } else if (data.party === 'km') {
            filledTimes = partiesRef.where('date', '==', data.partyDate).get()
                .then((snapshot) => {
                    let temp = [];
                    //Put each into a list that we will keep
                    snapshot.forEach(doc => {
                        //put the things in a list and keep em there
                        temp.push([doc.data().getKey('kmStart'), doc.data().getKey('kmEnd')])
                    });
                    return temp;
                })
                .catch((err) => {
                    // Throwing an HttpsError so that the client gets the error details.
                    throw new functions.https.HttpsError('failed-unsuccessfully', 'failed in km doc search: ' + err);
                });
        } else if (data.party === 'rw') {
            filledTimes = partiesRef.where('date', '==', data.partyDate).get()
                .then((snapshot) => {
                    let temp = [];
                    //Put each into a list that we will keep
                    snapshot.forEach(doc => {
                        //put the things in a list and keep em there
                        temp.push([doc.data().getKey('rwStart'), doc.data().getKey('rwEnd')])
                    })
                    return temp;
                })
                .catch((err) => {
                    // Throwing an HttpsError so that the client gets the error details.
                    throw new functions.https.HttpsError('failed-unsuccessfully', 'failed in rw doc search: ' + err);
                });
        } else if (data.party === 'preschool') {
            filledTimes = partiesRef.where('date', '==', data.partyDate).get()
                .then((snapshot) => {
                    let temp = [];
                    //Put each into a list that we will keep
                    snapshot.forEach(doc => {
                        //put the things in a list and keep em there
                        temp.push([doc.data().getKey('preschoolStart'), doc.data().getKey('preschoolEnd')])
                    });
                    return temp;
                })
                .catch((err) => {
                    // Throwing an HttpsError so that the client gets the error details.
                    throw new functions.https.HttpsError('failed-unsuccessfully', 'failed in preschool doc search: ' + err);
                });
        } else if (data.party === 'ninja') {
            filledTimes = partiesRef.where('date', '==', data.partyDate).get()
                .then((snapshot) => {
                    let temp = [];
                    //Put each into a list that we will keep
                    snapshot.forEach(doc => {
                        //put the things in a list and keep em there
                        temp.push([doc.data().getKey('ninjaStart'), doc.data().getKey('ninjaEnd')])
                    });
                    return temp;
                })
                .catch((err) => {
                    // Throwing an HttpsError so that the client gets the error details.
                    throw new functions.https.HttpsError('failed-unsuccessfully', 'failed in ninja doc search: ' + err);
                });
        } else {
            // Throwing an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('failed-unsuccessfully', 'failed in the else somewhere');
        }

        //Array of available times for party room - Must check rules for these times
        let availableTimes = [];
        for (let i = 0; i < 288; i++) {
            availableTimes.push(false);
        }

        //Mark off the reserved times
        for (let i = openHours; i < closeHours; i++) {
            availableTimes[i] = true;
        }
        //TODO Check of the specialized reserved times
        // for (let i = ....


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