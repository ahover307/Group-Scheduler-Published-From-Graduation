import React, {Component} from "react";
import * as firebase from "firebase";
import {Button, Modal, Table} from "react-materialize";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Error from "./Error";
import './Modal.css'


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

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    deleteEntry = (e) => {
        const database = firebase.firestore();
        const id = e.target.getAttribute('itemID');
        database.collection('Parties').doc(id).delete().catch(error => alert(error));

    };


    render() {
        if (this.props.authError === "Logout success") {
            return <Redirect to={'/'}/>
        }
        return (
            <div>{this.props.authError === "Login success" ?
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
                                <th>
                                    Date
                                </th>
                                <th>
                                </th>
                            </tr>
                            </thead>
                            <tbody>

                            {this.state.parties && this.state.parties.map((party, i) => {
                                return (
                                        <tr key={i}>
                                            <td key={i}>{party.data.name}</td>
                                            <td key={i + 1}>{party.data.email}</td>
                                            <td key={i + 2}>{party.data.month}/{party.data.day}/{party.data.year} </td>
                                            <td key={i + 3}>
                                                <Button onClick={this.deleteEntry} node="button"
                                                        className={'btn red'} itemID={party.id}>Delete</Button>
                                            </td>
                                        </tr>
                                    )
                            })}
                            </tbody>
                        </Table>
                    </div>
                </div> : <Error/>}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
}
export default connect(mapStateToProps)(SearchForm)