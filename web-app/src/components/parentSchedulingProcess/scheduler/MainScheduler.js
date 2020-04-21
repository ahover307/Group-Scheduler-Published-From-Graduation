import React, {Component} from "react";
import TimeList from "./TimeList";
import CreatePartyComponent from './CreatePartyComponent';
import PartyPackageSelector from "./PartyPackageSelector";
import PartyAreaSelector from "./PartyAreaSelector";
import M from "materialize-css";
import {Collapsible, CollapsibleItem, Icon} from 'react-materialize'
// import * as firebase from "firebase";
import emailjs from 'emailjs-com'
import Calendar from "./Calendar";

class MainScheduler extends Component {
    state = {
        contactName: '',
        email: '',
        phoneNumber: '',
        participantsAge: 0,
        partyName: '',
        partyPackage: 0,
        roomsRequested: [0],
        roomTimes: [],
        dayOfWeek: 1,
        dateDay: 0,
        dateMonth: 0,
        dateYear: 0,
        missing: true
    };

    componentDidMount() {
        M.AutoInit();
    }

    callBackFunctionDate = (childData) => {
        this.setState({
            dateDay: childData.date,
            dateMonth: childData.month,
            dateYear: childData.year,
            dayOfWeek: childData.day
        });
    };

    // Update state from PartyPackageSelector to MainScheduler
    callBackFunctionPartyPackage = (childData) => {
        this.setState({
            partyPackage: childData
        });
    };

    // Update state from PartyAreaSelector to MainScheduler
    callBackFunctionPartyArea = (childData) => {
        let tempArray = [];

        switch (childData.selector) {
            case 'area1':
                tempArray.push(childData.area);
                tempArray.push(this.state.roomsRequested[1]);
                tempArray.push(this.state.roomsRequested[2]);
                break;
            case 'area2':
                tempArray.push(this.state.roomsRequested[0]);
                tempArray.push(childData.area);
                tempArray.push(this.state.roomsRequested[2]);
                break;
            case 'area3':
                tempArray.push(this.state.roomsRequested[0]);
                tempArray.push(this.state.roomsRequested[1]);
                tempArray.push(childData.area);
                break;
            default:
                console.log(childData.selector);
                console.log(childData.area);
                break;
        }

        this.setState({
            roomsRequested: tempArray
        });
    };

    // Update state from CreatePartyComponent to MainScheduler
    callBackFunctionInfo = (childData) => {
        this.setState({
            [childData.target]: childData.info
        });
    };

    parentCallBackTimeSelected = (timeSelectedArray) => {
        //the argument passed should be a sub array, parse this to fill in the state that is passed
        //The indices are different on the array depending on how many rooms are requested
        if (parseInt(this.state.partyPackage) === 0 || parseInt(this.state.partyPackage) === 1 || parseInt(this.state.partyPackage) === 5) {
            this.setState({
                roomsRequested: timeSelectedArray.slice(0, 1),
                roomTimes: timeSelectedArray.slice(1, 3)
            });
        } else if (parseInt(this.state.partyPackage) === 2 || parseInt(this.state.partyPackage) === 6 || parseInt(this.state.partyPackage) === 7 || parseInt(this.props.partyPackage) === 8) {
            this.setState({
                roomsRequested: timeSelectedArray.slice(0, 2),
                roomTimes: timeSelectedArray.slice(2, 6)
            });
        } else if (parseInt(this.state.partyPackage) === 3) {
            this.setState({
                roomsRequested: timeSelectedArray.slice(0, 3),
                roomTimes: timeSelectedArray.slice(3, 8)
            });
        }
    };

    sendFeedback(templateId, variables) {
        emailjs.send(
            'gmail', templateId,
            variables, "user_5Iox4i8HmOcOQCgLT1kCH"
        ).then(res => {
            console.log('Email successfully sent!')
        })
            // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }

    isSomethingMissingText = () => {
        if (this.state.missing) return <div>Something is missing from the form!</div>
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        //Confirm everything has a value before continuing.
        let allGoodToContinue = true;

        //If every thing has a value, then
        if (allGoodToContinue) {
            this.props.callBack({
                contactName: this.state.contactName,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                participantsAge: this.state.participantsAge,
                partyName: this.state.partyName,
                partyPackage: this.state.partyPackage,
                roomsRequested: this.state.roomsRequested,
                roomTimes: this.state.roomTimes,
                dayOfWeek: this.state.dayOfWeek,
                dateDay: this.state.dateDay,
                dateMonth: this.state.dateMonth,
                dateYear: this.state.dateYear,
                set: true
            });
        } else {
            this.setState({missing: true});
        }
    };

    render() {
        // if (this.state.toConfirm === true) {    //Trevor added this to redirect to confirmation page
        //     return <Redirect to='/confirmation'/>
        // }
        return (
            <Collapsible accordion={false}>
                <CollapsibleItem
                    expanded={true}
                    header="Select Date"
                    icon={<Icon>calendar</Icon>}
                    node="div"
                >
                    <Calendar
                        parentCallBackDate={this.callBackFunctionDate}
                    />
                </CollapsibleItem>
                <CollapsibleItem
                    expanded={false}
                    header="Select Party Package"
                    icon={<Icon>check</Icon>}
                    node="div"
                    className={'PartyPackage'}
                >
                    <PartyPackageSelector parentCallBackPartyPackage={this.callBackFunctionPartyPackage}/>
                </CollapsibleItem>
                <CollapsibleItem
                    expanded={false}
                    header="Select Party Area"
                    icon={<Icon>place</Icon>}
                    node="div"
                    className={'PartyArea'}
                >
                    <PartyAreaSelector partyPackage={this.state.partyPackage}
                                       parentCallBackPartyArea={this.callBackFunctionPartyArea}/>
                </CollapsibleItem>
                <CollapsibleItem
                    expanded={false}
                    header="Select Time Slot"
                    icon={<Icon>watch</Icon>}
                    node="div"
                    className={'TimeList'}
                >
                    <TimeList partyPackage={this.state.partyPackage}
                              dayOfWeek={this.state.dayOfWeek}
                              dateDay={this.state.dateDay}
                              dateMonth={this.state.dateMonth}
                              dateYear={this.state.dateYear}
                              roomsRequested={this.state.roomsRequested}
                              parentCallBackTimeSelected={this.parentCallBackTimeSelected}/>

                </CollapsibleItem>
                <CollapsibleItem
                    expanded={false}
                    header="Enter your final information"
                    icon={<Icon>info</Icon>}
                    node="div"
                    className={'Info'}
                >
                    <CreatePartyComponent parentCallback={this.callBackFunctionInfo}/>
                </CollapsibleItem>
                {this.isSomethingMissingText}
                <div className={'input-field'}>
                    <isSomethingMissingText/>
                    <button className={'btn purple'} onClick={this.handleSubmit}>Submit</button>
                </div>
            </Collapsible>
        );
    }
}

export default MainScheduler;
