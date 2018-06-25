import React from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';

class Ico extends React.Component {
    state = {};

    componentWillMount() {
        axios.get('https://api.icowatchlist.com/public/v1/live')
            .then(data => console.log(data.data.ico.live));
    }

    render() {
        return (
            <View>
                <Text>ICO # 1</Text>
            </View>
        );
    }
}

export default Ico;
