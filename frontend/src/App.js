import React from 'react';
import { Provider } from 'react-redux';
import Router from './Router';
import configureStore from '../store/store';


const App = () => {
  const preloadedState = {};
  const store = configureStore(preloadedState);
  return (
    <Provider store={store}>
        <Router />
    </Provider>
  );
};

export default App;
