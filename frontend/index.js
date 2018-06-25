import React from 'react';
import { AppRegistry, View } from 'react-native';
import { Header } from './src/components/header';
import Ico from './src/components/ico';

const App = () => (
        <View>
            <Header />
            <Ico />
        </View>
    );

AppRegistry.registerComponent('mICO', () => App);
