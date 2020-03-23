import React, {Component} from "react";
import * as firebase from "firebase";


class CreatePartyComponent extends Component {
    state = {
        partyName: '',
        participantsAge: 0,
        contactName: '',
        email: '',
        phoneNumber: '',
        payPalInfo: 0,
        partyDate: '',
        partyStartTime: 0,
        partyEndTime: 0,
        partyPackage: 0,
        mainGymStart: 0,
        mainGymEnd: 0,
        kmStart: 0,
        kmEnd: 0,
        rwGymStart: 0,
        rwGymEnd: 0,
        preschoolStart: 0,
        preschoolEnd: 0,
        ninjaStart: 0,
        ninjaEnd: 0,
    };

    render() {
        return (
            <div className={"container"} style={{width: '60%'}}>
                <form>
                    <h5> Schedule a room</h5>
                    <div className={'input-field'}>
                        <label htmlFor={'partyName'}>Name on Party:</label>
                        <input placeholder={'Party Child\'s Name'} type={'text'} id={'partyName'} className={'validate'}
                               required={true} onChange={(e) => {
                            this.props.parentCallbackPartyName(e.target.value);
                        }}/>
                        <span className="helper-text" data-error="Please enter in the name of the party person"/>
                    </div>

                    <div className={'input-field'}>
                        <label htmlFor={'hostName'}>Host Name:</label>
                        <input placeholder={'Parent\'s Name'} type={'text'} id={'hostName'} className={'validate'}
                               required={true} onChange={(e) => {
                            this.props.parentCallBackHostName(e.target.value);
                        }}/>
                        <span className="helper-text" data-error="Please enter in the name of the host of the party"/>

                    </div>

                    <div className={'input-field'}>
                        <label htmlFor={'email'}>Contact Email:</label>
                        <input type={'email'} id={'email'} className={'validate'} required={true}
                               onChange={(e) => {
                                   this.props.parentCallBackEmail(e.target.value);
                               }}/>
                        <span className="helper-text" data-error="Please enter a valid email address"/>
                    </div>

                    <div className={'input-field'}>
                        <i className="material-icons prefix">phone</i>
                        <label htmlFor={'phoneNumber'}>Contact Phone Number:</label>
                        <input type={'tel'} id={'phoneNumber'} className={'validate'} required={true}
                               onChange={(e) => {
                                   this.props.parentCallBackPhoneNumber(e.target.value);
                               }}/>
                        <span className="helper-text" data-error="Please enter a valid phone number"/>
                    </div>
                </form>
            </div>
        );
    }
}


export default CreatePartyComponent