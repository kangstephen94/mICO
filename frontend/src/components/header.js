import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
    const { textStyle, headerStyle } = styles;
    return (
      <View style={headerStyle}>
        <Text style={textStyle}>{props.title}</Text>;
      </View>
    );
};

const styles = {
    headerStyle: {
      backgroundColor: '#26283f',
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
        color: 'white'
    }
};

export default Header;