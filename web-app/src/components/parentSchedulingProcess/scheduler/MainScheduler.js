import React, {Component} from "react";
import TimeList from "./TimeList";
import CreatePartyComponent from './CreatePartyComponent';
import PartyPackageSelector from "./PartyPackageSelector";
import PartyAreaSelector from "./PartyAreaSelector";
import M from "materialize-css";
import {Collapsible, CollapsibleItem, Icon} from 'react-materialize'
import {createParty} from "../../../store/actions/partyActions";
import connect from "react-redux/es/connect/connect";
// import * as firebase from "firebase";
import emailjs from 'emailjs-com'
import {Redirect} from "react-router-dom";
import {updatePartyAreaString, updatePartyPackageString} from "../../globalFunctions";
import Calendar from "./Calendar";

class MainScheduler extends Component {
    state = {
        contactName: '',
        email: '',
        phoneNumber: '',
        paid: true,
        participantsAge: 0,
        partyEndTime: 0,
        partyName: '',
        partyPackage: -1,
        roomsRequested: [1],
        roomTimes: [],
        dayOfWeek: 1,
        dateDay: 22,
        dateMonth: 3,
        dateYear: 2020,
        toConfirm: false,
    };

    callBackFunctionDate = (childData) => {
        console.log(childData);
        this.setState({dateDay: childData});
    };

    callBackFunctionMonth = (childData) => {
        console.log(childData);
        this.setState({dateMonth: childData});
    };

    callBackFunctionYear = (childData) => {
        console.log(childData);
        this.setState({dateYear: childData});
    };

    callBackFunctionDay = (childData) => {
        console.log(childData);
        this.setState({dayOfWeek: childData});
    };

    componentDidMount() {
        M.AutoInit();
    }

    // Update state from PartyPackageSelector to MainScheduler
    callBackFunctionPartyPackage = (childData) => {
        this.setState({
            partyPackage: childData
        });
    };

    // Update state from PartyAreaSelector to MainScheduler
    callBackFunctionPartyArea1 = (childData) => {
        this.setState({
            partyArea1: childData
        })
    };

    callBackFunctionPartyArea2 = (childData) => {
        this.setState({
            partyArea2: childData
        })
    };

    callBackFunctionPartyArea3 = (childData) => {
        this.setState({
            partyArea3: childData
        })
    };

    // Update state from CreatePartyComponent to MainScheduler
    callbackFunctionPartyName = (childData) => {
        this.setState({
            partyName: childData,
        })
    };

    callbackFunctionHostName = (childData) => {
        this.setState({
            hostName: childData,
        })
    };

    callbackFunctionEmail = (childData) => {
        this.setState({
            email: childData,
        })
    };

    parentCallBackTimeSelected = (timeSelectedArray) => {
        //the argument passed should be a sub array, parse this to fill in the state that is passed
        //The indices are different on the array depending on how many rooms are requested
        if (parseInt(this.props.partyPackage) === 0 || parseInt(this.props.partyPackage) === 1 || parseInt(this.props.partyPackage) === 5) {
            this.setState({
                roomsRequested: timeSelectedArray.slice(0, 1),
                roomTimes: timeSelectedArray.slice(1, 3)
            });
        } else if (parseInt(this.props.partyPackage) === 2 || parseInt(this.props.partyPackage) === 6 || parseInt(this.props.partyPackage) === 7 || parseInt(this.props.partyPackage) === 8) {
            this.setState({
                roomsRequested: timeSelectedArray.slice(0, 2),
                roomTimes: timeSelectedArray.slice(2, 6)
            });
        } else if (parseInt(this.props.partyPackage) === 3) {
            this.setState({
                roomsRequested: timeSelectedArray.slice(0, 3),
                roomTimes: timeSelectedArray.slice(3, 8)
            });
        }
    };

    callbackFunctionPhoneNumber = (childData) => {
        this.setState({
            phoneNumber: childData,
        })
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

    handleSubmit = async (e) => {
        e.preventDefault();
        const templateId = 'confirmationemail';
        const partyArea1String = updatePartyAreaString(this.state.partyArea1);
        console.log(this.state.partyArea1);
        console.log(partyArea1String);
        const partyArea2String = updatePartyAreaString(this.state.partyArea2);
        const partyArea3String = updatePartyAreaString(this.state.partyArea3);
        this.sendFeedback(templateId, {
            party_name: this.state.partyName,
            party_package: updatePartyPackageString(this.state.partyPackage),
            party_area1: partyArea1String,
            party_area2: partyArea2String,
            party_area3: partyArea3String,
            party_host: this.state.hostName,
            phone_number: this.state.phoneNumber,
            to_email: this.state.email
        });

        this.setState(() => ({      //Trevor added this to redirect to confirmation page
            toConfirm: true
        }))
        //this.props.history.push('./confirmation');

        //this.props.createParty(this.state); <-- Don't delete this    <-- why not
    };

    render() {
        if (this.state.toConfirm === true) {    //Trevor added this to redirect to confirmation page
            return <Redirect to='/confirmation'/>
        }

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
                        parentCallBackMonth={this.callBackFunctionMonth}
                        parentCallBackYear={this.callBackFunctionYear}
                        parentCallBackDay={this.callBackFunctionDay}
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
                                       parentCallBackPartyArea1={this.callBackFunctionPartyArea1}
                                       parentCallBackPartyArea2={this.callBackFunctionPartyArea2}
                                       parentCallBackPartyArea3={this.callBackFunctionPartyArea3}/>
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
                    <CreatePartyComponent parentCallbackPartyName={this.callbackFunctionPartyName}
                                          parentCallBackHostName={this.callbackFunctionHostName}
                                          parentCallBackEmail={this.callbackFunctionEmail}
                                          parentCallBackPhoneNumber={this.callbackFunctionPhoneNumber}/>
                </CollapsibleItem>
                <div className={'input-field'}>
                    <button className={'btn purple'} onClick={this.handleSubmit}>Submit</button>
                </div>
                <div className={'input-field'}>
                    <button className={'btn purple'} onClick={this.testFunction}>Test Function Button</button>
                </div>
            </Collapsible>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createParty: (party) => dispatch(createParty(party))
    }
};

export default connect(null, mapDispatchToProps)(MainScheduler);
