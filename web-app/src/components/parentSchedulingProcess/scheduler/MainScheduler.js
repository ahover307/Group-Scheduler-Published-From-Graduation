import React, {Component} from "react";
import TimeSlotComponent from "./TimeSlotComponent";
import InformationComponent from './InformationComponent';
import PartyPackageComponent from "./PartyPackageComponent";
import PartyAreaComponent from "./PartyAreaComponent";
import M from "materialize-css";
import {Collapsible, CollapsibleItem, Icon} from 'react-materialize'
// import * as firebase from "firebase";
import emailjs from 'emailjs-com'
import Calendar from "./CalendarComponent";

class MainScheduler extends Component {
    state = {
        contactName: '',
        email: '',
        phoneNumber: '',
        partyName: '',
        partyPackage: -1,
        roomsRequested: [],
        roomTimes: [],
        dayOfWeek: 1,
        dateDay: 0,
        dateMonth: 0,
        dateYear: 0,
        missing: false,
        price: 0,
        age: ''
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

    // Update state from PartyPackageComponent to MainScheduler
    callBackFunctionPartyPackage = (childData) => {
        this.setState({
            partyPackage: childData.partyPackage,
            price: childData.price,
            roomsRequested: []
        });
    };

    // Update state from PartyAreaComponent to MainScheduler
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

    // Update state from InformationComponent to MainScheduler
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
        ).then(function () {
            console.log('Email successfully sent!')
        })
            // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occurred:', err))
    }

    checkIfMissing = () => {
        //Maybe do this with the this.baseState thing i was reading about earlier
        if (this.state.contactName === '') {
            return true
        }
        if (this.state.email === '') {
            return true
        }
        if (this.state.phoneNumber === '') {
            return true
        }
        if (this.state.age === '') {
            return true
        }
        if (this.state.partyName === '') {
            return true
        }
        if (this.state.partyPackage === -1) {
            return true
        }
        if (this.state.roomsRequested === []) {
            return true
        }
        if (this.state.roomTimes === []) {
            return true
        }
        if (this.state.dayOfWeek === 0) {
            return true
        }
        if (this.state.dateDay === 0) {
            return true
        }
        if (this.state.dateMonth === 0) {
            return true
        }
        if (this.state.dateYear === 0) {
            return true
        }
        return this.state.price <= 0;
    }

    isSomethingMissingText = () => {
        //TODO Format this to be big and scary
        if (this.state.missing) {
            return (
                <div>
                    Something is missing from the form!
                </div>
            );
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        console.log(this.state);

        //Confirm everything has a value before continuing.
        let isSomethingMissing = this.checkIfMissing();

        //If every thing has a value, then
        if (!isSomethingMissing) {
            this.props.callBack({
                contactName: this.state.contactName,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                partyName: this.state.partyName,
                partyPackage: this.state.partyPackage,
                roomsRequested: this.state.roomsRequested,
                roomTimes: this.state.roomTimes,
                dayOfWeek: this.state.dayOfWeek,
                dateDay: this.state.dateDay,
                dateMonth: this.state.dateMonth,
                dateYear: this.state.dateYear,
                set: true,
                price: this.state.price,
                age: this.state.age
            });
        } else {
            this.setState({missing: true});
        }
    };

    render() {
        return (
            <div>
                {this.isSomethingMissingText()}

                <Collapsible accordion={false} data-start-time={10}>
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
                        <PartyPackageComponent parentCallBackPartyPackage={this.callBackFunctionPartyPackage}/>
                    </CollapsibleItem>

                    <CollapsibleItem
                        expanded={false}
                        header="Select Party Area"
                        icon={<Icon>place</Icon>}
                        node="div"
                        className={'PartyArea'}
                    >
                        <PartyAreaComponent partyPackage={this.state.partyPackage}
                                            parentCallBackPartyArea={this.callBackFunctionPartyArea}
                                            area1={this.state.roomsRequested[0]}
                                            area2={this.state.roomsRequested[1]}
                                            area3={this.state.roomsRequested[2]}/>
                    </CollapsibleItem>

                    <CollapsibleItem
                        expanded={false}
                        header="Select Time Slot"
                        icon={<Icon>watch</Icon>}
                        node="div"
                        className={'TimeSlotComponent'}
                    >
                        <TimeSlotComponent partyPackage={this.state.partyPackage}
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
                        <InformationComponent parentCallback={this.callBackFunctionInfo}/>
                    </CollapsibleItem>

                    <div className={'input-field'}>
                        <button className={'btn purple'} onClick={this.handleSubmit}>Submit</button>
                    </div>
                </Collapsible>
            </div>
        );
    }
}

export default MainScheduler;
