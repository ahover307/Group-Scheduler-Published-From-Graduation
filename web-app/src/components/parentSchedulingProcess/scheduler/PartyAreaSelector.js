import React, {Component} from "react";

class PartyAreaSelector extends Component {
    state = {
        area1: 0,
        area2: 0,
        area3: 0,
        update: false
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
        this.props.parentCallBackPartyArea({
            selector: e.target.id,
            area: parseInt(e.target.value)
        });
    };

    //Remove an area once it is selected once.
    render() {
        const partyTypes = [
            'Main Gym',
            'Kidmazium',
            'Rock Wall',
            'Preschool'
        ];

        const optionsList = [];
        for (const [index, value] of partyTypes.entries()) {
            optionsList.push(
                <option key={index} value={index + 1}>{value}</option>
            )
        }

        //If a Ninja Party the first party selection must be a ninja party
        let ninjaOption = <option disabled={false} defaultValue={5} key={5} value={5}>{'Ninja'}</option>;
        //Set a flag if this is a ninja party
        const ninjaFlag = this.props.partyPackage <= 8 && this.props.partyPackage >= 5;

        return (
            <div className={'container'}>
                <div className={'container'}>
                    <form>
                        <div className={'input-field'}>
                            <select name={'first'} className={'browser-default'} defaultValue={''}
                                    disabled={this.areasNeeded() < 1} id={'area1'} onChange={this.handleChange}>
                                <option value={''} disabled={true}>Choose First Party Area</option>
                                {((ninjaFlag) ? ninjaOption : optionsList)}
                            </select>
                        </div>
                        <div className="input-field">
                            <select name={'second'} className={'browser-default'} defaultValue={''}
                                    disabled={this.areasNeeded() < 2} id={'area2'} onChange={this.handleChange}>
                                <option value={''} disabled>Choose Second Party Area</option>
                                {optionsList}
                            </select>
                        </div>
                        <div className="input-field">
                            <select name={'third'} className={'browser-default'} defaultValue={''}
                                    disabled={this.areasNeeded() < 3} id={'area3'} onChange={this.handleChange}>
                                <option value={''} disabled>Choose Third Party Area</option>
                                {optionsList}
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
}

export default PartyAreaSelector