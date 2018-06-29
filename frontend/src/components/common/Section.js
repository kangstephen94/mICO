import React from 'react';
import { View } from 'react-native';

const Section = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#39314B", //'#ddd',
    borderBottomWidth: 0,
    shadowColor: '#1A2334',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: '#eee'
  }
};

export default Section;
