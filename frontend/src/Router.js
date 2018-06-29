import React from 'react';
import { View } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginFormContainer from './components/LoginForm/LoginFormContainer';
import IcoList from './components/IndexPage/IcoList';
import IcoDetailContainer from './components/IndexPage/IcoDetailContainer';
import EventsIndex from './components/EventsPage/EventsIndex';
import Header from './components/header';
import SearchBarContainer from './components/Search/SearchBarContainer';
import SearchListContainer from './components/Search/SearchListContainer';
import Footer from './components/Footer';
import MyMap from './components/Map/Map';


const RouterComponent = () => {
  return (
    <View style={{flex: 1}}>
      <Router>
        <Scene key="root">
          <Scene navBar={() => <Header title="Favorites" />} key="login" component={LoginFormContainer} title="Favorites" />
          <Scene navBar={() => <Header title="Upcoming Icos" />} key="icoList" component={IcoList} title="Upcoming ICOs" />
          <Scene navigationBarStyle={styles.headerStyle} titleStyle={{color: 'white'}} key="icoDetail" component={IcoDetailContainer} title="ICO" />
          <Scene navBar={() => <Header title="Events" />} key="events" component={EventsIndex} title="Events" />
          <Scene navBar={() => <SearchBarContainer />} key="search" component={SearchListContainer} title="Search" initial={true} showNavigationBar={false}/>
          {/* <Scene key="events" component={EventsIndex} title="Events" /> */}
        </Scene> 
      </Router>
      <Footer />
    </View>
  );
};

const styles = {
  headerStyle: {
    backgroundColor: '#1e2537',
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


