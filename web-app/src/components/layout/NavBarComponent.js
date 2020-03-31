import React from 'react'
import {Link, NavLink} from "react-router-dom";
import ParamountLogo from '../../png/ParamountLogo.png'
import '../../index.css'


const NavBarComponent = () => {
    return (
        //TODO This will need adjusted when we add state data
        //Todo add adjustment for making it mobile responsive
        <nav className={'colorMe'}>
            <div className="container">
                <Link to={'/'} className={'brand-logo'}><img src={ParamountLogo} alt={"Paramount Sports"}
                                                             width={130} height={'auto'}/> </Link>

                <ul className={'right'}>
                    <li><NavLink to={'/scheduler'}>Scheduler</NavLink></li>
                    <li><NavLink to={'/calendar'}>Calendar</NavLink></li>
                    <li><NavLink to={'/description'}>Descriptions</NavLink></li>
                    <li><NavLink to={'/confirmation'}>Confirmation</NavLink></li>
                </ul>
            </div>
        </nav>


    )
};

export default NavBarComponent