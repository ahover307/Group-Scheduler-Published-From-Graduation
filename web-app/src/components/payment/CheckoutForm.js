import React from 'react';
import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import * as firebase from "firebase";

class CheckoutForm extends React.Component {

    paymentIntent = async () => {
        let paymentFunction = firebase.functions().httpsCallable('paymentIntent');
        return (await paymentFunction({
            price: 1099,
            email: 'ahover307@gmail.com '
        }).then(function (result) {
            return result;
        }).catch(function (e) {
            console.log(e);
        })).data;
    };


    handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        const {stripe, elements} = this.props;

        let clientSecret = (await this.paymentIntent().then((snapshot) => {
            return snapshot;
        }));

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make  sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Alex Hover',
                },
            }
        });

        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                //this is where post success processes should be put
            }
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <CardSection />
                <button class="butdef" disabled={!this.props.stripe}>Confirm order</button>
            </form>
        );
    }
}

export default function InjectedCheckoutForm() {
    return (
        <ElementsConsumer>
            {({stripe, elements}) => (
                <CheckoutForm  stripe={stripe} elements={elements} />
            )}
        </ElementsConsumer>
    );
}