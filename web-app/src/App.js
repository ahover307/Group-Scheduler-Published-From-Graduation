import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBarComponent from './components/layout/NavBarComponent'
import MainScheduler from "./components/scheduler/MainScheduler";
import Calendar from './components/calendar/Calendar';
import PartyDescriptionPage from "./components/info/PartyDescriptionPage";
import Confirmation from "./components/confirmation/Confirmation";
import SplashScreen from './SplashScreen';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './components/payment/CheckoutForm';

import './App.css';
import {document} from "firebase-functions/lib/providers/firestore";


//todo submit to the confirmation called
//todo go to payment before confirming
const stripePromise = loadStripe("pk_test_rKltl8cKNz9NLrOL7w1KT22800Yi2Zh7n9");

function App() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm/>

            <div>
                <BrowserRouter>
                    <NavBarComponent/>
                    <Switch>
                        <Route exact path='/'> <SplashScreen/> </Route>
                        <Route path={'/description'}> <PartyDescriptionPage/> </Route>
                        <Route path={'/scheduler'}> <MainScheduler/></Route>
                        <Route path={'/calendar'}> <Calendar/> </Route>
                        <Route path={'/confirmation'}> <Confirmation/> </Route>
                    </Switch>

                </BrowserRouter>
            </div>
        </Elements>
    );
};

//ReactDOM.render(<App />, document.getElementById('root'));


export default App;
