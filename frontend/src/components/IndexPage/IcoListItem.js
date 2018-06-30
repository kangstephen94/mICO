import React, { Component } from 'react';
import { View, Text, Image , TouchableOpacity, StyleSheet} from 'react-native';
import Section from '../common/Section';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import SubSection from '../common/SubSection';
import { Actions } from 'react-native-router-flux';
import Footer from '../Footer';


const IcoListItem = (props) => {
  const { imageStyle, sectionStyle, titleStyle } = styles;
  const { item } = props;
  let ratingClass;
  if (item.rating < 2) {
    ratingClass = styles.poorRating;
  } else if (item.rating < 4) {
    ratingClass = styles.okayRating;
  } else {
    ratingClass = styles.goodRating;
  }
  return (
    
    <Section>
      <TouchableOpacity
        onPress={() => Actions.icoDetail({item})}
        style={{padding: 10}}
        // style={sectionStyle}
        >
        <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Image style={imageStyle} source={{ uri: item.logo }} />
          <Text style={titleStyle}>{item.name}</Text>
          <View >
            <View style={ratingClass}>
              <FontAwesome style={{marginRight: 3, fontWeight: 'bold'}}>{Icons.starO}</FontAwesome>
              <Text style={{fontWeight: 'bold', fontFamily: 'Encode Sans Semi Expanded'}}>
                {item.rating}
              </Text>
            </View>
            <View style={{flexDirection: 'column', marginTop: 35, marginLeft: -175 }}>
              {/* <Text>End Date:</Text> */}
              <Text>End Date: {item.dates.icoEnd}</Text>
            </View>
          </View>

        </View>
      </TouchableOpacity> 
    </Section>
      
  );
};

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'black',
    padding: 10,
    margin: 5,
    // flex: 1
  },
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
    backgroundColor: '#FF4136',
    padding: 5,
    borderRadius: 3,
    // flex: 0.25
  },
  okayRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF851B',
    padding: 5,
    borderRadius: 3,
    width: 50
  },
  goodRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 3,
    width: 50
    // flex: 0.25
  },
  titleStyle: {
      marginRight: 20,
      fontSize: 24,
      // fontWeight: '',
      width: '45%',
      fontFamily: 'Encode Sans Semi Expanded',
  }

});


export default IcoListItem;
