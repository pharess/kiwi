import React, { PureComponent, Fragment } from "react";
/**
 * This is PeterTest
 */
export default class PeterTest extends PureComponent {
    constructor(props) {
        super(props);

        /**
         * This is the state of the class
         * @type {state}
         * @private
         */
        this.state = {
            times: 1,
            color: "black"
        };
    }

    /**
     * I don't know what this does
     * @param {props} nextProps 
     * @param {state} prevState 
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.times !== prevState.times || nextProps.color !== prevState.color) {
            return {
                times: (nextProps.times !== undefined) ? ((Number(nextProps.times) >= 1) ? Number(nextProps.times) : prevState.times) : prevState.times,
                color: (nextProps.color !== undefined) ? nextProps.color : prevState.color
            };
        }

        return null;
    }

    /**
     * This is the render method
     * @returns The peter test repreated and in the color
     */
    render() {
        return (
            <Fragment>
                <h1 style={{fontFamily: "sans-serif"}}>Component: PeterTest</h1>
                {[...Array(this.state.times)].map((_, index) =>
                    <p key={index} style={{color: this.state.color, fontFamily: "sans-serif"}}>Look Peter the component works!</p>
                )}
            </Fragment>
        );
    }
};
