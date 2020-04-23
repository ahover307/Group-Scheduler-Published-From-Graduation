import React, {Component} from "react";
import {connect} from 'react-redux';
import {NavLink, Redirect} from "react-router-dom";
import Error from "./Error";
import Calendar from "../parentSchedulingProcess/scheduler/Calendar";
import {Row, Col, Card, Icon, Button, Modal} from 'react-materialize'
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
        dateYear: date.getFullYear()
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
            console.log(times)
        }).catch(() => {
            console.log("We weren't able to find any reserved time")
        })
    };

    deleteReservedTime = (e) => {
        const database = firebase.firestore();
        const id = e.target.getAttribute('itemID');
        database.collection('SpecialReservedTimes').doc(id).delete().catch(error => alert(error));

    };

    render() {

        if (this.props.authError === "Logout success") {
            return <Redirect to={'/'}/>
        }

        return (
            <div>
                {this.props.authError === "Login success" ? <div className={'container'}>
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


                    {this.state.times && this.state.times.map((time, i) => {
                        return (
                            <Row key={i}>
                                <Col m={3} key={i}/>
                                <Col m={6}
                                     s={12}
                                     key={i + 1}>
                                    <Card
                                        actions={[
                                            <Modal
                                                style={{
                                                    width: '500px',
                                                    height: '300px',
                                                    textAlign: 'center',
                                                    fontSize: 'large',

                                                }}
                                                actions={[
                                                    <Button style={{float: 'right'}} modal='close'
                                                            onClick={this.deleteReservedTime} node="button"
                                                            className={'btn red'} itemID={time.id}>Yes</Button>,
                                                    <Button style={{float: 'left'}} modal="close" node="button"
                                                            className={'btn blue'}>No</Button>
                                                ]}
                                                fixedFooter
                                                header = {'Please confirm'}
                                                id="Modal-0"
                                                options={{
                                                    dismissible: true,
                                                    endingTop: '10%',
                                                    inDuration: 250,
                                                    onCloseEnd: null,
                                                    onCloseStart: null,
                                                    onOpenEnd: null,
                                                    onOpenStart: null,
                                                    opacity: 0.5,
                                                    outDuration: 250,
                                                    preventScrolling: true,
                                                    startingTop: '4%'
                                                }}
                                                root={document.body}
                                                trigger={<Button style={{color: 'purple'}} node="button" className={'btn white'}>Delete</Button>}
                                            >
                                                You are trying to delete a reserved time in this area: {updatePartyAreaString(time.data.area)}
                                                scheduled for {time.data.dateMonth}/{time.data.dateDay}/{time.data.dateYear}. Are
                                                you sure you
                                                want to
                                                continue?
                                            </Modal>
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
                                </Col>
                                <Col m={3} key={i + 3}/>
                            </Row>
                        )
                    })}

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