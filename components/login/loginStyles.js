import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
fbButton: {
  display: block,
  position: relative,
  margin: auto,
  height: 40,
  padding: 2 11 2 10,
  border: 1px solid #264285,
  border-radius: 3px,
  background-color: #264285, /* todo fb button color */
  cursor: pointer,
  color: white,
  line-height: 20px,
  white-space: nowrap,
  text-align: center,
  vertical-align: baseline,
  -webkit-user-select: none,
  -moz-user-select: none,
  -ms-user-select: none,
  font-size: small
},

loginCloseBtn: {
  color: #B40101
},

orLoginEmail: {
  display: block,
  text-align: center,
  font-size: small
},

input: {
  color: inherit,
  font-size: small,
  margin-top: 10px
},

loginBtn: {
  background-color: #B40101,
  color: white,
  font-size: small,
  margin-top: 10px
},

tos: {
  font-size: small,
  color: #B40101,
  text-decoration: none,
  font-size: small,
  cursor: pointer
},

forgotPassword: {
  color: #B40101,
  text-decoration: none,
  font-size: small,
  cursor: pointer
},

invalidInput: {
  z-index: 2,
  right: 0,
  transform: translate(-20px, -30px),
  position: static,
  color: white,
  background-color: rgba(180, 1, 1, 0.85),
  font-size: x-small,
  padding: 5px,
  border-radius: 5px
},

hidden: {
  height: 0,
  width: 0
}

emailPassMatchError: {
  color: #B40101,
  font-size: small,
  margin-left: 10px
},

resetEmailSent: {
  font-size: small
},

forgotPasswordModal: {
  margin-top: 20%
},

vidSpinnerBg: {
  display: none,
  position: absolute,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background-color: rgba(255, 255, 255, 0.7),
  z-index: 3,
  color: white,
  border-radius: 5
},

circularG: {
  position: absolute,
  top: 50%,
  left: 50%
},

});
