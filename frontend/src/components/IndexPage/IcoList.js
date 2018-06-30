import React from 'react';
import axios from 'axios';
import { View, Text, FlatList, ScrollView, RefreshControl, ActivityIndicator} from 'react-native';
import IcoListItem from './IcoListItem';
import Spinner from '../common/Spinner';
import Footer from '../Footer';

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
    this._handleEndReached = this._handleEndReached.bind(this)
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    console.log('fetch');
    console.log(this.state.currentPage);
    axios.get(`http://localhost:5000/active_icos/${this.state.currentPage}`)
    .then(response => {
      console.log(response.data);
      this.setState({
        dataSource: this.state.dataSource.concat(response.data.results),
        currentPage: response.data.currentPage + 1,
        isLoading: false,
        refreshing: false
      });
    });
  }

  _refresh() {
    this.setState({refreshing: true});
    this._fetchData();
  }

  _handleEndReached() {
    if (this.state.loading || this.state.refreshing) return null;
    this._refresh();
  }

  renderItem({item}) {
    return <IcoListItem key={item.id} item={item} />;
  }

  render() {
    console.log(this.state.dataSource);
    if (this.state.isLoading) {
      return <Spinner size="small" />;
    }

    const refreshSpinner = this.state.refreshing ? <ActivityIndicator style={{size: 'small'}} /> : null ;

    return (
      <View style={styles.listViewStyle}>
          <FlatList data={this.state.dataSource}
            renderItem={this.renderItem}
            onEndReachedThreshold={0}
            onEndReached={this._handleEndReached}
            style={{flex: 3}}
          />
          {refreshSpinner}
      </View>
    );
  }
}

const styles = {
  listViewStyle: {
    flex: 1, 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-evenly',
    backgroundColor: '#39314B'
  }
};

export default IcoList;
