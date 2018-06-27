import React from 'react';
import { View, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import Router from './Router';
import Header from './components/header';
import Footer from './components/Footer';

const App = () => {
  // const store = createStore()
  return (
    <Provider>
        <Router />
    </Provider>
  );
};

export default App;