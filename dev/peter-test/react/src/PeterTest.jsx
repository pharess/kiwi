import React, { PureComponent, createRef } from "react";
import { SketchPicker } from 'react-color'
/**
 * This is PeterTest
 */
export default class PeterTest extends PureComponent {
    constructor(props) {
        super(props);

        /**
         * This is the state of the class. It currently holds 'times' which is a number, 'color' which is a string, and 'text' which is also a string..
         * @type {state}
         * @private
         */
        this.state = {
            times: 1,
            color: "black",
            text: "Look Peter the component works!"
        };

        this.input = createRef();
    }

    /**
     * This method handles the update and initialization of state based on input from index.js.
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
     * This method handles the update of text.
     */
    handleTextChange = () => {
        if (this.input.current.value !== '') {
            this.setState({text: this.input.current.value});
        }

        else {
            this.setState({text: "Look Peter the component works!"});
        }
    }

    /**
     * This method handles the update of text.
     * * @param {color} color
     */
    handleChangeComplete = (color) => {
        this.setState({color: color.hex});
    };

    /**
     * This is the render method
     * @returns The peter test repeated and in color. 
     */
    render() {
        return (
            <div style={{fontFamily: 'Helvetica Neue'}}>
                <h1>Component: PeterTest</h1>
                <div>
                    <input type="checkbox" id="toggleModify" name="toggle"/>
                    <label for="Modifying component live">Check the box to modify the component live</label>
                </div>

                <h3>Update Text</h3>
                <input ref={this.input} placeholder="hi" style={{height: '30px', textIndent: '10px', border: '2px solid #ccc', borderRadius: '3px'}} onKeyUp={this.handleTextChange}/>
                <SketchPicker 
                    color={this.state.color}
                    onChangeComplete={this.handleChangeComplete}
                />

                {[...Array(this.state.times)].map((_, index) =>
                    <p key={index} style={{color: this.state.color}}>{this.state.text}</p>
                )}
            </div>
        );
    }
};
