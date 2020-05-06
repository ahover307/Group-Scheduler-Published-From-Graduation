import React, {Component} from "react";
import * as firebase from "firebase";
import {translateTimeFromIndexToString, updatePartyAreaString} from "../../globalFunctions";

class TimeSlotComponent extends Component {
    state = {
        timeList: [],
        radioButtonList: [],
        waitingState: 0
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

    setIndexOffset = () => {
        if (parseInt(this.props.partyPackage) === 0 || parseInt(this.props.partyPackage) === 1 || parseInt(this.props.partyPackage) === 5)
            return 2;
        else if (parseInt(this.props.partyPackage) === 2 || parseInt(this.props.partyPackage) === 6 || parseInt(this.props.partyPackage) === 7 || parseInt(this.props.partyPackage) === 8)
            return 4;
        else if (parseInt(this.props.partyPackage) === 3)
            return 6;
    }

    populateRadioButtons = async () => {
        //Signify that we are waiting for the times to be returned
        this.setState({waitingState: 1});

        //Load the list of radio buttons
        let tempTimeList = (await this.findTimes().then((snapshot) => {
            return snapshot;
        }));
        let tempListOfRadioButtons = [];
        let indexOffset = this.setIndexOffset();

        if (tempTimeList.length === 0) {
            this.setState({waitingState: 2});
        }

        //Time list will be organized in 1 of 3 ways, depending on how many rooms are required, this was the easiest way I could find that everything was going to stay in order.
        //1. [room, start time, end time, room, start time, end time,...
        //1. [room1, room2, start time1, end time1, start time2, end time2,...
        //1. [room1, room2, room3, start time1, end time1, start time2, end time2, start time3, end time3,...
        //TODO Only choose so many to add to the radio button list thing.
        // Do that before it is put into the radio button list. No button to show more. maybe a button to show more if necessary
        for (let i = 0; i < tempTimeList.length; i++) {
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

        this.setState({
            radioButtonList: tempListOfRadioButtons,
            timeList: tempTimeList,
            waitingState: 3
        });
    };

    fullComponent = () => {
        switch (this.state.waitingState) {
            case 0:
                return this.priorToStarting();
            case 1:
                return this.noTimesReturnedComponent();
            case 2:
                return this.waitingComponent();
            case 3:
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
        //TODO Find a loading icon or something
        return (
            <div>
                {/*<icon>{loading}</icon>*/}
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
                <button className={'btn purple'} onClick={this.populateRadioButtons}>Refresh the times shown
                </button>
                {this.fullComponent()}
            </div>
        );
    }
}

export default TimeSlotComponent;