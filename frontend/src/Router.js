import React from 'react';
import { View } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm/LoginForm';
import IcoList from './components/IndexPage/IcoList';
import IcoDetail from './components/IndexPage/IcoDetail';
import EventsIndex from './components/EventsPage/EventsIndex';
import Header from './components/header';
import Footer from './components/Footer';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene navBar={()=> <Header title="Favorites" />} key="login" component={LoginForm} title="Favorites" />
        <Scene navBar={() => <Header title="Upcoming Icos" />} key="icoList" component={IcoList} title="Upcoming ICOs" initial={true}/>
        <Scene navigationBarStyle={styles.headerStyle} titleStyle={{color: 'white'}} key="icoDetail" component={IcoDetail} title="ICO" />
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
    },
    shadowOpacity: 0.9,
    elevation: 2,
    position: 'relative'
  }
};


export default RouterComponent;


