import React, {Component} from "react";
import {DatePicker} from "@material-ui/pickers";
import Calendar from "react-calendar";
import './Calendar.css';

class calendarComponent extends Component {
    onClickDay = date => {
        this.setState({
            clicked : true
        });
        this.props.parentCallBackDate({
            date: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            day: date.getDay() + 1
        });
    };

    //https://www.npmjs.com/package/react-calendar
    render() {
        return (
            <div style={{marginTop:'2%',  marginBottom: '2%'}}>
                <div className={'container center'}>
                    <Calendar
                        calendarType={"US"}
                        onClickDay={this.onClickDay}
                    />
                </div>
            </div>
        )
    }
}

export default calendarComponent;