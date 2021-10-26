const express = require('express');
const axios = require('axios');
const passport = require('passport');

const cors = require('./cors');
const auth = require('./authenticate.js');

const User = require('../models/User.js');

const authRouter = express.Router();

authRouter
	.route('/signup')
	.options(cors.cors, (req, res) => res.sendStatus(200))
	.post(cors.cors, (req, res, next) => {
		User.register(new User({ email: req.body.email }), req.body.password, (err, user) => {
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
						res.statusCode = 200;
						res.setHeader('Content-Type', 'application/json');
						res.json({
							success: true,
							status: 'Registration Successful',
							user: user,
						});
					});
				});
			}
		});
	});

authRouter.post('/login', cors.cors, passport.authenticate('local'), (req, res) => {
	const token = auth.getToken({ _id: req._id });
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json({
		success: true,
		token: token,
		status: 'You are successfully logged in!',
		user: req.user,
	});
});

module.exports = authRouter;
