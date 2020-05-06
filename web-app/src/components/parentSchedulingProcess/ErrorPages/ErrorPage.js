import React, {Component} from 'react';
import ErrorText from "./ErrorText";

class confirmation extends Component {
    render() {
        return (
            <div>
                <h3> We are sorry, but an issue has occured with the payment. To fix this you are going to have to call
                    in to us at, (717)810-7967</h3>
                <h4> If we ask, the information below is provided: </h4>
                <ErrorText
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