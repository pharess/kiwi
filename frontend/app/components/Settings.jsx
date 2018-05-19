import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import TextField from 'material-ui/TextField';

// - Import actions
import * as authorizeActions from 'authorizeActions'


/**
 * Create component class
 * 
 * @export
 * @class Settings
 * @extends {Component}
 */
export class Settings extends Component {

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
    constructor(props) {
        super(props);

        this.state = {
            passwordInput: '',
            passwordInputError: '',
            confirmInput: '',
            confirmInputError: '',
        }
    }

    /**
     * Handle data on input change
     * @param  {event} evt is an event of inputs of element on change
     */
    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState({ [name]: target.value });

        if (name === 'passwordInput') {
            this.setState({ passwordInputError: '' });
        }

        else if (name === 'confirmInput') {
            this.setState({
                confirmInputError: '',
                passwordInputError: ''
            });
        }
    }

    handleForm = () => {
        if (this.state.passwordInput === '') {
            this.setState({ passwordInputError: 'This field is required' });
        }

        else if (this.state.confirmInput === '') {
            this.setState({ confirmInputError: 'This field is required' });
        }
        else if (this.state.confirmInput !== this.state.passwordInput) {
            this.setState({ confirmInputError: 'Password and confirm password should be equal!' });
        }

        else {
            this.props.login(
                this.state.passwordInput,
                this.state.confirmInput
            )
        }
    }


    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
    render() {
        return (
            <div style={{height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{backgroundColor: 'white', width: '450px', textAlign: 'center', borderRadius: '10px'}}>
                    <h1>Reset Password</h1>

                    <TextField
                        onChange={this.handleInputChange}
                        errorText={this.state.passwordInputError}
                        name="passwordInput"
                        floatingLabelStyle={{ fontSize: "15px" }}
                        floatingLabelText="New password"
                        type="password"
                    />
                    
                    <br />

                    <TextField
                        onChange={this.handleInputChange}
                        errorText={this.state.confirmInputError}
                        name="confirmInput"
                        floatingLabelStyle={{ fontSize: "15px" }}
                        floatingLabelText="Confirm password"
                        type="password"
                    />

                    <br />
                    <br />

                    <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                        <div style={{display: 'flex', outline: 'none', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', height: '50px', backgroundColor: 'white', color: 'black', marginRight: '31px'}} label="Home" onClick={this.props.homePage}>
                            <svg style={{marginRight: '10px'}} width="21" height="17" xmlns="http://www.w3.org/2000/svg"><path d="M7.723.67A.966.966 0 0 1 9.09 2.039L3.644 7.484l16.087.04a.978.978 0 0 1 .973.975.966.966 0 0 1-.968.97L3.56 9.426l5.489 5.488a.973.973 0 0 1 .004 1.375.973.973 0 0 1-1.375-.005L.583 9.19A.973.973 0 0 1 .58 7.815L7.723.67z" fill="#A2A2A2"/></svg>
                            Return to login page
                        </div>
                        <div style={{display: 'flex', outline: 'none', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', height: '50px', backgroundColor: '#9013FE', color: 'white', borderRadius: '0 0 10px 10px'}} label="Change password" primary={true} onClick={this.handleForm}>Reset Password</div>
                    </div>
                </div>
            </div>
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
        login: (password) => {
            dispatch(authorizeActions.dbUpdatePassword(password))
        },
        homePage: () => {
            dispatch(push("/"))
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings))
