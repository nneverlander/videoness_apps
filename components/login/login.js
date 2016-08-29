/**
 * Created by adi on 8/28/16.
 */
import React from 'react';
import fbApp from '../common/fbApp';
import CONSTANTS from '../common/constants';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

require('./loginStyles');

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
      resetEmailNotFound: false
    };
  },
  componentDidMount: function () {
    $("#loginModal").on('hidden.bs.modal', this.handleHidden);
  },
  componentWillUnmount: function () {
    $("#loginModal").off('hidden.bs.modal', this.handleHidden);
  },
  handleHidden() {
    this.setState({
      showResetEmailSent: false,
      showForgotPasswordBox: false,
      showLoginBox: true
    });
  },
  setResetEmail(event) {
    this.setState({
      resetEmail: event.currentTarget.value,
      invalidResetEmail: false,
      resetEmailNotFound: false
    });
  },
  setEmail(event) {
    this.setState({
      email: event.currentTarget.value,
      invalidEmail: false,
      emailPassMatch: true
    });
  },
  setPass(event) {
    this.setState({
      pass: event.currentTarget.value,
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
    $(".spinner-bg").show();
    firebase.auth().sendPasswordResetEmail(this.state.resetEmail).then(() => {
      $(".spinner-bg").hide();
      this.setState({
        showResetEmailSent: true,
        resetEmailNotFound: false
      });
    }, (error) => {
      $(".spinner-bg").hide();
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
    if (!this.state.invalidEmail) { // no need to check invalidPass since pass is gauranteed to be valid here
      $(".spinner-bg").show();
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass).then((result) => {
        $("#loginModal").modal("hide");
      }).catch((error) => {
        $(".spinner-bg").hide();
        var errorCode = error.code;
        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email') {
          this.setState({
            emailPassMatch: false
          });
        } else if (errorCode === 'auth/user-not-found') {
          firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).then((result) => {
            $(".spinner-bg").hide();
            $("#loginModal").modal("hide");
          }).catch((error) => {
            $(".spinner-bg").hide();
            console.error(error);
          });
        } else if (error.code === 'auth/account-exists-with-different-credential') {
          $(".spinner-bg").hide();
          swal({
            title: "", text: error.message + " Email used is: <span style='color:#B40101'>" + error.email + "</span>",
            html: true
          });
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
      });
    }
  },
  loginWithFb() {
    var provider = new firebase.auth.FacebookAuthProvider();
    // provider.addScope('user_birthday'); todo more scopes like birthday
    firebase.auth().signInWithPopup(provider).then((result) => {
      $("#loginModal").modal("hide");
    }).catch((error) => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        swal({
          title: "", text: error.message + " Email used is: <span style='color:#B40101'>" + error.email + "</span>",
          html: true
        });
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
            <View id="circularG">
              <View id="circularG_1" style={styles.circularG}></View>
              <View id="circularG_2" style={styles.circularG}></View>
              <View id="circularG_3" style={styles.circularG}></View>
              <View id="circularG_4" style={styles.circularG}></View>
              <View id="circularG_5" style={styles.circularG}></View>
              <View id="circularG_6" style={styles.circularG}></View>
              <View id="circularG_7" style={styles.circularG}></View>
              <View id="circularG_8" style={styles.circularG}></View>
            </View>
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
                    <Text onClick={this.sendPasswordResetEmail} style={styles.loginBtn}>send again</Text>
                  <Text onClick={this.showLoginBox} style={styles.loginBtn}>login</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View role="form" style={this.state.showResetEmailSent ? styles.hidden : ""}>
                <TextInput type="text" onChange={this.setResetEmail} value={this.state.resetEmail}
                       style={styles.input} ref={(v) => this.resetEmail = v} placeholder="email"/>
                     <Text style={this.state.invalidResetEmail ? styles.invalidInput : styles.hidden}>invalid email</Text>
                <Text
                  style={this.state.resetEmailNotFound ? styles.invalidInput : styles.hidden}>email not found</Text>
                <TouchableHighlight>
                  <View>
                    <Text onClick={this.validateResetEmail} style={styles.loginBtn}>reset password</Text>
                  <Text onClick={this.showLoginBox} style={styles.loginBtn}>cancel</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
          <View style={this.state.showLoginBox ? "" : styles.hidden}>
            <TouchableHighlight>
              <View>
                <Text style={styles.loginCloseBtn}>&times;</Text>
              <Text onClick={this.loginWithFb} style={styles.fbButton}>continue with facebook</Text>
              </View>
            </TouchableHighlight>
            <View>
              <Text style={styles.orLoginEmail}>or login with email and password</Text>
              <View role="form">
                <TextInput type="text" onChange={this.setEmail} value={this.state.email}
                       style={styles.input} ref={(v) => this.email = v} placeholder="email"/>
                     <Text style={this.state.invalidEmail ? styles.invalidInput : styles.hidden}>invalid email</Text>
                <TextInput type="password" onChange={this.setPass} value={this.state.pass}
                       style={styles.input} ref={(v) => this.pass = v}
                       placeholder="password (atleast 7 characters)"/>
                     <Text style={this.state.invalidPass ? styles.invalidInput : styles.hidden}>password has fewer than 7 chars</Text>
                <TouchableHighlight>
                  <Text onClick={this.validate} style={styles.loginBtn}>login</Text>
                </TouchableHighlight>
                <Text style={this.state.emailPassMatch ? styles.hidden : styles.emailPassMatchError}>email and password do not match</Text>
              </View>
            </View>
            <View>
              <Text style={styles.tos}>by logging in you are agreeing to our <TouchableHighlight><Text target="_blank" href="tos.html">terms of use</Text></TouchableHighlight></Text>
            <TouchableHighlight><Text style={styles.forgotPassword} onClick={this.showForgotPasswordBox}>forgot password?</Text></TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
});

module.exports = Login;
