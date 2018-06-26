import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Button from './common/Button';

class Footer extends Component {

  render() {
    const { textStyle, footerStyle } = styles;
    return (
      <View style={footerStyle}>
        <TouchableHighlight>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{margin: 10, fontSize: 25}}>
            <FontAwesome>{Icons.calendarO}</FontAwesome>
          </Text>
          <Text style={{marginTop: -5, fontSize: 10}}>Upcoming</Text>
        </View>
        </TouchableHighlight>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{margin: 10, fontSize: 25}}>
            <FontAwesome>{Icons.clockO}</FontAwesome>
          </Text>
          <Text style={{marginTop: -5, fontSize: 10}}>Ongoing</Text>
        </View>

        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{margin: 10, fontSize: 25}}>
            <FontAwesome>{Icons.calendarCheckO}</FontAwesome>
          </Text>
          <Text style={{marginTop: -5, fontSize: 10}}>Past</Text>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{margin: 10, fontSize: 25}}>
            <FontAwesome>{Icons.star}</FontAwesome>
          </Text>
          <Text style={{marginTop: -5, fontSize: 10}}>Favorite</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  footerStyle: {
    backgroundColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center',
    height: 100,
    paddingTop: 10,
  },
  textStyle: {
    fontSize: 20
  }
};

export default Footer;
