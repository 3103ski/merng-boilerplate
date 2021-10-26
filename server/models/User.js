const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		lastLogin: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = model('User', userSchema);
