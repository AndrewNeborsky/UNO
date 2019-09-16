const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const fbConfig = require('../configs/fb');

module.exports = function(passport) {

    passport.use('facebook', new FacebookStrategy({
        clientID: fbConfig.clientID,
        clientSecret: fbConfig.clientSecret,
        callbackURL: fbConfig.callbackURL,
        profileFields: ['id', 'email', 'displayName', 'picture.type(large)']
    },

    function(access_token, refresh_token, profile, done) {

        process.nextTick(function() {

            User.findOne({ id: profile.id, provider: profile.provider }, function(err, user) {
                if (err)
                    return done(err)

                if (user) {
                    return done(null, user)
                } else {
                    let user = new User()

                    user.id = profile.id
                    user.name = profile.displayName
                    user.email = profile.emails[0].value
                    user.provider = profile.provider
                    user.profile_img = profile.photos[0].value

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
