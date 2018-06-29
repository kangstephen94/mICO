const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Event');
require('./services/passport');

mongoose.connect(keys.mongoURI);
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
require('./routes/eventRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
