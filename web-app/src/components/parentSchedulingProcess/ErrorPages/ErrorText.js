import React, {Component} from 'react';
import {
    dateIntegersToString,
    formatPartyRooms,
    startAndEndTimesFromIndex,
    updatePartyPackageString
} from "../../globalFunctions";

class ConfirmationText extends Component {

    render() {
        return (
            <div>
                <span><strong> Payment info: </strong> gibberish </span>
                <span><strong> Party Package: </strong> {updatePartyPackageString(this.props.partyPackage)} </span>
                <span><strong> Party Date: </strong> {dateIntegersToString({
                    month: this.props.month,
                    date: this.props.date,
                    year: this.props.year,
                    dayOfWeek: this.props.dayOfWeek
                })} </span>
                <span><strong> Party Area(s): </strong> (In Order) - {formatPartyRooms({array: this.props.roomsRequested})} </span>
                <span><strong> Party Time: </strong> {startAndEndTimesFromIndex({array: this.props.roomTimes})} </span>
                <span><strong> Party For: </strong> {this.props.partyName} </span>
                <span><strong> Host: </strong> {this.props.contactName} </span>
            </div>
        );
    }
}

export default ConfirmationText;