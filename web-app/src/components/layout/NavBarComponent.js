import React from 'react'
import {Link, NavLink} from "react-router-dom";
import ParamountLogo from '../../png/ParamountLogo.png'
import '../../index.css'
import {connect} from 'react-redux'
import SignedInLinks from "./SingedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const NavBarComponent = (props) => {
    const {auth} = props;
    const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>

    return (
        //We dont need a navbar for the final product, but leave the navbar there so the logo and link to the homepage is live.
        // That is all we need. The rest will be in page links and then a single page apps.
        //For now leave these here, for testing,
        // But that means we dont need to waste time making it mobile responsive

        <nav className={'colorMe'}>
            <div className="container">
                <Link to={'/'} className={'brand-logo'}><img src={ParamountLogo} alt={"Paramount Sports"}
                                                             width={130} height={'auto'}/> </Link>

                <ul className={'right'}>
                    <li><NavLink to={'/scheduler'}>Scheduler</NavLink></li>
                    <li><NavLink to={'/calendarComponent'}>Calendar</NavLink></li>
                    <li><NavLink to={'/description'}>Descriptions</NavLink></li>
                    <li><NavLink to={'/confirmation'}>Confirmation</NavLink></li>
                    <li><NavLink to={'/card'}> Payment form </NavLink></li>
                    { links }
                </ul>
            </div>
        </nav>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps)(NavBarComponent)