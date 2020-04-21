import React, {Component} from 'react';
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import {loadStripe} from "@stripe/stripe-js";
import ConfirmationText from "../confirmation/ConfirmationText";
import * as firebase from "firebase";

const stripePromise = loadStripe("pk_test_rKltl8cKNz9NLrOL7w1KT22800Yi2Zh7n9");

class PaymentPage extends Component {
    runFunction = async () => {
        console.log('got to function');
        if (await firebase.functions().httpsCallable('confirmTimeandCommitToDB')({
            partyPackage: this.props.partyPackage,
            dayOfWeek: this.props.dayOfWeek,
            roomsRequested: this.props.roomsRequested,
            dateDay: this.props.dateDay,
            dateMonth: this.props.dateMonth,
            dateYear: this.props.dateYear
        }).then(function (result) {
            console.log('Just finished running?');
            return result
        }).catch(function (e) {
            console.log(e);
            console.log(e.code);
            console.log(e.message);
            console.log(e.details);
            console.log(e.name);
        })) {
            this.props.callBack();
        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <div>Please check the information below. Please confirm that it is entirely correct, as it is not
                    possible to change this information once it is set
                </div>
                <ConfirmationText
                    contactName={this.props.contactName}
                    partyPackage={this.props.partyPackage}
                    roomsRequested={this.props.roomsRequested}
                    roomTimes={this.props.roomTimes}
                    partyName={this.props.partyName}
                    dayOfWeek={this.props.dayOfWeek}
                    date={this.props.date}
                    month={this.props.month}
                    year={this.props.year}
                />
                <div>Once confirmed, continue below with payment.</div>

                <Elements stripe={stripePromise} callBack={this.runFunction}>
                    {CheckoutForm({
                        callBack: this.runFunction,
                        price: 1097,
                        email: this.props.email
                    })}
                </Elements>
            </div>
        );
    }
}

export default PaymentPage;