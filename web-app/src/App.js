import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/NavbarComponent'
import MainScheduler from "./components/scheduler/MainScheduler";
import Calendar from './components/calendar/Calendar';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Navbar/>
                <div className='App'>
                    <Switch>
                        <Route path={'/'} component={Calendar}/>
                        <Route path={'/schedule'} component={MainScheduler}/>
                    </Switch>

                    {/*<header className="App-header">*/}
                    {/*    <img src={logo} className="App-logo" alt="logo"/>*/}
                    {/*    <p>*/}
                    {/*        Future page for Paramount Sports Complex Party Scheduler*/}
                    {/*    </p>*/}
                    {/*    <a*/}
                    {/*        className="App-link"*/}
                    {/*        href="http://www.paramountsportscomplex.com/"*/}
                    {/*        target="_blank"*/}
                    {/*        rel="noopener noreferrer"*/}
                    {/*    >*/}
                    {/*        Paramount's Homepage*/}
                    {/*    </a>*/}
                    {/*</header>*/}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
