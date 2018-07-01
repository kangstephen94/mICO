import React from 'react';
import axios from 'axios';
import { View, Text, FlatList, ScrollView, RefreshControl, ActivityIndicator} from 'react-native';
import IcoListItem from './IcoListItem';
import Spinner from '../common/Spinner';
import Footer from '../Footer';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


class IcoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      dataSource: [],
      currentPage: 0,
      refreshing: false,
      isLoading: true 
    };

    this._fetchData = this._fetchData.bind(this);
    this._refresh = this._refresh.bind(this);
    this._handleEndReached = this._handleEndReached.bind(this);
    this._fetchUpcomingData = this._fetchUpcomingData.bind(this);
    this._fetchActiveData = this._fetchActiveData.bind(this);
  }

  componentDidMount() {
    if (this.props.favorites) {
      this.setState({dataSource: this.props.favorites, isLoading: false})
      return null;
    }
    this._fetchData();
  }

  componentWillUnmount() {
  }

  // ADD ONGOING 

  _fetchData() {
    const {name} = this.props
    
    if (name === 'icoList') {
      this._fetchUpcomingData();
    } else {
      this._fetchActiveData();
    }
    // axios.get(`http://localhost:5000/active_icos/${this.state.currentPage}`)
    // .then(response => {
    //   this.setState({
    //     dataSource: this.state.dataSource.concat(response.data.results),
    //     currentPage: response.data.currentPage + 1,
    //     isLoading: false,
    //     refreshing: false
    //   });
    // });
  }

  _fetchUpcomingData() {
    axios.get(`http://localhost:5000/upcoming_icos/${this.state.currentPage}`)
    .then(response => {
      this.setState({
        dataSource: this.state.dataSource.concat(response.data.results),
        currentPage: response.data.currentPage + 1,
        isLoading: false,
        refreshing: false,
        type: 'upcoming'
      });
    });
  }

  _fetchActiveData() {
    axios.get(`http://localhost:5000/active_icos/${this.state.currentPage}`)
    .then(response => {
      this.setState({
        dataSource: this.state.dataSource.concat(response.data.results),
        currentPage: response.data.currentPage + 1,
        isLoading: false,
        refreshing: false,
        type: 'active'
      });
    });
  }

  _refresh() {
    if (this.state.refreshing) return null;
    this.setState({refreshing: true});
    this._fetchData();
  }

  _handleEndReached() {
    if (this.state.loading || this.state.refreshing) return null;
    this._refresh();
  }

  renderItem({item}) {
    return <IcoListItem item={item} />;
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner size="small" />;
    }

    const flatList = this.props.favorite ? 
      <FlatList 
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
    : 
        <FlatList data={this.state.dataSource}
            // renderItem={this.renderItem}
            // renderItem={({item}) => <Text>{item.key}</Text>}
            renderItem={({item}) => <IcoListItem item={item} type={this.state.type} />}
            onEndReachedThreshold={0}
            onEndReached={this._handleEndReached}
            style={{flex: 4}}
            keyExtractor={(item, index) => index.toString()}
          />;
  
<<<<<<< HEAD
    const refreshSpinner = this.state.refreshing ? <ActivityIndicator size='small' /> : null ;
=======
    const refreshSpinner = this.state.refreshing ? <ActivityIndicator size='small' /> : null;
>>>>>>> 0c39ccc6a9c5a1c7c98f962a9ac188ecda6cfd2e
    
    return (
      <View style={styles.listViewStyle}>
          {flatList}
          {refreshSpinner}
      </View>
    );
  }
}

const styles = {
  listViewStyle: {
    flex: 1, 
    flexDirection: 'column', 
    flexWrap: 'wrap', 
    justifyContent: 'space-evenly',
    backgroundColor: '#39314B'
  }
};

export default IcoList;
