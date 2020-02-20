import React from 'react'
import {Link, NavLink} from "react-router-dom";
import ParamountLogo from '../../png/ParamountLogo.png'

const NavBarComponent = () => {
    return (
        //TODO This will need adjusted when we add state data
        <nav className={"nav-wrapper purple"}>
            <div className="container">
                <Link to={'/'} className={'brand-logo'}><img src={ParamountLogo} alt={"Paramount Sports"}
                                                             width={130} height={'auto'}/> </Link>
                {/*<a href="#" data-target="mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>*/}

                <ul className={'right'}>
                    <li><NavLink to={'/scheduler'}>Scheduler</NavLink></li>
                    <li><NavLink to={'/calendar'}>Calendar</NavLink></li>
                    <li><NavLink to={'/description'}>Descriptions</NavLink></li>
                </ul>
                {/*<ul className={"sidenav"} id={"mobile"}>*/}
                {/*    <li><NavLink to={'/scheduler'}>Scheduler</NavLink></li>*/}
                {/*    <li><NavLink to={'/calendar'}>Calendar</NavLink></li>*/}
                {/*    <li><NavLink to={'/description'}>Descriptions</NavLink></li>*/}
                {/*</ul>*/}
            </div>
        </nav>


    )
};

export default NavBarComponent