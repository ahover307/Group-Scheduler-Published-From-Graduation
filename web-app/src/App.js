import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBarComponent from './components/layout/NavBarComponent'
import Calendar from './components/parentSchedulingProcess/scheduler/Calendar';
import PartyDescriptionPage from "./components/info/PartyDescriptionPage";
import Confirmation from "./components/parentSchedulingProcess/confirmation/Confirmation";
import SignIn from "./components/staff/SignIn";
import Dashboard from "./components/staff/Dashboard";
import SplashScreen from './SplashScreen';
import './App.css';
import SearchForm from "./components/staff/SearchForm";
import Grid from "./components/staff/Grid";
import PaymentPage from "./components/parentSchedulingProcess/payment/PaymentPage";
import ParentScheduler from "./components/parentSchedulingProcess/ParentScheduler";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Toolbar from "./components/Toolbar/Toolbar";
import Backdrop from "./components/Backdrop/Backdrop";
import Error from "./components/staff/Error";
import ReservedTimes from "./components/staff/ReservedTimes";


//todo submit to the confirmation called
//todo go to payment before confirming


class App extends Component {


    /* state = {
         sideDrawerOpen: false
     };


     drawerToggleClickHandler = () => {
         this.setState((prevState) => {
             return {sideDrawerOpen: !prevState.sideDrawerOpen};
         });
     };

     backdropClickHandler = () => {
         this.setState({sideDrawerOpen: false});
     };*/



    render() {

        /*let backdrop;

        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }*/
        return (

            //Trevor's Nearly Functional Navbar Replacement
            /*<div style={{height: '100%'}}>
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
                <SideDrawer show={this.state.sideDrawerOpen}/>
                {backdrop}
            </div>*/


            <div>
                <BrowserRouter>
                    <NavBarComponent/>
                    <Switch>

                        <Route exact path='/'> <SplashScreen/> </Route>
                        <Route path={'/description'}> <PartyDescriptionPage/> </Route>
                        <Route path={'/scheduler'}> <ParentScheduler/></Route>
                        <Route path={'/calendar'}> <Calendar/> </Route>
                        <Route path={'/confirmation'}> <Confirmation/> </Route>
                        <Route path={'/login'}><SignIn /></Route>
                        <Route path={'/card'}> <PaymentPage/> </Route>
                        <Route path={'/staff/dashboard'}> <Dashboard/> </Route>
                        <Route path={'/staff/search'}> <SearchForm/></Route>
                        <Route path={'/staff/grid'}> <Grid/></Route>
                        <Route path={'/staff/reservedTimes'}> <ReservedTimes/></Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
