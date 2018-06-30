import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default class EventIndexItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const { name, host, description, address, start_time, end_time, date, cost, image } = this.props.item;
    return ( <View style={[style.container]}>
        <View style={{flex: 2}}>
          <Text>Event Name:{ name }</Text>
          <Image source={{ uri:image }} style={{height: 25, width: 25}}></Image>
        </View>
        <View style={{flex: 1}}>
          <Text>Event Host: { host }</Text>
          <Text>Event Date: { date }</Text>
          <Text>Event Start Time: { start_time }</Text>
          <Text>Event End Time: { end_time }</Text>
          <Text>Event Location: { address }</Text>
          <Text>Event Cost: { cost }</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>Event Description: { description } </Text>
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
