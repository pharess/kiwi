import React, { PureComponent } from 'react';

export default class PeterTest extends PureComponent {
    constructor(props) {
        super(props);

        // The state variable holds our defaults and our application data (as it changes).
        this.state = {
            times: 1,
            color: 'black'
        };
    }

    // getDerivedStateFromProps is new in React 16.3. It will execute before the initial render and any subsequent times it needs to update.
    static getDerivedStateFromProps(nextProps, prevState) {
        // Only rerender if the color or times are different then before.
        if (nextProps.times !== prevState.times || nextProps.color !== prevState.color) {
            return {
                times: (nextProps.times !== undefined) ? ((Number(nextProps.times) >= 1) ? Number(nextProps.times) : prevState.times) : prevState.times,
                color: (nextProps.color !== undefined) ? nextProps.color : prevState.color
            };
        }

        return null;
    }

    render() {
        // [...Array(this.state.times)] is equivalent to saying 'repeat {this.state.times}'.
        // React needs a key for multiple identical children. The key must be unique as it distinguishes children nodes.
        return (
            [...Array(this.state.times)].map((_, index) =>
                <p key={index} style={{color: this.state.color}}>Look Peter the component works!</p>
            )
        );
    }
};