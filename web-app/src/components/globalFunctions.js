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