import React, { Component } from 'react';
import {
  Linking,
  StyleSheet,
  Platform,
  Text,
  View,
  ScrollView,
  YellowBox
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import FavoritesList from './FavoritesList';
YellowBox.ignoreWarnings(['Class RCTCxxModule']);

export default class LoginForm extends Component {
  
  state = {
    user: undefined, // user has not logged in yet
    favorites: undefined
  };

  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      user: JSON.parse(decodeURI(user_string)),
      favorites: JSON.parse(decodeURI(user_string)).favorites
    });

    this.props.receiveSession({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    });
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  loginWithFacebook = () => this.openURL('https://mico-ios.herokuapp.com/auth/facebook');
  // Handle Login with Google button tap
  loginWithGoogle = () => this.openURL('https://mico-ios.herokuapp.com/auth/google');
  loginWithLinkedIn = () => this.openURL('https://mico-ios.herokuapp.com/auth/linkedin');

  // Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };

  render() {
    let array;
    if (this.props.session.user) {
      array = this.props.session.user.favorites;
    }
    const containerClass = this.props.session.user ? styles.containerloggedIn : styles.container;
    return (
      <View style={containerClass}>
        <ScrollView>
        {array
          ? 
          <View style={styles.content2}>
            <FavoritesList favorites={this.props.session.user.favorites} />
          </View>
          : // Show Please log in message if not
          <View style={styles.content}>
            <Text style={styles.header}>
              Welcome Stranger!
              </Text>
            <Text style={styles.text}>
                Please log in to add and{'\n'}
                see your favorite ICOs
              </Text>
            <View style={styles.buttons}>
              <View style={styles.buttonWrapper}>
                <Icon.Button
                  style={styles.button}
                  name="facebook"
                  backgroundColor="#3b5998"
                  onPress={this.loginWithFacebook}
                  {...iconStyles}
                >
                  Login with Facebook
                </Icon.Button>
              </View>
              <View style={styles.buttonWrapper}>
                <Icon.Button
                  style={styles.button}
                  name="google"
                  backgroundColor="#DD4B39"
                  onPress={this.loginWithGoogle}
                  {...iconStyles}
                >
                  Login with Google
              </Icon.Button>
              </View>
              <View style={styles.buttonWrapper}>
                <Icon.Button
                  style={styles.button}
                  name="linkedin"
                  backgroundColor="#0077B5"
                  onPress={this.loginWithLinkedIn}
                  {...iconStyles}
                >
                  Login with LinkedIn
                </Icon.Button>
              </View>
            </View>
          </View>
        }
        {/* Login buttons */}
        </ScrollView>
        {/* <View>
          <Footer />
        </View> */}
      </View>
    );
  }
}



const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd'
  },
  containerloggedIn: {
    flex: 1,
    backgroundColor: '#39314B'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120
  },
  content2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 30,
    // justifyContent: 'space-around'
  },
  buttonWrapper: {
    marginBottom: 15
  }
});

