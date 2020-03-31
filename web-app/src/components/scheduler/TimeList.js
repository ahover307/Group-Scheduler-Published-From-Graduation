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
    // ##### READ THIS #####
    // this.props.partyAreaN returns a value between 0 and 3 (0 = Main Gym, 1 = KidMaze, 2 = Rock Wall, 3 = Preschool)
    // Replace N with 1, 2 or 3
    // Use this.props.partyArea1 to access the value of the first party area
    // Use this.props.partyArea2 to access the value of the second party area
    // Use this.props.partyArea3 to access the value of the third party area


    render() {
        return (
            <div>
                <p>Time Slots</p>
            </div>
        );
    };
}

export default TimeList;