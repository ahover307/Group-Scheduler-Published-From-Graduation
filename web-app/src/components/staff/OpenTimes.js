import React, {Component} from 'react'
import * as firebase from "firebase";
import {Button, Card, Col, Icon, Row} from "react-materialize";
import {
    translateTimeFromIndexToString,
    updatePartyAreaString,
    dayOfWeekIntToString,
    translateTimeIntoIndex
} from "../globalFunctions";
import {TimePicker} from "@material-ui/pickers";

class OpenTimes extends Component {
    state = {
        room: 0,
        times: [],
        startTime: 0,
        endTime: 0,
        isClicked: false,
    };

    handleChange = (e) => {
        this.setState({room: e.target.value});
    };

    handleChangeTimeStart = (time) => {
        this.setState({
            dateStartTime: time,
            startTime: translateTimeIntoIndex(time.hour(), time.minute())
        });
    }

    handleChangeTimeEnd = (time) => {
        this.setState({
            dateEndTime: time,
            endTime: translateTimeIntoIndex(time.hour(), time.minute())
        });
    }

    loadTime = () => {
        const database = firebase.firestore();
        database.collection('OpenHours').get().then(snapshot => {

            const times = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                console.log(data)
                if (parseInt(data.room) === parseInt(this.state.room)) {
                    times.push({
                        id: doc.id,
                        data: doc.data() });
                }
            });

            this.setState({times: times});
            console.log(times)
        }).catch(err => {
            console.log(err)
        });
    };

    editTimes = (e) => {
        const database = firebase.firestore();
        const id = e.target.getAttribute('itemID');
        database.collection('OpenHours').doc(id).update({
            start: this.state.startTime,
            end: this.state.endTime,
        }).catch((err => {
            console.log(err)
        }))
        this.setState({isClicked: true})
    }


    render() {
        return (
            <div className={'container'} style={{textAlign: 'center'}}>
                <div className="z-depth-1 grey lighten-4 row"
                     style={{border: '1px solid #EEE', margin: '2%', paddingRight: '2%', paddingLeft: '2%'}}>
                    <h5 style={{color: '#653487'}}>Please select a room</h5>
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
                    <div className={'input-field'}>
                        <button className={'btn purple'} onClick={this.loadTime}> Load Times
                        </button>
                    </div>
                </div>

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
                                            <Button style={{color: 'purple'}} onClick={this.editTimes}
                                                    node="button"
                                                    className={'btn white'} itemID={time.id}>Edit</Button>
                                        ]}
                                        key={i + 2}
                                        className="colorMe center-align"
                                        closeIcon={<Icon>close</Icon>}
                                        revealIcon={<Icon>more_vert</Icon>}
                                        textClassName="white-text"
                                        title={updatePartyAreaString(time.data.room) + ' - ' + dayOfWeekIntToString(time.data.dayOfWeek)}
                                    >
                                        {translateTimeFromIndexToString(time.data.start) === translateTimeFromIndexToString(time.data.end) ?
                                            <div> This room is closed <br/>
                                                If you wish to modify these times, please insert new times below <br/> </div> : <div>This room is open
                                                from {translateTimeFromIndexToString(time.data.start)} to {translateTimeFromIndexToString(time.data.end)} <br/>
                                                If you wish to modify these times, please insert new times below <br/></div>}
                                                <div className={'section'}/>
                                        <div>
                                            <TimePicker
                                                style={{color: 'white'}}
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

                                    </Card>

                                </Col>
                                <Col m={3} key={i + 3}/>
                            </Row>

                        )
                    })}
                </div>
            </div>
        );
    }
}

export default OpenTimes