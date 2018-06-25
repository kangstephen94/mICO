import React from 'react';
import { Text } from 'react-native';

export const Header = () => {
    const { textStyle } = styles;
    return <Text style={textStyle}>Upcoming ICOS</Text>;
};

const styles = {
    textStyle: {
        fontSize: 50
    }
};
