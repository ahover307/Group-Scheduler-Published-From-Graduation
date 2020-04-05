import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBarComponent from './components/layout/NavBarComponent'
import MainScheduler from "./components/scheduler/MainScheduler";
import Calendar from './components/calendar/Calendar';
import PartyDescriptionPage from "./components/info/PartyDescriptionPage";
import Confirmation from "./components/confirmation/Confirmation";
import SignIn from "./components/staff/SignIn"
import SplashScreen from './SplashScreen';
import ReactDOM from 'react-dom';
import CheckoutForm from './components/payment/CheckoutForm';
import './App.css';
import {document} from "firebase-functions/lib/providers/firestore";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';



//todo submit to the confirmation called
//todo go to payment before confirming

const stripePromise = loadStripe("pk_test_rKltl8cKNz9NLrOL7w1KT22800Yi2Zh7n9");
function App() {
    return (

            <div>
            <BrowserRouter>
                <NavBarComponent/>
                <Switch>
                    <Route exact path='/'> <SplashScreen/> </Route>
                    <Route path={'/description'}> <PartyDescriptionPage/> </Route>
                    <Route path={'/scheduler'}> <MainScheduler/></Route>
                    <Route path={'/calendar'}> <Calendar/> </Route>
                    <Route path={'/confirmation'}> <Confirmation/> </Route>
                    <Route path={'/confirmation'}> <Confirmation/> </Route>
                    <Route path={'/login'}><SignIn/></Route>
                    <Route path={'/card'}>
                        <Elements stripe={stripePromise}><CheckoutForm/></Elements>
                    </Route>
                </Switch>

                </BrowserRouter>
            </div>
    );
}

export default App;
