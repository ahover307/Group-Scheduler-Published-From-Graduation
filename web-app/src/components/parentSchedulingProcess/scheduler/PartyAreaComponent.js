import React, {Component} from "react";
import {partyDescriptions} from "./PartyAreaShortDescriptions";

class PartyAreaComponent extends Component {


    areasNeeded = () => {
        if (parseInt(this.props.partyPackage) === 0 || parseInt(this.props.partyPackage) === 1 || parseInt(this.props.partyPackage) === 5)
            return 1;
        else if (parseInt(this.props.partyPackage) === 2 || parseInt(this.props.partyPackage) === 6 || parseInt(this.props.partyPackage) === 7 || parseInt(this.props.partyPackage) === 8)
            return 2;
        else if (parseInt(this.props.partyPackage) === 3)
            return 3;
        else
            return -1;
    };

    handleChange = (e) => {
        this.props.parentCallBackPartyArea({
            selector: e.target.id,
            area: parseInt(e.target.value)
        });
    };

    getRoomCodeFromState = (i) => {
        switch (i) {
            case 1:
                if (this.props.area1 === undefined) {
                    return 0;
                } else {
                    return this.props.area1;
                }
            case 2:
                if (this.props.area2 === undefined) {
                    return 0;
                } else {
                    return this.props.area2;
                }
            case 3:
                if (this.props.area3 === undefined) {
                    return 0;
                } else {
                    return this.props.area3;
                }
            default:
                return -1;
        }
    }

    getAreaText = (i) => {
        switch (i) {
            case 1:
                return 'area1';
            case 2:
                return 'area2';
            case 3:
                return 'area3';
            default:
                return 'Error';
        }
    }

    firstSecondThird = (i) => {
        switch (i) {
            case 1:
                return 'First';
            case 2:
                return 'Second';
            case 3:
                return 'Third';
            default:
                return 'ERROR';
        }
    }

    roomDropDown = () => {
        const partyTypes = [
            'Main Gym',
            'Kidmazium',
            'Rock Wall',
            'Preschool'
        ];

        let optionsList = [];
        for (const [index, value] of partyTypes.entries()) {
            optionsList.push(
                <option key={index + 1} value={index + 1}>{value}</option>
            )
        }

        //If a Ninja Party the first party selection must be a ninja party
        let ninjaOption = <option disabled={false} defaultValue={5} key={5} value={5}>{'Ninja'}</option>;
        //Set a flag if this is a ninja party
        const ninjaFlag = this.props.partyPackage <= 8 && this.props.partyPackage >= 5;

        let dropdownList = [];
        for (let i = 1; i <= this.areasNeeded(); i++) {
            dropdownList.push(
                <div key={i} className={'input-field'}>
                    <select key={i} name={i} className={'browser-default'} value={this.getRoomCodeFromState(i)}
                            hidden={this.areasNeeded() < (i)} id={this.getAreaText(i)} onChange={this.handleChange}>
                        <option key={0} value={0} disabled={true}>Choose {this.firstSecondThird(i)} Party Area</option>
                        {((i === 1) ? ((ninjaFlag) ? ninjaOption : optionsList) : optionsList)}
                    </select>
                    <div>{partyDescriptions(this.getRoomCodeFromState(i))}</div>
                </div>
            )
        }

        if (dropdownList.length === 0) {
            return (
                <div>
                    Try selecting a party package so we know which rooms to offer!
                </div>
            );
        }

        return (
            <form>
                {dropdownList}
            </form>
        );
    }

    render() {
        return (
            <div className={'container'}>
                <div className={'container'}>
                    {this.roomDropDown()}
                </div>
            </div>
        );
    };
}

export default PartyAreaComponent