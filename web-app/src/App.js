import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBarComponent from './components/layout/NavBarComponent'
import MainScheduler from "./components/scheduler/MainScheduler";
import Calendar from './components/calendar/Calendar';
import SplashScreen from './SplashScreen';
import PartyDescriptionPage from "./components/info/PartyDescriptionPage";

import './App.css';

function App() {
    return (
        <div>
            <BrowserRouter>
                <NavBarComponent/>

                <Switch>
                    <Route exact path='/'> <SplashScreen/> </Route>
                    <Route path={'/description'}> <PartyDescriptionPage/> </Route>
                    <Route path={'/scheduler'}> <MainScheduler/> </Route>
                    <Route path={'/calendar'}> <Calendar/> </Route>
                </Switch>

            </BrowserRouter>
        </div>
    );
}

export default App;
