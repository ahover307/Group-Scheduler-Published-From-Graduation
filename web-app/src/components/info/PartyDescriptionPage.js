import React, {Component} from 'react';
import DescriptionNotes from "./DescriptionNotes";
import PartyDescription from "./PartyDescription";
import NinjaPartyDescription from "./NinjaPartyDescription";


class PartyDescriptionPage extends Component {
    render() {
        return (
            <div className={"black-text"}>
                <div className={'row'}>
                    <DescriptionNotes/>
                </div>

                <div className={'row'}>
                    <div className={'col s12 m6'}>
                        <PartyDescription/>
                    </div>
                    <div className={'col s12 m5 offset-m1'}>
                        <NinjaPartyDescription/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PartyDescriptionPage;
