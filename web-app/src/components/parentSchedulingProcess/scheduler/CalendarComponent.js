import React, {Component} from "react";
import {DatePicker} from "@material-ui/pickers";
import './Calendar.css';

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
                    <DatePicker
                        orientation={'landscape'}
                        variant={'static'}
                        openTo={'date'}
                        value={this.state.date}
                        onChange={this.onClickDay}
                    />
            </div>
        );
    }
}

export default calendarComponent;