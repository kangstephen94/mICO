import React from 'react';
import axios from 'axios';
import { View, Text, ListView } from 'react-native';
import IcoListItem from './IcoListItem';
import Spinner from '../common/Spinner';

class IcoList extends React.Component {

  state = { dataSource: null,
            isLoading: true };

  componentDidMount() {
    axios.get('https://api.icowatchlist.com/public/v1/live')
      .then(response => {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState({
          dataSource: ds.cloneWithRows(response.data.ico.live),
          isLoading: false
        });
        console.log(this.state.dataSource);
      });
  }

  renderRow(item) {
    return <IcoListItem item={item} />;
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner size="small" />;
    }
    return (
      <ListView 
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const styles = {
  listViewStyle: {
    flex: 1
  }
};

export default IcoList;
