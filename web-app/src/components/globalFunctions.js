export function translateTimeFromIndexToString(timeIndex) {
    //I dont trust the input, so I sanitize the input to be an int before manipulating it.
    timeIndex = parseInt(timeIndex);

    //Find the minutes and hours of each time through the power of math.
    let hour = (Math.floor(timeIndex / 12) % 12);
    let minute = ((timeIndex % 12) * 5);

    //Made the offset since it should return a minute hand with a 10s place, even if the tens place is a 0
    if (minute < 10) {
        minute = "0" + minute;
    }

    //Reset to 12 hour time.
    if (hour === 0) {
        hour = 12;
    }

    return (hour + ":" + minute);
}

export function translateTimeIntoIndex(hour, minute) {
    hour = parseInt(hour);
    minute = parseInt(minute);

    let timeIndex = hour * 12;
    timeIndex += minute / 5;

    return timeIndex;
}

export function updatePartyAreaString(e) {
    switch (parseInt(e)) {
        case 1:
            return "Main Gym";
        case 2:
            return "Kidmazium";
        case 3:
            return "Rock Wall";
        case 4:
            return "Preschool Room";
        case 5:
            return "Ninja Warrior Course";
        default:
            return "Incorrect Room Code";
    }
}

export function updatePartyPackageString(e) {
    switch (parseInt(e)) {
        case 0:
            return "Basic";
        case 1:
            return "Single";
        case 2:
            return "Double";
        case 3:
            return "Triple";
        case 4:
            return "ERROR";
        case 5:
            return "Ninja Exclusive";
        case 6:
            return "Ninja Experience";
        case 7:
            return "Ninja Extra";
        case 8:
            return "Ninja Extreme";
        case 9:
            return "Sleepover";
        default:
            return "Incorrect Room Code";
    }
}

export function dayOfWeekIntToString(e) {
    switch (parseInt(e)) {
        case 1:
            return "Sunday";
        case 2:
            return "Monday";
        case 3:
            return "Tuesday";
        case 4:
            return "Wednesday";
        case 5:
            return "Thursday";
        case 6:
            return "Friday";
        case 7:
            return "Saturday";
        default:
            return "Unknown day of week"
    }
}

//Translate date in format "DayOfWeek: Month Day, Year" => "Monday: April 20, 2020"
export function dateIntegersToString(e) {
    let dateString = dayOfWeekIntToString(e.dayOfWeek) + ': ';

    //Add month to string
    switch (parseInt(e.month)) {
        case 1:
            dateString += 'January ';
            break;
        case 2:
            dateString += 'February ';
            break;
        case 3:
            dateString += 'March ';
            break;
        case 4:
            dateString += 'April ';
            break;
        case 5:
            dateString += 'May ';
            break;
        case 6:
            dateString += 'June ';
            break;
        case 7:
            dateString += 'July ';
            break;
        case 8:
            dateString += 'August ';
            break;
        case 9:
            dateString += 'September ';
            break;
        case 10:
            dateString += 'October ';
            break;
        case 11:
            dateString += 'November ';
            break;
        case 12:
            dateString += 'December ';
            break;
        default:
            dateString += 'Month? ';
            break;
    }

    ((parseInt(e.date) === 0) ? dateString += 'Wrong Date, ' : dateString += parseInt(e.date) + ', ');

    ((parseInt(e.year) === 0) ? dateString += 'Wrong Year' : dateString += parseInt(e.year));

    return dateString;
}

export function formatPartyRooms(roomArray) {
    let rooms = '';

    for (let i = 0; i < roomArray.array.length - 1; i++) {
        rooms += updatePartyAreaString(roomArray.array[i]) + ', ';
    }

    rooms += (updatePartyAreaString(roomArray.array[roomArray.array.length - 1]));

    return rooms;
}

export function startAndEndTimesFromIndex(timesArray) {
    if (!parseInt(timesArray.array.length === 0)) {
        return translateTimeFromIndexToString(timesArray.array[0]) + ' - ' + translateTimeFromIndexToString(timesArray.array[timesArray.array.length - 1]);
    } else {
        return 'Empty time list';
    }
}