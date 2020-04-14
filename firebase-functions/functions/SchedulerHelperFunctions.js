const admin = require('firebase-admin');
const functions = require('firebase-functions');
const db = admin.firestore();

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
        throw new functions.https.HttpsError('database-failure', 'Error in simple DB Check: ' + err);
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

export function createOpenTimeReference(data) {
    const day = data.day;
    const roomRequested = data.roomRequested;

    return db.collection('OpenHours')
        .where('dayOfWeek', '==', day)
        .where('room', '==', roomRequested);
}

export function createSpecialTimeReference(data) {
    const day = data.day;
    const month = data.month;
    const year = data.year;
    const roomRequested = data.roomRequested;

    return db.collection('SpecialReservedTimes')
        .where('dateDay', '==', day)
        .where('dateMonth', '==', month)
        .where('dateYear', '==', year)
        .where('area', '==', roomRequested);
}

export function createFilledTimeReference(data) {
    const day = data.day;
    const month = data.month;
    const year = data.year;
    const roomRequested = data.roomRequested;

    return db.collection('Parties')
        .where('dateDay', '==', day)
        .where('dateMonth', '==', month)
        .where('dateYear', '==', year)
        .where('roomsRequested', 'array-contains', roomRequested);
}

export function checkRulesOneRoom(data) {
    let times = [];
    let availableTimes = data.availableTimes;
    let requiredPartyLength = data.requiredPartyLength;
    let roomRequested = data.roomRequested;

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
            times.push(roomRequested);
            times.push(loop);
            times.push(loop + requiredPartyLength);
        }
    }

    return times;
}

export function checkRulesTwoRooms(data) {
    let times = [];

    for (let loop = 0; loop < data.availableTimes1.length; loop++) {
        let timeIsGood1 = true;
        let timeIsGood2 = true;

        //Look ahead and check if the party room will be long enough. If there is not enough time, mark it as false
        for (let j = 0; j < data.requiredPartyLength1; j++) {
            if (!data.availableTimes1[loop + j]) {
                timeIsGood1 = false;
                break;
            }
            if (!data.availableTimes2[loop + j + data.requiredPartyLength2]) {
                timeIsGood2 = false;
                break;
            }
        }
        for (let k = 0; k < data.requiredPartyLength2; k++) {
            if (!data.availableTimes1[loop + data.requiredPartyLength1 + k]) {
                timeIsGood1 = false;
                break;
            }
            if (!data.availableTimes2[loop + k]) {
                timeIsGood2 = false;
                break;
            }
        }

        //If the time stays good in that window, keep that window. Keep all of the available times.
        if (timeIsGood1) {
            times.push(data.room1);
            times.push(data.room2);
            times.push(loop);
            times.push(loop + data.requiredPartyLength1);
            times.push(data.requiredPartyLength1 + loop);
            times.push(loop + data.requiredPartyLength1 + data.requiredPartyLength2);
        }
        if (timeIsGood2) {
            times.push(data.room1);
            times.push(data.room2);
            times.push(loop);
            times.push(loop + data.requiredPartyLength2);
            times.push(data.requiredPartyLength2 + loop);
            times.push(loop + data.requiredPartyLength1 + data.requiredPartyLength2);
        }
    }

    return times;
}

export function checkRulesThreeRooms(data) {
    let times = [];

    for (let loop = 0; loop < data.availableTimes1.length; loop++) {
        let timeIsGood = [true, true, true, true, true, true];

        //Look ahead and check if the party room will be long enough. If there is not enough time, mark it as false
        for (let j = 0; j < data.requiredPartyLength1; j++) {
            if (!data.availableTimes1[loop + j]) {
                timeIsGood[0] = false;
                timeIsGood[1] = false;
                break;
            }
            if (!data.availableTimes1[loop + j + data.requiredPartyLength2]) {
                timeIsGood[2] = false;
                break;
            }
            if (!data.availableTimes1[loop + j + data.requiredPartyLength3]) {
                timeIsGood[4] = false;
                break;
            }
            if (!data.availableTimes1[loop + j + data.requiredPartyLength2 + data.requiredPartyLength3]) {
                timeIsGood[3] = false;
                timeIsGood[5] = false;
                break;
            }
        }
        for (let j = 0; j < data.requiredPartyLength2; j++) {
            if (!data.availableTimes2[loop + j]) {
                timeIsGood[2] = false;
                timeIsGood[3] = false;
                break;
            }
            if (!data.availableTimes2[loop + j + data.requiredPartyLength1]) {
                timeIsGood[0] = false;
                break;
            }
            if (!data.availableTimes2[loop + j + data.requiredPartyLength3]) {
                timeIsGood[5] = false;
                break;
            }
            if (!data.availableTimes2[loop + j + data.requiredPartyLength2 + data.requiredPartyLength3]) {
                timeIsGood[1] = false;
                timeIsGood[4] = false;
                break;
            }
        }
        for (let j = 0; j < data.requiredPartyLength3; j++) {
            if (!data.availableTimes3[loop + j]) {
                timeIsGood[4] = false;
                timeIsGood[5] = false;
                break;
            }
            if (!data.availableTimes3[loop + j + data.requiredPartyLength1]) {
                timeIsGood[1] = false;
                break;
            }
            if (!data.availableTimes3[loop + j + data.requiredPartyLength2]) {
                timeIsGood[3] = false;
                break;
            }
            if (!data.availableTimes3[loop + j + data.requiredPartyLength2 + data.requiredPartyLength3]) {
                timeIsGood[0] = false;
                timeIsGood[2] = false;
                break;
            }
        }

        //If the time stays good in that window, keep that window. Keep all of the available times.
        if (timeIsGood[0]) {
            times.push(data.room1);
            times.push(data.room2);
            times.push(data.room3);
            times.push(loop);
            times.push(loop + data.requiredPartyLength1);
            times.push(loop + data.requiredPartyLength1 + data.requiredPartyLength2);
            times.push(loop + data.requiredPartyLength1 + data.requiredPartyLength2);
            times.push(loop + data.requiredPartyLength1 + data.requiredPartyLength2 + data.requiredPartyLength3);
        }
        if (timeIsGood[1]) {
            times.push(data.room1);
            times.push(data.room3);
            times.push(data.room2);
            times.push(loop);
            times.push(loop + data.requiredPartyLength1);
            times.push(loop + data.requiredPartyLength1 + data.requiredPartyLength3);
            times.push(loop + data.requiredPartyLength1 + data.requiredPartyLength2 + data.requiredPartyLength3);
        }
        if (timeIsGood[2]) {
            times.push(data.room2);
            times.push(data.room1);
            times.push(data.room3);
            times.push(loop);
            times.push(loop + data.requiredPartyLength2);
            times.push(loop + data.requiredPartyLength2 + data.requiredPartyLength1);
            times.push(loop + data.requiredPartyLength1 + data.requiredPartyLength2 + data.requiredPartyLength3);
        }
        if (timeIsGood[3]) {
            times.push(data.room2);
            times.push(data.room3);
            times.push(data.room1);
            times.push(loop);
            times.push(loop + data.requiredPartyLength2);
            times.push(loop + data.requiredPartyLength2 + data.requiredPartyLength3);
            times.push(loop + data.requiredPartyLength1 + data.requiredPartyLength2 + data.requiredPartyLength3);
        }
        if (timeIsGood[4]) {
            times.push(data.room3);
            times.push(data.room1);
            times.push(data.room2);
            times.push(loop);
            times.push(loop + data.requiredPartyLength3);
            times.push(loop + data.requiredPartyLength3 + data.requiredPartyLength1);
            times.push(loop + data.requiredPartyLength1 + data.requiredPartyLength2 + data.requiredPartyLength3);
        }
        if (timeIsGood[5]) {
            times.push(data.room3);
            times.push(data.room2);
            times.push(data.room1);
            times.push(loop);
            times.push(loop + data.requiredPartyLength3);
            times.push(loop + data.requiredPartyLength3 + data.requiredPartyLength2);
            times.push(loop + data.requiredPartyLength1 + data.requiredPartyLength2 + data.requiredPartyLength3);
        }
    }

    return times;
}

export async function generateTimesSingleRoom(data) {
    let requiredPartyLength;
    switch (data.partyPackage) {
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
    let partiesRef = createFilledTimeReference({
        day: data.day,
        month: data.month,
        year: data.year,
        roomRequested: data.room
    })
    //Create reference to the special events table
    let specialEventsRef = createSpecialTimeReference({
        day: data.day,
        month: data.month,
        year: data.year,
        roomRequested: data.room
    });

    let openHoursRef = createOpenTimeReference({
        day: data.dayOfWeek,
        roomRequested: data.room
    });

    //Based on the room we are looking for, a few different things need to happen.
    // 1. find the open hours of that room
    // 2. Find any other parties that would reserve that room
    // 3. Find any reserved times based in that room from our special events table

    //Make the call to the DB looking for the open hours in that room
    //The odd hours are the open, close hours are closed. The should be paired up matched, but not necessarily in order outside of that
    let openHours = await simpleDBCheck(openHoursRef);

    //Query the database. Save one list for area requested.
    let filledTimes = await roomDBCheck({
        roomReference: partiesRef,
        roomRequested: data.room
    });

    //Make the call to the special reserved times db
    let specialTimes = await simpleDBCheck(specialEventsRef);

    //Array of available times for party room - Must check rules for these times
    let availableTimes = fillAvailableTimeArray({
        openHours: openHours,
        filledTimes: filledTimes,
        specialTimes: specialTimes
    });

    //check rules on each time and store each positive result
    //Available time needs to be long enough
    //Rooms need to be consecutive in either order
    return checkRulesOneRoom({
        availableTimes: availableTimes,
        requiredPartyLength: requiredPartyLength,
        roomRequested: data.room
    });
}

export async function generateTimesDoubleRoom(data) {
    //Length of play each party offers
    let requiredPartyLength1;
    let requiredPartyLength2;

    switch (data.partyPackage) {
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
    let partiesRef1 = createFilledTimeReference({
        day: data.day,
        month: data.month,
        year: data.year,
        roomRequested: data.room1
    });
    let partiesRef2 = createFilledTimeReference({
        day: data.day,
        month: data.month,
        year: data.year,
        roomRequested: data.room2
    });

    //Create reference to the special events table
    let specialEventsRef1 = createSpecialTimeReference({
        day: data.day,
        month: data.month,
        year: data.year,
        roomRequested: data.room1
    });
    let specialEventsRef2 = createSpecialTimeReference({
        day: data.day,
        month: data.month,
        year: data.year,
        roomRequested: data.room2
    });

    let openHoursRef1 = createOpenTimeReference({
        day: data.dayOfWeek,
        roomRequested: data.room1
    });
    let openHoursRef2 = createOpenTimeReference({
        day: data.dayOfWeek,
        roomRequested: data.room2
    });

    //Make the call to the DB looking for the open hours in that room
    let openHours1 = await simpleDBCheck(openHoursRef1);
    let openHours2 = await simpleDBCheck(openHoursRef2);

    //Query the database. Save one list for area requested.
    let filledTimes1 = await roomDBCheck({
        roomReference: partiesRef1,
        roomRequested: data.room1
    });
    let filledTimes2 = await roomDBCheck({
        roomReference: partiesRef2,
        roomRequested: data.room2
    });

    //Make the call to the special reserved times db
    let specialTimes1 = await simpleDBCheck(specialEventsRef1);
    let specialTimes2 = await simpleDBCheck(specialEventsRef2);

    //Array of available times for party room - Must check rules for these times
    let availableTimes1 = fillAvailableTimeArray({
        openHours: openHours1,
        filledTimes: filledTimes1,
        specialTimes: specialTimes1
    });
    let availableTimes2 = fillAvailableTimeArray({
        openHours: openHours2,
        filledTimes: filledTimes2,
        specialTimes: specialTimes2
    });

    //check rules on each time and store each positive result
    //Available time needs to be long enough
    //Rooms need to be consecutive in either order
    return checkRulesTwoRooms({
        availableTimes1: availableTimes1,
        availableTimes2: availableTimes2,
        requiredPartyLength1: requiredPartyLength1,
        requiredPartyLength2: requiredPartyLength2,
        room1: data.room1,
        room2: data.room2
    });
}

export async function generateTimesTripleRoom(data) {
    //Length of play each party offers
    let requiredPartyLength1 = 8;
    let requiredPartyLength2 = 8;
    let requiredPartyLength3 = 8;

    //Create reference to parties table
    let partiesRef1 = createFilledTimeReference({
        day: data.day,
        month: data.month,
        year: data.year,
        roomRequested: data.room1
    });
    let partiesRef2 = createFilledTimeReference({
        day: data.day,
        month: data.month,
        year: data.year,
        roomRequested: data.room2
    });
    let partiesRef3 = createFilledTimeReference({
        day: data.day,
        month: data.month,
        year: data.year,
        roomRequested: data.room3
    });

    //Create reference to the special events table
    let specialEventsRef1 = createSpecialTimeReference({
        day: data.day,
        month: data.month,
        year: data.year,
        roomRequested: data.room1
    });
    let specialEventsRef2 = createSpecialTimeReference({
        day: data.day,
        month: data.month,
        year: data.year,
        roomRequested: data.room2
    });
    let specialEventsRef3 = createSpecialTimeReference({
        day: data.day,
        month: data.month,
        year: data.year,
        roomRequested: data.room3
    });

    let openHoursRef1 = createOpenTimeReference({
        day: data.dayOfWeek,
        roomRequested: data.room1
    });
    let openHoursRef2 = createOpenTimeReference({
        day: data.dayOfWeek,
        roomRequested: data.room2
    });
    let openHoursRef3 = createOpenTimeReference({
        day: data.dayOfWeek,
        roomRequested: data.room3
    });

    //Make the call to the DB looking for the open hours in that room
    let openHours1 = await simpleDBCheck(openHoursRef1);
    let openHours2 = await simpleDBCheck(openHoursRef2);
    let openHours3 = await simpleDBCheck(openHoursRef3);

    //Query the database. Save one list for area requested.
    let filledTimes1 = await roomDBCheck({
        roomReference: partiesRef1,
        roomRequested: data.room1
    });
    let filledTimes2 = await roomDBCheck({
        roomReference: partiesRef2,
        roomsRequested: data.room2
    });
    let filledTimes3 = await roomDBCheck({
        roomReference: partiesRef3,
        roomRequested: data.room3
    });

    //Make the call to the special reserved times db
    let specialTimes1 = await simpleDBCheck(specialEventsRef1);
    let specialTimes2 = await simpleDBCheck(specialEventsRef2);
    let specialTimes3 = await simpleDBCheck(specialEventsRef3);

    //Array of available times for party room - Must check rules for these times
    let availableTimes1 = fillAvailableTimeArray({
        openHours: openHours1,
        filledTimes: filledTimes1,
        specialTimes: specialTimes1
    });
    let availableTimes2 = fillAvailableTimeArray({
        openHours: openHours2,
        filledTimes: filledTimes2,
        specialTimes: specialTimes2
    });
    let availableTimes3 = fillAvailableTimeArray({
        openHours: openHours3,
        filledTimes: filledTimes3,
        specialTimes: specialTimes3
    });

    //check rules on each time and store each positive result
    //Available time needs to be long enough
    //Rooms need to be consecutive in either order
    return checkRulesThreeRooms({
        availableTimes1: availableTimes1,
        availableTimes2: availableTimes2,
        availableTimes3: availableTimes3,
        requiredPartyLength1: requiredPartyLength1,
        requiredPartyLength2: requiredPartyLength2,
        requiredPartyLength3: requiredPartyLength3,
        room1: data.room1,
        room2: data.room2,
        room3: data.room3
    });
}

export async function kickstartGenerateTimesFunction(data) {
    //Array to return
    let times = [];

    //If it has a single room to handle
    if (data.partyPackage === 0 || data.partyPackage === 1 || data.partyPackage === 5) {
        times = await generateTimesSingleRoom({
            partyPackage: data.partyPackage,
            day: data.dateDay,
            month: data.dateMonth,
            year: data.dateYear,
            room: data.roomsRequested[0],
            dayOfWeek: data.dayOfWeek
        });
    } else if (data.partyPackage === 2 || data.partyPackage === 6 || data.partyPackage === 7 || data.partyPackage === 8) {
        times = await generateTimesDoubleRoom({
            partyPackage: data.partyPackage,
            day: data.dateDay,
            month: data.dateMonth,
            year: data.dateYear,
            room1: data.roomsRequested[0],
            room2: data.roomsRequested[1],
            dayOfWeek: data.dayOfWeek
        });
    } else if (data.partyPackage === 3) {
        times = await generateTimesTripleRoom({
            partyPackage: data.partyPackage,
            day: data.dateDay,
            month: data.dateMonth,
            year: data.dateYear,
            room1: data.roomsRequested[0],
            room2: data.roomsRequested[1],
            room3: data.roomsRequested[2],
            dayOfWeek: data.dayOfWeek
        });
    }

    //Return list of available times.
    return times;
}

export function givenTimeIsInList(data) {
    //As the checking loops progress, the indices will become mis-aligned. There will be points in the iteration that the index is off count
    //However this is ok, as it is impossible for the if statements to accept the messed up index.
    //This saves the code from becoming complicated as it will do nothing but loop once and increase the index until it is on track again.
    //Something to keep in mind is that the maximum size of the loop is something along the lines of like 600, which is not that large, and it will do a maximum of looking at each cell once.
    //This lack of optimization is affordable
    if (parseInt(data.partyPackage) === 0 || parseInt(data.partyPackage) === 1 || parseInt(data.partyPackage) === 5) {
        for (let loop = 0; loop < data.testTimes.length; loop++) {
            if (parseInt(data.roomsRequested[0]) === parseInt(data.testTimes[loop++]))
                //Check if the start time matches
                if (parseInt(data.roomTimes[0]) === parseInt(data.testTimes[loop++]))
                    //Check if the end time matches
                    if (parseInt(data.roomTimes[1]) === parseInt(data.testTimes[loop]))
                        //If it passes all 3 conditions we know that the time is confirmed to be ok
                        return true;
        }
    } else if (parseInt(data.partyPackage) === 2 || parseInt(data.partyPackage) === 6 || parseInt(data.partyPackage) === 7 || parseInt(data.partyPackage) === 8) {
        for (let loop = 0; loop < data.testTimes.length; loop++) {
            if (parseInt(data.roomsRequested[0]) === parseInt(data.testTimes[loop++]))
                if (parseInt(data.roomsRequested[1]) === parseInt(data.testTimes[loop++]))
                    //Check if the start time matches
                    if (parseInt(data.roomTimes[0]) === parseInt(data.testTimes[loop++]))
                        //Check if the end time matches
                        if (parseInt(data.roomTimes[1]) === parseInt(data.testTimes[loop++]))
                            //Check if the start time matches
                            if (parseInt(data.roomTimes[2]) === parseInt(data.testTimes[loop++]))
                                //Check if the end time matches
                                if (parseInt(data.roomTimes[3]) === parseInt(data.testTimes[loop]))
                                    //If it passes all 6 conditions we know that the time is confirmed to be ok
                                    return true;
        }
    } else if (parseInt(data.partyPackage) === 3) {
        for (let loop = 0; loop < data.testTimes.length; loop++) {
            if (parseInt(data.roomsRequested[0]) === parseInt(data.testTimes[loop++]))
                if (parseInt(data.roomsRequested[1]) === parseInt(data.testTimes[loop++]))
                    if (parseInt(data.roomsRequested[2]) === parseInt(data.testTimes[loop++]))
                        //Check if the start time matches
                        if (parseInt(data.roomTimes[0]) === parseInt(data.testTimes[loop++]))
                            //Check if the end time matches
                            if (parseInt(data.roomTimes[1]) === parseInt(data.testTimes[loop++]))
                                //Check if the start time matches
                                if (parseInt(data.roomTimes[2]) === parseInt(data.testTimes[loop++]))
                                    //Check if the end time matches
                                    if (parseInt(data.roomTimes[3]) === parseInt(data.testTimes[loop++]))
                                        if (parseInt(data.roomTimes[4]) === parseInt(data.testTimes[loop]))
                                            //If it passes all 6 conditions we know that the time is confirmed to be ok
                                            return true;
        }
    }

    //If it cant be found in the list anywhere, and it hasn't returned true yet, then return false
    return false;
}