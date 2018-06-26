import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import Router from './Router';
import Header from './components/header';

const App = () => {
  // const store = createStore()
  return (
    <Provider>
      <Router />
    </Provider>
  );
};

export default App;