const passport = require('passport');
const express = require('express');
const router = express.Router();

router.route('/google')
    .get(passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
    }));

router.route('/google/callback')
    .get(passport.authenticate('google'), function (req, res) {
        res.redirect('/');
    });

router.route('/facebook')
    .get(passport.authenticate('facebook'));

router.route('/facebook/callback')
    .get(passport.authenticate('facebook'), function (req, res) {
        res.redirect('/');
    });

module.exports = router;
