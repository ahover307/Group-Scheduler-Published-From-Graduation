import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBarComponent from './components/layout/NavBarComponent'
import MainScheduler from "./components/scheduler/MainScheduler";
import MainSchedulerCollaps from "./components/scheduler/MainSchedulerCollaps";
import Calendar from './components/calendar/Calendar';
import PartyDescriptionPage from "./components/info/PartyDescriptionPage";
import SplashScreen from './SplashScreen';


import './App.css';

//todo submit to the confirmation called
//todo go to payment before confirming

function App() {
    return (
        <div>
            <BrowserRouter>
                <NavBarComponent/>

                <Switch>
                    <Route exact path='/'> <SplashScreen/> </Route>
                    <Route path={'/description'}> <PartyDescriptionPage/> </Route>
                    <Route path={'/scheduler'}> <MainScheduler/> </Route>
                    <Route path={'/schedulercollaps'}> <MainSchedulerCollaps/></Route>
                    <Route path={'/calendar'}> <Calendar/> </Route>
                </Switch>

            </BrowserRouter>
        </div>
    );
}

export default App;
