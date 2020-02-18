import React from 'react'
// import {BrowserRouter, Link} from 'react-router-dom'
// import {Navbar, NavItem} from 'react-materialize';
// import ParamountLogo from '../png/ParamountLogo.png'

const NavBarComponent = () => {
    return (
        //TODO This will need adjusted when we add state data
        <nav className={"nav-wrapper purple"}>
            <a href={'/'} className={'brand-logo'}>Paramount Sports</a>
            <ul className={'right'}>
                <li><a href={'../scheduler'}>Scheduler</a></li>
                <li><a href={'../calendar'}>Calendar</a></li>
                <li><a href={'../description'}>Descriptions</a></li>
            </ul>
        </nav>
    )
};
//  <div className={"container"}>
//      <img src={ParamountLogo} alt={"Paramount Sports"}/>
//      <BrowserRouter>
//          <Link to={'/'} className={"brand-logo"}> Paramount Sports </Link>
//      </BrowserRouter>
//  </div>

export default NavBarComponent