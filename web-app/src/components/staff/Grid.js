import React, {Component} from 'react'
import {Button, Modal, Table} from 'react-materialize'
import Calendar from "../parentSchedulingProcess/scheduler/Calendar";
import * as firebase from "firebase";
import html2pdf from 'html2pdf.js'
import {translateTimeFromIndexToString, updatePartyPackageString} from '../globalFunctions'


const date = new Date();

class Grid extends Component {

    state = {
        dateDay: date.getDate(),
        dateMonth: date.getMonth() + 1,
        dateYear: date.getFullYear(),
        dayOfWeek: 0,
        visible: false,
        isClicked: false
    };

    callBackFunctionDate = (childData) => {

        this.setState({
            dateDay: childData.date,
            dateMonth: childData.month,
            dateYear: childData.year,
            dayOfWeek: childData.day,

        });
    };


    createGrid = () => {

        this.setState({
            visible: true
        });
        const database = firebase.firestore();
        database.collection('Parties').get().then(snapshot => {
            const parties = [];
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

        }).catch(error => {
            console.log(error)
        })
    };

    downloadGrid = (e) => {
        e.preventDefault();
        const table = document.getElementById('toDownload')
        const opt = {
            margin: 0.15,
            filename: 'grid.pdf',
            image: {type: 'jpeg', quality: 1},
            html2canvas: {scale: 2},
            jsPDF: {unit: 'in', format: 'letter', orientation: 'landscape'}
        };
        html2pdf(table, opt);
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

                <div id={'toDownload'}>
                    {this.state.visible ?
                        <h2 style={{color: '#653487', textAlign: 'center'}}>
                            {this.state.dateMonth}/{this.state.dateDay}/{this.state.dateYear}
                        </h2> : null}
                    <Table id={'table'}>
                        <thead>
                        <tr>
                            <th>
                                Time
                            </th>
                            <th>
                                Name
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

                        {this.state.parties && this.state.parties.sort().map((party, i) => {
                            return (<tr key={i}>
                                    <td key={i}>{translateTimeFromIndexToString(party.data.partyStartTime)} - {translateTimeFromIndexToString(party.data.partyEndTime)}
                                    </td>
                                    <td key={i + 1}>{party.data.name}</td>
                                    <td key={i + 2}> {updatePartyPackageString(party.data.partyPackage)}</td>

                                    {party.data.roomsRequested[0] === 1 ?
                                        <td key={i + 3}>
                                            {translateTimeFromIndexToString(party.data.roomTimes[0])} - {translateTimeFromIndexToString(party.data.roomTimes[1])} </td> :
                                        party.data.roomsRequested[1] === 1 ?
                                            <td key={i + 3}>
                                                {translateTimeFromIndexToString(party.data.roomTimes[2])} - {translateTimeFromIndexToString(party.data.roomTimes[3])} </td> :
                                            party.data.roomsRequested[2] === 1 ?
                                                <td key={i + 3}>
                                                    {translateTimeFromIndexToString(party.data.roomTimes[4])} - {translateTimeFromIndexToString(party.data.roomTimes[5])} </td> :
                                                <td key={i + 3}/>
                                    }

                                    {party.data.roomsRequested[0] === 2 ?
                                        <td key={i + 4}>
                                            {translateTimeFromIndexToString(party.data.roomTimes[0])} - {translateTimeFromIndexToString(party.data.roomTimes[1])} </td> :
                                        party.data.roomsRequested[1] === 2 ?
                                            <td key={i + 4}>
                                                {translateTimeFromIndexToString(party.data.roomTimes[2])} - {translateTimeFromIndexToString(party.data.roomTimes[3])} </td> :
                                            party.data.roomsRequested[2] === 2 ?
                                                <td key={i + 4}>
                                                    {translateTimeFromIndexToString(party.data.roomTimes[4])} - {translateTimeFromIndexToString(party.data.roomTimes[5])} </td> :
                                                <td key={i + 4}/>
                                    }

                                    {party.data.roomsRequested[0] === 3 ?
                                        <td key={i + 5}>
                                            {translateTimeFromIndexToString(party.data.roomTimes[0])} - {translateTimeFromIndexToString(party.data.roomTimes[1])} </td> :
                                        party.data.roomsRequested[1] === 3 ?
                                            <td key={i + 5}>
                                                {translateTimeFromIndexToString(party.data.roomTimes[2])} - {translateTimeFromIndexToString(party.data.roomTimes[3])} </td> :
                                            party.data.roomsRequested[2] === 3 ?
                                                <td key={i + 5}>
                                                    {translateTimeFromIndexToString(party.data.roomTimes[4])} - {translateTimeFromIndexToString(party.data.roomTimes[5])} </td> :
                                                <td key={i + 5}/>
                                    }

                                    {party.data.roomsRequested[0] === 4 ?
                                        <td key={i + 6}>
                                            {translateTimeFromIndexToString(party.data.roomTimes[0])} - {translateTimeFromIndexToString(party.data.roomTimes[1])} </td> :
                                        party.data.roomsRequested[1] === 4 ?
                                            <td key={i + 6}>
                                                {translateTimeFromIndexToString(party.data.roomTimes[2])} - {translateTimeFromIndexToString(party.data.roomTimes[3])} </td> :
                                            party.data.roomsRequested[2] === 4 ?
                                                <td key={i + 6}>
                                                    {translateTimeFromIndexToString(party.data.roomTimes[4])} - {translateTimeFromIndexToString(party.data.roomTimes[5])} </td> :
                                                <td key={i + 6}/>
                                    }

                                    {party.data.roomsRequested[0] === 5 ?
                                        <td key={i + 7}>
                                            {translateTimeFromIndexToString(party.data.roomTimes[0])} - {translateTimeFromIndexToString(party.data.roomTimes[1])} </td> :
                                        party.data.roomsRequested[1] === 5 ?
                                            <td key={i + 7}>
                                                {translateTimeFromIndexToString(party.data.roomTimes[2])} - {translateTimeFromIndexToString(party.data.roomTimes[3])} </td> :
                                            party.data.roomsRequested[2] === 5 ?
                                                <td key={i + 7}>
                                                    {translateTimeFromIndexToString(party.data.roomTimes[4])} - {translateTimeFromIndexToString(party.data.roomTimes[5])} </td> :
                                                <td key={i + 7}/>
                                    }

                                </tr>
                            )
                        })}


                        </tbody>

                    </Table>
                </div>
                {this.state.visible ? <div style={{margin: '2%', textAlign: 'center'}}>
                    <button className={'btn purple'} onClick={this.downloadGrid}>Download</button>
                </div> : null}

            </div>

        );
    }
}

export default Grid