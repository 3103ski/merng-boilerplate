const express = require('express');
const axios = require('axios');
const passport = require('passport');
// const bcrypt = require('bcrypt');

const cors = require('./cors');
const auth = require('./authenticate.js');
const User = require('../models/User.js');

const authRouter = express.Router();

authRouter
	.route('/signup')
	.options(cors.cors, (req, res) => res.sendStatus(200))
	.post(cors.cors, (req, res, next) => {
		const { email, password, confirmPassword, displayName } = req.body;
		const existingUser = User.find({ email })[0];
		if (existingUser) {
			res.statusCode = 400;
			res.setHeader('Content-Type', 'application/json');
			res.json({
				errors: {
					email: 'This email already has an account',
				},
			});
		} else {
			if (password === confirmPassword) {
				User.register(new User({ email, displayName }), password, (err, user) => {
					if (err) {
						res.statusCode = 500;
						res.setHeader('Content-Type', 'application/json');
						res.json({ err });
					} else {
						user.save((err) => {
							if (err) {
								res.statusCode = 500;
								res.setHeader('Content-Type', 'application/json');
								res.json({ err });
							}
							passport.authenticate('local')(req, res, () => {
								const token = auth.getToken({ _id: req.user._id });

								res.statusCode = 200;
								res.setHeader('Content-Type', 'application/json');
								3;
								res.json({
									token,
									success: true,
									status: 'Registration Successful',
									user: user,
								});
							});
						});
					}
				});
			} else {
				res.statusCode = 400;
				res.setHeader('Content-Type', 'application/json');
				res.json({
					errors: {
						password: 'Passwords do not match',
					},
				});
			}
		}
	});

authRouter.post('/login', cors.cors, passport.authenticate('local'), (req, res) => {
	const token = auth.getToken({ _id: req.user._id });
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json({
		success: true,
		token: token,
		status: 'You are successfully logged in!',
		user: req.user,
	});
});

authRouter
	.route('/google/token')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.corsWithOptions, passport.authenticate('google-token'), (req, res) => {
		const token = auth.getToken({ _id: req.user._id });
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json({
			success: true,
			token: token,
			status: 'You are successfully logged in!',
			user: req.user,
		});
	});

authRouter
	.route('/facebook/token')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.corsWithOptions, passport.authenticate('facebook-token'), (req, res) => {
		const token = auth.getToken({ _id: req.user._id });
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json({
			success: true,
			token: token,
			status: 'You are successfully logged in!',
			user: req.user,
		});
	});

authRouter
	.route('/change-password')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.post(cors.cors, passport.authenticate('local'), (req, res) => {
		User.findByUsername(req.user.email).then((user) => {
			const { newPassword, confirmNewPassword } = req.body;
			if (newPassword === confirmNewPassword) {
				user.setPassword(newPassword, () => {
					user.save();

					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json({
						user: req.user,
						status: 'Password updated!',
					});
				});
			}
		});
	});

authRouter
	.route('/spotify/token')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.post(cors.corsWithOptions, (req, res, next) => {
		if (req.body.token) {
			const bearer = `Bearer ${req.body.token}`;
			axios
				.get('https://api.spotify.com/v1/me', {
					headers: {
						Authorization: bearer,
					},
				})
				.then((spotifyResponse) => {
					const profile = spotifyResponse.data;
					console.log(profile);
					User.findOne({ spotifyId: profile.id }, (err, user) => {
						if (err) {
							res.statusCode = 500;
							res.setHeader('Content-Type', 'application/json');
							res.json({
								success: false,
								status: 'There was an error',
								errorMsg: err,
							});
						}
						if (!err && user) {
							const token = auth.getToken({ _id: user._id });
							res.statusCode = 200;
							res.setHeader('Content-Type', 'application/json');
							res.json({
								success: true,
								status: 'You are successfully logged in!',
								token,
								user,
							});
						} else {
							let user = new User({
								displayName: profile.email.split('@')[0],
								email: profile.email,
								spotifyId: profile.id,
							});
							user.save();

							const token = auth.getToken({ _id: user._id });
							res.statusCode = 200;
							res.setHeader('Content-Type', 'application/json');
							res.json({
								success: true,
								status: 'You are successfully logged in!',
								token,
								user,
							});
						}
					});
				})
				.catch((err) => next(err));
		}
	});

module.exports = authRouter;
