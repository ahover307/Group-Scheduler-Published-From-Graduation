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
        hostName: '',
        kmEnd: 0,
        kmStart: 0,
        mainGymEnd: 0,
        mainGymStart: 0,
        ninjaEnd: 0,
        ninjaStart: 0,
        paid: true,
        participantsAge: 0,
        partyEndTime: 0,
        partyName: '',
        partyPackage: 0,
        roomsRequested: [],
        roomTimes: [[]],
        dayOfWeek: 0,
        partyStartTime: 0,
        paypalInfo: 0,
        phoneNumber: '',
        preschoolEnd: 0,
        preschoolStart: 0,
        rwGymEnd: 0,
        rwGymStart: 0
    };

    // Update state from PartyPackageSelector to MainScheduler
    callBackFunctionPartyPackage = (childData) => {
        this.setState({
            partyPackage: childData
        })
    };

    // Update state from PartyAreaSelector to MainScheduler


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

        // const functions = firebase.functions;
        // let letsCreateAParty = functions.httpsCallable('checkPartyTime');
        // let timesAvailableArray = letsCreateAParty(this.state);
        // console.log(timesAvailableArray);
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
                    <PartyPackageSelector parentCallBackPartyPackage = {this.callBackFunctionPartyPackage}/>
                </CollapsibleItem>
                <CollapsibleItem
                    expanded={false}
                    header="Select Party Area"
                    icon={<Icon>place</Icon>}
                    node="div"
                    className={'PartyArea'}
                >
                    <PartyAreaSelector data = {this.state.partyPackage}/>
                </CollapsibleItem>
                <CollapsibleItem
                    expanded={false}
                    header="Select a Time Slot"
                    icon={<Icon>watch</Icon>}
                    node="div"
                    className={'TimeList'}
                    >
                    <TimeList/>
                </CollapsibleItem>
                <CollapsibleItem
                    expanded={false}
                    header="Enter your final information"
                    icon={<Icon>info</Icon>}
                    node="div"
                    className={'Info'}
                >
                    <CreatePartyComponent parentCallbackPartyName = {this.callbackFunctionPartyName} parentCallBackHostName = {this.callbackFunctionHostName}
                    parentCallBackEmail = {this.callbackFunctionEmail} parentCallBackPhoneNumber = {this.callbackFunctionPhoneNumber}/>
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
