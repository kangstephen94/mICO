import React from 'react';
import { View, Text, Image, TouchableOpacity  } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import Footer from '../Footer';
import EventsIndex from '../EventsPage/EventsIndex';
import axios from 'axios';

// const keys = require('../../../../config/keys');
// const eventbriteKey = keys.eventbriteKey;
const eventbriteKey = '27WXVOSA56SDPTLM6HVB';

export default class MyMap extends React.Component {
    state = {
        latitude: 37.3382,
        longitude: -121.8863,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
        loading: true
    }
    //  componentDidMount() {
    //    this.props.retrieveEvents().then(() => (this.setState(loading: false)));
    //  }
    marker = {
      latitude: 37.794657,
      longitude: -122.422326
    }
    mapStyle = [
      {
        "elementType": "geometry",
        "stylers": [{
          "color": "#1d2c4d"
        }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#8ec3b9"
        }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#1a3646"
        }]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#4b6878"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#64779e"
        }]
      },
      {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#4b6878"
        }]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#334e87"
        }]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{
          "color": "#023e58"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#283d6a"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#6f9ba5"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#1d2c4d"
        }]
      },
      {
        "featureType": "poi.business",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#023e58"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#3C7680"
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "color": "#304a7d"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#98a5be"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#1d2c4d"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#2c6675"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#255763"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#b0d5ce"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#023e58"
        }]
      },
      {
        "featureType": "transit",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#98a5be"
        }]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#1d2c4d"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#283d6a"
        }]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
          "color": "#3a4762"
        }]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#0e1626"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#4e6d70"
        }]
      }
    ]
    
    componentDidMount() {
      console.log("mounted");
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("wokeeey");
          console.log(position);
          const url = `https://www.eventbriteapi.com/v3/events/search/?q=cryptocurrency&sort_by=-date&location.within=10mi&location.latitude=${position.coords.latitude}&location.longitude=${position.coords.longitude}&expand=venue,organizer&token=${eventbriteKey}`;
          axios.get(url).then(response => {
            this.props.receiveEvents(response.data.events);
            this.setState({
              loading: false
            });
          });
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => this.setState({
          error: error.message
        }), {
          enableHighAccuracy: false,
          timeout: 200000,
          maximumAge: 1000
        },
      );

      // this.props.retrieveEvents().then( ()=> (this.setState({loading: false})));
    }

    render() {
      const {events} = this.props;
      if (this.state.loading) {
        return null;
      }
      let visited_coordinates = [] 

        return (
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  initialRegion={this.state}
                  showsUserLocation={true}
                  customMapStyle={this.mapStyle}
                  followsUserLocation={true}
                >
                  {events.map( (event, index) => {
                    event.venue.longitude = visited_coordinates.includes(event.venue.longitude) ? event.venue.longitude + 1 : event.venue.longitude
                    visited_coordinates.push(event.venue.longitude); 
                    const img = event.logo ? <Image source={{ uri: event.logo.url }} style={{height: 100, width: 200, resizeMode: 'contain'}}></Image> : null ;
                    return (
                      <Marker
                        key={index}
                        style={{position: 'relative'}}
                        image={require('../../../assets/images/map-marker-2.png')}
                        coordinate={{latitude: event.venue.latitude, longitude: event.venue.longitude}}
                        onPress={() => this.props.openDetail([event.venue.latitude, event.venue.longitude])}>
                        {/* <Text style={(index + 1) > 9 ? styles.markerGreatText : 
                          styles.markerText}>{index + 1}</Text> */}
                        {/* <Callout onPress={() => this.props.openDetail(index)}> */}
                        {/* <Callout onPress={() => this.props.openDetail([event.venue.latitude, event.venue.longitude])}> */}

                          {/* <View style={{width: 200, height: 200, paddingTop: 5}}> */}
                            {/* <TouchableOpacity > */}
                              {/* {img} */}
                              {/* <Text style={{fontWeight: 'bold', fontSize: 13, marginTop: 6}}>{`${index+1}. ${event.name.text}`}</Text> */}
                              {/* <Text style={{fontSize: 12, marginTop: 5}}><Text style={{fontWeight: 'bold'}}>Location: </Text>{event.venue.address.localized_address_display}</Text> */}
                            {/* </TouchableOpacity> */}
                          {/* </View> */}
                        {/* </Callout> */}
                      </Marker>
                    );
                  })
                  }
                </MapView>
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
    },
    markerText: {
      position: 'absolute',
      left: 20,
      top: 7,
      fontSize: 15,
      color: 'white',
      fontWeight: 'bold'
    },
    markerGreatText: {
      position: 'absolute',
      left: 16,
      top: 7,
      fontSize: 15,
      color: 'white',
      fontWeight: 'bold'
    }
};


// <View style={styles.container}>
// {/* <Image source={require('./map-marker.png')} /> */}

//   <MapView
//     provider={PROVIDER_GOOGLE}
//     style={styles.map}
//     initialRegion={this.state}
//     customMapStyle={this.mapStyle}
//     // showsUserLocation={true}
//     // followsUserLocation={true}
//     // showsMyLocationButton={true}
//   >
//       <Marker
//         image={require('../../../assets/images/map-marker-2.png')}
//         title="App Academy" coordinate={this.state} />
//       <Callout />
//   </MapView>

// <View style={{flex: 1}}>
//   <EventsIndex />
// </View>

// </View>





//events markers
