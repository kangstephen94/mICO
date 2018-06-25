import React from 'react';
import { AppRegistry, View } from 'react-native';
import { Header } from './src/components/header';
import IcoList from './src/components/IndexPage/IcoList';
import LoginForm from './src/components/LoginForm/LoginForm';


const App = () => (
        <View>
            <Header />
            <LoginForm />
            {/* <IcoList /> */}
        </View>
    );

AppRegistry.registerComponent('mICO', () => App);
