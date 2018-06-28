import React, {Component} from 'react';
import Modal from 'react-native-modalbox';
import EventIndexItem from './EventIndexItem';
import Footer from '../Footer';
import Map from '../Map/Map';
import {
  AppRegistry,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TextInput,
  Button,
  Slider,
  FlatList,
  TouchableOpacity,
  TabBarIOS,
  TabBarIOSItem
} from 'react-native';

var screen = Dimensions.get('window');


export default class EventsIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      slidervalue: 0.3
    };

  }

  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just opened');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  fetchData() {

  }

  render() {
    var BContent = <Button onPress={() => this.setState({isOpen: false})} style={[styles.btn, styles.btnModal]} title={"X"}></Button>;
    return (
      <View style={styles.wrapper}>
        <View style={styles.map}>
          <Map />
        </View>
        <TouchableOpacity onPress={() => this.refs.modal1.open()} style={styles.btn}></TouchableOpacity>
        <Modal
          style={[styles.modal, styles.modal1]}
          ref={"modal1"}
          transparent={true}
          swipeToClose={this.state.swipeToClose}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}
          animationType='slide'          
          >
            <Text style={styles.text}>Events</Text>
            <FlatList style={{width: screen.width, paddingLeft: 20}}
              data={[{key: 'a'}, {key: 'b'}]}
              renderItem={({item}) => <EventIndexItem />}>
          </FlatList>
        </Modal>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  map: {
    flex: 3
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },

  modal1: {
    flex: 1
  },

  modal2: {
    height: 230,
    backgroundColor: "#3B5998"
  },

  modal3: {
    height: 300,
    width: 300
  },

  modal4: {
    height: 300
  },

  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    height: 5,
    width: 50,
    borderRadius: 5
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

  text: {
    color: "black",
    fontSize: 22
  }

});
