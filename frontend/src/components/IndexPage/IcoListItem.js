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
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{marginRight: 20, fontSize: 24, fontWeight: 'bold'}}>{item.name}</Text>
            <Image style={imageStyle} source={{ uri: item.logo }} />
          </View>
        </TouchableOpacity> 
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
    height: 100,
    width: 100,
    resizeMode: 'contain'
    // flex: 1
  }
};


export default IcoListItem;
