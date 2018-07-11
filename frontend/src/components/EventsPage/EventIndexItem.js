import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback, Linking, TouchableHighlight} from 'react-native';
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
          <View style={{flex: 2}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{ `${this.props.indexHead}${name.text}`}</Text>
            <Image source={{ uri: logo.url }} style={{height: 180, width: '100%'}}></Image>
          </View>
          <View style={{flex: 1}}>
            <Text><Text style={{fontWeight: 'bold'}}>Event Host: </Text>{ organizer.name }</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Event Start: </Text>{ start.local }</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Event End: </Text>{ end.local }</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Event Location: </Text>{ venue.address.localized_address_display }</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Free: </Text>{ is_free ? "Yes" : "No" }</Text>
            <TouchableHighlight style={style.buttonStyle} onPress={() => Linking.openURL(url)}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Tickets</Text>
            </TouchableHighlight>
          </View>
          <View style={{flex: 1}}>
            <Text><Text style={{fontWeight: 'bold', paddingBottom: 10 }}>Event Description: </Text>{ description.text } </Text>
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
    padding: 10,
    backgroundColor: '#eee',
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonStyle: {
    backgroundColor: '#39314B', //'#FF5FDB',
    alignItems: 'center',
    padding: 8,
    width: 100,
    // flex: 0.3,
    // marginRight: 10,
    // marginLeft: -20,
    // marginLeft: -60,
    borderRadius: 3
  }
});
