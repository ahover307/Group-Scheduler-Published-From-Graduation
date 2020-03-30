import React, {Component} from "react";

class PartyAreaSelector extends Component {
    state = {
        partyPackage: -1,
    };

    // Do not change it to ===, for some reason it doesn't work
    areasNeeded = () => {
        if (this.props.partyPackage == 0 || this.props.partyPackage == 1 || this.props.partyPackage == 5)
            return 1;
        else if (this.props.partyPackage == 2 || this.props.partyPackage == 6 || this.props.partyPackage == 7 || this.props.partyPackage == 8)
            return 2;
        else if (this.props.partyPackage == 3)
            return 3;
        else
            return -1;
    };

    handleChangePartyArea1 = (e) => {
        this.props.parentCallBackPartyArea1(e.target.value);
    };
    handleChangePartyArea2 = (e) => {
        this.props.parentCallBackPartyArea2(e.target.value);
    };
    handleChangePartyArea3 = (e) => {
        this.props.parentCallBackPartyArea3(e.target.value);
    };

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
                <option key={index + 1} value={index + 1}>{value}</option>
            )
        }

        //If a Ninja Party the first party selection must be a ninja party
        let ninjaOption = <option disabled={false} defaultValue={5} key={5} value={5}>{'Ninja'}</option>;
        //Set a flag if this is a ninja party
        const ninjaFlag = this.props.partyPackage <= 8 && this.props.partyPackage >= 5;

        return (
            <div className={'container'}>
                <div className={'container'}>
                    <form action={'#'} onSubmit={this.handleSubmit}>
                        <div className={'input-field'}>
                            <select name={'first'} className={'browser-default'} defaultValue={''}
                                    disabled={this.areasNeeded() < 1} onChange={this.handleChangePartyArea1}>
                                <option value={''} disabled={true}>Choose First Party Area</option>
                                {((ninjaFlag) ? ninjaOption : optionsList)}
                            </select>
                        </div>
                        <div className="input-field">
                            <select name={'second'} className={'browser-default'} defaultValue={''}
                                    disabled={this.areasNeeded() < 2} onChange={this.handleChangePartyArea2}>
                                <option value={''} disabled>Choose Second Party Area</option>
                                {optionsList}
                            </select>
                        </div>
                        <div className="input-field">
                            <select name={'third'} className={'browser-default'} defaultValue={''}
                                    disabled={this.areasNeeded() < 3} onChange={this.handleChangePartyArea3}>
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