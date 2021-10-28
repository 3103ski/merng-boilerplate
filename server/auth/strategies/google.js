const { User } = require('../../models/');

const GoogleTokenStrategy = require('passport-token-google2').Strategy;

const passport = require('passport');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../../config.js').credentials;

module.exports.googleStrategy = passport.use(
	new GoogleTokenStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		},
		async function (accessToken, refreshToken, profile, done) {
			User.findOne({ googleId: profile.id }, async (err, user) => {
				if (err) {
					return done(err, false);
				}
				if (!err && user) {
					return done(null, user);
				} else {
					user = new User({
						email: profile.emails[0].value,
						displayName: profile.emails[0].value.split('@')[0],
						googleId: profile.id,
					});

					user.save((err) => {
						if (err) {
							return done(err, false);
						} else {
							return done(null, user);
						}
					});
				}
			});
		}
	)
);
