import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { connect } from 'dva/mobile';

class SplashScreen extends Component {
  componentWillMount() {
    setTimeout(() => {
      this.props.user ? 
        Actions.main({ type: 'reset' })
        :
        Actions.auth({ type: 'reset' });
    }, 3000);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ fontSize: 20, }}>React Native Dva Manager</Text>
        <Image style={{ width: 500, height: 500, resizeMode : 'contain'}} source={{uri: 'http://media.istockphoto.com/photos/leader-hold-meeting-with-his-team-picture-id504572294?k=6&m=504572294&s=170667a&w=0&h=2EnfgMYUOV-QwBjMkSW2GeBY7MUzVWyMkRrr1232Bxs='}}></Image>
      </View>
    );
  }
};

const mapStateToProps = ({ auth }) => {
  const { autoLogin, user } = auth;
  console.log(auth);
  return {
    autoLogin,
    user,
  };
}

export default connect(mapStateToProps)(SplashScreen);
