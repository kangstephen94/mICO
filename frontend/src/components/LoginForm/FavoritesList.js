import React from 'react';
import IcoListItem from '../IndexPage/IcoListItem';
import { View, FlatList } from 'react-native';

class FavoritesList extends React.Component {

  renderItem({ item }) {
    // handle search results, will refactor in future for IcoListItem to handle
    if (item.type === undefined) {
      const date = item.dates.icoStart.replace(' ', 'T');
      item.type = new Date(date) < new Date() ? "active" : 'upcoming';
    };

    return <IcoListItem key={item.id} item={item} type={item.type} />
  }

  render() {
    return (
    <View>
      <FlatList 
      keyExtractor={(item, index) => index.toString()}
      data={this.props.favorites}
      renderItem={this.renderItem}
      />
    </View>
    );

  }
}

export default FavoritesList;
