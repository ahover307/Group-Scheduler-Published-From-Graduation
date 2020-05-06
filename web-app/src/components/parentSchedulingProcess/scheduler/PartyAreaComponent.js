import React, {Component} from "react";
import {partyDescriptions} from "./PartyAreaShortDescriptions";

class PartyAreaComponent extends Component {
    state = {
        area1: 0,
        area2: 0,
        area3: 0,
        partyPackage: -1
    };

    checkIfParentUpdated = () => {
        //TODO This throws an error?
        //But it seems more like an
        if (this.props.partyPackage !== this.state.partyPackage) {
            this.setState({
                area1: 0,
                area2: 0,
                area3: 0,
                partyPackage: this.props.partyPackage
            });
        }
    };

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
        this.setState({[e.target.id]: e.target.value});

        this.props.parentCallBackPartyArea({
            selector: e.target.id,
            area: parseInt(e.target.value)
        });
    };

    getRoomCodeFromState = (i) => {
        switch (i) {
            case 1:
                return this.state.area1;
            case 2:
                return this.state.area2;
            case 3:
                return this.state.area3;
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
        }
    }

    firstSecondThird = (i) => {
        switch (i) {
            case 1:
                return 'first';
            case 2:
                return 'second';
            case 3:
                return 'third';
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
                <option key={index} value={index + 1}>{value}</option>
            )
        }

        //If a Ninja Party the first party selection must be a ninja party
        let ninjaOption = <option disabled={false} defaultValue={5} key={5} value={5}>{'Ninja'}</option>;
        //Set a flag if this is a ninja party
        const ninjaFlag = this.props.partyPackage <= 8 && this.props.partyPackage >= 5;

        let dropdownList = [];
        for (let i = 1; i <= this.areasNeeded(); i++) {
            dropdownList.push(
                <div className={'input-field'}>
                    <select name={i} className={'browser-default'} value={this.getRoomCodeFromState(i)}
                            hidden={this.areasNeeded() < (i)} id={this.getAreaText(i)} onChange={this.handleChange}>
                        <option value={0} disabled={true}>Choose {this.firstSecondThird(i)} Party Area</option>
                        {((i === 0) ? ((ninjaFlag) ? ninjaOption : optionsList) : optionsList)}
                    </select>
                    <div>{partyDescriptions(this.getRoomCodeFromState(i))}</div>
                </div>
            )
        }

        if (dropdownList.length === 0) {
            dropdownList.push(
                <div>
                    Try selecting a party package so we know which rooms to offer!
                </div>
            )
        }

        return (
            <form>
                {dropdownList}
            </form>
        );
    }

    render() {
        //Check if the package changed, and is so reset the options lists
        this.checkIfParentUpdated();

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