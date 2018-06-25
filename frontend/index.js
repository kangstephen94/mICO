import React from 'react';
import { AppRegistry, View } from 'react-native';
import { Header } from './src/components/header';
import IcoList from './src/components/IndexPage/IcoList';

const App = () => (
        <View>
            <Header />
            <IcoList />
        </View>
    );

AppRegistry.registerComponent('mICO', () => App);
