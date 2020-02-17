import React from 'react'
import {BrowserRouter, Link} from 'react-router-dom'
// import ParamountLogo from '../png/ParamountLogo.png'

const NavBarComponent = () => {
    return (
        <nav className={"nav-wrapper purple"}>
            <div className={"container"}>
                {/*<img src={ParamountLogo} alt={"Paramount Sports"}/>*/}
                <BrowserRouter>
                    <Link to={'/'} className={"brand-logo"}> Paramount Sports </Link>
                </BrowserRouter>
            </div>
        </nav>
    )
};

export default NavBarComponent