import React from "react";
import * as firebase from "firebase";

export async function priceFinder(partyPackage) {
    return await (firebase.functions().httpsCallable('grabPrice')({
        partyPackage: partyPackage
    }).then(function (result) {
        return result.data;
    }).catch(function () {
        return -3
    }));
}

export function basic() {
    return (
        <div>
            An exciting party with 1 hour of play in a single room, followed by 30 minutes of party room time!
        </div>
    )
}

export function single() {
    return (
        <div>
            This package includes a single room, for 1 hour and 20 minutes of play, followed by 40 minutes in the party
            room
        </div>
    )
}

export function double() {
    return (
        <div>
            This package includes a two rooms, for 40 minutes each, followed by 40 minutes in the party room
        </div>
    )
}

export function triple() {
    return (
        <div>
            This package includes a whopping three rooms, for 40 minutes each, followed by 40 minutes in the party room
        </div>
    )
}

export function sleepover() {
    return (
        <div>
            An exciting party that lasts all night! From 9pm, until 7am the next morning, you will be having fun all
            night. With your run of the room, you can add the Kidmaze, or Ninja for an additional cost.
        </div>
    )
}

export function ninjaExcl() {
    return (
        <div>
            Train to be a ninja warrior in our Ninja Course, with this party of 50 minutes in the course, followed by 40
            minutes in our party room.
        </div>
    )
}

export function ninjaExp() {
    return (
        <div>
            Train to be a ninja warrior in our Ninja Course, and a little extra, with this party of 30 minutes in the
            course and 30 minutes of another room of your choice, followed by 30 minutes in our party room.
        </div>
    )
}

export function ninjaExtra() {
    return (
        <div>
            Train to be a ninja warrior in our Ninja Course, and a little extra, with this party of 40 minutes in the
            course and 40 minutes of another room of your choice, followed by 40 minutes in our party room.
        </div>
    )
}

export function ninjaExtreme() {
    return (
        <div>
            Train to be a ninja warrior in our Ninja Course, and a little extra, with this party of 50 minutes in the
            course and 60 minutes of another room of your choice, followed by 40 minutes in our party room.
        </div>
    )
}