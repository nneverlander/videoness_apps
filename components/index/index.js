/**
 * Created by adi on 8/30/16.
 */
import React from 'react';
import Login from '../login/login';
import Main from '../main/main';
import fbApp from '../common/fbApp';
import {View} from 'react-native';

var Index = React.createClass({
  getInitialState() {
    return {
      isLoggedIn: false
    };
  },
  componentDidMount() {
    this.initApp();
  },
  initApp() {
    fbApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({isLoggedIn: true});
        var name = user.displayName;
        var email = user.email;
        var uid = user.uid;
        var photoUrl = user.photoURL;
        fbApp.database().ref(CONSTANTS.USER_PROFILE_REF + '/' + uid + '/email').once('value', ((snapshot) => {
          if (snapshot.val() == null) { //user profile doesn't exist
            fbApp.database().ref(CONSTANTS.USER_PROFILE_REF + '/'  + uid).set({"name": name, "email": email, "photoUrl": photoUrl});
          }
        }));
      }
    });
  },
  render() {
    if (this.state.isLoggedIn) {
        return (
          <View>
            <Main/>
          </View>
        );
    }
    return (
      <View>
        <Login/>
      </View>
    );
  }
});

export default Index;
