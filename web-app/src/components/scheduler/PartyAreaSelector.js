import React, {Component} from "react";

class PartyAreaSelector extends Component {
    state = {
        partyName: '',
        participantsAge: 0,
        contactName: '',
        email: '',
        phoneNumber: '',
        paid: true,
        partyStartTime: 0,
        partyEndTime: 0,
        partyPackage: 0,
        roomsRequested: [],
        roomTimes: [],
        dayOfWeek: 0,
        dateDay: 0,
        dateMonth: 0,
        dateYear: 0
    };

    // Do not change it to ===, for some reason it doesn't work
    areasNeeded = () => {
        if (this.state.partyPackage === 0 || this.state.partyPackage === 1 || this.state.partyPackage === 5)
            return 1;
        else if (this.state.partyPackage === 2 || this.state.partyPackage === 6 || this.state.partyPackage === 7 || this.state.partyPackage === 8)
            return 2;
        else if (this.state.partyPackage === 3)
            return 3;
        else
            return -1;
    };

    handleChange = (e) => {
        if ('first' === e.target.name) {
            this.setState({partyArea1: e.target.value});
        }
        if ('second' === e.target.name) {
            this.setState({partyArea2: e.target.value});
        }
        if ('third' === e.target.name) {
            this.setState({partyArea3: e.target.value});
        }
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
                <option key={index} value={index}>{value}</option>
            )
        }

        //If a Ninja Party the first party selection must be a ninja party
        let ninjaOption = <option disabled={false} defaultValue={5} key={5} value={5}>{'Ninja'}</option>;
        //Set a flag if this is a ninja party
        const ninjaFlag = this.state.partyPackage <= 8 && this.state.partyPackage >= 5;

        return (
            <div className={'container'}>
                <div className={'container'}>
                    <form action={'#'} onSubmit={this.handleSubmit}>
                        <div className={'input-field'}>
                            <select name={'first'} className={'browser-default'} defaultValue={''}
                                    disabled={this.areasNeeded() < 1} onChange={this.handleChange}>
                                <option value={''} disabled={true}>Choose First Party Area</option>
                                {((ninjaFlag) ? ninjaOption : optionsList)}
                            </select>
                        </div>
                        <div className="input-field">
                            <select name={'second'} className={'browser-default'} defaultValue={''}
                                    disabled={this.areasNeeded() < 2} onChange={this.handleChange}>
                                <option value={''} disabled>Choose Second Party Area</option>
                                {optionsList}
                            </select>
                        </div>
                        <div className="input-field">
                            <select name={'third'} className={'browser-default'} defaultValue={''}
                                    disabled={this.areasNeeded() < 3} onChange={this.handleChange}>
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