import React, {Component} from "react";
import Calendar from "react-calendar";

class calendar extends Component {
    state = {
        date: new Date(),
    };

    onClickDay = date => {
        // <MainScheduler date={date}/>
    };

//https://www.npmjs.com/package/react-calendar
    //todo make calendar on click go to the scheduler page for that date
    //todo get the date going.
    render() {
        return (
            <div>
                <div className={'container center'}>
                    <Calendar
                        calendarType={"US"}
                        onClickDay={this.onClickDay}
                        value={this.state.date}
                    />
                    <p>In future versions, upon clicking on a date this should take you directly to the scheduler page
                        for that date.</p>
                </div>
            </div>
        )
    }
}

export default calendar;