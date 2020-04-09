import React, {Component} from "react";
import * as firebase from "firebase";
import {translateTimeFromIndexToString, updatePartyAreaString} from "../globalFunctions";

class TimeList extends Component {
    state = {
        timeList: [],
        radioButtonList: []
    };
    // ##### READ THIS #####
    // this.props.partyAreaN returns a value between 0 and 3 (0 = Main Gym, 1 = KidMaze, 2 = Rock Wall, 3 = Preschool)
    // Replace N with 1, 2 or 3
    // Use this.props.partyArea1 to access the value of the first party area
    // Use this.props.partyArea2 to access the value of the second party area
    // Use this.props.partyArea3 to access the value of the third party area

    findTimes = async () => {
        let schedulingFunction;
        if (parseInt(this.props.partyPackage) === 0 || parseInt(this.props.partyPackage) === 1 || parseInt(this.props.partyPackage) === 5)
            schedulingFunction = firebase.functions().httpsCallable('checkPartyTimeOne');
        else if (parseInt(this.props.partyPackage) === 2 || parseInt(this.props.partyPackage) === 6 || parseInt(this.props.partyPackage) === 7 || parseInt(this.props.partyPackage) === 8)
            schedulingFunction = firebase.functions().httpsCallable('checkPartyTimeTwo');
        else if (parseInt(this.props.partyPackage) === 3)
            schedulingFunction = firebase.functions().httpsCallable('checkPartyTimeThree');
        else
            schedulingFunction = null;

        if (schedulingFunction === null) {
            return -1;
        }

        return (await schedulingFunction({
            partyPackage: this.props.partyPackage,
            dayOfWeek: this.props.dayOfWeek,
            roomsRequested: this.props.roomsRequested,
            dateDay: this.props.dateDay,
            dateMonth: this.props.dateMonth,
            dateYear: this.props.dateYear
        }).then(function (result) {
            return result;
        }).catch(function (e) {
            console.log(e);
            console.log(e.code);
            console.log(e.message);
            console.log(e.details);
            console.log(e.name);
        })).data;
    };

    createString = (timeListSubset) => {
        let returnString = "";

        if (parseInt(this.props.partyPackage) === 0 || parseInt(this.props.partyPackage) === 1 || parseInt(this.props.partyPackage) === 5)
            returnString += updatePartyAreaString(timeListSubset[0]) + ": " + translateTimeFromIndexToString(timeListSubset[1]) + " - " + translateTimeFromIndexToString(timeListSubset[2]);
        if (parseInt(this.props.partyPackage) === 2 || parseInt(this.props.partyPackage) === 6 || parseInt(this.props.partyPackage) === 7 || parseInt(this.props.partyPackage) === 8)
            returnString += '\n' + updatePartyAreaString(timeListSubset[3]) + ": " + translateTimeFromIndexToString(timeListSubset[4]) + " - " + translateTimeFromIndexToString(timeListSubset[5]);
        if (parseInt(this.props.partyPackage) === 3)
            returnString += '\n' + updatePartyAreaString(timeListSubset[6]) + ": " + translateTimeFromIndexToString(timeListSubset[7]) + " - " + translateTimeFromIndexToString(timeListSubset[8]);

        return returnString;
    };

    handleChange = (e) => {
        let id = e.target.id;
        let subArray = [];

        if (parseInt(this.props.partyPackage) === 0 || parseInt(this.props.partyPackage) === 1 || parseInt(this.props.partyPackage) === 5)
            subArray = this.state.timeList.slice(id, id + 3);
        if (parseInt(this.props.partyPackage) === 2 || parseInt(this.props.partyPackage) === 6 || parseInt(this.props.partyPackage) === 7 || parseInt(this.props.partyPackage) === 8)
            subArray = this.state.timeList.slice(id, id + 6);
        if (parseInt(this.props.partyPackage) === 3)
            subArray = this.state.timeList.slice(id, id + 8);

        this.props.parentCallBackTimeSelected(subArray);
    };

    populateRadioButtons = async () => {
        //Load the list of radio buttons
        let tempTimeList = (await this.findTimes().then((snapshot) => {
            return snapshot;
        }));
        let tempListOfRadioButtons = [];
        let indexOffset = 0;

        //Time list will be organized in 1 of 3 ways, depending on how many rooms are required, this was the easiest way I could find that everything was going to stay in order.
        //1. [room, start time, end time, room, start time, end time,...
        //1. [room1, room2, start time1, end time1, start time2, end time2,...
        //1. [room1, room2, room3, start time1, end time1, start time2, end time2, start time3, end time3,...
        //TODO Only choose so many to add to the radio button list thing.
        // Do that before it is put into the radio button list. No button to show more. maybe a button to show more if necessary
        for (let i = 0; i < tempTimeList.length; i++) {
            if (parseInt(this.props.partyPackage) === 0 || parseInt(this.props.partyPackage) === 1 || parseInt(this.props.partyPackage) === 5)
                indexOffset = 2;
            else if (parseInt(this.props.partyPackage) === 2 || parseInt(this.props.partyPackage) === 6 || parseInt(this.props.partyPackage) === 7 || parseInt(this.props.partyPackage) === 8)
                indexOffset = 5;
            else if (parseInt(this.props.partyPackage) === 3)
                indexOffset = 7;

            //Create string of what the option is
            let stringDescription = this.createString(tempTimeList.slice(i, i + indexOffset + 1));
            tempListOfRadioButtons.push(
                <div className={'container'} key={i}>
                    <label>
                        <input name={'listOfTimes'} id={i} type={'radio'} onChange={this.handleChange}/>
                        <span>{stringDescription}</span>
                    </label>
                </div>
            );

            i += indexOffset;
        }

        this.setState({radioButtonList: tempListOfRadioButtons});
        this.setState({timeList: tempTimeList});
    };

    render() {

        return (
            <div>
                <div className={'input-field'}>
                    <button className={'btn purple'} onClick={this.populateRadioButtons}>Refresh the times shown
                    </button>
                </div>
                <form>
                    {this.state.radioButtonList}
                </form>
            </div>
        )
    }
}

export default TimeList;