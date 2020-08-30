const db = require('../app').db;

module.exports = {
	getItems: () => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await db.find({});
				resolve(doc);
			} catch (error) {
				reject(error);
			}
		});
	},

	createItem: (title, done, date) => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await db.insert({
					title: title,
					done: done,
					created: date
				});
				resolve(doc);
			} catch (error) {
				reject(error);
			}
		});
	},

	updateItem: (id, title, done, date) => {
		console.log(title);
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await db.update(
					{
						_id: id
					}, {
						$set: {
							title: title,
							done: done,
							updated: date
						}
					}); resolve(doc);
			} catch (error) {
				reject(error);
			}
		});
	},

	deleteItem: (id) => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await db.remove({
					_id: id
				});
				resolve(doc);
			} catch (error) {
				reject(error);
			}
		});
	}
};
