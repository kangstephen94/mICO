import React from 'react';
import { Text, View } from 'react-native';
import FavoritesList from '../LoginForm/FavoritesList';

class SearchList extends React.Component {
    componentWillUnmount() {
      this.props.receiveSearchResults([]);
    }

    render() {
        const { results } = this.props;
        if (results === undefined) {
            return null;
        }
        return (
          <View>
            <FavoritesList favorites={results} />
          </View>
        );
    }
}

const styles = {
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  }
};

export default SearchList;
