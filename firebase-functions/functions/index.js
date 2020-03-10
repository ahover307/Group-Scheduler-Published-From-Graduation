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
    let partyArea1Times = [];

    admin.initializeApp(functions.config().firebase);

    let db = admin.firestore();

    //Get list of times from database
    const partiesRef = db.collection('parties');

    let query;

    //Finish setting up the query
    switch (partyPackage) {
        case 0:
            if (data.party == 'main')
                query = partiesRef.where('mainGymStart', '==', data.today);
            else if (data.party == 'km')
                query = partiesRef.where('kmStart', '==', data.today);
            else if (data.party == 'rw')
                query = partiesRef.where('rwStart', '==', data.today);
            else if (data.party == 'preschool')
                query = partiesRef.where('preschoolStart', '==', data.today);
            //throw error on else
            break;
        case 1:
            if (data.party == 'main')
                query = partiesRef.where('mainGymStart', '==', data.today);
            if (data.party == 'km')
                query = partiesRef.where('kmStart', '==', data.today);
            else if (data.party == 'rw')
                query = partiesRef.where('rwStart', '==', data.today);
            else if (data.party == 'preschool')
                query = partiesRef.where('preschoolStart', '==', data.today);
        //throw error on else

    }
    //Query the database. Save one list for each area requested.
    let partyList = query.get()
        .then((snapshot) => {
            //Put each into a list that we will keep
            snapshot.foreach(doc => {
                //put the things in a list and keep em there
                // partyArea1Times.push([doc.id, doc.data()])
            })
        })
        .catch((err) => {
            //do a real error here
            console.log('Error getting documents', err)
        });

    //Invert list to find empty times

    //check rules on each time and store each positive result

    //Return list of available times.
    return {};
});