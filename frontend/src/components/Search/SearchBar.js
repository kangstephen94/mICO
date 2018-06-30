import React from 'react';
import { View, StatusBar, TextInput } from 'react-native';
import axios from 'axios';

class SearchBar extends React.Component {
    state = {
        text: '',
        timeout: 0,
    }
    
    handleChange(text) {
        this.setState({ text }, this.checkInput.bind(this));
        const { receiveSearchResults } = this.props;
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            axios.get(`http://localhost:5000/search_icos/${this.state.text}`)
            .then(response => {
                receiveSearchResults(response.data.results);
            }
            );
        }, 250);
    }

    checkInput() {
        const { receiveSearchResults } = this.props;
        if (this.state.text === '') {
            setTimeout(() => receiveSearchResults([]), 300);
        }
    }

    render() {
    const { headerStyle } = styles;
    return (
        <View style={headerStyle}>
            <StatusBar barStyle="light-content" />
            <TextInput
                style={{ height: 25, width: 250, borderColor: 'white', backgroundColor: 'white', borderWidth: 1, paddingLeft: 15 }}
                onChangeText={
                    (text) => this.handleChange(text)
                }
                value={this.state.text}
                placeholder={'Type a category or the full crypto name'}
            />
      </View>
    );
    }

}

const styles = {
    headerStyle: {
        backgroundColor: '#1D2437',
        justifyContent: 'center',
        alignItems: 'center',
        height: 87,
        paddingTop: 35,

        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.9,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20,
        color: 'white'
    }
};

export default SearchBar;
