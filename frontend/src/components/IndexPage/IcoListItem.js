import React, { Component } from 'react';
import { View, Text, Image , TouchableOpacity} from 'react-native';
import Section from '../common/Section';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import SubSection from '../common/SubSection';
import { Actions } from 'react-native-router-flux';
import Footer from '../Footer';


const IcoListItem = (props) => {
  const { imageStyle, sectionStyle } = styles;
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
          <Text style={{marginRight: 20, fontSize: 24, fontWeight: 'bold', width: '45%', fontFamily: 'Heiti SC'}}>{item.name}</Text>
          <View style={ratingClass}>
            <FontAwesome style={{marginRight: 3}}>{Icons.starO}</FontAwesome>
            <Text style={{fontWeight: 'bold'}}>
              {item.rating}
            </Text>
          </View>
        </View>
      </TouchableOpacity> 
    </Section>
      
  );
};

const styles = {
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
    borderRadius: 3
  },
  goodRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 3,
    // flex: 0.25
  }

};


export default IcoListItem;
