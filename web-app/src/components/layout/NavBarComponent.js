import React from 'react'
import {Link, NavLink} from "react-router-dom";
import ParamountLogo from '../../png/ParamountLogo.png'
import '../../index.css'
import {connect} from 'react-redux'
import SignedInLinks from "./SingedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Collapse from "react-bootstrap/Collapse";
import Nav from "react-bootstrap/Nav";


const NavBarComponent = (props) => {
    const {auth} = props;
    const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>

    return (
        //TODO This will need adjusted when we add state data
        //Todo add adjustment for making it mobile responsive

        <nav className={'colorMe'} expand="lg">
            <div className="container">
                <Link to={'/'} className={'brand-logo'}><img src={ParamountLogo} alt={"Paramount Sports"}
                                                             width={130} height={'auto'}/> </Link>

                <ul className={'right'}>
                    <li><NavLink to={'/scheduler'}>Scheduler</NavLink></li>
                    <li><NavLink to={'/calendar'}>Calendar</NavLink></li>
                    <li><NavLink to={'/description'}>Descriptions</NavLink></li>
                    <li><NavLink to={'/confirmation'}>Confirmation</NavLink></li>
                    <li><NavLink to={'/card'}> Payment form </NavLink></li>
                    { links }
                </ul>
            </div>
        </nav>


        /* <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Paramount</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/scheduler/">Scheduler</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/calendar/">Calendar</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/descriptions/">Descriptions</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/confirmation/">Confirmation</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/card/">PaymentForm</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login/">LoginStaff</NavLink>
            </NavItem>

          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}*/
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(NavBarComponent)