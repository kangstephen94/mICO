import React from 'react';
import IcoListItem from '../IndexPage/IcoListItem';
import { View, FlatList } from 'react-native';

class FavoritesList extends React.Component {

  renderItem({item}) {
    return <IcoListItem key={item.id} item={item} type={item.type}/>
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
