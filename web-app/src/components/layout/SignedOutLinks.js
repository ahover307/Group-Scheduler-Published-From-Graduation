import React from 'react'
import {NavLink} from "react-router-dom";

const SignedOutLinks = () => {
    return (
        <ul className={'right'}>
            <li><a to={'/login'}>Log In Staff</a></li>
        </ul>
    )
};

export default SignedOutLinks