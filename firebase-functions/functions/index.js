const admin = require('firebase-admin');
const functions = require('firebase-functions');

firebase.initializeApp({
    apiKey: '### FIREBASE API KEY ###',
    authDomain: '### FIREBASE AUTH DOMAIN ###',
    projectId: '### CLOUD FUNCTIONS PROJECT ID ###'
    databaseURL: 'https://### YOUR DATABASE NAME ###.firebaseio.com',
});

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

    //Create reference to reserved times table

    //Array to return
    let times = [[]];

    //If it has a single room to handle
    if (partyPackage === 0 || partyPackage === 1 || partyPackage === 5) {
        //Array of times that are already filled
        let filledTimes = [[]];
        //Array of times that are reserved
        let outsideReservedHours = [];
        //TODO required party length
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
                } else {
                    openHours = doc.data().start;
                    closeHours = doc.data().end;
                }
            }).catch(err => {
                //TODO Throw more errors here
            });


        //TODO check database for any special reserved times. If the query returns an error for not finding a document, take that as not having any special times to book out.


        //Finish setting up the query
        //TODO get the date to check the query correctly.
        if (data.party === 'main') {
            query = partiesRef.where('date', '==', data.day).where('mainGymStart', '=>', 0);
        } else if (data.party === 'km') {
            query = partiesRef.where('date', '==', data.day).where('kmStart', '=>', 0);
        } else if (data.party === 'rw') {
            query = partiesRef.where('date', '==', data.day).where('rwStart', '=>', 0);
        } else if (data.party === 'preschool') {
            query = partiesRef.where('date', '==', data.day).where('preschoolStart', '=>', 0);
        }
        //TODO throw error on else
        else {
            console.log('error');
        }

        //Query the database. Save one list for each area requested.
        query.get()
            .then((snapshot) => {
                //Put each into a list that we will keep
                snapshot.foreach(doc => {
                    //put the things in a list and keep em there
                    //TODO Find out why the data function is underlined
                    filledTimes.push([doc.data().getKey('mainGymStart'), doc.data().getKey('mainGymEnd')])
                })
            })
            .catch((err) => {
                //TODO Error
                //do a real error here
                console.log('Error getting documents', err)
            });

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
    //If it has two rooms to handle
    else if (partyPackage === 2 || partyPackage === 6 || partyPackage === 7 || partyPackage === 8) {

    }
    //If it has a three rooms to handle
    else if (partyPackage === 3) {

    }


    //Return list of available times.
    return {availableTimes: times};

});