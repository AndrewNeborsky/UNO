const facebook = require('./facebook');
const twitter = require('./twitter');
const User = require('../models/user');

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    facebook(passport);
    twitter(passport);

}