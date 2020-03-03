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

            <div className="carousel carousel-slider center " style={{height: '500px'}}  >
                <div className="carousel-item white-text" style={{padding: '5%'}}>
                    <PartyPackageSelector/>
                    <div className="carousel-fixed-item center">
                        <a className="btn waves-effect blue white-text darken-text-2">Next</a>
                    </div>
                </div>
                <div className="carousel-item  white-text" style={{padding: '5%'}}>
                    <PartyAreaSelector/>
                    <div className="carousel-fixed-item ">
                        <a className="btn waves-effect red white-text darken-text-2">Previous</a>
                        <a className="btn waves-effect blue  white-text darken-text-2">Next</a>
                    </div>
                </div>
                <div className="carousel-item  white-text" style={{padding: '5%'}}>
                    <TimeList/>
                    <div className="carousel-fixed-item center">
                        <a className="btn waves-effect red  white-text darken-text-2">Previous</a>
                        <a className="btn waves-effect blue  white-text darken-text-2">Next</a>
                    </div>
                </div>
                <div className="carousel-item white-text">
                    <CreatePartyComponent/>
                    <div className="carousel-fixed-item center">
                        <a className="btn waves-effect red  white-text darken-text-2">Previous</a>
                        <a className="btn waves-effect blue  white-text darken-text-2">Submit</a>
                    </div>
                </div>
            </div>


        );
    }
}

export default MainScheduler;
