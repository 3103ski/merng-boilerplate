const express = require('express');
const axios = require('axios');
const passport = require('passport');

const cors = require('./cors');
const auth = require('./authenticate.js');
const User = require('../models/User.js');
const { jsonRESPONSE } = require('../util/responseHelpers.js');

const authRouter = express.Router();

authRouter
	.route('/signup')
	.options(cors.cors, (_, res) => res.sendStatus(200))
	.post(cors.cors, (req, res) => {
		const { email, password, confirmPassword, displayName } = req.body;
		const existingUser = User.find({ email })[0];

		if (existingUser) {
			return jsonRESPONSE(400, res, {
				errors: {
					email: 'This email already has an account',
				},
			});
		} else {
			if (password === confirmPassword) {
				User.register(new User({ email, displayName }), password, (err, user) => {
					if (err) {
						return jsonRESPONSE(500, res, { err });
					} else {
						user.save((err) => {
							if (err) {
								return jsonRESPONSE(500, res, { err });
							}
							return passport.authenticate('local')(req, res, () =>
								jsonRESPONSE(200, res, {
									token: auth.getToken({ _id: req.user._id }),
									success: true,
									status: 'Registration Successful',
									user,
								})
							);
						});
					}
				});
			} else {
				return jsonRESPONSE(400, res, {
					errors: {
						password: 'Passwords do not match',
					},
				});
			}
		}
	});

authRouter
	.route('/google/token')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.corsWithOptions, passport.authenticate('google-token'), (req, res) =>
		jsonRESPONSE(200, res, {
			success: true,
			token: auth.getToken({ _id: req.user._id }),
			status: 'You are successfully logged in!',
			user: req.user,
		})
	);

authRouter
	.route('/facebook/token')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.corsWithOptions, passport.authenticate('facebook-token'), (req, res) =>
		jsonRESPONSE(200, res, {
			success: true,
			token: auth.getToken({ _id: req.user._id }),
			status: 'You are successfully logged in!',
			user: req.user,
		})
	);

authRouter
	.route('/spotify/token')
	.options(cors.corsWithOptions, (_, res) => res.sendStatus(200))
	.post(cors.corsWithOptions, (req, res, next) => {
		if (req.body.token) {
			const bearer = `Bearer ${req.body.token}`;
			axios
				.get('https://api.spotify.com/v1/me', {
					headers: {
						Authorization: bearer,
					},
				})
				.then(({ data: profile }) => {
					User.findOne({ spotifyId: profile.id }, (err, user) => {
						if (err) {
							return jsonRESPONSE(500, res, {
								success: false,
								status: 'There was an error',
								errorMsg: err,
							});
						}
						if (!err && user) {
							return jsonRESPONSE(200, res, {
								success: true,
								status: 'You are successfully logged in!',
								token: auth.getToken({ _id: user._id }),
								user,
							});
						} else {
							let user = new User({
								displayName: profile.email.split('@')[0],
								email: profile.email,
								spotifyId: profile.id,
							});
							user.save();

							return jsonRESPONSE(200, res, {
								success: true,
								status: 'You are successfully logged in!',
								token: auth.getToken({ _id: user._id }),
								user,
							});
						}
					});
				})
				.catch((err) => next(err));
		}
	});

authRouter.post('/login', cors.cors, passport.authenticate('local'), (req, res) =>
	jsonRESPONSE(200, res, {
		success: true,
		token: auth.getToken({ _id: req.user._id }),
		status: 'You are successfully logged in!',
		user: req.user,
	})
);

authRouter
	.route('/change-password')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.post(cors.cors, passport.authenticate('local'), (req, res) => {
		User.findByUsername(req.user.email).then((user) => {
			const { newPassword, confirmNewPassword } = req.body;
			if (newPassword === confirmNewPassword) {
				user.setPassword(newPassword, () => {
					user.save();
					return jsonRESPONSE(200, res, {
						user: req.user,
						status: 'Password updated!',
					});
				});
			}
		});
	});

module.exports = authRouter;
