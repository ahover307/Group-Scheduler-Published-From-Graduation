import React, {Component} from "react";

class PartyAreaSelector extends Component {
    state = {
        ninjaParty: 'checked',
        partyArea1: -1,
        partyArea2: -1,
        partyArea3: -1,
        partyPackage: 6
    };

    areasNeeded = () => {
        if (this.state.partyPackage === 0 || this.state.partyPackage === 1)
            return 1;
        else if (this.state.partyPackage === 2)
            return 2;
        else if (this.state.partyPackage === 3)
            return 3;
        else if (this.state.partyPackage === 5)
            return 1;
        else if (this.state.partyPackage === 6 || this.state.partyPackage === 7 || this.state.partyPackage === 8)
            return 2;
        else if (this.state.partyPackage === 9)
            return 1;
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

        console.log(this.state);
        console.log(this.areasNeeded())
    };

    handleSubmit = (e) => {
        console.log('Submit submitted');
    };


    render() {
        const partyTypes = [
            'Main Gym',
            'Kidmaze',
            'Preschool',
            'Rock Wall'
        ];
        const optionsList = [];

        for (const [index, value] of partyTypes.entries()) {
            optionsList.push(
                <option key={index} value={index}>{value}</option>
            )
        }

        return (
            <div className={'container'}>
                <div className={'container'}>
                    <form action={'#'} onSubmit={this.handleSubmit}>
                        <div className={'input-field'}>
                            <select name={'first'} className={'browser-default'} defaultValue={''}
                                    disabled={this.areasNeeded() < 1} onChange={this.handleChange}>
                                <option value={''} disabled={true}>Choose First Party Area</option>
                                {optionsList}
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
        )
    };
}

export default PartyAreaSelector