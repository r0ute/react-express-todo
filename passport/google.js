const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config/loader');
const User = require('../models/User');

module.exports = new GoogleStrategy({
        clientID: config.auth.google.clientId,
        clientSecret: config.auth.google.clientSecret,
        callbackURL: '/auth/google/callback'
    }, function (accessToken, refreshToken, profile, done) {
        console.log('Google profile', profile);

        User.findOneAndUpdate({
            provider: 'google',
            id: profile.id
        }, profile, {
            new: true,
            upsert: true
        }).exec()
            .then(user => done(null, user))
            .catch(err => done(err));
    }
);
