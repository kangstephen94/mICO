import React, { Component } from 'react';
import { View, Text, Image , Linking, TouchableHighlight, TouchableOpacity} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import axios from 'axios';
// import { Action } from 'react-native-router-flux';


export default class IcoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null, 
      counter: (new Date(this.props.item.end_time) - new Date()) / 1000
    };

    this.tick = this.tick.bind(this);
  }
  
  componentDidMount() {
    const timer = setInterval(this.tick, 1000);
    this.setState({ timer });
  }
  
  componentWillUnmount() {
    clearInterval(this.state.timer);
    console.log("Detail unmounted");
  }
  
    handleFavorite() {
      const { item, user, receiveSession } = this.props;
      axios({
        url: 'http://localhost:5000/api/favorites/add',
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
          'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
        },
        data: {
          item,
          user
        }
      }).then(function (response) {
        receiveSession({ user: response.data });
      });

    }
  tick() {
    this.setState({
      counter: this.state.counter - 1
    });
  }

  render() {
    console.log("tick");
    const {item} = this.props;
    const timer = new Date(null);
    timer.setSeconds(this.state.counter);
    const timeLeft = timer.toISOString().substr(11,8);
    const daysLeft  = Math.floor(timer / (3600000 * 24));
    const { h2, greenBorder, imageStyle, sectionStyle, inlineView, infoStyle, 
            icoHeader, buttonStyle} = styles;
    return (
      <View style={sectionStyle} >
        <View style={icoHeader}>
          <Text style={{fontWeight: 'bold', fontSize: 24  }}>{item.name}</Text>
          <Image source={{ uri: item.image }} style={imageStyle}/>
        </View>
        <View style={inlineView}>
          <View>
            <Text style={{color: 'grey'}}>End Date:</Text>
            <Text>{item.end_time}</Text>
          </View>
          <View>
            <Text style={{color: 'grey'}}>Time Left:</Text>
            <View style={greenBorder}>
              <Text style={{color: '#4CAF50', fontWeight: 'bold'}}>
                {`${daysLeft}`}d, {timeLeft}
              </Text>
            </View>
          </View>
        </View>
        <View style={inlineView}>
          <TouchableOpacity onPress={this.handleFavorite.bind(this)} style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{margin: 10, fontSize: 25}}>
              <FontAwesome>{Icons.starO}</FontAwesome>
            </Text>
          </TouchableOpacity>
          <Text style={{margin: 10, fontSize: 25}}>
            <FontAwesome>{Icons.share}</FontAwesome>
          </Text>
          <TouchableHighlight style={buttonStyle} onPress={() => Linking.openURL(item.icowatchlist_url)}>
            <Text style={{color: 'white'}}>Website</Text>
          </TouchableHighlight>
        </View>
        <View style={infoStyle}>
          <Text style={h2} >Brief Information</Text>
          <Text>{item.website_link}</Text>
          <Text>Start Date: {item.start_time}</Text>
        </View>
        <View style={infoStyle}> 
          <Text style={h2}>Full Description</Text>
          <Text>{item.description}</Text>          
        </View>
     </View>);
  }
}


const styles = {
  sectionStyle: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 5,
    flex: 1
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  imageStyle: {
    height: 80,
    width: 80,
    resizeMode: 'contain'
    // flex: 1
  },
  inlineView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: 340,
    padding: 10
  },
  infoStyle: {
    padding: 10,
    width: 350
  },
  buttonStyle: {
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    padding: 8,
    color: 'white',
    fontWeight: 'bold'
  },
  greenBorder: {
    borderColor: '#4CAF50',
    borderWidth: 0.8,
    padding: 2
  },
  icoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
};