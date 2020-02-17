import React from 'react';
import NavBarComponent from './components/layout/NavBarComponent'
// import MainScheduler from "./components/scheduler/MainScheduler";
// import Calendar from './components/calendar/Calendar';
import SplashScreen from './SplashScreen';

import './App.css';

function App() {
    return (
        <div>
            <NavBarComponent/>
            <div className='App'>
                <SplashScreen/>

            </div>
        </div>
    );
}

export default App;
