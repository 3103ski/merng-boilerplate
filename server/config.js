module.exports = {
	MONGODB:
		'mongodb+srv://bjastski:newmongo@new-mongo.93yin.mongodb.net/merng-template?retryWrites=true&w=majority',
	SERCRET_KEY: '12345-67890-09876-54321',
	credentials: {
		FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
		FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
		SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
	},
	facebook: {
		clientID: '1398890980506434',
		clientSecret: '86ecc212b31f9bcc3e8cc324ae8f8d96',
	},
	google: {
		clientID: '1088263212743-lmu3v09c5jl4ji4p8r74kcvlcb18vm18.apps.googleusercontent.com',
		clientSecret: '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',
	},
	spotify: {
		clientID: '58bff4c0f1a44c53a4a373652aa4d0be',
		clientSecret: '1624e159dc854fa88ad3357d5f6b9456',
	},
};
