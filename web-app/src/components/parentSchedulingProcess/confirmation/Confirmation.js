import React, {Component} from 'react';
import './Confirmation.css';
import ConfirmationText from "./ConfirmationText";

class confirmation extends Component {
    render() {
        return (
            <div class="main">
                <h3> Your Party has been Confirmed, and you may now close this page</h3>
                <ConfirmationText
                    partyPackage={this.props.partyPackage}
                    month={this.props.dateMonth}
                    date={this.props.dateDay}
                    year={this.props.dateYear}
                    dayOfWeek={this.props.dayOfWeek}
                    roomsRequested={this.props.roomsRequested}
                    roomTimes={this.props.roomTimes}
                    partyName={this.props.partyName}
                    contactName={this.props.contactName}/>
            </div>

        );
    }

}

export default confirmation;