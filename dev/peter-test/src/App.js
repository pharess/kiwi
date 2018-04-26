import React, { Component, Fragment } from 'react';
import PeterTest from './PeterTest.jsx';

export default class App extends Component {
    render() {
        return (
            <Fragment>
                <h1>Component: PeterTest</h1>
                <PeterTest color="red" times="2"/>
            </Fragment>
        );
    }
};