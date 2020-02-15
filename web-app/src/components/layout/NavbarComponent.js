import React from 'react'
import {Link} from 'react-router-dom'
// import ParamountLogo from '../png/ParamountLogo.png'

const NavbarComponent = () => {
    return (
        <nav className={"nav-wrapper purple"}>
            <div className={"container"}>
                {/*<img src={ParamountLogo} alt={"Paramount Sports"}/>*/}
                <Link to={'/'} className={"brand-logo"}> Paramount Sports </Link>
            </div>
        </nav>
    )
};

export default NavbarComponent