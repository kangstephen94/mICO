const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedInStrategy = require('passport-linkedin').Strategy;
const mongoose = require('mongoose');

const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ profileID: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    new User({ profileID: profile.id, favorites: [] }).save()
                    .then(user => done(null, user));
                }
            });
    }
));

passport.use(new FacebookStrategy(
    {
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: '/auth/facebook/callback',
        proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ profileID: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    new User({ profileID: profile.id, favorites: [] }).save()
                    .then(user => done(null, user));
                }
            });
    }
));

passport.use(new LinkedInStrategy({
    consumerKey: keys.linkedinClientID,
    consumerSecret: keys.linkedinClientSecret,
    callbackURL: '/auth/linkedin/callback',
    proxy: true
},
    (token, tokenSecret, profile, done) => {
        User.findOne({ profileID: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    new User({ profileID: profile.id, favorites: [] }).save()
                        .then(user => done(null, user));
                }
            });
    }
));
