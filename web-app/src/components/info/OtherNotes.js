import React from 'react';
import './DescriptionNotes.css';

const OtherNotes = () => {
    return (
        <div>
            <ul className={'collection with-header'}>
                <li className={'collection-header'}><h4>Other notes and policies</h4></li>
                <li className={'collection-item'} class="colitm">
                    Payment in full is due at the time of booking. Please return the contract to us at your earliest
                    convenience.
                </li>
                <li className={'collection-item'} class="colitm">
                    You are responsible for supplying food, drinks and tableware.
                </li>
                <li className={'collection-item'} class="colitm">
                    Parents may supervise children under the age of 3 but not use the equipment.
                    Parents supervising must have a signed waiver.
                </li>
                <li className={'collection-item'} class="colitm">
                    Party participants must be under the age of 16 years.
                </li>
                <li className={'collection-item'} class="colitm">
                    Please note that your party may not be the only activity in our gym/kidmazium at the time.
                </li>
                <li className={'collection-item'} class="colitm">
                    <h6>Cancellation Policy:</h6>
                    Parties cancelled 6 weeks before the party will receive a full refund.
                    Parties cancelled between 2-6 weeks before the party will receive a refund less $100, which will be
                    credited to your Paramount account to be used within one year.
                    If you cancel within 2 weeks of your party date, the payment will be held as a credit to use at
                    Paramount within one year. Parties may be rescheduled at no extra charge.
                </li>
                <li className={'collection-item'} class="colitm">
                    <h6>Waiver Policy</h6>
                    EVERY PARTICIPANT NEEDS TO HAVE A WAIVER SIGNED BY THEIR PARENT OR LEGAL GUARDIAN (Grandparents,
                    Relatives, Friends etc. are NOT ACCEPTABLE).
                    Waivers can be filled out online on our website, or in person at Paramount Sports
                </li>
                <li className={'collection-item'} class="colitm">
                    <h6>Party Rooms</h6>
                    Paramount can not guarantee what party room/area you will be assigned to your party.
                    We will make every effort to accommodate a request, but cannot guarantee it.
                    The party room is for use at the end of your celebration. There will not be an opportunity to go
                    back to your party area.
                    Your party room may not be available at the start of your party and staff will be available to help
                    set up your party room if this is the case.
                </li>
            </ul>
            <br/><br/>
        </div>
    );
};

export default OtherNotes;