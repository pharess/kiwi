// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {firebaseAuth} from 'app/firebase/'

// Configure FirebaseUI.
const uiConfig = {
  signInSuccessUrl: '/Home',
  signInOptions: [
    firebaseAuth.EmailAuthProvider.PROVIDER_ID
  ]
};


class Login3 extends React.Component {
  render() {
    console.log(firebaseAuth.FacebookAuthProvider.PROVIDER_ID);
    console.log(firebaseAuth.EmailAuthProvider.PROVIDER_ID);
    console.log(firebaseAuth());
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth()}/>
      </div>
    );
  }
}

export default Login3