import React, {Component} from "react";
import TimeList from "./TimeList";
import CreatePartyComponent from './CreatePartyComponent';

class MainScheduler extends Component {
    render() {
        return (
            <div className={"black-text"}>
                {/*<p>{this.state.date}</p>*/}
                <div className="row">
                    <div className="col s12">
                        <TimeList/>
                    </div>
                    <div className="col s12">
                        <CreatePartyComponent/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainScheduler;