import React from 'react';
import { View, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Actions } from 'react-native-router-flux';
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
            ).catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                throw error;
            });
        }, 250);
    }

    handleBack() {
      Actions.pop();
    }

    checkInput() {
        const { receiveSearchResults } = this.props;
        if (this.state.text === '') {
            setTimeout(() => receiveSearchResults([]), 300);
        }
    }

    render() {
    const { headerStyle, textInput, searchIcon, backIcon } = styles;
    return (
        <View style={headerStyle}>
            <StatusBar barStyle="light-content" />
            <View style={{position: 'relative', flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={this.handleBack.bind(this)} style={{marginRight: 18}}>
                <FontAwesome style={backIcon}>{Icons.chevronLeft}</FontAwesome>
              </TouchableOpacity>
              <TextInput
                  style={textInput}
                  onChangeText={
                      (text) => this.handleChange(text)
                  }
                  value={this.state.text}
                  placeholder={'Category or the full crypto name'}
              />
              <FontAwesome style={searchIcon}>{Icons.search}</FontAwesome>
            </View>
      </View>
    );
    }

}

const styles = {
    headerStyle: {
        backgroundColor: '#1D2437',
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
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
    },
    textInput: {
        height: 35,
        width: 290,
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 1,
        paddingLeft: 15,
        borderRadius: 5
    },
    searchIcon: {
      position: 'absolute',
      right: 7,
      top: 7,
      color: '#ccc',
      fontSize: 20
    },
    backIcon: {
      color: '#eee',
      fontSize: 20,
    }
};

export default SearchBar;
