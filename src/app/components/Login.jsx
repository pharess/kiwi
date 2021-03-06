import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import TextField from 'material-ui/TextField';

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
     * @param  {event} event is an event of inputs of element on change
     */
    handleInputChange = (event) => {
        const target = event.target;
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
            <form style={{height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{backgroundColor: 'white', width: '450px', textAlign: 'center', borderRadius: '10px'}}>
                    <h1>Sign in</h1>

                    <TextField
                        onChange={this.handleInputChange}
                        errorText={this.state.emailInputError}
                        name="emailInput"
                        floatingLabelStyle={{ fontSize: "15px" }}
                        floatingLabelText="Email"
                        type="email"
                    />

                    <br />

                    <TextField
                        onChange={this.handleInputChange}
                        errorText={this.state.passwordInputError}
                        name="passwordInput"
                        floatingLabelStyle={{ fontSize: "15px" }}
                        floatingLabelText="Password"
                        type="password"
                    />

                    <br />
                    <br />

                    <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                        <div style={{display: 'flex', outline: 'none', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', height: '50px', backgroundColor: 'white', color: 'black', marginRight: '25px'}} label="Create an account" onClick={this.props.signupPage}>
                            <svg style={{marginRight: '10px'}} width="15" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.847 7H.16c-1.062-3.357 3.341-6 7.255-6 3.913 0 8.483 2.662 7.43 6z" fill="#A2A2A2"/></svg>
                            Create an account
                        </div>
                        <div style={{display: 'flex', outline: 'none', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', height: '50px', backgroundColor: '#9013FE', color: 'white', borderRadius: '0 0 10px 10px'}} label="Login" onClick={this.handleForm}>Login</div>
                    </div>
                </div>
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
