import React, { Component } from 'react';
import { View, Text, Image , TouchableOpacity, StyleSheet} from 'react-native';
import Section from '../common/Section';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Actions } from 'react-native-router-flux';


const IcoListItem = (props) => {
  const { imageStyle, sectionStyle, titleStyle } = styles;
  const { item, type } = props;
  item.type = type || item.type;
  let ratingClass, starClass;
  if (item.rating < 2) {
    ratingClass = styles.poorRating;
    starClass = styles.poorStar;
  } else if (item.rating < 4) {
    ratingClass = styles.okayRating;
    starClass = styles.okayStar;
  } else {
    ratingClass = styles.goodRating;
    starClass = styles.goodStar
  }

  const formatDate = date => `${date.slice(5,7)}-${date.slice(8,10)}-${date.slice(0,4)} `.replace(/[-]/g, '/');

  const date = type === 'active' ? <Text>End Date: {formatDate(item.dates.icoEnd)}</Text> : <Text>Start Date: {formatDate(item.dates.icoStart)}</Text>;

  const name = item.name.length > 15 ? item.name.slice(0,15) + "..." : item.name;
  
  return (
    
    <Section>
      <TouchableOpacity
        onPress={() => Actions.icoDetail({item})}
        style={{padding: 10}}
        >
        <View style={{flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Image style={imageStyle} source={{ uri: item.logo }} />
          <Text style={titleStyle}>{name}</Text>
          <View >
            <View style={ratingClass}>
              <FontAwesome style={starClass}>{Icons.star}</FontAwesome>
              <Text style={{fontWeight: 'bold', fontFamily: 'Encode Sans Semi Expanded', fontSize: 16}}>
                {item.rating % 1 === 0 ? item.rating.toFixed(1) : item.rating}
              </Text>
            </View>
            <View style={{flexDirection: 'column', marginTop: 4, marginLeft: -175 }}>
              {date}
            </View>
          </View>

        </View>
      </TouchableOpacity> 
    </Section>
      
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 72,
    width: 72,
    resizeMode: 'contain',
    marginRight: 20,
    borderRadius: 6
    // flex: 1
  }, 
  poorRating: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#FF4136',
    padding: 5,
    borderRadius: 3,
    marginTop: 23,
    width: 50
    // flex: 0.25
  },
  okayRating: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#FF851B',
    padding: 5,
    borderRadius: 3,
    width: 50,
    marginTop: 23
  },
  goodRating: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 3,
    width: 50,
    marginTop: 23
    // flex: 0.25
  },
  poorStar: {
    color: '#FF4136',
    marginRight: 3,
    fontWeight: 'bold'
  },
  okayStar: {
    color: '#FF851B',
    marginRight: 3,
    fontWeight: 'bold'
  },
  goodStar: {
    color: '#4CAF50',
    marginRight: 3,
    fontWeight: 'bold'
  },


  titleStyle: {
      marginRight: 20,
      fontSize: 23,
      marginTop: 5,
      lineHeight: 25,
      // fontWeight: '',
      width: '45%',
      fontFamily: 'Encode Sans Semi Expanded',
  }

});


export default IcoListItem;
