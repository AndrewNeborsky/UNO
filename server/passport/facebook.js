var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var fbConfig = require('../configs/fb');

module.exports = function(passport) {

    passport.use('facebook', new FacebookStrategy({
        clientID: fbConfig.clientID,
        clientSecret: fbConfig.clientSecret,
        callbackURL: fbConfig.callbackURL,
        profileFields: ['id', 'email', 'displayName']
    },

    function(access_token, refresh_token, profile, done) {

        process.nextTick(function() {

            User.findOne({ id: profile.id, provider: profile.provider }, function(err, user) {
                if (err)
                    return done(err)

                if (user) {
                    return done(null, user)
                } else {
                    var user = new User()

                    user.id = profile.id
                    user.name = profile.displayName
                    user.email = profile.emails[0].value
                    user.provider = profile.provider

                    user.save(function(err) {
                        if (err)
                            throw err;

                        return done(null, user)
                    });
                }
            });
        });
    }));
}
