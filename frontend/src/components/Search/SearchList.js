import React from 'react';
import { Text, View } from 'react-native';
import FavoritesList from '../LoginForm/FavoritesList';

class SearchList extends React.Component {
    componentWillUnmount() {
      console.log('searchlist unmount');
    }

    render() {
        const { results } = this.props;
        console.log("results", results);
        if (results === undefined) {
            return null;
        }
        const searchResults = results.map(result => (<Text>{result.name}</Text>)
        );

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
