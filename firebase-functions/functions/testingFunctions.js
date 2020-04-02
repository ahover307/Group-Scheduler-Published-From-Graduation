const admin = require('firebase-admin');
const functions = require('firebase-functions');

const db = admin.firestore();

//Either update or write a single open hour document
/*
 * Required params:
 *      docName:    String - document name in the db
 *      dayOfWeek:  Int - code for which day of the week
 *      room:       int - code for room
 *      start:      int - index for start of open hour
 *      end:        int - index for end of opening
 */
//TODO Authentication based on context
exports.fillOpenHours = functions.https.onCall((data, context) => {
    return db.collection('OpenHours').doc(data.docName).set({
        dayOfWeek: data.dayOfWeek,
        room: data.room,
        start: data.start,
        end: data.end
    });
});

exports.pullOpenHours = functions.https.onCall(async (data, context) => {
    // let day = 1;
    // let openHours = db.collection('OpenHours').where('room', '==', day);
    // openHours = openHours.where('dayOfWeek', '==', day);
    // let test = await openHours.get()
    //     .then(snapshot => {
    //         let temp = [];
    //         snapshot.forEach(doc => {
    //             temp.push(doc.data().start);
    //             temp.push(doc.data().end);
    //         });
    //         return temp;
    //     })
    //     .catch(err => {
    //         console.log('Error getting documents', err);
    //     });
    //
    // return test;

    // let partiesRef = db.collection('Parties').where('dateDay', '==', partyDateDay).where('dateMonth', '==', partyDateMonth).where('dateYear', '==', partyDateYear);
    // partiesRef = partiesRef.where('roomsRequested', 'array-contains', roomsRequested[0]);
    // let filledTimes = await partiesRef.get().then((snapshot) => {
    //     let temp = [];
    //     snapshot.forEach(doc => {
    //         let index = doc.data().roomsRequested.getIndex(roomsRequested[0]);
    //         temp.push(doc.data().roomTimes[index]);
    //         temp.push(doc.data().roomTimes[index + 1]);
    //     });
    //     return temp;
    // }).catch((err) => {
    //     throw new functions.https.HttpsError('parties-reference-break', 'Failed looking for the previous party times: ' + err);
    // });
});