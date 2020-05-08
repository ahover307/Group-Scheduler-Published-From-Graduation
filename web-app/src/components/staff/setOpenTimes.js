import React, {Component} from 'react';
import * as firebase from "firebase";

class setOpenTimes extends Component {

    fillOpenMain = () => {
        const functions = firebase.functions().httpsCallable('fillOpenHours');
        functions({
            docName: 'MainGymSunday',
            dayOfWeek: 1,
            room: 1,
            start: 132,
            end: 216
        });
        functions({
            docName: 'MainGymMonday',
            dayOfWeek: 2,
            room: 1,
            start: 0,
            end: 0
        });
        functions({
            docName: 'MainGymTuesday',
            dayOfWeek: 3,
            room: 1,
            start: 0,
            end: 0
        });
        functions({
            docName: 'MainGymWednesday',
            dayOfWeek: 4,
            room: 1,
            start: 0,
            end: 0
        });
        functions({
            docName: 'MainGymThursday',
            dayOfWeek: 5,
            room: 1,
            start: 0,
            end: 0
        });
        functions({
            docName: 'MainGymFriday',
            dayOfWeek: 6,
            room: 1,
            start: 0,
            end: 0
        });
        functions({
            docName: 'MainGymSaturday',
            dayOfWeek: 7,
            room: 1,
            start: 156,
            end: 252
        });
    };
    fillOpenNinja = () => {
        const functions = firebase.functions().httpsCallable('fillOpenHours');
        functions({
            docName: 'NinjaSunday',
            dayOfWeek: 1,
            room: 5,
            start: 132,
            end: 180
        });
        functions({
            docName: 'NinjaSunday1',
            dayOfWeek: 1,
            room: 5,
            start: 204,
            end: 216
        });
        functions({
            docName: 'NinjaMonday',
            dayOfWeek: 2,
            room: 5,
            start: 0,
            end: 0
        });
        functions({
            docName: 'NinjaTuesday',
            dayOfWeek: 3,
            room: 5,
            start: 0,
            end: 0
        });
        functions({
            docName: 'NinjaWednesday',
            dayOfWeek: 4,
            room: 5,
            start: 0,
            end: 0
        });
        functions({
            docName: 'NinjaThursday',
            dayOfWeek: 5,
            room: 5,
            start: 0,
            end: 0
        });
        functions({
            docName: 'NinjaFriday',
            dayOfWeek: 6,
            room: 5,
            start: 0,
            end: 0
        });
        functions({
            docName: 'NinjaSaturday',
            dayOfWeek: 7,
            room: 5,
            start: 156,
            end: 252
        });
    };
    fillOpenKM = () => {
        const functions = firebase.functions().httpsCallable('fillOpenHours');
        functions({
            docName: 'KMSunday',
            dayOfWeek: 1,
            room: 2,
            start: 132,
            end: 216
        });
        functions({
            docName: 'KMMonday',
            dayOfWeek: 2,
            room: 2,
            start: 0,
            end: 0
        });
        functions({
            docName: 'KMTuesday',
            dayOfWeek: 3,
            room: 2,
            start: 0,
            end: 0
        });
        functions({
            docName: 'KMWednesday',
            dayOfWeek: 4,
            room: 2,
            start: 0,
            end: 0
        });
        functions({
            docName: 'KMThursday',
            dayOfWeek: 5,
            room: 2,
            start: 0,
            end: 0
        });
        functions({
            docName: 'KMFriday',
            dayOfWeek: 6,
            room: 2,
            start: 0,
            end: 0
        });
        functions({
            docName: 'KMSaturday',
            dayOfWeek: 7,
            room: 2,
            start: 156,
            end: 252
        });
    };
    fillOpenRW = () => {
        const functions = firebase.functions().httpsCallable('fillOpenHours');
        functions({
            docName: 'RWSunday',
            dayOfWeek: 1,
            room: 3,
            start: 132,
            end: 216
        });
        functions({
            docName: 'RWMonday',
            dayOfWeek: 2,
            room: 3,
            start: 0,
            end: 0
        });
        functions({
            docName: 'RWTuesday',
            dayOfWeek: 3,
            room: 3,
            start: 0,
            end: 0
        });
        functions({
            docName: 'RWWednesday',
            dayOfWeek: 4,
            room: 3,
            start: 0,
            end: 0
        });
        functions({
            docName: 'RWThursday',
            dayOfWeek: 5,
            room: 3,
            start: 0,
            end: 0
        });
        functions({
            docName: 'RWFriday',
            dayOfWeek: 6,
            room: 3,
            start: 0,
            end: 0
        });
        functions({
            docName: 'RWSaturday',
            dayOfWeek: 7,
            room: 3,
            start: 156,
            end: 252
        });
    };
    fillOpenPreschool = () => {
        const functions = firebase.functions().httpsCallable('fillOpenHours');
        functions({
            docName: 'PreschoolSunday',
            dayOfWeek: 1,
            room: 4,
            start: 132,
            end: 216
        });
        functions({
            docName: 'PreschoolMonday',
            dayOfWeek: 2,
            room: 4,
            start: 0,
            end: 0
        });
        functions({
            docName: 'PreschoolTuesday',
            dayOfWeek: 3,
            room: 4,
            start: 0,
            end: 0
        });
        functions({
            docName: 'PreschoolWednesday',
            dayOfWeek: 4,
            room: 4,
            start: 0,
            end: 0
        });
        functions({
            docName: 'PreschoolThursday',
            dayOfWeek: 5,
            room: 4,
            start: 0,
            end: 0
        });
        functions({
            docName: 'PreschoolFriday',
            dayOfWeek: 6,
            room: 4,
            start: 0,
            end: 0
        });
        functions({
            docName: 'PreschoolSaturday',
            dayOfWeek: 7,
            room: 4,
            start: 156,
            end: 252
        });
    };
}

export default setOpenTimes