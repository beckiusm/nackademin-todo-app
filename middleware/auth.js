const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function auth (req, res, next) {
	if (!req.headers.authorization) {
		return res.sendStatus(401);
	}
	const token = req.headers.authorization.replace('Bearer ', '');
	try {
		const payload = jwt.verify(token, secret);
		req.user = payload;
		next();
	} catch (error) {
		res.sendStatus(401);
	}
}

module.exports = {auth};
