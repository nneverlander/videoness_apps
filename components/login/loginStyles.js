import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  fbButton: {
    position: 'relative',
    margin: 'auto',
    height: 40,
    padding: 2 11 2 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#264285',
    borderRadius: 3,
    backgroundColor: '#264285', /* todo fb button color */
    justifyContent: 'center',
    color: 'white'
  },
  loginCloseBtn: {
    color: '#B40101'
  },
  orLoginEmail: {
    justifyContent: 'center',
    fontSize: 20
  },
  input: {
    fontSize: 20,
    marginTop: 10
  },
  loginBtn: {
    backgroundColor: '#B40101',
    color: 'white',
    fontSize: 20,
    marginTop: 20
  },
  tos: {
    fontSize: 20,
    color: '#B40101'
  },
  forgotPassword: {
    color: '#B40101',
    fontSize: 20
  },
  invalidInput: {
    zIndex: 2,
    right: 0,
    color: 'white',
    backgroundColor: rgba(180, 1, 1, 0.85),
    fontSize: 15,
    padding: 5,
    borderRadius: 5
  },
  hidden: {
    height: 0,
    width: 0
  },
  emailPassMatchError: {
    color: '#B40101',
    fontSize: 15,
    marginLeft: 10
  },
  resetEmailSent: {
    fontSize: 20
  },
  forgotPasswordModal: {
    marginTop: 50
  },
  vidSpinnerBg: {
    height: 0,
    width: 0
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background-color: rgba(255, 255, 255, 0.7),
    zIndex: 3,
    color: 'white',
    borderRadius: 5
  },
  vidSpinner: {
    position: 'absolute',
    color: '#B40101',
    top: 50,
    left: 50
  }
});

module.exports = styles;
