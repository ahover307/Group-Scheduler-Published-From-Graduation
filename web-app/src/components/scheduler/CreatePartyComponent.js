import React, {Component} from "react";

class CreatePartyComponent extends Component {
    state = {
        partyName: '',
        hostName: '',
        email: '',
        phoneNumber: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    };

    render() {
        return (
            <div className={"container"}>
                <form onSubmit={this.handleSubmit}>
                    <h5> Schedule a room</h5>

                    <div className={'input-field'}>
                        <label htmlFor={'partyName'}>Name on Party:</label>
                        <input placeholder={'Party Child\'s Name'} type={'text'} id={'partyName'} className={'validate'}
                               required={true} onChange={this.handleChange}/>
                        <span className="helper-text" data-error="Please enter in the name of the party person"/>

                    </div>

                    <div className={'input-field'}>
                        <label htmlFor={'hostName'}>Host Name:</label>
                        <input placeholder={'Parent\'s Name'} type={'text'} id={'hostName'} className={'validate'}
                               required={true} onChange={this.handleChange}/>
                        <span className="helper-text" data-error="Please enter in the name of the host of the party"/>

                    </div>

                    <div className={'input-field'}>
                        <label htmlFor={'email'}>Contact Email:</label>
                        <input type={'email'} id={'email'} className={'validate'} required={true}
                               onChange={this.handleChange}/>
                        <span className="helper-text" data-error="Please enter a valid email address"/>
                    </div>

                    <div className={'input-field'}>
                        <i className="material-icons prefix">phone</i>
                        <label htmlFor={'phoneNumber'}>Contact Phone Number:</label>
                        <input type={'tel'} id={'phoneNumber'} className={'validate'} required={true}
                               onChange={this.handleChange}/>
                        <span className="helper-text" data-error="Please enter a valid phone number"/>
                    </div>

                    <div className={'input-field'}>
                        <button className={'btn purple'}>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreatePartyComponent;