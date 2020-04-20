import React, {Component, useState} from 'react'
import {Collapsible, CollapsibleItem, Icon, DatePicker} from "react-materialize";
import TimeList from "../parentSchedulingProcess/scheduler/TimeList";
import Calendar from "../parentSchedulingProcess/scheduler/Calendar";


class EditForm extends Component {
    state = {
        contactName: '',
        email: '',
        phoneNumber: '',
        paid: true,
        participantsAge: 0,
        partyEndTime: 0,
        partyName: '',
        partyPackage: 0,
        roomsRequested: [0],
        roomTimes: [],
        dayOfWeek: 1,
        dateDay: 2,
        dateMonth: 4,
        dateYear: 2020,
        toConfirm: false,
        date: new Date()
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

    componentDidMount() {
        console.log(new Date())
    }


    render() {

        return (
            <Collapsible accordion={false}>
                <CollapsibleItem
                    expanded={true}
                    header="Select Date"
                    icon={<Icon>calendar</Icon>}
                    node="div"
                ><Calendar
                    activeStartDate= {new Date()}
                    parentCallBackDate={this.callBackFunctionDate}/>

                </CollapsibleItem>
                <CollapsibleItem
                    expanded={false}
                    header="Select Party Package"
                    icon={<Icon>check</Icon>}
                    node="div"
                    className={'PartyPackage'}
                >

                </CollapsibleItem>
                <CollapsibleItem
                    expanded={false}
                    header="Select Party Area"
                    icon={<Icon>place</Icon>}
                    node="div"
                    className={'PartyArea'}
                >

                </CollapsibleItem>
                <CollapsibleItem
                    expanded={false}
                    header="Select Time Slot"
                    icon={<Icon>watch</Icon>}
                    node="div"
                    className={'TimeList'}
                >


                </CollapsibleItem>
                <CollapsibleItem
                    expanded={false}
                    header="Enter your final information"
                    icon={<Icon>info</Icon>}
                    node="div"
                    className={'Info'}
                >

                </CollapsibleItem>
                <div className={'input-field'}>
                    <button className={'btn purple'} onClick={this.handleSubmit}>Submit</button>
                </div>
                <div className={'input-field'}>
                    <button className={'btn purple'} onClick={this.testFunction}>Test Function Button</button>
                </div>
            </Collapsible>
        );
    }
}

export default EditForm;