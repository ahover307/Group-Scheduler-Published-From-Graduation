import $ from 'jquery'
import React, {Component} from "react";
import TimeList from "./TimeList";
import CreatePartyComponent from './CreatePartyComponent';
import PartyPackageSelector from "./PartyPackageSelector";
import PartyAreaSelector from "./PartyAreaSelector";
import M from "materialize-css";
import {Collapsible, CollapsibleItem, Icon} from 'react-materialize'
import {createParty} from "../../store/actions/partyActions";
import connect from "react-redux/es/connect/connect";


class MainSchedulerCollaps extends Component {
    state = {
        contactName: '',
        email: '',
        hostName: '',
        kmEnd: 0,
        kmStart: 0,
        mainGymEnd: 0,
        mainGymStart: 0,
        ninjaEnd: 0,
        ninjaStart: 0,
        paid: true,
        participantsAge: 0,
        partyEndTime: 0,
        partyName: '',
        partyPackage: 0,
        partyStartTime: 0,
        paypalInfo: 0,
        phoneNumber: '',
        preschoolEnd: 0,
        preschoolStart: 0,
        rwGymEnd: 0,
        rwGymStart: 0
    };

    componentDidMount() {
        M.AutoInit();
        console.log('Auto init ran')
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createParty(this.state);
    };




    render() {
        return (
            <Collapsible accordion>
                <CollapsibleItem
                    expanded={true}
                    header="Select Party Package"
                    icon={<Icon>filter_drama</Icon>}
                    node="div"
                >
                    <PartyPackageSelector/>
                </CollapsibleItem>
                <CollapsibleItem
                    expanded={false}
                    header="Select Party Area"
                    icon={<Icon>place</Icon>}
                    node="div"
                >
                    <PartyAreaSelector/>
                </CollapsibleItem>
                <CollapsibleItem
                    expanded={false}
                    header="Select a Time Slot"
                    icon={<Icon>whatshot</Icon>}
                    node="div"
                >
                    <TimeList/>
                </CollapsibleItem>
                <CollapsibleItem
                    expanded={false}
                    header="Enter your final information"
                    icon={<Icon>whatshot</Icon>}
                    node="div"
                >
                    <CreatePartyComponent/>
                </CollapsibleItem>
                <div className={'input-field'}>
                    <button className={'btn purple'} onClick={this.handleSubmit}>Submit</button>
                </div>
            </Collapsible>

        )


    }
}

const mapDispatchToProps = dispatch => {
    return {
        createParty: (party) => dispatch(createParty(party))
    }
};

export default connect(null, mapDispatchToProps)(MainSchedulerCollaps);
