import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Button from './common/Button';

class Footer extends Component {

  handleFavorites() {
    Actions.login();
  }

  render() {
    const { textStyle, footerStyle, highlightedIcon, nonHighlightedIcon } = styles;
    const upIconClass = Actions.currentScene === "icoList" ? highlightedIcon : nonHighlightedIcon;
    return (
      <View style={footerStyle}>
        <TouchableOpacity style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={upIconClass}>
            <FontAwesome>{Icons.calendarO}</FontAwesome>
          </Text>
          <Text style={{marginTop: -5, fontSize: 10, color: '#007aff'}}>Upcoming</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{margin: 10, fontSize: 25}}>
            <FontAwesome>{Icons.clockO}</FontAwesome>
          </Text>
          <Text style={{marginTop: -5, fontSize: 10}}>Ongoing</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{margin: 10, fontSize: 25}}>
            <FontAwesome>{Icons.calendarCheckO}</FontAwesome>
          </Text>
          <Text style={{marginTop: -5, fontSize: 10}}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.handleFavorites.bind(this)} style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{margin: 10, fontSize: 25}}>
            <FontAwesome>{Icons.star}</FontAwesome>
          </Text>
          <Text style={{marginTop: -5, fontSize: 10}}>Favorite</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  footerStyle: {
    backgroundColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // position: '',
    bottom: 0,
    // alignItems: 'center',
    height: 100,
    paddingTop: 10,
  },
  textStyle: {
    fontSize: 20
  }, 
  nonHighlightedIcon: {
    margin: 10,
    fontSize: 25,
    color: 'black'
  },
  highlightedIcon: {
    margin: 10,
    fontSize: 25,
    color: '#007aff'
  }

};

export default Footer;
