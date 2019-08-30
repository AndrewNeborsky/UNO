var TwitterStrategy  = require('passport-twitter').Strategy;
var User = require('../models/user');
var twConfig = require('../configs/tw');

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
					var user = new User();
					
					user.id = profile.id
					user.name = profile.displayName
                    user.email = profile.emails[0].value
                    user.provider = profile.provider
                    
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