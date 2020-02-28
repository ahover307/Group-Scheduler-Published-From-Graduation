import React, {Component} from "react";
import TimeList from "./TimeList";
import CreatePartyComponent from './CreatePartyComponent';
import PartyPackageSelector from "./PartyPackageSelector";
import PartyAreaSelector from "./PartyAreaSelector";
import M from "materialize-css";




class MainScheduler extends Component {
    state = {
        partyType: 0
    };
    componentDidMount() {
        M.AutoInit();
        console.log('Auto init ran')
    }

    render() {
        return (
            <div className={"black-text"}>

                <div className={'row'}>
                    <PartyPackageSelector/>
                </div>
                <div className={'row'}>
                    <PartyAreaSelector/>
                </div>
                <div className={'row'}>
                    <div className={'col s12'}>
                        <TimeList/>
                    </div>
                    <div className={'col s12'}>
                        <CreatePartyComponent/>
                    </div>
                </div>
            </div>


        );
    }
}


export default MainScheduler;