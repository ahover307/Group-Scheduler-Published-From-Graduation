import React from 'react'
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'


const SignedInLinks = (props) => {
       return (
        <ul>

            <li>
                <a onClick={props.signOut}> Log Out</a>
            </li>
            <li><NavLink to={'/staff/dashboard'}> Dashboard </NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps) (SignedInLinks)