import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

// - Import actions
import * as authorizeActions from 'authorizeActions';

export class Login extends Component {

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
    constructor(props) {
        super(props);

        this.state = {
            emailInput: '',
            emailInputError: '',
            passwordInput: '',
            passwordInputError: ''
        };
    }

    /**
     * Handle data on input change
     * @param  {event} evt is an event of inputs of element on change
     */
    handleInputChange = (evt) => {
        const target = evt.target;
        const name = target.name;

        this.setState({ [name]: target.value });

        // Clear text error fields.
        if (name === 'emailInput') {
            this.setState({ emailInputError: '' });
        }

        else if (name === 'passwordInput') {
            this.setState({ passwordInputError: '' });
        }
    }

    handleForm = () => {
        if (this.state.emailInput === '') {
            this.setState({ emailInputError: 'This field is required' });
        }

        else if (this.state.passwordInput === '') {
            this.setState({ passwordInputError: 'This field is required' });
        }

        else {
            this.props.login(this.state.emailInput, this.state.passwordInput);
        }
    }


    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
    render() {
        return (
            <form style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {/* <div className="animate-bottom"> */}
                    <div style={{backgroundColor: 'white', width: '450px', margin: '20px', textAlign: 'center', display: 'flex', minHeight: '370px', borderRadius: '10px', justifyContent: 'center', alignItems: 'center'}}>
                        <div style={{ padding: "48px 40px 36px" }}>
                            <div style={{paddingLeft: "40px", paddingRight: "40px"}}>
                                <h2 style={{
                                    textAlign: "left",
                                    paddingTop: "16px",
                                    fontSize: "24px",
                                    fontWeight: 400,
                                    lineHeight: "32px",
                                    margin: 0
                                }}>Sign in</h2>
                            </div>

                            <TextField
                                onChange={this.handleInputChange}
                                errorText={this.state.emailInputError}
                                name="emailInput"
                                floatingLabelStyle={{ fontSize: "15px" }}
                                floatingLabelText="Email"
                                type="email"
                                tabIndex={1}
                            /><br />
                            <TextField
                                onChange={this.handleInputChange}
                                errorText={this.state.passwordInputError}
                                name="passwordInput"
                                floatingLabelStyle={{ fontSize: "15px" }}
                                floatingLabelText="Password"
                                type="password"
                                tabIndex={2}
                            /><br />
                            <br />
                            <br />
                            <div className="login__button-box">
                                <div>
                                    <FlatButton label="Create an account" onClick={this.props.signupPage} tabIndex={4} />
                                </div>
                                <div >
                                    <RaisedButton label="Login" primary={true} onClick={this.handleForm} tabIndex={3} />
                                </div>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </form>
        )
    }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (username, password) => {
            dispatch(authorizeActions.dbLogin(username, password))
        },
        signupPage: () => {
            dispatch(push("/signup"))
        }
    }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state, ownProps) => {
    return {

    }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
