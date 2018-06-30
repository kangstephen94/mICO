import React from 'react';
import { Text, View, StatusBar, TouchableOpacity } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Actions } from 'react-native-router-flux';

const Header = (props) => {
    const { textStyle, headerStyle } = styles;
    return (
      <View style={headerStyle}>
        <StatusBar barStyle="light-content"/>
        <Text style={textStyle}>{props.title}</Text>;
        <TouchableOpacity style={{position: 'absolute', top: 50, right: 30 }}onPress={() => Actions.search()}>
          <FontAwesome style={{fontSize: 20, color: 'white'}}>{Icons.search}</FontAwesome>
        </TouchableOpacity>
      </View>
    );
};

const styles = {
    headerStyle: {
      position: 'relative',
      backgroundColor: '#1D2437',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
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
        color: 'white',
        // width: 200
    }
};

export default Header;
