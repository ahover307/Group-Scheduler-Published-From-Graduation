import React, {Component} from 'react';
import './Confirmation.css';
import ConfirmationText from "./ConfirmationText";

class confirmation extends Component {
    render() {
        return (
            <div>
                <h3> Your Party has been Confirmed, and you may now close this page</h3>
                <ConfirmationText
                    contactName={this.props.contactName}
                    partyPackage={this.props.partyPackage}
                    roomsRequested={this.props.roomsRequested}
                    roomTimes={this.props.roomTimes}
                    partyName={this.props.partyName}
                    dayOfWeek={this.props.dayOfWeek}
                    date={this.props.date}
                    month={this.props.month}
                    year={this.props.year}
                />
            </div>

        );
    }

}

export default confirmation;