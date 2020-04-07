import React, {Component} from "react";
import * as firebase from "firebase";

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

    findTimes = () => {
        const functions = firebase.functions().httpsCallable('checkPartyTimeOne');
        return functions({
            partyPackage: this.state.partyPackage,
            dayOfWeek: this.state.dayOfWeek,
            roomsRequested: this.state.roomsRequested,
            dateDay: this.state.dateDay,
            dateMonth: this.state.dateMonth,
            dateYear: this.state.dateYear
        }).then(function (result) {
            return result;
        }).catch(function (e) {
            console.log(e);
            console.log(e.code);
            console.log(e.message);
            console.log(e.details);
            console.log(e.name);
        });
    }


    render() {
        console.log("this was just rendered now")

        return (
            <form>
                <div className={'container'}>
                    <label>
                        <input name={'partyType'} id={'0'} type={'radio'} onChange={this.handleChange}/>
                        <span>time span placeholder</span>
                    </label>
                </div>
            </form>
        );
    };
}


export default TimeList;