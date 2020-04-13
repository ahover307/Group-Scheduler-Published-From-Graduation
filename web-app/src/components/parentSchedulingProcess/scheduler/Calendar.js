import React, {Component} from "react";
import Calendar from "react-calendar";
import './Calendar.css';

class calendar extends Component {
    onClickDay = date => {
        this.props.parentCallBackDate(date.getDate());
        this.props.parentCallBackMonth(date.getMonth());
        this.props.parentCallBackYear(date.getFullYear());
        this.props.parentCallBackDay(date.getDay() + 1);
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