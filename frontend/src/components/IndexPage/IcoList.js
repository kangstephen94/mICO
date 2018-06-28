import React from 'react';
import axios from 'axios';
import { View, Text, FlatList, ScrollView } from 'react-native';
import IcoListItem from './IcoListItem';
import Spinner from '../common/Spinner';
import Footer from '../Footer';

class IcoList extends React.Component {

  state = { dataSource: null,
            isLoading: true };

  componentDidMount() {
    axios.get('https://api.icowatchlist.com/public/v1/live')
      .then(response => {
        this.setState({
          dataSource: response.data.ico.live,
          isLoading: false
        });
        console.log(this.state.dataSource);
      });
  }

  renderItem({item}) {
    return <IcoListItem key={item.name} item={item} />;
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner size="small" />;
    }
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <FlatList 
            data={this.state.dataSource}
            renderItem={this.renderItem}
          />
        </ScrollView> 
        {/* <View> 
          <Footer />
        </View> */}
      </View>
    );
  }
}

const styles = {
  listViewStyle: {
    flex: 1
  }
};

export default IcoList;
