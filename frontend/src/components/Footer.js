import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Button from './common/Button';

class Footer extends Component {

  state = {
    currentScene: ['login']
  };

  handleEvents() {
    // console.log(Actions.state.routes);
    // const length = Actions.state.routes.length;
    // if (!Actions.state.routes[length - 2]) {
    //   Actions.events();
    //   return;
    // }
    // if (Actions.state.routes[length - 2].routeName === 'events') {
    //   Actions.pop();
    // } else {
      // debugger;
    const length = Actions.state.routes.length;
    console.log(Actions.state.routes[length -1]);
    if (Actions.state.routes[length - 1].routeName === 'icoDetail' || 
      Actions.state.routes[length - 1].routeName === 'login') {
        console.log("it was a detail or favorite page before");
        Actions.pop();
        Actions.events();
    } else {
      Actions.events();
    }
    this.setState({ currentScene: this.state.currentScene.concat(['events']) });
    // }
  }

  handleFavorites() {
    this.setState({ currentScene: this.state.currentScene.concat(['login']) });
    const length = Actions.state.routes.length;
    if (Actions.state.routes[length - 1].routeName === 'icoDetail' ||
    Actions.state.routes[length - 1].routeName === 'login') {
      Actions.pop();
      Actions.login();
    } else {
      Actions.login();
    }
  }

  handleUpcoming() {
    const length = Actions.state.routes.length;
    console.log(Actions.state.routes[length-1].routeName);
    if (!Actions.state.routes[length - 2]) {
      this.setState({ currentScene: this.state.currentScene.concat(['icoList']) });
      if (Actions.state.routes[length - 1].routeName === 'icoDetail' ||
        Actions.state.routes[length - 1].routeName === 'login') {
        console.log("popped off favorites or detail");
        Actions.pop();
        Actions.icoList();
      } else {
        Actions.icoList();
      }
      return;
    }
    if (Actions.state.routes[length - 2].routeName === 'icoList') {
      Actions.pop();
      const lengthOf = this.state.currentScene.length;
      this.setState({ currentScene: this.state.currentScene.slice(0, lengthOf - 1) });
    } else {
      if (Actions.state.routes[length - 1].routeName === 'icoDetail' ||
        Actions.state.routes[length - 1].routeName === 'login') {
        console.log("popped off favorites or detail");
        Actions.pop();
        Actions.icoList();
      } else {
        Actions.icoList();
      }
      this.setState({ currentScene: this.state.currentScene.concat(['icoList']) });
    }
  }

  render() {
    const { 
      textStyle, 
      footerStyle, 
      highlightedText, 
      nonHighlightedText,
      highlightedIcon, 
      nonHighlightedIcon } = styles;
    const length = this.state.currentScene.length;

    const upIconClass = (this.state.currentScene[length - 1] === 'icoList' 
      || this.state.currentScene[length - 1] === 'icoDetail') ? highlightedIcon : nonHighlightedIcon;
    const upTextClass = (this.state.currentScene[length - 1] === 'icoList' 
      || this.state.currentScene[length - 1] === 'icoDetail') ? highlightedText : nonHighlightedText;
    
    

    const favIconClass = this.state.currentScene[length - 1] === 'login' ? highlightedIcon : nonHighlightedIcon;
    const favTextClass = this.state.currentScene[length - 1] === 'login' ? highlightedText : nonHighlightedText;

     const eventIconClass = this.state.currentScene[length - 1] === 'events' ? highlightedIcon : nonHighlightedIcon;
     const eventTextClass = this.state.currentScene[length - 1] === 'events' ? highlightedText : nonHighlightedText;


    return (
      <View style={footerStyle}>
        <TouchableOpacity onPress={this.handleUpcoming.bind(this)}  style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={upIconClass}>
            <FontAwesome>{Icons.calendarO}</FontAwesome>
          </Text>
          <Text style={upTextClass}>Upcoming</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{margin: 10, fontSize: 25}}>
            <FontAwesome>{Icons.clockO}</FontAwesome>
          </Text>
          <Text style={{marginTop: -5, fontSize: 10}}>Ongoing</Text>
        </TouchableOpacity>
      
        <TouchableOpacity onPress={this.handleEvents.bind(this)} style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={eventIconClass}>
            <FontAwesome>{Icons.calendarCheckO}</FontAwesome>
          </Text>
          <Text style={eventTextClass}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.handleFavorites.bind(this)} style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={favIconClass}>
            <FontAwesome>{Icons.star}</FontAwesome>
          </Text>
          <Text style={favTextClass}>Favorite</Text>
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
  },
  nonHighlightedText: {
    marginTop: -5,
    fontSize: 10,
    color: 'black'
  },
  highlightedText: {
    color: '#007aff',
    marginTop: -5,
    fontSize: 10,
  }

};

export default Footer;
