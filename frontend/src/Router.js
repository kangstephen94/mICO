import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm/LoginForm';
import Header from './components/header';

const RouterComponent = () => {
  return (
    <Router navigationBarStyle={styles.headerStyle} titleStyle={{color: 'white'}}>
      <Scene>
        <Scene key="login" component={LoginForm} title="Login" />
      </Scene>
    </Router>
  );
};

const styles = {
  headerStyle: {
    backgroundColor: '#26283f',
    paddingBottom: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    }
  }
};


export default RouterComponent;


