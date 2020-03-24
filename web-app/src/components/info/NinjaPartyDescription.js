import React from 'react';
import './PartyDescription.css';

const NinjaPartyDescription = () => {
    return (
        <div>
            <h1>Ninja Warrior Parties</h1>
            <h3>​All party packages are for ages 6 to 16 years.</h3>

            <div className={'PartyTitle'}>
                Paramount Ninja Warrior Experience
            </div>
            <div className={'PartySubtitle'}>
                1.5 hour party - $225
            </div>

            <div className={'PartyDescription'}>
                ​​ ​30 mins main gym or Kidmazium, 30 mins ninja warrior course, 30 mins party room.
                <br/>
                <em>
                    Up to 15 participants ($10 for each extra)
                </em>
            </div>

            <br/>
            <br/>

            <div className={'PartyTitle'}>
                ​Paramount Ninja Warrior Exclusive
            </div>
            <div className={'PartySubtitle'}>
                1.5 hour party - $250
            </div>

            <div className={'PartyDescription'}>
                50 mins ninja warrior course, 40 mins party room.
                <br/>
                <em>
                    Up to 15 participants ($10 for each extra)
                </em>
            </div>

            <br/>
            <br/>

            <div className={'PartyTitle'}>
                Paramount Ninja Warrior Extra
            </div>
            <div className={'PartySubtitle'}>
                2 hour party - $285​
            </div>

            <div className={'PartyDescription'}>
                40 mins main gym or Kidmazium, 40 mins ninja warrior course, 40 mins party room.
                <br/>
                <em>
                    ​Up to 15 participants ($10 for each extra)
                </em>
            </div>

            <br/>
            <br/>

            <div className={'PartyTitle'}>
                ​Paramount Ninja Warrior Extreme
            </div>
            <div className={'PartySubtitle'}>
                2.5 hour party - $325
            </div>

            <div className={'PartyDescription'}>
                60 mins main gym or Kidmazium, 50 mins ninja warrior course, 40 mins party room.
                <br/>
                <em>
                    Up to 15 participants ($10 for each extra)
                </em>
            </div>

        </div>
    )

};

export default NinjaPartyDescription;