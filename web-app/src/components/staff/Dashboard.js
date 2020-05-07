import React, {Component} from 'react'
import {Card, Col, Icon, Row} from 'react-materialize'
import {NavLink, Redirect} from "react-router-dom";
import Error from "./Error";
import {connect} from 'react-redux'


class Dashboard extends Component {


    render() {
        if (this.props.authError === "Logout success") {
            return <Redirect to={'/'}/>
        }

        return (
            <div>
                {this.props.authError === "Login success" ?
                    <div className={'container'}>

                        <Row>
                            <Col
                                m={12}
                                s={12}
                            >
                                <Card
                                    className="colorMe center-align"
                                    style={{fontSize: "30px"}}
                                    closeIcon={<Icon>close</Icon>}
                                    revealIcon={<Icon>more_vert</Icon>}
                                    textClassName="white-text"

                                >
                                    Welcome to your staff dashboard
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                m={6}
                                s={12}
                            >
                                <Card
                                    actions={[
                                        <a key="1" href="#">Create</a>,
                                        <a key="2" href="#">Edit</a>
                                    ]}
                                    className="colorMe center-align"
                                    closeIcon={<Icon>close</Icon>}
                                    revealIcon={<Icon>more_vert</Icon>}
                                    textClassName="white-text"
                                    title="Open times for each room"
                                >
                                    You can edit the time for an open party, or create a new one
                                </Card>
                            </Col>
                            <Col
                                m={6}
                                s={12}
                            >
                                <Card
                                    actions={[
                                        <NavLink to={'/staff/reservedTimes'}>Enter</NavLink>
                                    ]}
                                    className="colorMe center-align"
                                    closeIcon={<Icon>close</Icon>}
                                    revealIcon={<Icon>more_vert</Icon>}
                                    textClassName="white-text"
                                    title="Reserved times per room"
                                >
                                    You can edit the time for a reserved party, or create a new one
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                m={6}
                                s={12}
                            >
                                <Card
                                    actions={[
                                        <NavLink style={{marginRight: '0px'}} to={'/staff/grid'}>View</NavLink>
                                    ]}
                                    className="colorMe center-align"
                                    closeIcon={<Icon>close</Icon>}
                                    revealIcon={<Icon>more_vert</Icon>}
                                    textClassName="white-text"
                                    title="Party Grid PDF"
                                >
                                    You can view and/or download the party grid
                                </Card>
                            </Col>
                            <Col
                                m={6}
                                s={12}
                            >
                                <Card
                                    actions={[
                                        <NavLink style={{marginRight: '0px'}} to={'/staff/search'}> Search </NavLink>,
                                    ]}
                                    className="colorMe center-align"
                                    closeIcon={<Icon>close</Icon>}
                                    revealIcon={<Icon>more_vert</Icon>}
                                    textClassName="white-text"
                                    title="Parties"
                                >
                                    You can search and delete a party
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col m={3}
                                 s={12}/>
                            <Col m={6} s={12}>
                                <Card
                                    actions={[
                                        <NavLink style={{marginRight: '0px'}}
                                                 to={'/staff/custom_party'}>Create</NavLink>
                                    ]}

                                    className="colorMe center-align"
                                    closeIcon={<Icon>close</Icon>}
                                    revealIcon={<Icon>more_vert</Icon>}
                                    textClassName="white-text"
                                    title="Customized Parties"
                                >
                                    You can create parties with customized prices
                                </Card>
                            </Col>
                            <Col m={3}
                                 s={12}/>
                        </Row>
                    </div> : <Error/>}
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
};
export default connect(mapStateToProps)(Dashboard)