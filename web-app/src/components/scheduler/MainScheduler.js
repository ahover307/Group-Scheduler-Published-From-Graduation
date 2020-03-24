import $ from 'jquery'
import React, {Component} from "react";
import TimeList from "./TimeList";
import CreatePartyComponent from './CreatePartyComponent';
import PartyPackageSelector from "./PartyPackageSelector";
import PartyAreaSelector from "./PartyAreaSelector";
import M from "materialize-css";
import {Collapsible, CollapsibleItem, Icon} from 'react-materialize'
import {createParty} from "../../store/actions/partyActions";
import connect from "react-redux/es/connect/connect";
import * as firebase from "firebase";

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
        dateYear: 2020
    };

    // Update state from PartyPackageSelector to MainScheduler
    callBackFunctionPartyPackage = (childData) => {
        console.log('state from before this ran in the other function');
        console.log(this.state);
        this.setState({
            partyPackage: childData
        });
        console.log(this.state);
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
    callbackFunctionPhoneNumber = (childData) => {
        this.setState({
            phoneNumber: childData,
        })
    };


    componentDidMount() {
        M.AutoInit();
        console.log('Auto init ran')
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.props.createParty(this.state);

        const functions = firebase.functions().httpsCallable('checkPartyTime');
        functions({
            partyPackage: this.state.partyPackage,
            dayOfWeek: this.state.dayOfWeek,
            roomsRequested: this.state.roomsRequested,
            dateDay: this.state.dateDay,
            dateMonth: this.state.dateMonth,
            dateYear: this.state.dateYear
        }).then(function (result) {
            console.log(result);
        });
    };

    render() {
        return (
            <Collapsible popout>
                <CollapsibleItem
                    expanded={true}
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
                    <PartyAreaSelector partyPackage ={this.state.partyPackage}
                                       parentCallBackPartyArea1={this.callBackFunctionPartyArea1}
                                       parentCallBackPartyArea2={this.callBackFunctionPartyArea2}
                                       parentCallBackPartyArea3={this.callBackFunctionPartyArea3}/>
                </CollapsibleItem>
                <CollapsibleItem
                    expanded={false}
                    header="Select a Time Slot"
                    icon={<Icon>watch</Icon>}
                    node="div"
                    className={'TimeList'}
                >
                    <TimeList partyArea1={this.state.partyArea1}
                              partyArea2={this.state.partyArea2}
                              partyArea3={this.state.partyArea3}/>

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
            </Collapsible>

        )


    }
}

const mapDispatchToProps = dispatch => {
    return {
        createParty: (party) => dispatch(createParty(party))
    }
};

export default connect(null, mapDispatchToProps)(MainScheduler);
