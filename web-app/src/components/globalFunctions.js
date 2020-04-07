export function translateTimeFromIndexToString(timeIndex) {
    //I dont trust the input, so I sanitize the input to be an int before manipulating it.
    timeIndex = parseInt(timeIndex);

    //Find the minutes and hours of each time through the power of math.
    let hour = (Math.floor(timeIndex / 12) % 13);
    let minute = ((timeIndex % 12) * 5);

    //Made the offset since it should return a minute hand with a 10s place, even if the tens place is a 0
    if (minute < 10) {
        minute = "0" + minute;
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
