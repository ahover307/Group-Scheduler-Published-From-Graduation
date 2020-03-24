import React from 'react';
import './DescriptionNotes.css';

const DescriptionNotes = () => {
    return (
        <div>
            <h3> Party Descriptions: </h3>

            <br/>

            <div class = "cent">
                <strong>MAIN GYM</strong>
                <p>
                    Our main gym provides entertainment for all ages. Your party helper will run your party however you
                    would like.
                    Chose between obstacle courses, trampolines, pit activities, age appropriate games,
                    relay races, music and free play, or do it all!
                </p>
            </div>

            <br/>

            <div class = "cent">
                <strong>ROCK WALL</strong>
                <p>
                    Our Rock Wall is a great place to learn a new skill or improve your technique while having fun with
                    friends,
                    Free climbing time, races, games and activities with your belay certified party helper.
                </p>
            </div>

            <br/>

            <div class = "cent">
                <strong>KIDMAZIUM</strong>
                <p>
                    The Kidmazium is a multi-level climbing and play structure for children aged up to 12 years.
                    It includes nets, tunnels and slides for climbing, crawling, sliding fun.
                    There’s even a bouncy house inside! Don’t forget your socks!
                </p>
            </div>

            <br/>

            <div class = "cent">
                <strong>PRESCHOOL PARTY</strong>
                <p>
                    Our preschool gym is the perfect size for your preschooler and friends!
                    The party will include age appropriate structured games, mini trampoline, ball pit, parachute
                    activities, music and free play.
                </p>
            </div>

            <br/> <br/>

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

export default DescriptionNotes;