import React, {Component} from "react";
import TimeList from "./TimeList";
import CreatePartyComponent from './CreatePartyComponent';

class MainScheduler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            partyDate: this.props.date,
        }
    }

    render() {
        return (
            <div className={"black-text"}>
                <p>{this.state.date}</p>
                <div className="row">
                    <div className="col s12 m6">
                        <TimeList/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <CreatePartyComponent/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainScheduler;