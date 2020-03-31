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
import emailjs from 'emailjs-com'
import Redirect from "react-router-dom/es/Redirect";


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
    callbackFunctionPhoneNumber = (childData) => {
        this.setState({
            phoneNumber: childData,
        })
    };

    fillOpenMain = () => {
        const functions = firebase.functions().httpsCallable('fillOpenHours');
        functions({
            docName: 'MainGymSunday',
            dayOfWeek: 1,
            room: 1,
            start: 132,
            end: 216
        });
        functions({
            docName: 'MainGymMonday',
            dayOfWeek: 2,
            room: 1,
            start: 0,
            end: 0
        });
        functions({
            docName: 'MainGymTuesday',
            dayOfWeek: 3,
            room: 1,
            start: 0,
            end: 0
        });
        functions({
            docName: 'MainGymWednesday',
            dayOfWeek: 4,
            room: 1,
            start: 0,
            end: 0
        });
        functions({
            docName: 'MainGymThursday',
            dayOfWeek: 5,
            room: 1,
            start: 0,
            end: 0
        });
        functions({
            docName: 'MainGymFriday',
            dayOfWeek: 6,
            room: 1,
            start: 0,
            end: 0
        });
        functions({
            docName: 'MainGymSaturday',
            dayOfWeek: 7,
            room: 1,
            start: 156,
            end: 252
        });
    };
    fillOpenNinja = () => {
        const functions = firebase.functions().httpsCallable('fillOpenHours');
        functions({
            docName: 'NinjaSunday',
            dayOfWeek: 1,
            room: 5,
            start: 132,
            end: 180
        });
        functions({
            docName: 'NinjaSunday1',
            dayOfWeek: 1,
            room: 5,
            start: 204,
            end: 216
        });
        functions({
            docName: 'NinjaMonday',
            dayOfWeek: 2,
            room: 5,
            start: 0,
            end: 0
        });
        functions({
            docName: 'NinjaTuesday',
            dayOfWeek: 3,
            room: 5,
            start: 0,
            end: 0
        });
        functions({
            docName: 'NinjaWednesday',
            dayOfWeek: 4,
            room: 5,
            start: 0,
            end: 0
        });
        functions({
            docName: 'NinjaThursday',
            dayOfWeek: 5,
            room: 5,
            start: 0,
            end: 0
        });
        functions({
            docName: 'NinjaFriday',
            dayOfWeek: 6,
            room: 5,
            start: 0,
            end: 0
        });
        functions({
            docName: 'NinjaSaturday',
            dayOfWeek: 7,
            room: 5,
            start: 156,
            end: 252
        });
    };
    fillOpenKM = () => {
        const functions = firebase.functions().httpsCallable('fillOpenHours');
        functions({
            docName: 'KMSunday',
            dayOfWeek: 1,
            room: 2,
            start: 132,
            end: 216
        });
        functions({
            docName: 'KMMonday',
            dayOfWeek: 2,
            room: 2,
            start: 0,
            end: 0
        });
        functions({
            docName: 'KMTuesday',
            dayOfWeek: 3,
            room: 2,
            start: 0,
            end: 0
        });
        functions({
            docName: 'KMWednesday',
            dayOfWeek: 4,
            room: 2,
            start: 0,
            end: 0
        });
        functions({
            docName: 'KMThursday',
            dayOfWeek: 5,
            room: 2,
            start: 0,
            end: 0
        });
        functions({
            docName: 'KMFriday',
            dayOfWeek: 6,
            room: 2,
            start: 0,
            end: 0
        });
        functions({
            docName: 'KMSaturday',
            dayOfWeek: 7,
            room: 2,
            start: 156,
            end: 252
        });
    };
    fillOpenRW = () => {
        const functions = firebase.functions().httpsCallable('fillOpenHours');
        functions({
            docName: 'RWSunday',
            dayOfWeek: 1,
            room: 3,
            start: 132,
            end: 216
        });
        functions({
            docName: 'RWMonday',
            dayOfWeek: 2,
            room: 3,
            start: 0,
            end: 0
        });
        functions({
            docName: 'RWTuesday',
            dayOfWeek: 3,
            room: 3,
            start: 0,
            end: 0
        });
        functions({
            docName: 'RWWednesday',
            dayOfWeek: 4,
            room: 3,
            start: 0,
            end: 0
        });
        functions({
            docName: 'RWThursday',
            dayOfWeek: 5,
            room: 3,
            start: 0,
            end: 0
        });
        functions({
            docName: 'RWFriday',
            dayOfWeek: 6,
            room: 3,
            start: 0,
            end: 0
        });
        functions({
            docName: 'RWSaturday',
            dayOfWeek: 7,
            room: 3,
            start: 156,
            end: 252
        });
    };
    fillOpenPreschool = () => {
        const functions = firebase.functions().httpsCallable('fillOpenHours');
        functions({
            docName: 'PreschoolSunday',
            dayOfWeek: 1,
            room: 4,
            start: 132,
            end: 216
        });
        functions({
            docName: 'PreschoolMonday',
            dayOfWeek: 2,
            room: 4,
            start: 0,
            end: 0
        });
        functions({
            docName: 'PreschoolTuesday',
            dayOfWeek: 3,
            room: 4,
            start: 0,
            end: 0
        });
        functions({
            docName: 'PreschoolWednesday',
            dayOfWeek: 4,
            room: 4,
            start: 0,
            end: 0
        });
        functions({
            docName: 'PreschoolThursday',
            dayOfWeek: 5,
            room: 4,
            start: 0,
            end: 0
        });
        functions({
            docName: 'PreschoolFriday',
            dayOfWeek: 6,
            room: 4,
            start: 0,
            end: 0
        });
        functions({
            docName: 'PreschoolSaturday',
            dayOfWeek: 7,
            room: 4,
            start: 156,
            end: 252
        });
    };


    pullOpenHours = () => {
        const functions = firebase.functions().httpsCallable('pullOpenHours');
        functions({}).then(function (result) {
            console.log(result);
        });
    };


    componentDidMount() {
        M.AutoInit();
    }

    sendFeedback (templateId, variables) {
        emailjs.send(
            'gmail', templateId,
            variables,"user_5Iox4i8HmOcOQCgLT1kCH"
        ).then(res => {
            console.log('Email successfully sent!')
        })
            // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const templateId = 'template_KxFFbbaf' ;

        this.sendFeedback(templateId, {
            message_html:"Thanks for booking with us!",
            to_name: this.state.partyName,
            to_email: this.state.email
        });

        this.setState(() => ({      //Trevor added this to redirect to confirmation page
            toConfirm: true
        }))
        //this.props.history.push('./confirmation');
    };

    testFunction = () => {
        const functions = firebase.functions().httpsCallable('checkPartyTimeOne');
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
    }


    render() {
        if (this.state.toConfirm === true) {    //Trevor added this to redirect to confirmation page
            return <Redirect to='/confirmation'/>
        }
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
                    <PartyAreaSelector partyPackage={this.state.partyPackage}
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
                <div className={'input-field'}>
                    <button className={'btn purple'} onClick={this.fillOpenMain}>Main Gym Open Hours</button>
                </div>
                <div className={'input-field'}>
                    <button className={'btn purple'} onClick={this.fillOpenKM}>KM Open Hours</button>
                </div>
                <div className={'input-field'}>
                    <button className={'btn purple'} onClick={this.fillOpenNinja}>Ninja</button>
                </div>
                <div className={'input-field'}>
                    <button className={'btn purple'} onClick={this.fillOpenPreschool}>Preschool</button>
                </div>
                <div className={'input-field'}>
                    <button className={'btn purple'} onClick={this.fillOpenRW}>Rockwall</button>
                </div>
                <div className={'input-field'}>
                    <button className={'btn purple'} onClick={this.pullOpenHours}>pullOpen</button>
                </div>
                <div className={'input-field'}>
                    <button className={'btn purple'} onClick={this.testFunction}>Test Function Button</button>
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
