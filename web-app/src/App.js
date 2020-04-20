import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBarComponent from './components/layout/NavBarComponent'
import MainScheduler from "./components/parentSchedulingProcess/scheduler/MainScheduler";
import Calendar from './components/parentSchedulingProcess/scheduler/Calendar';
import PartyDescriptionPage from "./components/info/PartyDescriptionPage";
import Confirmation from "./components/confirmation/Confirmation";
import SignIn from "./components/staff/SignIn";
import Dashboard from "./components/staff/Dashboard";
import SplashScreen from './SplashScreen';
import CheckoutForm from './components/parentSchedulingProcess/payment/CheckoutForm';
import './App.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SearchForm from "./components/staff/SearchForm";

import Toolbar from './components/Toolbar/Toolbar'; //Imports for Trevor's Nearly Functional Navbar Replacement



//todo submit to the confirmation called
//todo go to payment before confirming

const stripePromise = loadStripe("pk_test_rKltl8cKNz9NLrOL7w1KT22800Yi2Zh7n9");
function App() {
    return (

        //Trevor's Nearly Functional Navbar Replacement
       /* <div style={{height: '100%'}}>
            <Toolbar />
            <SideDrawer />
            <Backdrop />
        </div>*/


            <div>
            <BrowserRouter>
                <NavBarComponent/>
                <Switch>
                    <Route exact path='/'> <SplashScreen/> </Route>
                    <Route path={'/description'}> <PartyDescriptionPage/> </Route>
                    <Route path={'/scheduler'}> <MainScheduler/></Route>
                    <Route path={'/calendar'}> <Calendar/> </Route>
                    <Route path={'/confirmation'}> <Confirmation/> </Route>
                    <Route path={'/login'}><SignIn/></Route>
                    <Route path={'/card'}>
                        <Elements stripe={stripePromise}><CheckoutForm/></Elements>
                    </Route>
                    <Route path={'/dashboard'}><Dashboard/></Route>
                    <Route path={'/staff/search'}> <SearchForm/></Route>

                </Switch>

                </BrowserRouter>
            </div>
    );
}

export default App;
