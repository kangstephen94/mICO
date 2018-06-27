import React, { Component } from 'react';
import { View, Text, Image , TouchableHighlight} from 'react-native';
import Section from '../common/Section';
import SubSection from '../common/SubSection';
import { Actions } from 'react-native-router-flux';
import Footer from '../Footer';


const IcoListItem = (props) => {
  const { imageStyle, sectionStyle } = styles;
  const { item } = props;
  return (
    <Section>
        <TouchableHighlight 
          underlayColor={'none'}
          onPress={() => Actions.icoDetail({item})}>
          <View style={sectionStyle}>
            <Text>{item.name}</Text>
            <Image style={imageStyle} source={{ uri: item.image }} />
          </View>
        </TouchableHighlight> 
    </Section>
  );
};

const styles = {
  sectionStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10
  },
  imageStyle: {
    height: 70,
    width: 250,
    // flex: 1
  }
};


export default IcoListItem;
