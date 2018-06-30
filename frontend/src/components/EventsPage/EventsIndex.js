import React, {Component} from 'react';
import Modal from 'react-native-modalbox';
import EventIndexItem from './EventIndexItem';
import Footer from '../Footer';
import MapContainer from '../Map/MapContainer';
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
  TabBarIOSItem,
  TouchableWithoutFeedback
} from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures';

var screen = Dimensions.get('window');


export default class EventsIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      slidervalue: 0.3,
      isLoading: true
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

  componentDidMount() {
    this.props.retrieveEvents().then( () => this.setState({isLoading: false}) );
  }

  render() {
    if (this.state.isLoading) return null;

    var BContent = <Button onPress={() => this.setState({isOpen: false})} style={[styles.btn, styles.btnModal]} title={"X"}></Button>;

    const eventsList = (<FlatList style={{flex: 1}} data={this.props.events}
        renderItem={({item, index}) => <EventIndexItem item={item} index={index}/>}>
      </FlatList>);

    return (
      <View style={styles.wrapper}>

        <MapContainer />

        <GestureRecognizer style={{alignItems: 'center'}} onSwipeUp={() => this.refs.modal1.open()} swipeThreshold={0}>
          <TouchableOpacity
            onPress={() => this.refs.modal1.open()}
            style={styles.btn}>
          </TouchableOpacity>
        </GestureRecognizer>

        <Modal
          // style={[styles.modal, styles.modal1]}
          style={styles.modal}
          ref={"modal1"}
          transparent={true}
          swipeToClose={this.state.swipeToClose}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}
          swipeThreshold={0}
          // children={eventsList}
          // scrollOffset={20}
          // animationType='slide'
          >
            <Text style={styles.text}>Events Nearby</Text>
            <FlatList 
              style={{flex: 1, backgroundColor: 'transparent', padding: 5}}
              data={this.props.events}
              renderItem={({item, index}) => <EventIndexItem item={item} key={index} index={index}/>}>
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
    flex: 1
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.9,
    backgroundColor: 'transparent'
    // position: 'relative'
  },

  modal1: {
    flex: 1,
    padding: 5
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
    backgroundColor: "#ff92e0",
    height: 5,
    width: 100,
    borderRadius: 10,
    padding: 4.5,
    margin: 5,
    position: 'absolute',
    bottom: 8,
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
    color: "white",
    fontSize: 22,
    alignItems: 'center',
    padding: 5
  }

});


{/* <View style={styles.wrapper}>
<View style={styles.map} >
  <Map style={styles.map}/>
</View>
<View style={{flex: 1}}>
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
</View> */}
