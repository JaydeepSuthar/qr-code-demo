const jwt = require('jsonwebtoken');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports.isLoggedIn = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (process.env.NODE_ENV?.toLowerCase() === 'production') {
		if (!token)
			return res.status(401).json({ msg: 'Access Denied', data: {} });

		try {
			const verified = jwt.verify(
				token,
				process.env.JWT_ACCESS_TOKEN_SECRET
			);
			req.token = verified;
		} catch (err) {
			return res.status(401).json({ msg: err.name, data: err });
		}
	}
	next();
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports.checkRefreshToken = (req, res, next) => {
	// const authHeader = req.headers["authorization"];
	// const token = authHeader && authHeader.split(" ")[1];
	const token = req.body.refresh;

	if (process.env.NODE_ENV?.toLowerCase() === 'production') {
		if (!token) return res.status(401).json({ msg: 'Access Denied' });

		try {
			const verified = jwt.verify(
				token,
				process.env.JWT_REFRESH_TOKEN_SECRET
			);
			req.user = verified;
		} catch (err) {
			return res.status(401).json({ msg: err.name, data: err });
		}
	}

	next();
};
