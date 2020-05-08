import React from 'react';
import './SideDrawer.css';
import {NavLink} from "react-router-dom";

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
        drawerClasses = 'side-drawer open';
    }
    return(
        <nav className={drawerClasses}>
            <ul>
                <li><NavLink to={'/scheduler'}>Scheduler</NavLink></li>
                <li><NavLink to={'/description'}>Descriptions</NavLink></li>
            </ul>
        </nav>);
};

export default sideDrawer;