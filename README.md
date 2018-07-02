# mICO

## Description
<center>![title](https://s3-us-west-1.amazonaws.com/micoimage/title.png)</center>

[mICO](https://github.com/kangstephen94/mICO) is an IOS app that helps users monitor and participate in ongoing and upcoming initial coin offerings(ICO). You can also check out nearby crypto-related events in the San Francisco area.

## Project Design
mICO was designed over a 10 day period in June of 2018.  Prior to development a list of minimum viable products (MVPs) and sample wireframes were created to demonstrate the planning process and track progression throughout development.  Each team member was focused on a specific aspect of the app, such as working the backend to implement OAuth, to efficiently develop the app.

## Technologies
mICO was built using a MongoDB database with Express.js framework for the backend.  Axios requests were used to communicate with the backend and all responses render JSON back to the frontend which uses React Native, a library that allows you to build mobile apps using JavaScript.

React Native sets up the frontend state such that there are separate reducers and actions for receiving users, ICOs, or events.  This makes keeping components up to date simpler and more controlled leading to a better UX design.

Additional Sources:
* [React Native](https://facebook.github.io/react-native/), [MERN Stack](http://mern.io/)

## Key Features
* O-Auth, which allows sign in via Google, Facebook, or LinkedIn
* ICO profiles and index
* ICO search functionality
* Integrated map
* Events index on map page
* Favorite ICOs

### OAuth
User Authorization utilizes Google passport to incorporate different methods of logging in.  User login is required to have favorite ICOs.  When navigating through the app and attempting to favorite an ICO, the user is redirected to the login page if they are not currently signed in.
<center>![login](https://s3-us-west-1.amazonaws.com/micoimage/login.png)</center>

### Search Functionality
Users can type in keywords to search for relevant ICOs, whether they are upcoming or currently ongoing.  Changing the search parameters dynamically renders a list of any ICOs that pertain to the search.

<center>![search](https://s3-us-west-1.amazonaws.com/micoimage/search.png)</center>

This works by issuing a new axios request every single time the input is changed.  However to create a seamless experience the update process is asynchronous so that the app updates once the user stops typing.

``` javascript
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
            throw error;
        });
    }, 300);
}
```


## Future Plans
* Update Map to take the User's current location via geolocation or built in settings
* Update Markers to be more interactive
* Implement real time events with API
* Further polish user interface and design
