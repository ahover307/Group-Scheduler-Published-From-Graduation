import React, {Component} from "react";
import * as firebase from "firebase";
import {translateTimeFromIndexToString, updatePartyAreaString} from "../../globalFunctions";
import {MuiPickersUtilsProvider, TimePicker} from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";

class TimeSlotComponent extends Component {
    state = {
        timeList: [],
        radioButtonList: [],
        waitingState: 0,
        hour: 0,
        minute: 0
    };

    findTimes = async () => {
        return (await firebase.functions().httpsCallable('checkPartyTime')({
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

        if (parseInt(this.props.partyPackage) === 0 || parseInt(this.props.partyPackage) === 1 || parseInt(this.props.partyPackage) === 5) {
            returnString += updatePartyAreaString(timeListSubset[0]) + ": " + translateTimeFromIndexToString(timeListSubset[1]) + " - " + translateTimeFromIndexToString(timeListSubset[2]);
        }
        if (parseInt(this.props.partyPackage) === 2 || parseInt(this.props.partyPackage) === 6 || parseInt(this.props.partyPackage) === 7 || parseInt(this.props.partyPackage) === 8) {
            returnString += updatePartyAreaString(timeListSubset[0]) + ": " + translateTimeFromIndexToString(timeListSubset[2]) + " - " + translateTimeFromIndexToString(timeListSubset[3])
            returnString += '\n' + updatePartyAreaString(timeListSubset[1]) + ": " + translateTimeFromIndexToString(timeListSubset[3]) + " - " + translateTimeFromIndexToString(timeListSubset[4]);
        }
        if (parseInt(this.props.partyPackage) === 3) {
            returnString += updatePartyAreaString(timeListSubset[0]) + ": " + translateTimeFromIndexToString(timeListSubset[3]) + " - " + translateTimeFromIndexToString(timeListSubset[4]);
            returnString += '\n' + updatePartyAreaString(timeListSubset[1]) + ": " + translateTimeFromIndexToString(timeListSubset[4]) + " - " + translateTimeFromIndexToString(timeListSubset[5]);
            returnString += '\n' + updatePartyAreaString(timeListSubset[2]) + ": " + translateTimeFromIndexToString(timeListSubset[5]) + " - " + translateTimeFromIndexToString(timeListSubset[6]);
        }

        return returnString;
    };

    handleChange = (e) => {
        this.props.parentCallBackTimeSelected(this.state.timeList.slice(e.target.id, parseInt(e.target.id) + this.setIndexOffset() + 1));
    };

    setIndexOffsetForRoomsOnly = () => {
        if (parseInt(this.props.partyPackage) === 0 || parseInt(this.props.partyPackage) === 1 || parseInt(this.props.partyPackage) === 5)
            return 1;
        else if (parseInt(this.props.partyPackage) === 2 || parseInt(this.props.partyPackage) === 6 || parseInt(this.props.partyPackage) === 7 || parseInt(this.props.partyPackage) === 8)
            return 2;
        else if (parseInt(this.props.partyPackage) === 3)
            return 3;
    }

    setIndexOffset = () => {
        if (parseInt(this.props.partyPackage) === 0 || parseInt(this.props.partyPackage) === 1 || parseInt(this.props.partyPackage) === 5)
            return 2;
        else if (parseInt(this.props.partyPackage) === 2 || parseInt(this.props.partyPackage) === 6 || parseInt(this.props.partyPackage) === 7 || parseInt(this.props.partyPackage) === 8)
            return 4;
        else if (parseInt(this.props.partyPackage) === 3)
            return 6;
    }

    generateTimes = async () => {
        //Signify that we are waiting for the times to be returned
        this.setState({waitingState: 2});

        //Load the list of radio buttons
        let tempTimeList = (await this.findTimes().then((snapshot) => {
            return snapshot;
        }));

        if (tempTimeList.length === 0) {
            this.setState({waitingState: 1});
        }

        this.setState({
            timeList: tempTimeList,
            waitingState: 3
        });
    }

    populateRadioButtons = (hour) => {
        //Initialize variables first.
        let tempListOfRadioButtons = [];
        const amountOfTimesToFind = 5;
        let range = 0;

        //Convert the hour into our index time
        // hour += 1
        hour *= 12;

        //Retrieve the list from the state to make it easier to manipulate in the loops
        let timeList = this.state.timeList;

        //Make a second array so we can keep track of the ones we keep
        let otherTimeListArray = [];

        //Find 3 times before that time, find 3 times after that.
        //Only search within an hour of what they displayed.
        //Start with on the hour, then half hour, then thirds hours (20 minutes), then quarter, then 10s, then 5s

        //Time list will be organized in 1 of 3 ways, depending on how many rooms are required, this was the easiest way I could find that everything was going to stay in order.
        //1. [room, start time, end time, room, start time, end time,...
        //1. [room1, room2, start time1, end time1, start time2, end time2,...
        //1. [room1, room2, room3, start time1, end time1, start time2, end time2, start time3, end time3,...

        for (let index = 0; index < 6; index++) {
            switch (index) {
                case 0:
                    //Set range to 1 hour
                    range = 12;
                    break;
                case 1:
                    //Range of 30 minutes
                    range = 6;
                    break;
                case 2:
                    //Range of 20 minutes
                    range = 4;
                    break;
                case 3:
                    //Range of 15 minutes
                    range = 3;
                    break;
                case 4:
                    //Range of 10 minutes
                    range = 2;
                    break;
                case 5:
                    //Range of 5 minutes
                    range = 1;
                    break;
                default:
                    console.log('uh oh while creating the radio buttons');
            }
            for (let i = 0; i < timeList.length; i++) {
                //Ignore if it is not on the mark that we it to be. For example, on first round, ignore if the time we are looking at is not on the hour. Second round ignore if it is not on the half hour
                if (timeList[i + this.setIndexOffsetForRoomsOnly()] % range === 0) {
                    //Check if if it within the allowable difference first.
                    if (timeList[i + this.setIndexOffsetForRoomsOnly()] >= (hour - 12) && timeList[i + this.setIndexOffsetForRoomsOnly()] <= (hour + 12)) {
                        let tempArray = timeList.splice(i, this.setIndexOffset() + 1)

                        //Create string of what the option is
                        let stringDescription = this.createString(tempArray);
                        tempListOfRadioButtons.push(
                            <div className={'container'} key={tempListOfRadioButtons.length}>
                                <label>
                                    <input name={'listOfTimes'} id={tempListOfRadioButtons.length} type={'radio'}
                                           onChange={this.handleChange}/>
                                    <span>{stringDescription}</span>
                                </label>
                            </div>
                        );

                        //Add it to our new time list array
                        tempArray.forEach(dataElement => otherTimeListArray.push(dataElement));
                    }
                }

                //If it is not within the range, then ignore this time and move on for now.
                //Because the distribution of times may change it is risky to skip some times, so just move to the next one for now.
                //This may change in the future.
                i += this.setIndexOffset();
            }

            if (tempListOfRadioButtons.length >= amountOfTimesToFind) {
                break;
            }
        }

        this.setState({
            radioButtonList: tempListOfRadioButtons,
            timeList: otherTimeListArray,
            waitingState: 4
        });
    };

    onTimeChange = (thisDate) => {
        //Once a time is selected start parsing the list immediately to create the options.
        const hour = thisDate.hour();
        // const minute = thisDate.minute();
        //I dont care about the minute hand
        this.populateRadioButtons(hour);
    };

    timeSelector = () => {
        return (
            <div>
                <div>
                    Select a time here to help us narrow down which times to show you.
                </div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <TimePicker value={this.state.time} onChange={this.onTimeChange}/>
                </MuiPickersUtilsProvider>
            </div>
        );
    }

    fullComponent = () => {
        switch (this.state.waitingState) {
            case 0:
                return this.priorToStarting();
            case 1:
                return this.noTimesReturnedComponent();
            case 2:
                return this.waitingComponent();
            case 3:
                return this.timeSelector();
            case 4:
                return this.radioComponent();
            default:
                return this.errorPage();
        }
    }

    priorToStarting = () => {
        return (
            <div>
                No times have been found yet. Try pressing the button to generate some options.
            </div>
        )
    }

    noTimesReturnedComponent = () => {
        return (
            <div>
                There were no times returned, maybe try with some different choices parameters for the times, and click
                the button to try again.
            </div>
        )
    }

    waitingComponent = () => {
        return (
            <div>
                Times are being found, please wait
            </div>
        );
    }

    radioComponent = () => {
        return (
            <div>
                <form>
                    {this.state.radioButtonList}
                </form>
            </div>
        )
    }

    errorPage = () => {
        return (
            <div>
                An error occurred somewhere, as it seems something is wrong
            </div>
        )
    }

    render() {
        return (
            <div className={'input-field'}>
                <button className={'btn purple'} onClick={this.generateTimes}>Refresh the times shown</button>
                {this.fullComponent()}
            </div>
        );
    }
}

export default TimeSlotComponent;