import React from 'react';
import './Toolbar.css';
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import ParamountLogo from "../../png/ParamountLogo.png";

const Toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div className="toolbar_toggle-button">
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
            <div className="toolbar_logo"><a href="/"><img src={ParamountLogo} alt={"Paramount Sports"}
                                                           width={130} height={'auto'}/></a></div>
            <div className="spacer"/>
            <div className="toolbar_navigationItems">
                <ul>
                    <li><a href='/scheduler'>Scheduler</a></li>
                    <li><a href='/description'>Descriptions</a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default Toolbar;