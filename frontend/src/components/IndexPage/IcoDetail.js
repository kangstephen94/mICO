import React, { Component } from 'react';
import {ScrollView, View, Text, Image , Linking, TouchableHighlight, Dimensions, TouchableOpacity, WebView} from 'react-native';
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
      team: true,
      favorite: false
    };

    this.tick = this.tick.bind(this);
    
  }
//   start date is greater than current date = upcoming, everything else is active
  componentDidMount() {
    const { item } = this.props;
    axios.get(`https://mico-ios.herokuapp.com/ico/${item.id}`)
      .then(response => {
        const dateData = item.type === 'active' ? response.data.dates.icoEnd : (response.data.dates.icoStart === '0000-00-00 00:00:00' ? (response.data.dates.preIcoStart) : (response.data.dates.icoStart) );
        const date = dateData.replace(' ', 'T');
        // const timer = setInterval(this.tick, 1000);
        const timer = new Date() < Date.parse(date) ?  setInterval(this.tick, 1000) : null; 
        this.setState({
          dataSource: response.data,
          isLoading: false,
          // counter: (new Date(response.data.dates.icoEnd) - new Date()) / 1000,
          // counter: (date - new Date()) / 1000, // LOL PEMDAS almost did me in, previous code was 'counter: date - new Date() / 1000'
          counter: (Date.parse(date) - new Date()) / 1000,
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
    if (this.state.timer) clearInterval(this.state.timer);
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
    return `${date.slice(5,7)}-${date.slice(8,10)}-${date.slice(0,4)} `.replace(/[-]/g, '/') + date.slice(11);
  }

  github(item) {
    if (item.links.github) {
      return (
        <TouchableOpacity onPress={() => Linking.openURL(item.links.github)}>
          <Text  style={{margin: 10, fontSize: 30}}>
            <FontAwesome>{Icons.github}</FontAwesome>
          </Text>
        </TouchableOpacity>
      );
    } else {
      return <View></View>;
    }
  }
  reddit(item) {
    if (item.links.reddit) {
      return (
        <TouchableOpacity onPress={() => Linking.openURL(item.links.reddit)}>
          <Text style={{margin: 10, fontSize: 30, color: '#ed4401'}}>
            <FontAwesome>{Icons.reddit}</FontAwesome>
          </Text>
        </TouchableOpacity>
      );
    } else {
      return <View></View>;
    }
  }

  twitter(item) {
    if (item.links.twitter) {
      return (
        <TouchableOpacity onPress={() => Linking.openURL(item.links.twitter)}>
          <Text style={{margin: 10, fontSize: 30, color: '#50a1f2'}}>
            <FontAwesome>{Icons.twitter}</FontAwesome>
          </Text>
        </TouchableOpacity>
      );
    } else {
      return <View></View>;
    }
  }
  telegram(item) {
    if (item.links.telegram) {
      return (
        <TouchableOpacity onPress={() => Linking.openURL(item.links.telegram)}>
          <Text style={{margin:10, fontSize: 30, color: '#4596c8'}}>
            <FontAwesome>{Icons.telegram}</FontAwesome>
          </Text>
        </TouchableOpacity>
      );
    } else {
      return <View></View>;
    }
  }
  whitepaper(item) {
    if (item.links.whitepaper) {
      return (
        <TouchableOpacity onPress={() => Linking.openURL(item.links.whitepaper)}>
          <Text style={{margin:10, fontSize: 30, color: 'gray'}}>
            <FontAwesome>{Icons.newspaperO}</FontAwesome>
          </Text>
        </TouchableOpacity>
      );
    } else {
      return <View></View>;
    }
  }

  toggleTeam() {
    this.setState({team: !this.state.team });
  }

  teamInfo(team) {
    let { height, width } = Dimensions.get('window');
    console.log("team", team);
    return (team.map(member => (
        <View style={{width: width-20, flexDirection: 'row', marginBottom: 25, paddingBottom: 15, borderBottomColor: 'grey', borderBottomWidth: 1}}>
          <Image source={{ uri: member.photo }} style={{borderRadius: 30, height: 60, width: 60, marginLeft: 15}} />
          <View style={{ width: 170, marginLeft: 10, flexDirection: 'column'}}>
            <View style={{height: 60}}>
              <Text style={{fontWeight: 'bold'}}>{member.name}</Text>
            </View>
            <Text style={{marginTop: -30}}>{member.title}</Text>
          </View>

            <TouchableOpacity onPress={() => Linking.openURL(member.links)}>
              <Text style={{margin:10, fontSize: 35, color: '#3a77b6', marginTop: 0, marginLeft: 30}}>
                <FontAwesome>{Icons.linkedinSquare}</FontAwesome>
              </Text>
            </TouchableOpacity>
        </View>
    )
    ));
  }
  render() {
    if (this.state.isLoading) {
      return <Spinner size="small" />;
    }
    console.log(item);
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
  
    const timeCounter = this.state.timer ? `${daysLeft}d, ${timeLeft}`: "ENDED";

    const { h2, greenBorder, imageStyle, sectionStyle, inlineView, infoStyle, 
            icoHeader, buttonStyle, redBorder, teambuttonStyle } = styles;
    const { type } = this.state;

    const timerBorder = this.state.timer ? greenBorder : redBorder;
    
    const timerColor = this.state.timer ? '#4CAF50' : '#B33A3A' ;

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
    console.log("item", item);
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
              <View style={timerBorder}>
                <Text style={{color: timerColor, fontWeight: 'bold'}}>
                  {timeCounter}
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
              <Text style={{margin: 10, fontSize: 25, marginRight: 0}}>
                <FontAwesome>{Icons.share}</FontAwesome>
              </Text>
            </TouchableOpacity>
            <TouchableHighlight style={buttonStyle} onPress={() => Linking.openURL(item.url)}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Website</Text>
            </TouchableHighlight>
            {this.state.team ? 
              <TouchableHighlight style={teambuttonStyle} onPress={this.toggleTeam.bind(this)}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Team</Text>
              </TouchableHighlight> : 
              <TouchableHighlight style={teambuttonStyle} onPress={this.toggleTeam.bind(this)}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Info</Text>
              </TouchableHighlight> 
            }
            
          </View>
          {this.state.team ? (
          <View>
          <View style={{margin: 10, flexDirection: 'row', justifyContent: 'center', marginLeft: 0}}>
            {this.github(item)}
            {this.reddit(item)}
            {this.twitter(item)}
            {this.telegram(item)}
            {this.whitepaper(item)}
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
          </View>) :
            (<View style={{margin: 10}}>
              <Text style={{textAlign: 'center', fontWeight: 'bold', marginBottom: 15, fontSize: 20}}>
                Team Info
              </Text>
              <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
              {this.teamInfo(item.team)}
              </View>
            </View>)
          }
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
    marginRight: 20
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
    marginRight: 10,
    marginLeft: -20,
    // marginLeft: -60,
    borderRadius: 3
  },
  teambuttonStyle: {
    backgroundColor: '#1D2437', //'#FF5FDB',
    alignItems: 'center',
    padding: 8,
    flex: 0.7,
    marginRight: 25,
    marginLeft: 10,
    borderRadius: 3
  },
  greenBorder: {
    borderColor: '#4CAF50',
    borderWidth: 0.8,
    padding: 2
  },
  redBorder: {
    borderColor: '#B33A3A',
    borderWidth: 0.8,
    padding: 2,
    alignItems: 'center'
  },
  icoHeader: {
    flexDirection: 'row',
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