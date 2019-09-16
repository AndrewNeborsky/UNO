const TwitterStrategy  = require('passport-twitter').Strategy;
const User = require('../models/user');
const twConfig = require('../configs/tw');

module.exports = function(passport) {

    passport.use('twitter', new TwitterStrategy({
        consumerKey: twConfig.consumerKey,
		consumerSecret: twConfig.consumerSecret,
		callbackURL: twConfig.callbackURL,
		userProfileURL  : 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',

    },
    function(token, tokenSecret, profile, done) {
    	process.nextTick(function() {

	        User.findOne({ id: profile.id, provider: profile.provider }, function(err, user) {
	            if (err)
	                return done(err);
	            if (user) {
	                return done(null, user);
	            } else {
					let user = new User();
					
					user.id = profile.id
                    user.provider = profile.provider
					user.name = profile.displayName
					user.email = profile.emails[0].value
					user.profile_img = profile.photos[0].value.replace('_normal', '')
                    
	                user.save(function(err) {
	                    if (err)
	                        throw err;
	                    return done(null, user);
	                });
	            }
	        });

		});

    }));

};