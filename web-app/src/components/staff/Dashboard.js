import React, {Component} from 'react'
import {Button, Row, Col, Icon, Card} from 'react-materialize'

class Dashboard extends Component {

    render() {
        return (
            <div className={'container'}>
                <Row>
                    <Col
                        m={12}
                        s={12}
                    >
                        <Card
                            className="colorMe center-align"
                            style={{fontSize : "30px"}}
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
                                <a key="1" href="#">Create</a>,
                                <a key="2" href="#">Edit</a>
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
                                <a key="1" href="#">View</a>,
                                <a key="2" href="#">Download</a>
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
                                <a key="1" href="#">Search</a>,
                                <a key="2" href="#">Edit</a>,
                                <a key="3" href="#">Delete</a>
                            ]}
                            className="colorMe center-align"
                            closeIcon={<Icon>close</Icon>}
                            revealIcon={<Icon>more_vert</Icon>}
                            textClassName="white-text"
                            title="Parties"
                        >
                            You can search, edit or delete a party
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col m={3}
                         s={12}/>
                    <Col m={6} s={12}>
                        <Card
                            actions={[
                                <a key="1" href="#">Create</a>,


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
            </div>


        );
    }

}

export default Dashboard