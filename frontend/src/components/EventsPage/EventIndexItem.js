import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback, Linking, TouchableHighlight, ScrollView} from 'react-native';
import Section from '../common/Section';
import axios from 'axios';


export default class EventIndexItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, description, address, organizer, start, end, url, is_free, logo, venue } = this.props.item;
    return (
      <TouchableWithoutFeedback>
        <View style={style.containerStyle}>
          <View style={{flex: 2, marginBottom: 7}}>
            <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 10}}>{ `${this.props.indexHead}${name.text}`}</Text>
            <Image source={{ uri: logo.url }} style={{alignSelf: 'center', height: 170, width: '100%'}}></Image>
          </View>
          <View style={{flex: 1}}>
            <Text><Text style={{fontWeight: 'bold', fontSize: 15}}>Event Host: </Text>{ organizer.name }</Text>
            <Text><Text style={{fontWeight: 'bold', fontSize: 15}}>Event Start: </Text>{ start.local }</Text>
            <Text><Text style={{fontWeight: 'bold', fontSize: 15}}>Event End: </Text>{ end.local }</Text>
            <Text><Text style={{fontWeight: 'bold', fontSize: 15}}>Event Location: </Text>{ venue.address.localized_address_display }</Text>
            <Text><Text style={{fontWeight: 'bold', fontSize: 15}}>Free: </Text>{ is_free ? "Yes" : "No" }</Text>
            <TouchableHighlight style={style.buttonStyle} onPress={() => Linking.openURL(url)}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Tickets and More Info</Text>
            </TouchableHighlight>
          </View>
          <View style={{flex: 1}}>
            <Text><Text style={{fontWeight: 'bold', paddingBottom: 10, fontSize: 15 }}>Brief Description: </Text>{ description.text.slice(0,600) + '...' } </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>);
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  containerStyle: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#39314B", //'#ddd',
    borderBottomWidth: 0,
    shadowColor: '#1A2334',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    padding: 15,
    backgroundColor: '#eee',
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonStyle: {
    alignSelf: 'center',
    backgroundColor: '#39314B', //'#FF5FDB',
    alignItems: 'center',
    padding: 8,
    width: 180,
    marginBottom: 8,
    // flex: 0.3,
    // marginRight: 10,
    // marginLeft: -20,
    // marginLeft: -60,
    borderRadius: 3
  }
});
