const db = require('../app').db;

module.exports = {
	createUser: function (username, password) {
		return new Promise(async (resolve, reject) => {
			try {
				const existingUser = await db.users.find({username});
				if (existingUser.length === 0) {
					const doc = await db.users.insert({username, password, role: 'user'});
					resolve(doc);
				} else {
					throw new Error('Username already exists');
				}
			} catch (error) {
				reject(error);
			}
		});
	},
	loginUser: function (username) {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await db.users.find({username: username});
				resolve(doc);
			} catch (error) {
				reject(error);
			}
		});
	}
};