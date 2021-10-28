const { User } = require('../../models/');

const GoogleTokenStrategy = require('passport-token-google2').Strategy;

const config = require('../../config.js');
const passport = require('passport');

const { clientID, clientSecret } = config.google;

module.exports.googleStrategy = passport.use(
	new GoogleTokenStrategy(
		{
			clientID,
			clientSecret,
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
