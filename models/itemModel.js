const db = require('../database/db').db;

module.exports = {
	getItems: () => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await db.items.find({});
				resolve(doc);
			} catch (error) {
				reject(error);
			}
		});
	},

	getItem: (id) => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await db.items.findOne({_id: id});
				resolve(doc);
			} catch (error) {
				reject(error);
			}
		});
	},

	createItem: (title, done, date, listID) => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await db.items.insert({
					title: title,
					done: done,
					created: date,
					listID: listID
				});
				resolve(doc);
			} catch (error) {
				reject(error);
			}
		});
	},


	updateItem: (id, title, done, date) => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await db.items.update(
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
				const doc = await db.items.remove({
					_id: id
				});
				resolve(doc);
			} catch (error) {
				reject(error);
			}
		});
	}
};
