import React, { Component } from 'react';
import {ScrollView, View, Text, Image , Linking, TouchableHighlight, TouchableOpacity, WebView} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Spinner from '../common/Spinner';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import HTML from 'react-native-render-html';
// import { Action } from 'react-native-router-flux';


export default class IcoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      isLoading: true,
      // counter: null,
      favorite: false
    };

    this.tick = this.tick.bind(this);
    
  }

  componentDidMount() {
    const { item } = this.props;
    axios.get(`https://mico-ios.herokuapp.com/ico/${item.id}`)
      .then(response => {
        const timer = setInterval(this.tick, 1000);
        const dateData = item.type === 'active' ? response.data.dates.icoEnd : (response.data.dates.icoStart === '0000-00-00 00:00:00' ? (response.data.dates.preIcoStart) : (response.data.dates.icoStart) );
        const date = dateData.replace(' ', 'T');
        this.setState({
          dataSource: response.data,
          isLoading: false,
          // counter: (new Date(response.data.dates.icoEnd) - new Date()) / 1000,
          // counter: (date - new Date()) / 1000, // LOL PEMDAS almost did me in, previous code was 'counter: date - new Date() / 1000'
          counter: (Date.parse(date) - new Date())/ 1000,
          timer,
          type: item.type
        });
      });
    if (this.props.user.user) {
      this.props.user.user.favorites.forEach(fav => {
        if (fav.name === this.props.item.name) {
          this.setState({ favorite: true });
        }
      });
    }
  }

  
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  
    handleFavorite() {
      const { item, user, receiveSession } = this.props;
      if (!user.user) {
        Actions.pop();
        Actions.login();
        this.props.receiveFavScene();
        return;
      }

      if (this.state.favorite) {
        axios({
          url: 'https://mico-ios.herokuapp.com/api/favorites/remove',
          method: 'PUT',
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
      } else {
      axios({
        url: 'https://mico-ios.herokuapp.com/api/favorites/add',
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
    this.setState({ favorite: !this.state.favorite });
  }

  tick() {
    this.setState({
      counter: this.state.counter - 1
    });
  }

  _formatDate(date) {
    "2018-09-12 00:00:00"
    return `${date.slice(5,7)}-${date.slice(8,10)}-${date.slice(0,4)} ` + date.slice(11);
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner size="small" />;
    }
    const item = this.state.dataSource;
    const favoriteClass = this.state.favorite ? styles.favClass : styles.nonFavClass;
    const star = this.state.favorite ? 
      <FontAwesome style={favoriteClass}>{Icons.star}</FontAwesome>
    : 
      <FontAwesome style={favoriteClass}>{Icons.starO}</FontAwesome>;

    const time = new Date(null);
    time.setSeconds(this.state.counter);
    const timeLeft = time.toISOString().substr(11,8);
    const daysLeft = Math.floor(time / 86400000);
    const { h2, greenBorder, imageStyle, sectionStyle, inlineView, infoStyle, 
            icoHeader, buttonStyle} = styles;
    const { type } = this.state;

    const preOrNah = item.dates.icoStart === '0000-00-00 00:00:00' ? 
      (<View style={{flex: 1.0, margin: 10, marginLeft: 25}}>
        <Text style={{color: 'grey'}}>Pre-ICO Start Date:</Text>
        <Text>{this._formatDate(item.dates.preIcoStart)}</Text>
      </View>) : (<View style={{flex: 1.0, margin: 10, marginLeft: 25}}>
      <Text style={{color: 'grey'}}>Start Date:</Text>
      <Text>{this._formatDate(item.dates.icoStart)}</Text>
    </View>);

    const dateInfo = type === 'active' ? (
      <View style={{flex: 1.0, margin: 10, marginLeft: 25}}>
        <Text style={{color: 'grey'}}>End Date:</Text>
        <Text>{this._formatDate(item.dates.icoEnd)}</Text>
      </View>) : preOrNah ;
    
    return (
      <ScrollView style={{backgroundColor: '#ddd'}}>
        <Image style={{flex:1, resizeMode: 'cover', width: null, height: null}} source={require('../../../assets/images/origin-background.svg')} />
        <View style={sectionStyle}>

          <View style={icoHeader}>
            <Image source={{ uri: item.logo }} style={imageStyle} />
            <Text style={{fontWeight: 'bold', fontSize: 22, fontFamily: 'Encode Sans Semi Expanded' , flexWrap: 'wrap', width: 230}}>{item.name}</Text>
          </View>

          <View style={inlineView}>
            {dateInfo}
            <View style={{margin: 10, marginRight: 25}}>
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
                {star}
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
            <Text style={h2} >Dates</Text>
            <Text>Pre-ICO Start Date: {this._formatDate(item.dates.preIcoStart)}</Text>
            <Text>Pre-ICO End Date:  {this._formatDate(item.dates.preIcoEnd)}</Text>
            <Text>Start Date:  {this._formatDate(item.dates.icoStart)}</Text>
            <Text>End Date:  {this._formatDate(item.dates.icoEnd)}</Text>
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
          </View>

          <View style={infoStyle}>
            <Text style={h2} >Categories</Text>
            <Text>{item.categories.map( el => el.name).join(", ")}</Text>
          </View>

          <View style={infoStyle}> 
            <Text style={h2}>Full Description</Text>
            <HTML html={item.about}  />
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
    borderRadius: 4,
    // marginRight: 20
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
    backgroundColor: '#39314B', //'#FF5FDB',
    alignItems: 'center',
    padding: 8,
    flex: 0.7,
    marginRight: 25,
    marginLeft: -60,
    borderRadius: 3
  },
  greenBorder: {
    borderColor: '#4CAF50',
    borderWidth: 0.8,
    padding: 2
  },
  icoHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flex: 1,
    marginTop: 30,
    marginLeft: 0
  },
  white: {
    color: 'white'
  },
  favClass: {
      color: "#ff92e0" //'#4CAF50'
  },
  nonFavClass: {
    color: 'black'
  }
};