import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Section from '../common/Section';

export default class EventIndexItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const { name, host, description, address, start_time, end_time, date, cost, image } = this.props.item;
    return ( 
      <View style={style.containerStyle}>
        <View style={{flex: 2}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{ `${this.props.index+1}.  ${name}`}</Text>
          <Image source={{ uri: image }} style={{height: 180, width: '100%'}}></Image>
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
  containerStyle: {
    borderWidth: 1,
    borderRadius: 5,
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
    backgroundColor: '#eee'
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
