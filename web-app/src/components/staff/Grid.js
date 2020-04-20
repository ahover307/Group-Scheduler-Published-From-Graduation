import React, {Component} from 'react'
import {Table} from 'react-materialize'
import Calendar from "../parentSchedulingProcess/scheduler/Calendar";

class Grid extends Component {

    state = {
        dateDay: 0,
        dateMonth: 0,
        dateYear: 0,
        dayOfWeek: 0
    };

    callBackFunctionDate = (childData) => {
        console.log(childData);
        this.setState({
            dateDay: childData.date,
            dateMonth: childData.month,
            dateYear: childData.year,
            dayOfWeek: childData.day
        });
    };

    createGrid = () => {

    }


    render() {
        return (
            <div className={'container'}>
                <div style={{textAlign: 'center'}}>
                    <div className="section"/>
                    <h5 style={{color: "#653487"}}>Please select a date</h5>
                    <div className="z-depth-1 grey lighten-4 row"
                         style={{border: '1px solid #EEE', margin: '2%'}}>
                        <Calendar parentCallBackDate={this.callBackFunctionDate}/>
                        <button className={'btn purple'} style={{margin: '2%'}}
                                onClick={this.createGrid}> View Grid </button>
                    </div>
                </div>

                <div>



                </div>
            </div>

        );
    }
}

export default Grid