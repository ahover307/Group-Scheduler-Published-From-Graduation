import React from 'react';
import {NavLink} from "react-router-dom";
import './Toolbar.css';
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";

const Toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div>
                <DrawerToggleButton />
            </div>
            <div className="toolbar_logo"><a href="/">LOGO</a></div>
            <div className="spacer"/>
            <div className="toolbar_navigationItems">
                <ul>
                    <li><a href='/scheduler'>Scheduler</a></li>
                    <li><a href='/calendar'>Calendar</a></li>
                    <li><a href='/description'>Descriptions</a></li>
                    <li><a href='/confirmation'>Confirmation</a></li>
                    <li><a href='/card'> Payment form </a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default Toolbar;