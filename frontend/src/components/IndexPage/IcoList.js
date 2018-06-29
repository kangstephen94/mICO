import React from 'react';
import axios from 'axios';
import { View, Text, FlatList, ScrollView } from 'react-native';
import IcoListItem from './IcoListItem';
import Spinner from '../common/Spinner';
import Footer from '../Footer';

class IcoList extends React.Component {

  state = { dataSource: null,
            isLoading: true };

  // componentDidMount() {
  //   axios.get('https://api.icowatchlist.com/public/v1/live')
  //     .then(response => {
  //       this.setState({
  //         dataSource: response.data.ico.live,
  //         isLoading: false
  //       });
  //       console.log(this.state.dataSource);
  //     });
  // }

  componentDidMount() {
    axios.get('http://localhost:5000/active_icos/0')
      .then(response => {
        console.log(response.data);
        this.setState({
          dataSource: response.data.results,
          currentPage: response.data.currentPage,
          isLoading: false
        });
      });
  }

  renderItem({item}) {
    return <IcoListItem key={item.id} item={item} />;
  }

  render() {
    console.log(this.state.dataSource);
    if (this.state.isLoading) {
      return <Spinner size="small" />;
    }
    return (
      <View style={styles.listViewStyle}>
        <ScrollView>
          <FlatList 
            data={this.state.dataSource}
            renderItem={this.renderItem}
          />
        </ScrollView> 
       
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
