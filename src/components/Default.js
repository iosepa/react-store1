import React, { Component } from 'react'

export default class Default extends Component {
    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title pt-5">
                        <h1>404</h1>
                        <h2>you're not poor.</h2>
                        <h4> <span className="text-danger">{this.props.location.pathname} </span>is just kinda a bore.</h4>
                    </div>
                </div>
            </div>
        )
    }
}
