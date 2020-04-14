import React, {Component} from "react";
import {connect} from 'react-redux'
import * as firebase from "firebase";
import {Table} from "react-materialize";

class SearchForm extends Component {
    state = {
        partyName: '',
        email: '',
        parties: []
    };

    findParties = () => {
        const database = firebase.firestore();
        database.collection('Parties').get().then(snapshot => {

            const parties = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                if (data.name === this.state.partyName && data.email === this.state.email) {
                    parties.push(data)
                }
            });
            this.setState({parties: parties})

        }).catch(error => {
            console.log(error)
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };


    render() {
        return (
            <div className={'container'}>
                <div style={{textAlign: 'center'}}>
                    <div className="section"/>
                    <h5 style={{color: "#653487"}}>Please enter the name of the party and the email</h5>
                    <div className="z-depth-1 grey lighten-4 row"
                         style={{border: '1px solid #EEE', margin: '2%'}}>
                        <form onSubmit={this.handleSubmit}>

                            <div className="input-field col s6">
                                <i className="material-icons prefix">account_circle</i>
                                <input id={'partyName'} type="text" className="validate"
                                       onChange={this.handleChange} required={true}/>
                                <label htmlFor="partyName">Party Name</label>
                            </div>


                            <div className="input-field col s6">
                                <i className="material-icons prefix">email</i>
                                <input id={'email'} type="tel" className="validate"
                                       onChange={this.handleChange} required={true}/>
                                <label htmlFor="email">Email</label>
                            </div>

                        </form>
                        <div className={'row'}/>
                        <div className={'input-field'}>
                            <button className={'btn purple'} onClick={this.findParties}> Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className="z-depth-1 grey lighten-4 row"
                     style={{border: '1px solid #EEE', margin: '2%'}}>
                    <Table>
                        <thead>
                        <tr>
                            <th>
                                Party Name
                            </th>
                            <th>
                                Email
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.parties && this.state.parties.map((party, i) => {
                            return (<tr>
                                    <td key={i}><p id={i}> {party.name}</p></td>
                                    <td key={1000000-i}><p id={1000000-1}> {party.email}</p></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </div>
            </div>


        )
    }
}


export default SearchForm