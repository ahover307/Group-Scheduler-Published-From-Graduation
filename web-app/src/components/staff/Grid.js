import React, {Component} from 'react'
import {Button, Modal, Table} from 'react-materialize'
import Calendar from "../parentSchedulingProcess/scheduler/Calendar";
import * as firebase from "firebase";


class Grid extends Component {

    state = {
        dateDay: 0,
        dateMonth: 0,
        dateYear: 0,
        dayOfWeek: 0,
        visible: false,
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

    updatePartyPackageString(e) {
        switch (parseInt(e)) {
            case 0:
                return "Basic";
            case 1:
                return "Single";
            case 2:
                return "Double";
            case 3:
                return "Triple";
            case 4:
                return "ERROR";
            case 5:
                return "Ninja Exclusive";
            case 6:
                return "Ninja Experience";
            case 7:
                return "Ninja Extra";
            case 8:
                return "Ninja Extreme";
            case 9:
                return "Sleepover";
            default:
                return "Incorrect Room Code";
        }
    }

    translateTimeFromIndexToString(timeIndex) {
        //I dont trust the input, so I sanitize the input to be an int before manipulating it.
        timeIndex = parseInt(timeIndex);

        //Find the minutes and hours of each time through the power of math.
        let hour = (Math.floor(timeIndex / 12) % 12);
        let minute = ((timeIndex % 12) * 5);

        //Made the offset since it should return a minute hand with a 10s place, even if the tens place is a 0
        if (minute < 10) {
            minute = "0" + minute;
        }

        //Reset to 12 hour time.
        if (hour === 0) {
            hour = 12;
        }

        return (hour + ":" + minute);
    }

    createGrid = () => {
        this.setState({
            visible : true
        });
        const database = firebase.firestore();
        database.collection('Parties').get().then(snapshot => {
            const parties = [];
            const ids = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                if (data.month === this.state.dateMonth && data.day === this.state.dateDay &&
                    data.year === this.state.dateYear) {
                    parties.push({
                        id: doc.id,
                        data: doc.data()
                    });

                }
            });
            this.setState({parties: parties});
            console.log(parties)
        }).catch(error => {
            console.log(error)
        })
    };


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
                                onClick={this.createGrid}> View Grid
                        </button>
                    </div>
                </div>

                <div>
                    {this.state.visible ?
                    <h2 style={{color: '#653487', textAlign: 'center'}}>
                        {this.state.dateMonth}/{this.state.dateDay}/{this.state.dateYear}
                    </h2> : null}
                    <Table>
                        <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Time
                            </th>
                            <th>
                                Party Type
                            </th>
                            <th>
                                Main
                            </th>
                            <th>
                                KM
                            </th>
                            <th>
                                RW
                            </th>
                            <th>
                                Preschool
                            </th>
                            <th>
                                Ninja
                            </th>

                        </tr>
                        </thead>
                        <tbody>

                        {this.state.parties && this.state.parties.map((party, i) => {
                            return (<tr key={i}>
                                    <td key={i}>{party.data.name}</td>
                                    <td key={i + 1}>{this.translateTimeFromIndexToString(party.data.partyStartTime)} - {this.translateTimeFromIndexToString(party.data.partyEndTime)}
                                    </td>
                                    <td key={i + 2}> {this.updatePartyPackageString(party.data.partyPackage)}</td>

                                    {party.data.roomsRequested[0] === 1 ?
                                        <td key={i + 3}>
                                            {this.translateTimeFromIndexToString(party.data.roomTimes[0])} - {this.translateTimeFromIndexToString(party.data.roomTimes[1])} </td> :
                                        party.data.roomsRequested[1] === 1 ?
                                            <td key={i + 3}>
                                                {this.translateTimeFromIndexToString(party.data.roomTimes[2])} - {this.translateTimeFromIndexToString(party.data.roomTimes[3])} </td> :
                                            party.data.roomsRequested[2] === 1 ?
                                                <td key={i + 3}>
                                                    {this.translateTimeFromIndexToString(party.data.roomTimes[4])} - {this.translateTimeFromIndexToString(party.data.roomTimes[5])} </td> :
                                                <td key={i + 3}/>
                                    }

                                    {party.data.roomsRequested[0] === 2 ?
                                        <td key={i + 4}>
                                            {this.translateTimeFromIndexToString(party.data.roomTimes[0])} - {this.translateTimeFromIndexToString(party.data.roomTimes[1])} </td> :
                                        party.data.roomsRequested[1] === 2 ?
                                            <td key={i + 4}>
                                                {this.translateTimeFromIndexToString(party.data.roomTimes[2])} - {this.translateTimeFromIndexToString(party.data.roomTimes[3])} </td> :
                                            party.data.roomsRequested[2] === 2 ?
                                                <td key={i + 4}>
                                                    {this.translateTimeFromIndexToString(party.data.roomTimes[4])} - {this.translateTimeFromIndexToString(party.data.roomTimes[5])} </td> :
                                                <td key={i + 4}/>
                                    }

                                    {party.data.roomsRequested[0] === 3 ?
                                        <td key={i + 5}>
                                            {this.translateTimeFromIndexToString(party.data.roomTimes[0])} - {this.translateTimeFromIndexToString(party.data.roomTimes[1])} </td> :
                                        party.data.roomsRequested[1] === 3 ?
                                            <td key={i + 5}>
                                                {this.translateTimeFromIndexToString(party.data.roomTimes[2])} - {this.translateTimeFromIndexToString(party.data.roomTimes[3])} </td> :
                                            party.data.roomsRequested[2] === 3 ?
                                                <td key={i + 5}>
                                                    {this.translateTimeFromIndexToString(party.data.roomTimes[4])} - {this.translateTimeFromIndexToString(party.data.roomTimes[5])} </td> :
                                                <td key={i + 5}/>
                                    }

                                    {party.data.roomsRequested[0] === 4 ?
                                        <td key={i + 6}>
                                            {this.translateTimeFromIndexToString(party.data.roomTimes[0])} - {this.translateTimeFromIndexToString(party.data.roomTimes[1])} </td> :
                                        party.data.roomsRequested[1] === 4 ?
                                            <td key={i + 6}>
                                                {this.translateTimeFromIndexToString(party.data.roomTimes[2])} - {this.translateTimeFromIndexToString(party.data.roomTimes[3])} </td> :
                                            party.data.roomsRequested[2] === 4 ?
                                                <td key={i + 6}>
                                                    {this.translateTimeFromIndexToString(party.data.roomTimes[4])} - {this.translateTimeFromIndexToString(party.data.roomTimes[5])} </td> :
                                                <td key={i + 6}/>
                                    }

                                    {party.data.roomsRequested[0] === 5 ?
                                        <td key={i + 7}>
                                            {this.translateTimeFromIndexToString(party.data.roomTimes[0])} - {this.translateTimeFromIndexToString(party.data.roomTimes[1])} </td> :
                                        party.data.roomsRequested[1] === 5 ?
                                            <td key={i + 7}>
                                                {this.translateTimeFromIndexToString(party.data.roomTimes[2])} - {this.translateTimeFromIndexToString(party.data.roomTimes[3])} </td> :
                                            party.data.roomsRequested[2] === 5 ?
                                                <td key={i + 7}>
                                                    {this.translateTimeFromIndexToString(party.data.roomTimes[4])} - {this.translateTimeFromIndexToString(party.data.roomTimes[5])} </td> :
                                                <td key={i + 7}/>
                                    }



                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>

                </div>
            </div>

        );
    }
}

export default Grid