import React from 'react';
import IcoListItem from '../IndexPage/IcoListItem';
import { View, FlatList } from 'react-native';

class FavoritesList extends React.Component {

  renderItem({item}) {
    return <IcoListItem key={item.id} item={item} />
  }

  render() {
    return (
    <View style={{backgroundColor: '#39314'}}>
      <FlatList 
      data={this.props.favorites}
      renderItem={this.renderItem}
      />
    </View>
    );

  }
}

export default FavoritesList;
