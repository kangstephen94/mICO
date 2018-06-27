import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Section from '../common/Section';
import SubSection from '../common/SubSection';

const IcoListItem = (props) => {
  const { imageStyle, sectionStyle } = styles;
  const { item } = props;
  return (
    <Section>
      <SubSection>
        <View style={sectionStyle}>
          <Text>{item.name}</Text>
          <Image style={imageStyle} source={{ uri: item.image }} />
        </View>
      </SubSection>
    </Section>
  );
};

const styles = {
  sectionStyle: {
    flexDirection: 'column'
  },
  imageStyle: {
    height: 70,
    width: 250,
    // flex: 1
  }
};


export default IcoListItem;
