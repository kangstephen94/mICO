import React, { Component } from 'react';
import { View, Linking } from 'react-native';
import Button from '../common/Button';
import axios from 'axios';

class LoginForm extends Component {
  

  onButtonPress() {
    // axios.get('https://powerful-mesa-68596.herokuapp.com/auth/google');
    Linking.openURL('https://powerful-mesa-68596.herokuapp.com/auth/google');
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Button onPress={this.onButtonPress.bind(this)}>
          Login with Google
        </Button>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginTop: 50
  }
};

export default LoginForm;
