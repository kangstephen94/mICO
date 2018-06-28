import React, { Component } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import Footer from '../Footer';

export default class App extends Component {

  state = {
    user: undefined, // user has not logged in yet
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
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    });
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  loginWithFacebook = () => this.openURL('http://localhost:5000/auth/facebook');
  // Handle Login with Google button tap
  loginWithGoogle = () => this.openURL('http://localhost:5000/auth/google');
  loginWithLinkedIn = () => this.openURL('http://localhost:5000/auth/linkedin');

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
    const { user } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
        {user
          ? // Show user info if already logged in
          <View style={styles.content}>
          {/* Check to see if the user has any favorites.  If not, render Please add favorites.  If they do render their favorites. */}
          </View>
          : // Show Please log in message if not
          <View style={styles.content}>
            <Text style={styles.header}>
              Welcome Stranger!
              </Text>
            <Text style={styles.text}>
              Please log in to continue {'\n'}
              to see your favorite ICOs
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
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
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

