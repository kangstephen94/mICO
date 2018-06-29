import React, { Component } from 'react';
import { View, Text, Image , TouchableOpacity} from 'react-native';
import Section from '../common/Section';
import SubSection from '../common/SubSection';
import { Actions } from 'react-native-router-flux';
import Footer from '../Footer';


const IcoListItem = (props) => {
  const { imageStyle, sectionStyle } = styles;
  const { item } = props;
  return (
        <TouchableOpacity
          onPress={() => Actions.icoDetail({item})}
          style={sectionStyle}
          >
          <View style={sectionStyle}>
            <Text>{item.name}</Text>
            <Image style={imageStyle} source={{ uri: item.logo }} />
          </View>
        </TouchableOpacity> 
  );
};

const styles = {
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1
  },
  imageStyle: {
    height: 100,
    width: 200,
    resizeMode: 'contain'
    // flex: 1
  }
};


export default IcoListItem;
