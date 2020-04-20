import React, {Component} from "react";
import Calendar from "react-calendar";
import './Calendar.css';

class calendar extends Component {
    onClickDay = date => {
        this.props.parentCallBackDate({
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            day: date.getDay() + 1
        });
    };

    //https://www.npmjs.com/package/react-calendar
    render() {
        return (
            <div className={'cent'}>
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

export default calendar;