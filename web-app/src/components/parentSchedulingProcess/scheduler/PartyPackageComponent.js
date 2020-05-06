import React, {Component} from "react";
import {
    basic,
    double,
    ninjaExcl,
    ninjaExp,
    ninjaExtra,
    ninjaExtreme,
    priceFinder,
    single,
    sleepover,
    triple
} from "./PartyPackageShortDescriptions";

class PartyPackageComponent extends Component {
    state = {
        partyPackage: -1,
        price: -1
    };

    handleChange = (e) => {
        this.setState({
            partyPackage: parseInt(e.target.value),
            price: -2
        });

        this.findPrice(parseInt(e.target.value));
    }
    partyPackageDropdown = () => {
        return (
            <form>
                <div className={'input-field'}>
                    <select name={'partyType'} className={'browser-default'} defaultValue={''}
                            onChange={this.handleChange}>
                        <option value={''} disabled={true}>Choose Party Package (selecting an option will bring up
                            details about it)
                        </option>
                        <option value={0}>Basic Play</option>
                        <option value={1}>Single Play</option>
                        <option value={2}>Double Play</option>
                        <option value={3}>Triple Play</option>
                        <option value={9}>Sleepover!</option>
                        <option value={5}>Ninja Exclusive</option>
                        <option value={6}>Ninja Experience</option>
                        <option value={7}>Ninja Extra</option>
                        <option value={8}>Ninja Extreme</option>
                    </select>
                </div>
            </form>
        );
    }

    findPrice = async (partyPackage) => {
        let tempPrice = await priceFinder(partyPackage);
        this.setState({price: tempPrice});

        //Once price is found, set that price back into the main scheduler
        this.props.parentCallBackPartyPackage({
            partyPackage: this.state.partyPackage,
            price: tempPrice
        });
    }


    showPrice = () => {
        if (this.state.price === -1) {
            return (
                <div>
                    Select a package to reveal details
                </div>
            )
        } else if (this.state.price === -2) {
            return (
                <div>
                    Price has not yet returned, please wait a moment...
                </div>
            )
        } else if (this.state.price === -3) {
            return (
                <div>
                    There was an error returning the price from our servers, try again later.
                </div>
            )
        } else {
            return (
                <div>
                    Price: ${this.state.price / 100}
                </div>
            );
        }
    }

    showDetails = () => {
        if (this.state.partyPackage === -1) {
            return;
        }

        switch (this.state.partyPackage) {
            case 0:
                return (
                    <div>
                        {basic()}
                    </div>);
            case 1:
                return (
                    <div>
                        {single()}
                    </div>);
            case 2:
                return (
                    <div>
                        {double()}
                    </div>);
            case 3:
                return (
                    <div>
                        {triple()}
                    </div>);
            case 5:
                return (
                    <div>
                        {ninjaExcl()}
                    </div>);
            case 6:
                return (
                    <div>
                        {ninjaExp()}
                    </div>);
            case 7:
                return (
                    <div>
                        {ninjaExtra()}
                    </div>);
            case 8:
                return (
                    <div>
                        {ninjaExtreme()}
                    </div>);
            case 9:
                return (
                    <div>
                        {sleepover()}
                    </div>);
            default:
                return;
        }
    }

    render() {
        return (
            <div>
                {this.partyPackageDropdown()}
                {this.showPrice()}
                {this.showDetails()}
            </div>
        );
    }
}

export default PartyPackageComponent