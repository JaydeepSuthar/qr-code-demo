const jwt = require('jsonwebtoken');

module.exports.generateAccessToken = (payload) => {
	return new Promise((resolve, reject) => {
		let token = jwt.sign({}, process.env.JWT_ACCESS_TOKEN_SECRET, {
			expiresIn: '1h',
			// issuer: '',
			audience: payload,
		});

		resolve(token);
	});
};

module.exports.generateRefreshToken = (payload) => {
	return new Promise((resolve, reject) => {
		let token = jwt.sign({}, process.env.JWT_REFRESH_TOKEN_SECRET, {
			expiresIn: '2d',
			// expiresIn: '5m',
			// issuer: '',
			audience: payload,
		});

		resolve(token);
	});
};
