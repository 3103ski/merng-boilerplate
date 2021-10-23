const User = require('../../models/User');
const bcrypt = require('bcrypt');
const { UserInputError } = require('apollo-server-express');
const checkAuth = require('../../util/checkAuth');
const jwt = require('jsonwebtoken');

const { SERCRET_KEY } = require('../../config');

function generateToken(user) {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		SERCRET_KEY,
		{ expiresIn: '1h' }
	);
}

module.exports = {
	Query: {
		async getUser(_, { userId }) {
			const user = User.findById(userId);
			if (user) {
				return user;
			}
		},
		async getUsers() {
			const users = await User.find();
			return users;
		},
	},
	Mutation: {
		async login(_, { loginInput: { email, password } }) {
			const user = await User.findOne({ username: email });

			if (!user) {
				throw new UserInputError('User not found', {
					errors: {
						email: 'No user was found with this username',
					},
				});
			}

			const match = await bcrypt.compare(password, user.password);

			if (!match) {
				throw new UserInputError('Wrong Credentials', {
					errors: {
						password: 'The password you enetered is incorrect',
					},
				});
			}

			const token = generateToken(user);

			return {
				...user._doc,
				id: user._id,
				token,
			};
		},
		async updatePassword(
			_,
			{ updatePasswordInput: { password, newPassword, confirmNewPassword } },
			context
		) {
			const validatedUser = checkAuth(context);

			if (validatedUser) {
				const user = await User.findById(validatedUser.id);
				const match = await bcrypt.compare(password, user.password);

				if (!match) {
					throw new UserInputError('Wrong Credentials', {
						errors: {
							password: 'The password you entered for this user is not correct',
						},
					});
				} else {
					if (newPassword === confirmNewPassword) {
						const newPasswordEncrypted = await bcrypt.hash(newPassword, 12);

						user.password = newPasswordEncrypted;

						const res = await user.save();
						const token = generateToken(res);

						return {
							...res._doc,
							id: res._id,
							token,
						};
					} else {
						throw new UserInputError('Passwords do not match', {
							errors: {
								confirmNewPassword: 'The passwords you entered do not match',
							},
						});
					}
				}
			}
		},
		async register(_, { registerInput: { email, password, confirmPassword } }) {
			const user = await User.findOne({ username: email });

			if (user) {
				throw new UserInputError('Email already registered', {
					errors: {
						email: 'This email already has an account',
					},
				});
			}

			if (password === confirmPassword) {
				password = await bcrypt.hash(password, 12);

				const newUser = new User({
					email,
					username: email,
					password,
					createdAt: new Date().toISOString(),
				});

				const res = await newUser.save();
				const token = generateToken(res);

				return {
					...res._doc,
					id: res._id,
					token,
				};
			} else {
				throw new UserInputError('The passwords do not match', {
					errors: {
						confirmPassword: 'Passwords do not match',
					},
				});
			}
		},
	},
};
