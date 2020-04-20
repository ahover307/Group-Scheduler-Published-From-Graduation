import React, {Component} from "react";

class PartyPackageSelector extends Component {
    handleChange = (e) => {
        this.props.parentCallBackPartyPackage(parseInt(e.target.id));
    };

    render() {
        return (
            <form>
                <div className={'container'}>
                    <label>
                        <input name={'partyType'} id={'0'} type={'radio'} onChange={this.handleChange}/>
                        <span>Basic</span>
                    </label>
                </div>
                <div className={'container'}>
                    <label>
                        <input name={'partyType'} id={'1'} type={'radio'} onChange={this.handleChange}/>
                        <span>Single</span>
                    </label>
                </div>
                <div className={'container'}>
                    <label>
                        <input name={'partyType'} id={'2'} type={'radio'} onChange={this.handleChange}/>
                        <span>Double</span>
                    </label>
                </div>
                <div className={'container'}>
                    <label>
                        <input name={'partyType'} id={'3'} type={'radio'} onChange={this.handleChange}/>
                        <span>Triple</span>
                    </label>
                </div>
                <div className={'container'}>
                    <label>
                        <input name={'partyType'} id={'9'} type={'radio'} onChange={this.handleChange}/>
                        <span>Sleepover</span>
                    </label>
                </div>
                <div className={'container'}>
                    <label>
                        <input name={'partyType'} id={'5'} type={'radio'} onChange={this.handleChange}/>
                        <span>Ninja Exclusive</span>
                    </label>
                </div>
                <div className={'container'}>
                    <label>
                        <input name={'partyType'} id={'6'} type={'radio'} onChange={this.handleChange}/>
                        <span>Ninja Experience</span>
                    </label>
                </div>
                <div className={'container'}>
                    <label>
                        <input name={'partyType'} id={'7'} type={'radio'} onChange={this.handleChange}/>
                        <span>Ninja Extra</span>
                    </label>
                </div>
                <div className={'container'}>
                    <label>
                        <input name={'partyType'} id={'8'} type={'radio'} onChange={this.handleChange}/>
                        <span>Ninja Extreme</span>
                    </label>
                </div>
            </form>
        )
    }
}

export default PartyPackageSelector