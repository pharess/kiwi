import React from 'react';
import { firebaseAuth } from 'app/firebase/'
import firebaseui from 'firebaseui'

var authUi = new firebaseui.auth.AuthUI(firebaseAuth());

class Login2 extends React.Component {
    componentDidMount() {
        var self = this;
        var uiConfig = {
            'callbacks': {
                'signInSuccess': function (user) {
                    if (self.props.onSignIn) {
                        self.props.onSignIn(user);
                    }
                    return false;
                }
            },
            'signInOptions': [
                firebaseAuth.GoogleAuthProvider.PROVIDER_ID,
                firebaseAuth.EmailAuthProvider.PROVIDER_ID
            ]
        };
        authUi.start('#firebaseui-auth', uiConfig);
    }

    componentWillUnmount() {
        authUi.reset();
    }

    render() {
        return (
            <div id="firebaseui-auth"></div>
        );
    }
}

export default Login2