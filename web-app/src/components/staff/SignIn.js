import React, {Component} from 'react'
import "materialize-css"
import {connect} from "react-redux"
import {signIn} from '../../store/actions/authActions'
import {Redirect} from "react-router-dom";

// user: molteluca@gmail.com
// psw: test2020
class SignIn extends Component {

    state = {
        email: '',
        password: '',
        login: false,
    };


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };



    handleSubmit  = async (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    };

    render() {

        const {authError} = this.props;

        if (authError === "Login success") {
            return <Redirect to={'/staff/dashboard'}/>
        }
        return (

            <div style={{textAlign: 'center'}}>
                <div className="section"/>
                <h5 style={{color: "#653487"}}>Login is permitted only to staff members</h5>
                <div className="section">
                </div>
                <div className="container">
                    <div className="z-depth-1 grey lighten-4 row"
                         style={{display: 'inline-block', padding: '32px 48px 0px 48px', border: '1px solid #EEE'}}>
                        <form className="col s12" method="post" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col s12">
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input className="validate" type="email" name="email" id="email"
                                           onChange={this.handleChange}/>
                                    <label htmlFor="email">Enter your email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input className="validate" type="password" name="password" id="password"
                                           onChange={this.handleChange}/>
                                    <label htmlFor="password">Enter your password</label>
                                </div>
                                <label style={{float: 'right'}}>
                                    <a className="pink-text" href="#!"><b>Forgot Password?</b></a>
                                </label>
                            </div>
                            <br/>
                            <div className="row">
                                <button type="submit" name="btn_login"
                                        className="col s12 btn btn-large colorMe"
                                >Login
                                </button>
                            </div>
                            {(authError === "Login failed") ? <p style={{color: 'red'}}> {authError}</p> : null}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
}
const MapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, MapDispatchToProps)(SignIn)