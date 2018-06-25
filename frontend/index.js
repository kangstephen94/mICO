import React from 'react';
import { Text, AppRegistry } from 'react-native';
import { Header } from './src/components/header';

const App = () => (
        <Header />
    );

AppRegistry.registerComponent('mICO', () => App);