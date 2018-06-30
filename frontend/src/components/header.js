import React from 'react';
import { Text, View, StatusBar } from 'react-native';

const Header = (props) => {
    const { textStyle, headerStyle } = styles;
    return (
      <View style={headerStyle}>
        <StatusBar barStyle="light-content"/>
        <Text style={textStyle}>{props.title}</Text>;
      </View>
    );
};

const styles = {
    headerStyle: {
      backgroundColor: '#1D2437',
      justifyContent: 'center',
      alignItems: 'center',
      height: 87,
      paddingTop: 35,

      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.9,
      elevation: 2,
      position: 'relative'
    },
    textStyle: {
        fontSize: 20,
        color: '#ff92e0' //'white'
    }
};

export default Header;
