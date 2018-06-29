const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport');
require('./models/Ico');
const ICObench = require('./services/icobenchapi.js')

// Uncomment after testing locally
mongoose.connect(keys.mongoURI);

// Used for local testing
// mongoose.connect('mongodb://localhost/mico');

const app = express();
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

require('./routes/authRoutes')(app);
require('./routes/favoriteRoutes')(app);
require('./routes/icoBenchApi')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
