import React, {Component} from "react";
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import Error from "./Error";
import Calendar from "../parentSchedulingProcess/scheduler/CalendarComponent";
import {Button, Card, Col, Icon, Row} from 'react-materialize'
import * as firebase from "firebase";
import {translateTimeFromIndexToString, updatePartyAreaString} from '../globalFunctions'
import './Modal.css'

const date = new Date();

class ReservedTimes extends Component {

    state = {
        times: [],
        visible: false,
        dateDay: date.getDate(),
        dateMonth: date.getMonth() + 1,
        dateYear: date.getFullYear(),
        isClicked: false,
    };

    callBackFunctionDate = (childData) => {

        this.setState({
            dateDay: childData.date,
            dateMonth: childData.month,
            dateYear: childData.year,
            dayOfWeek: childData.day,

        });
    };

    showTimes = () => {
        this.setState({
            visible: true
        });
        const database = firebase.firestore();
        database.collection('SpecialReservedTimes').get().then(snapshot => {
            const times = [];
            console.log("This should be empty: " + this.state.times)
            snapshot.forEach(doc => {
                const data = doc.data();

                if (data.dateMonth === this.state.dateMonth && data.dateDay === this.state.dateDay &&
                    data.dateYear === this.state.dateYear) {
                    times.push({
                        id: doc.id,
                        data: doc.data()
                    });

                }
            });
            this.setState({times: times});

            console.log("This could be empty: " + times)
        }).catch((error) => {
            console.log(error)
        })
    };

    deleteReservedTime = (e) => {
        const database = firebase.firestore();
        const id = e.target.getAttribute('itemID');
        database.collection('SpecialReservedTimes').doc(id).delete().catch(error => alert(error));
        this.setState({isClicked: true})

    };


    render() {

        if (this.props.authError === "Logout success") {
            return <Redirect to={'/'}/>
        }

        return (
            <div>
                {this.props.authError === "Login success" ?
                    <div className={'container'}>
                        <div style={{textAlign: 'center'}}>
                            <div className="section"/>
                            <h5 style={{color: "#653487"}}>Please select a date</h5>
                            <div className="z-depth-1 grey lighten-4 row"
                                 style={{border: '1px solid #EEE', margin: '2%'}}>
                                <Calendar parentCallBackDate={this.callBackFunctionDate}/>
                                <button className={'btn purple'} style={{margin: '2%'}}
                                        onClick={this.showTimes}> Show Reserved Times
                                </button>
                            </div>
                        </div>
                        {this.state.visible ?
                            <h2 style={{color: '#653487', textAlign: 'center'}}>
                                {this.state.dateMonth}/{this.state.dateDay}/{this.state.dateYear}
                            </h2> : null}

                        <div>
                            {this.state.times && this.state.times.map((time, i) => {
                                return (

                                    <Row key={i}>
                                        <Col m={3} key={i}/>
                                        <Col m={6}
                                             s={12}
                                             key={i + 1}>
                                            <Card
                                                actions={[
                                                    <Button style={{color: 'purple'}} onClick={this.deleteReservedTime}
                                                            node="button"
                                                            className={'btn white'} itemID={time.id}>Delete</Button>
                                                ]}
                                                key={i + 2}
                                                className="colorMe center-align"
                                                closeIcon={<Icon>close</Icon>}
                                                revealIcon={<Icon>more_vert</Icon>}
                                                textClassName="white-text"
                                                title={updatePartyAreaString(time.data.area)}
                                            >
                                                This area is reserved
                                                from {translateTimeFromIndexToString(time.data.start)} to {translateTimeFromIndexToString(time.data.end)}
                                            </Card>
                                            {this.state.isClicked ?
                                                <div style={{textAlign: 'center'}}><i style={{color: 'green'}}>Reserved
                                                    Time was successfully deleted</i></div> : null}
                                        </Col>
                                        <Col m={3} key={i + 3}/>
                                    </Row>

                                )
                            })}
                        </div>
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

export default connect(mapStateToProps)(ReservedTimes)