import React from 'react';
import { Text, View } from 'react-native';

export const Header = () => {
    const { textStyle, headerStyle } = styles;
    return (
      <View style={headerStyle}>
        <Text style={textStyle}>Upcoming ICOs</Text>;
      </View>
    );
};

const styles = {
    headerStyle: {
      backgroundColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      paddingTop: 15,
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
        fontSize: 20
    }
};
