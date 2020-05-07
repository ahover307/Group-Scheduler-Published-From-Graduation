import React, {Component} from "react";
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import Error from "../Error";
import Calendar from "../../parentSchedulingProcess/scheduler/CalendarComponent";
import {Button} from 'react-materialize'
import * as firebase from "firebase";
import '../Modal.css'
import {TimePicker} from "@material-ui/pickers";

const date = new Date();

class CreateReservedTimeCard extends Component {

    state = {
        dateDay: date.getDate(),
        dateMonth: date.getMonth() + 1,
        dateYear: date.getFullYear(),
        room: 0,
        startTime: 0,
        endTime: 0,
        success: false
    };

    callBackFunctionDate = (childData) => {
        this.setState({
            dateDay: childData.date,
            dateMonth: childData.month,
            dateYear: childData.year,
            dayOfWeek: childData.day,
        });
    };

    handleChange = (e) => {
        this.setState({room: e.target.value});
    }

    createTime = () => {
        const database = firebase.firestore();

        database.collection('SpecialReservedTimes').doc().set({
            dateDay: this.state.dateDay,
            dateMonth: this.state.dateMonth,
            dateYear: this.state.dateYear,
            start: this.state.startTime,
            end: this.state.endTime,
            area: this.state.room
        }).then((result) => {
            this.setState({success: true})
        }).catch((error) => {
            console.log(error)
        })
    };

    handleChangeTimeStart = (time) => {
        //TODO Get index from the hour and minute that is passed down
        const hour = time.hour();
        const minute = time.minute();
        const startTime = 9

        this.setState({
            dateStartTime: time,
            startTime: startTime
        });
    }

    handleChangeTimeEnd = (time) => {
        //TODO Get index from the hour and minute that is passed down
        const hour = time.hour();
        const minute = time.minute();
        const endTime = 9

        this.setState({
            dateEndTime: time,
            endTime: endTime
        });
    }

    repeat = () => {
        this.setState({
            success: false
        })
    }

    flipper = () => {
        if (this.state.success) {
            return (
                <div>
                    <h3>Data was successfully submitted. Submit another?</h3>
                    <Button style={{color: 'purple'}}
                            onClick={this.repeat}
                            className={'btn white'}>
                        Submit Another
                    </Button>
                </div>
            );
        } else {
            return (
                <div className={'container'}>
                    <div style={{textAlign: 'center'}}>
                        <div className="section"/>
                        <h3 style={{color: "#653487"}}>Complete the form below to reserved a time in any room</h3>
                        <div>
                            <div>
                                <h5 style={{color: "#653487"}}>Please select a date</h5>
                                <div className="z-depth-1 grey lighten-4 row"
                                     style={{border: '1px solid #EEE', margin: '2%'}}>
                                    <Calendar parentCallBackDate={this.callBackFunctionDate}/>
                                </div>
                            </div>
                            <div>
                                <h5>Please select the room to apply this too</h5>
                                <div key={0} className={'input-field'}>
                                    <select key={0} name={0} id={0}
                                            className={'browser-default'}
                                            value={this.state.room}
                                            onChange={this.handleChange}>
                                        <option key={0} value={0}
                                                disabled={true}>
                                            Choose Party Area
                                        </option>
                                        <option key={1} value={1}>{'Main Gym'}</option>
                                        <option key={2} value={2}>{'KidMaze'}</option>
                                        <option key={3} value={3}>{'RockWall'}</option>
                                        <option key={4} value={4}>{'Preschool'}</option>
                                        <option key={5} value={5}>{'Ninja'}</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <h5>Choose a start and end time</h5>
                                <div>
                                    <TimePicker
                                        showTodayButton
                                        todayLabel="now"
                                        label="Start Time"
                                        value={this.state.dateStartTime}
                                        minutesStep={5}
                                        onChange={this.handleChangeTimeStart}
                                    />
                                </div>
                                <div>
                                    <TimePicker
                                        showTodayButton
                                        todayLabel="now"
                                        label="End Time"
                                        value={this.state.dateEndTime}
                                        minutesStep={5}
                                        onChange={this.handleChangeTimeEnd}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button style={{color: 'purple'}}
                                onClick={this.createTime}
                                className={'btn white'}>
                            Add time to DB
                        </Button>
                    </div>

                </div>
            )
        }

    }

    render() {

        if (this.props.authError === "Logout success") {
            return <Redirect to={'/'}/>
        }

        return (
            <div>
                {this.props.authError === "Login success" ?
                    this.flipper()
                    :
                    <Error/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
};

export default connect(mapStateToProps)(CreateReservedTimeCard)