import React, {Component} from "react";

class PartyAreaSelector extends Component {
    state = {
        ninjaParty: 'checked',
        partyArea1: -1,
        partyArea2: -1,
        partyArea3: -1,
        areasNeeded: 2
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
                                    disabled={this.state.areasNeeded < 1} onChange={this.handleChange}>
                                <option value={''} disabled={true}>Choose First Party Area</option>
                                {optionsList}
                            </select>
                        </div>

                        <div className="input-field">
                            <select name={'second'} className={'browser-default'} defaultValue={''}
                                    disabled={this.state.areasNeeded < 2} onChange={this.handleChange}>
                                <option value={''} disabled>Choose Second Party Area</option>
                                {optionsList}
                            </select>
                        </div>

                        <div className="input-field">
                            <select name={'third'} className={'browser-default'} defaultValue={''}
                                    disabled={this.state.areasNeeded < 3} onChange={this.handleChange}>
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