import React from 'react';
import './SideDrawer.css';

const sideDrawer = props => (
    <nav className="side-drawer">
        <ul>
            <li><a href='/scheduler'>Scheduler</a></li>
            <li><a href='/calendar'>Calendar</a></li>
            <li><a href='/description'>Descriptions</a></li>
            <li><a href='/confirmation'>Confirmation</a></li>
            <li><a href='/card'> Payment form </a></li>
        </ul>
    </nav>
);

export default sideDrawer;