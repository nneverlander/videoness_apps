/**
 * Created by adi on 8/28/16.
 */
import React from 'react';
import {Text, View, TextInput, TouchableHighlight, ActivityIndicator} from 'react-native';

const styles = require('./loginStyles');

var Login = React.createClass({
  getInitialState() {
    return {
      email: '',
      pass: '',
      invalidEmail: false,
      invalidPass: false,
      emailPassMatch: true,
      showForgotPasswordBox: false,
      showLoginBox: true,
      resetEmail: '',
      invalidResetEmail: false,
      showResetEmailSent: false,
      resetEmailNotFound: false,
      isLoaded: true
    };
  },
  setResetEmail(text) {
    this.setState({
      resetEmail: text,
      invalidResetEmail: false,
      resetEmailNotFound: false
    });
  },
  setEmail(text) {
    this.setState({
      email: text,
      invalidEmail: false,
      emailPassMatch: true
    });
  },
  setPass(text) {
    this.setState({
      pass: text,
      invalidPass: false,
      emailPassMatch: true
    });
  },
  validateResetEmail(e) {
    e.preventDefault();
    var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!email_regex.test(this.resetEmail.value)) {
      this.setState({
        invalidResetEmail: true,
        resetEmailNotFound: false
      });
    } else {
      this.setState({
        invalidResetEmail: false
      }, this.sendPasswordResetEmail);
    }
  },
  sendPasswordResetEmail() {
    this.setState({isLoaded: false});
    firebase.auth().sendPasswordResetEmail(this.state.resetEmail).then(() => {
      this.setState({isLoaded: true});
      this.setState({
        showResetEmailSent: true,
        resetEmailNotFound: false
      });
    }, (error) => {
      this.setState({isLoaded: true});
      if (error.code === 'auth/user-not-found') {
        this.setState({
          resetEmailNotFound: true
        });
      }
    });
  },
  validate(e) {
    e.preventDefault();
    var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!email_regex.test(this.email.value)) {
      this.email.focus();
      this.setState({
        invalidEmail: true
      });
    } else {
      this.setState({
        invalidEmail: false
      });
    }
    if (!(this.pass.value.length > 6)) {
      this.setState({
        invalidPass: true
      });
    } else {
      this.setState({
        invalidPass: false
      }, this.loginWithEmail);
    }
  },
  loginWithEmail() {
    this.setState({isLoaded: false});
    if (!this.state.invalidEmail) { // no need to check invalidPass since pass is gauranteed to be valid here
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass).then((result) => {
        this.setState({isLoaded: true});
      }).catch((error) => {
        var errorCode = error.code;
        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email') {
          this.setState({isLoaded: true});
          this.setState({emailPassMatch: false});
        } else if (errorCode === 'auth/user-not-found') {
          firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).then((result) => {
            this.setState({isLoaded: true});
          }).catch((error) => {
            this.setState({isLoaded: true});
            console.error(error);
          });
        } else if (error.code === 'auth/account-exists-with-different-credential') {
          this.setState({isLoaded: true});
          console.log(error.message); //TODO what is console in mobile?
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
      });
    }
  },
  loginWithFb() {
    this.setState({isLoaded: false});
    var provider = new firebase.auth.FacebookAuthProvider();
    // provider.addScope('user_birthday'); todo more scopes like birthday
    firebase.auth().signInWithPopup(provider).then((result) => {
      this.setState({isLoaded: true});
    }).catch((error) => {
      this.setState({isLoaded: true});
      if (error.code === 'auth/account-exists-with-different-credential') {
        console.log(error.message);
        // If you are using multiple auth providers on your app you should handle linking
        // the user's accounts here.
      } else {
        console.error(error);
      }
    });
  },
  showForgotPasswordBox() {
    this.setState({
      showForgotPasswordBox: true,
      showLoginBox: false,
      showResetEmailSent: false
    });
  },
  showLoginBox(e) {
    e.preventDefault();
    this.setState({
      showLoginBox: true,
      showForgotPasswordBox: false,
      showResetEmailSent: false
    });
  },
  render(){
    return (
      <View id="loginModal">
        <View>
          <View style={styles.vidSpinnerBg}>
          {!this.state.isLoaded && <ActivityIndicator style={styles.vidSpinner}/>}
          </View>
          <View style={this.state.showForgotPasswordBox ? styles.forgotPasswordModal : styles.hidden}>
            <TouchableHighlight>
              <Text style={styles.loginCloseBtn}>&times;</Text>
            </TouchableHighlight>
            <Text style={this.state.showResetEmailSent ? styles.hidden : ""}>enter your account email</Text>
            <Text style={this.state.showResetEmailSent ? "" : styles.hidden}>success</Text>
            <View>
              <View style={this.state.showResetEmailSent ? "" : styles.hidden}>
                <Text style={styles.vidResetEmailSent}>a reset password email has been sent to {this.state.resetEmail}</Text>
                <TouchableHighlight>
                  <View>
                    <Text onPress={this.sendPasswordResetEmail} style={styles.loginBtn}>send again</Text>
                    <Text onPress={this.showLoginBox} style={styles.loginBtn}>login</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={this.state.showResetEmailSent ? styles.hidden : ""}>
                <TextInput onChangeText={this.setResetEmail} value={this.state.resetEmail}
                       style={styles.input} ref={(v) => this.resetEmail = v} placeholder="email"/>
                <Text style={this.state.invalidResetEmail ? styles.invalidInput : styles.hidden}>invalid email</Text>
                <Text style={this.state.resetEmailNotFound ? styles.invalidInput : styles.hidden}>email not found</Text>
                <TouchableHighlight>
                  <View>
                    <Text onPress={this.validateResetEmail} style={styles.loginBtn}>reset password </Text>
                    <Text onPress={this.showLoginBox} style={styles.loginBtn}>cancel</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
          <View style={this.state.showLoginBox ? "" : styles.hidden}>
            <TouchableHighlight>
              <View>
                <Text style={styles.loginCloseBtn}>&times;</Text>
                <Text onPress={this.loginWithFb} style={styles.fbButton}>continue with facebook</Text>
              </View>
            </TouchableHighlight>
            <View>
              <Text style={styles.orLoginEmail}>or login with email and password</Text>
              <View role="form">
                <TextInput onChangeText={this.setEmail} value={this.state.email}
                       style={styles.input} ref={(v) => this.email = v} placeholder="email"/>
                <Text style={this.state.invalidEmail ? styles.invalidInput : styles.hidden}>invalid email</Text>
                <TextInput secureTextEntry={true} onChangeText={this.setPass} value={this.state.pass}
                 style={styles.input} ref={(v) => this.pass = v}
                 placeholder="password (atleast 7 characters)"/>
                <Text style={this.state.invalidPass ? styles.invalidInput : styles.hidden}>password has fewer than 7 chars</Text>
                <TouchableHighlight>
                  <Text onPress={this.validate} style={styles.loginBtn}>login</Text>
                </TouchableHighlight>
                <Text style={this.state.emailPassMatch ? styles.hidden : styles.emailPassMatchError}>email and password do not match</Text>
              </View>
            </View>
            <View>
              <Text style={styles.tos}>by logging in you are agreeing to our <Text>terms of use</Text></Text>
              <TouchableHighlight><Text style={styles.forgotPassword} onPress={this.showForgotPasswordBox}>forgot password?</Text></TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
});

export default Login;
