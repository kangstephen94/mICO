import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm/LoginForm';
import IcoList from './components/IndexPage/IcoList';
import Header from './components/header';

const RouterComponent = () => {
  return (
    <Router navigationBarStyle={styles.headerStyle} titleStyle={{color: 'white'}}>
      <Scene key="root">
        <Scene key="login" component={LoginForm} title="Login" />
        <Scene key="icoList" component={IcoList} title="Upcoming ICOs" initial={true}/>
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


