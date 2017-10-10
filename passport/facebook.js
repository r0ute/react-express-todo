const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config/loader');
const User = require('../models/User');

module.exports = new FacebookStrategy({
        clientID: config.auth.facebook.clientId,
        clientSecret: config.auth.facebook.clientSecret,
        callbackURL: '/auth/facebook/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        console.log('Facebook profile', profile);

        User.findOneAndUpdate({
            provider: 'facebook',
            id: profile.id
        }, profile, {
            new: true,
            upsert: true
        }).exec()
            .then(user => done(null, user))
            .catch(err => done(err));
    }
);