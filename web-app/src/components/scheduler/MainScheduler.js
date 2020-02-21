import React, {Component} from "react";
import TimeList from "./TimeList";
import CreatePartyComponent from './CreatePartyComponent';

class MainScheduler extends Component {
    state = {
        partyType: 0
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.id
        })
    };

    render() {
        return (
            <div className={"black-text"}>

                <div className={'row container'}>
                    <form action={'#'}>
                        <div className={'input-field'}>
                            <label>
                                <input name={'partyType'} id={'1'} type={'radio'} onClick={this.handleChange}
                                       onChange={this.handleChange} checked/>
                                <span>Basic</span>
                            </label>
                        </div>
                        <div className={'input-field'}>
                            <label>
                                <input name={'partyType'} id={'2'} type={'radio'} onClick={this.handleChange}
                                       onChange={this.handleChange}/>
                                <span>Single</span>
                            </label>
                        </div>
                        <div className={'input-field'}>
                            <label>
                                <input name={'partyType'} id={'3'} type={'radio'} onClick={this.handleChange}
                                       onChange={this.handleChange}/>
                                <span>Double</span>
                            </label>
                        </div>
                        <div className={'input-field'}>
                            <label>
                                <input name={'partyType'} id={'4'} type={'radio'} onClick={this.handleChange}
                                       onChange={this.handleChange}/>
                                <span>Triple</span>
                            </label>
                        </div>
                        <div className={'container'}>
                            <label>
                                <input name={'partyType'} id={'5'} type={'radio'} onClick={this.handleChange}
                                       onChange={this.handleChange}/>
                                <span>Sleepover</span>
                            </label>
                        </div>
                        <div className={'container'}>
                            <label>
                                <input name={'partyType'} id={'6'} type={'radio'} onClick={this.handleChange}
                                       onChange={this.handleChange}/>
                                <span>Ninja Experience</span>
                            </label>
                        </div>
                        <div className={'container'}>
                            <label>
                                <input name={'partyType'} id={'7'} type={'radio'} onClick={this.handleChange}
                                       onChange={this.handleChange}/>
                                <span>Ninja Exclusive</span>
                            </label>
                        </div>
                        <div className={'container'}>
                            <label>
                                <input name={'partyType'} id={'8'} type={'radio'} onClick={this.handleChange}
                                       onChange={this.handleChange}/>
                                <span>Ninja Extra</span>
                            </label>
                        </div>
                        <div className={'container'}>
                            <label>
                                <input name={'partyType'} id={'9'} type={'radio'} onClick={this.handleChange}
                                       onChange={this.handleChange}/>
                                <span>Ninja Extreme</span>
                            </label>
                        </div>
                    </form>

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