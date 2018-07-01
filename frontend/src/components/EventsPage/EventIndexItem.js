import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Section from '../common/Section';

export default class EventIndexItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, host, description, address, start_time, end_time, date, cost, image } = this.props.item;
    return (
      <TouchableWithoutFeedback>
        <View style={style.containerStyle}>
          <View style={{flex: 2}}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>{ `${this.props.index+1}.  ${name}`}</Text>
            <Image source={{ uri: image }} style={{ height: 180, width: '100%', marginBottom: 10 }}></Image>
          </View>
          <View style={{flex: 1}}>
            <Text><Text style={{fontWeight: 'bold'}}>Event Host: </Text>{ host }</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Event Date: </Text>{ date }</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Event Start Time: </Text>{ start_time }</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Event End Time: </Text>{ end_time }</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Event Location: </Text>{ address }</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Event Cost: </Text>{ cost }</Text>
          </View>
          <View style={{flex: 1}}>
            <Text><Text style={{fontWeight: 'bold', paddingBottom: 10 }}>Event Description: </Text>{ description } </Text>
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
  }
});
