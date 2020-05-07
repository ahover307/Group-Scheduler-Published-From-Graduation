import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import PartyDescriptionPage from "./components/info/PartyDescriptionPage";
import SignIn from "./components/staff/SignIn";
import Dashboard from "./components/staff/Dashboard";
import SplashScreen from './SplashScreen';
import './App.css';
import SearchForm from "./components/staff/SearchForm";
import Grid from "./components/staff/Grid";
import ParentScheduler from "./components/parentSchedulingProcess/ParentScheduler";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Toolbar from "./components/Toolbar/Toolbar";
import Backdrop from "./components/Backdrop/Backdrop";
import ReservedTimes from "./components/staff/ReservedTimes/ReservedTimes";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import CreateReservedTimeCard from "./components/staff/ReservedTimes/CreateReservedTimeCard";

class App extends Component {
    state = {
        sideDrawerOpen: false
    };

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    };

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false});
    };

    render() {
        let backdrop;

        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }
        return (
            <div style={{height: '100%', paddingTop: '55px'}}>
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
                        <SideDrawer show={this.state.sideDrawerOpen}/>
                        {backdrop}


                        {/*<NavBarComponent/>*/}
                        <Switch>

                            <Route exact path='/'> <SplashScreen/> </Route>
                            <Route path={'/description'}> <PartyDescriptionPage/> </Route>
                            <Route path={'/scheduler'}> <ParentScheduler/></Route>
                            <Route path={'/login'}><SignIn/></Route>
                            <Route path={'/staff/dashboard'}> <Dashboard/> </Route>
                            <Route path={'/staff/search'}> <SearchForm/></Route>
                            <Route path={'/staff/grid'}> <Grid/></Route>
                            <Route path={'/staff/reservedTimes'}> <ReservedTimes/></Route>
                            <Route path={'/staff/create_reservedTimes'}> <CreateReservedTimeCard/></Route>
                        </Switch>

                    </MuiPickersUtilsProvider></BrowserRouter>
            </div>
        );
    }
}

export default App;
