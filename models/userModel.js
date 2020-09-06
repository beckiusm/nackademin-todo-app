const db = require('../database/db').db;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;


module.exports = {
	createUser: function (username, password) {
		return new Promise(async (resolve, reject) => {
			bcrypt.hash(password, 10, async (err, hashedPassword) => {
				try {
					const doc = await db.users.insert({username, password: hashedPassword});
					resolve(doc);
				} catch (error) {
					reject(error);
				}
			});
		});
	},

	loginUser: function (username, password, role = 'user') {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await db.users.findOne({username: username});
				bcrypt.compare(password, user.password, (err, result) => {
					if(!result) {
						return false;
					} else {
						const token = jwt.sign(user, secret);
						resolve(token);
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	}

};