import React, { Component } from 'react';
import { WebView, ScrollView, View, Text, Image , Linking, TouchableHighlight, TouchableOpacity} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Spinner from '../common/Spinner';
import axios from 'axios';




export default class IcoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      isLoading: true,
      counter: 0
    };

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    const {item} = this.props;
    axios.get(`http://localhost:5000/ico/${item.id}`)
      .then(response => {
        console.log(response.data);
        const timer = setInterval(this.tick, 1000);

        this.setState({
          dataSource: response.data,
          isLoading: false,
          counter: (new Date(response.data.dates.icoEnd) - new Date()) / 1000,
          timer
        });
        console.log(this.state.dataSource);
      });
  }

  
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  
    handleFavorite() {
      const { item, user } = this.props;
      console.log(item);
      axios({
        url: 'http://localhost:5000/favorites/add',
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
        console.log(response);
      })
        .catch(function (error) {
          console.log(error);
        });
    }
  tick() {
    this.setState({
      counter: this.state.counter - 1
    });
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner size="small" />;
    }
    // const {item} = this.props;
    const item = this.state.dataSource;
    const timer = new Date(null);
    timer.setSeconds(this.state.counter);
    const timeLeft = timer.toISOString().substr(11,8);
    const daysLeft  = Math.floor(timer / (3600000 * 24));
    const { h2, greenBorder, imageStyle, sectionStyle, inlineView, infoStyle, 
            icoHeader, buttonStyle} = styles;
    return (
      <ScrollView >
        <View style={sectionStyle}>

          <View style={icoHeader}>
            <Image source={{ uri: item.logo }} style={imageStyle}/>
            <Text style={{fontWeight: 'bold', fontSize: 24  }}>{item.name}</Text>
          </View>

          <View style={inlineView}>

            <View style={{flex: 1.0, margin: 10}}>
              <Text style={{color: 'grey'}}>End Date:</Text>
              <Text>{item.dates.icoEnd}</Text>
            </View>

            <View style={{margin: 10}}>
              <Text style={{color: 'grey'}}>Time Left:</Text>
              <View style={greenBorder}>
                <Text style={{color: '#4CAF50', fontWeight: 'bold'}}>
                  {`${daysLeft}`}d, {timeLeft}
                </Text>
              </View>
            </View>

          </View>

          <View style={inlineView}>
            <TouchableOpacity onPress={this.handleFavorite.bind(this)} style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Text style={{margin: 10, fontSize: 25}}>
                <FontAwesome>{Icons.starO}</FontAwesome>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1}}>
              <Text style={{margin: 10, fontSize: 25}}>
                <FontAwesome>{Icons.share}</FontAwesome>
              </Text>
            </TouchableOpacity>
            <TouchableHighlight style={buttonStyle} onPress={() => Linking.openURL(item.url)}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Website</Text>
            </TouchableHighlight>
          </View>

          <View style={infoStyle}>
            <Text style={h2} >Finance</Text>
            <Text>Price: {item.finance.price}</Text>
            <Text>Hardcap:  {item.finance.hardcap}</Text>
            <Text>Raised:  {item.finance.raised}</Text>
            <Text>Distributed:  {item.finance.distributed}</Text>
            <Text>Tokens:  {item.finance.tokens}</Text>
            <Text>Minimum:  {item.finance.minimum}</Text>
            <Text>Platform:  {item.finance.platform}</Text>
            <Text>Accepting:  {item.finance.accepting}</Text>
          </View>

          <View style={infoStyle}>
            <Text style={h2} >Brief Information</Text>
            <Text>{item.intro}</Text>
            <Text>Start Date: {item.dates.icoStart}</Text>
          </View>

          <View style={infoStyle}> 
            <Text style={h2}>Full Description</Text>
            {/* <Text>{item.about}</Text>           */}
          </View>
        </View>

     </ScrollView>);
  }
}


const styles = {
  sectionStyle: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // margin: 5,
    // backgroundColor: '#3B2E4D',
    flex: 1
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  imageStyle: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    borderColor: 'grey',
    padding: 5,
    borderRadius: 5,
    marginRight: 20,
  },
  inlineView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    // width: 340,
    // padding: 10,
    flex: 1
  },
  infoStyle: {
    padding: 10,
    width: 350
  },
  buttonStyle: {
    backgroundColor: '#FF5FDB',
    alignItems: 'center',
    padding: 8,
    flex: 0.7,
    marginRight: 30,
    marginLeft: -60
  },
  greenBorder: {
    borderColor: '#4CAF50',
    borderWidth: 0.8,
    padding: 2
  },
  icoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 30
  },
  white: {
    color: 'white'
  }
};