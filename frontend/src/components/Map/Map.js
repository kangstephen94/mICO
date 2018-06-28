import React from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import Footer from '../Footer';

export default class MyMap extends React.Component {
    state = {
        latitude: 37.798778,
        longitude: -122.401376,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002
    }
    
    render() {
        return (
          <View style={styles.container}>
              <MapView style={styles.map} initialRegion={this.state}>
                  <MapView.Marker title="1" coordinate={this.state} />
              </MapView>
          </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 30,
        fontWeight: '700',
        color: '#59656C',
        marginBottom: 10,
    },
    map: {
        width: '100%',
        height: 300,
        flex: 1
    }
};
