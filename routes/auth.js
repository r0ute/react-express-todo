const passport = require('passport');
const express = require('express');
const router = express.Router();

router.route('/google')
    .get(passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

router.route('/google/callback')
    .get(passport.authenticate('google', {
        failureRedirect: '/'
    }), function (req, res) {
        res.redirect('/');
    });

module.exports = router;
