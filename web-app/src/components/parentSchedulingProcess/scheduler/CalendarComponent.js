import React, {Component} from "react";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import './Calendar.css';
import MomentUtils from "@date-io/moment";

class calendarComponent extends Component {
    state = {
        date: 0,
    }
    onClickDay = date => {
        this.setState({
            date: date
        });

        this.props.parentCallBackDate({
            date: date.date(),
            month: date.month() + 1,
            year: date.year(),
            day: date.day() + 1
        });
    };

    //https://www.npmjs.com/package/react-calendar
    render() {
        return (
            <div className={'container center'}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        orientation={'landscape'}
                        variant={'static'}
                        openTo={'date'}
                        value={this.state.date}
                        onChange={this.onClickDay}
                    />
                </MuiPickersUtilsProvider>
            </div>
        );
    }
}

export default calendarComponent;