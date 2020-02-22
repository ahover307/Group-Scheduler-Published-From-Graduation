import React, {Component} from "react";

// import M from 'materialize-css'

class PartyAreaSelector extends Component {
    state = {
        ninjaParty: 'checked',
        partyAreas: [],
        areasNeeded: 2
    };


    handleChange = (e) => {
        let tempArr = this.state.partyAreas;

        if (e.target.value()) {
            tempArr.splice(tempArr.indexOf(e.target.id));
            this.setState({partyAreas: tempArr});
        } else {
            tempArr.push(e.target.id);
            this.setState({partyAreas: tempArr});
        }
        console.log(e.target.value);
    };

    handleSubmit = (e) => {
        console.log('Submit submitted');
    };

    // componentDidMount() {
    //     M.AutoInit();
    //     console.log('Auto init ran')
    // }

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
                            <select className={'browser-default'} defaultValue={''}
                                    disabled={this.state.areasNeeded < 1}>
                                <option value={''} disabled={true}>Choose First Party Area</option>
                                {optionsList}
                            </select>
                        </div>

                        <div className="input-field">
                            <select className={'browser-default'} defaultValue={''}
                                    disabled={this.state.areasNeeded < 2}>
                                <option value={''} disabled>Choose Second Party Area</option>
                                {optionsList}
                            </select>
                        </div>

                        <div className="input-field">
                            <select className={'browser-default'} defaultValue={''}
                                    disabled={this.state.areasNeeded < 3}>
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