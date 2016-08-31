/**
 * Created by adi on 8/30/16.
 */
import React from 'react-native';
import Login from '../login/login';
import Main from '../main/main';
import fbApp from '../common/fbApp';

var Index = React.createClass({
  getInitialState() {
    isLoggedIn: false
  },
  componentDidMount() {
    initApp();
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
            <Login/>
          </View>
        );
    }
    return (
      <View>
        <Main/>
      </View>
    );
  }
});

module.exports = Index;
