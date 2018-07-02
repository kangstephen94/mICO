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

  const date = type === 'active' ? <Text>End Date: {item.dates.icoEnd.slice(0,10)}</Text> : <Text>Start Date: {item.dates.icoStart.slice(0,10)}</Text>;

  const name = item.name.length > 15 ? item.name.slice(0,15) + "..." : item.name;
  
  return (
    
    <Section>
      <TouchableOpacity
        onPress={() => Actions.icoDetail({item})}
        style={{padding: 10}}
        >
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Image style={imageStyle} source={{ uri: item.logo }} />
          <Text style={titleStyle}>{name}</Text>
          <View >
            <View style={ratingClass}>
              <FontAwesome style={starClass}>{Icons.star}</FontAwesome>
              <Text style={{fontWeight: 'bold', fontFamily: 'Encode Sans Semi Expanded'}}>
                {item.rating}
              </Text>
            </View>
            <View style={{flexDirection: 'column', marginTop: 40, marginLeft: -175 }}>
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
    height: 90,
    width: 90,
    resizeMode: 'contain',
    marginRight: 20
    // flex: 1
  }, 
  poorRating: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#FF4136',
    padding: 5,
    borderRadius: 3,
    marginTop: 5,
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
    marginTop: 5
  },
  goodRating: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 3,
    width: 50,
    marginTop: 5
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
      fontSize: 22,
      marginTop: 15,
      lineHeight: 22,
      // fontWeight: '',
      width: '45%',
      fontFamily: 'Encode Sans Semi Expanded',
  }

});


export default IcoListItem;
