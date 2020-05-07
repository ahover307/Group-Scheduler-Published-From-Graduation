import React from 'react';
import './Toolbar.css';
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import ParamountLogo from "../../png/ParamountLogo.png";
import {connect} from "react-redux";
import SignedInLinks from "../layout/SingedInLinks";
import {NavLink} from "react-router-dom";


const Toolbar = (props) => {
        const {auth} = props;
        const links = auth.uid ? <SignedInLinks/> : null;
        return (
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
                            <li><NavLink to={'/scheduler'}>Scheduler</NavLink></li>
                            <li><NavLink to={'/description'}>Descriptions</NavLink></li>
                            {links}
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
;

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps)(Toolbar)