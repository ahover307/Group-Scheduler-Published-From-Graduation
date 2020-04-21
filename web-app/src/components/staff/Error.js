import React, {Component} from 'react'

class Error extends Component {
    render() {
        return (
            <div className="container">
                <h1>Not found <span>:(</span></h1>
                <p>Sorry, you're trying to access a page that is restricted</p>
                <p>Please login into your account to access this page</p>

            </div>
        );


    }
}

export default Error;