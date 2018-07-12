import React from 'react';
import { View } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginFormContainer from './components/LoginForm/LoginFormContainer';
import IcoList from './components/IndexPage/IcoList';
import IcoDetailContainer from './components/IndexPage/IcoDetailContainer';
import EventsIndexContainer from './components/EventsPage/EventsIndexContainer';
import Header from './components/header';
import SearchBarContainer from './components/Search/SearchBarContainer';
import SearchListContainer from './components/Search/SearchListContainer';
import Footer from './components/Footer';
import FooterContainer from './components/FooterContainer';
import MyMap from './components/Map/Map';


const RouterComponent = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 8}}>
        <Router>
          <Scene key="root">
            <Scene navBar={() => <Header title="Favorites" />} key="login" component={LoginFormContainer} gestureEnabled={false} panHandlers={null} title="Favorites" />
            <Scene navBar={() => <Header title="Upcoming ICOs" />} key="icoList" component={IcoList} gestureEnabled={false} panHandlers={null} title="Upcoming ICOs" initial={true} />
            <Scene navBar={() => <Header title="Ongoing ICOs" />} key="ongoingIcoList" component={IcoList} panHandlers={null} gestureEnabled={false} title="Ongoing ICOs"/>

            <Scene navigationBarStyle={styles.headerStyle} titleStyle={{color: 'white'}} key="icoDetail" panHandlers={null} gestureEnabled={false} component={IcoDetailContainer} title="ICO" />
            <Scene navBar={() => <Header title="Events" />} key="events" component={EventsIndexContainer} panHandlers={null} gestureEnabled={false} title="Events"  />
            <Scene navBar={() => <SearchBarContainer />} key="search" component={SearchListContainer} panHandlers={null} title="Search" gestureEnabled={false} showNavigationBar={false}/>
            {/* <Scene key="events" component={EventsIndex} title="Events" /> */}
          </Scene>
        </Router>
      </View>
      <View style={{flex: 1}}>
        <FooterContainer />
      </View>
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
