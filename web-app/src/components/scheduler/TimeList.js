import React, {Component} from "react";

class TimeList extends Component {
    state = {
        partyName: '',
        participantsAge: 0,
        contactName: '',
        email: '',
        phoneNumber: '',
        paid: true,
        partyStartTime: 0,
        partyEndTime: 0,
        partyPackage: 0,
        roomsRequested: [],
        roomTimes: [[]],
        dayOfWeek: 0,
        dateDay: 0,
        dateMonth: 0,
        dateYear: 0
    };

    render() {
        return (
            <div>
                <p>Time Slots</p>
            </div>
        );
    };
}

export default TimeList;