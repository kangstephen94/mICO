import React from 'react';
import { Text, View } from 'react-native';

class SearchList extends React.Component {

    state

    render() {
        const { results } = this.props;
        console.log(results);
        if (results === undefined) {
            return null;
        }
        const searchResults = results.map(result => (<Text>{result.name}</Text>)
        );

        return (
            <View>{searchResults}</View>
        );
    }
}

export default SearchList;
