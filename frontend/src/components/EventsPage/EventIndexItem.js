import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class EventIndexItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return ( <View style={[style.container]}>
        <View style={{flex: 2}}>
          <Text>Event Name:</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>Event Date</Text>
          <Text>Event Location</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>Event Description</Text>
        </View>
      </View>);
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
