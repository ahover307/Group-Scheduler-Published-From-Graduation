import React, {Component} from "react";
import MainScheduler from "./scheduler/MainScheduler";
import PaymentPage from "./payment/PaymentPage";
import Confirmation from "./confirmation/Confirmation";

class ParentScheduler extends Component {
    state = {
        contactName: '',
        email: '',
        phoneNumber: '',
        paid: false,
        set: false,
        participantsAge: 0,
        partyName: '',
        partyPackage: 0,
        roomsRequested: [0],
        roomTimes: [],
        dayOfWeek: 1,
        dateDay: 0,
        dateMonth: 0,
        dateYear: 0
    };

    getStateFromMainScheduler = (childState) => {
        this.setState({
            contactName: childState.contactName,
            email: childState.email,
            phoneNumber: childState.phoneNumber,
            set: childState.set,
            participantsAge: childState.participantsAge,
            partyName: childState.partyName,
            partyPackage: childState.partyPackage,
            roomsRequested: childState.roomsRequested,
            roomTimes: childState.roomTimes,
            dayOfWeek: childState.dayOfWeek,
            dateDay: childState.dateDay,
            dateMonth: childState.dateMonth,
            dateYear: childState.dateYear,
        });
    };

    getStateFromCheckOut = () => {
        this.setState({
            paid: true
        });
    };


    render() {
        {
            if (!this.state.set) {
                return (
                    <MainScheduler
                        callBack={this.getStateFromMainScheduler}/>
                );
            } else if (!this.state.paid) {
                return (
                    <PaymentPage
                        callBack={this.getStateFromCheckOut}
                        contactName={this.state.contactName}
                        partyPackage={this.state.partyPackage}
                        roomsRequested={this.state.roomsRequested}
                        roomTimes={this.state.roomTimes}
                        partyName={this.state.partyName}
                        dayOfWeek={this.state.dayOfWeek}
                        date={this.state.dateDay}
                        month={this.state.dateMonth}
                        year={this.state.dateYear}
                    />
                );
            } else if (this.state.set && this.state.paid) {
                return (
                    <Confirmation
                        partyPackage={this.state.partyPackage}
                        month={this.state.dateMonth}
                        date={this.state.dateDay}
                        year={this.state.dateYear}
                        dayOfWeek={this.state.dayOfWeek}
                        roomsRequested={this.state.roomsRequested}
                        roomTimes={this.state.roomTimes}
                        partyName={this.state.partyName}
                        contactName={this.state.contactName}/>
                );
            } else {
                return (
                    <div>else page</div>
                    // <NotFoundPage/>
                );
            }
        }
    }
}

export default ParentScheduler;