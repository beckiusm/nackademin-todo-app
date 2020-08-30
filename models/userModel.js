const db = require('../app').db;

module.exports = {
	createUser: function (username, password) {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await db.insert({username, password, role: 'user'});
				resolve(doc);
			} catch (error) {
				reject(error);
			}
		});
	},
	loginUser: function (username) {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await db.find({username: username});
				resolve(doc);
			} catch (error) {
				reject(error);
			}
		});
	}
    

};