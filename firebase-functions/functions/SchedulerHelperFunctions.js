const functions = require('firebase-functions');

export async function simpleDBCheck(dbReference) {
    return await dbReference.get().then((snapshot) => {
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
}

export async function roomDBCheck(referenceAndRoom) {
    let roomReference = referenceAndRoom.roomReference;
    let roomRequested = referenceAndRoom.roomRequested;

    return await roomReference.get().then((snapshot) => {
        let temp = [];
        snapshot.forEach(doc => {
            let index = doc.data().roomsRequested.indexOf(roomsRequested[0]);
            temp.push(doc.data().roomTimes[index]);
            temp.push(doc.data().roomTimes[index + 1]);
        });
        return temp;
    }).catch((err) => {
        throw new functions.https.HttpsError('parties-reference-break', 'Failed looking for the previous party times: ' + err);
    });
}

export function fillAvailableTimeArray(otherArrays) {
    let openHours = otherArrays.openHours;
    let specialTimes = otherArrays.specialTimes;
    let filledTimes = otherArrays.filledTimes;

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

    return availableTimes;
}