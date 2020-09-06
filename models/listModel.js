const db = require('../database/db').db;

module.exports = {
	getLists: (userID) => {
		return new Promise(async (resolve, reject) => {
			try {
				const list = await db.lists.find({
					userID: userID
				});
				resolve(list);
			} catch (error) {
				reject(error);
			}
		});
	},

	getList: (id) => {
		return new Promise(async (resolve, reject) => {
			try {
				const list = await db.lists.findOne({
					_id: id
				});
				const items = await db.items.find({
					listID: id
				});
				const listAndItems = {
					list,
					items
				};
				resolve(listAndItems);
			} catch (error) {
				reject(error);
			}
		});
	},

	createList: (title, userID) => {
		return new Promise(async (resolve, reject) => {
			try {
				const list = await db.lists.insert({
					title: title,
					userID: userID
				});
				resolve(list);
			} catch (error) {
				reject(error);
			}
		});
	},

	updateList: (id, title) => {
		return new Promise(async (resolve, reject) => {
			try {
				const list = await db.lists.update({
					_id: id
				}, {
					$set: {
						title: title,
					}
				});
				resolve(list);
			} catch (error) {
				reject(error);
			}
		});
	},

	deleteList: (id) => {
		return new Promise(async (resolve, reject) => {
			try {
				const list = await db.lists.remove({
					_id: id
				});
				resolve(list);
			} catch (error) {
				reject(error);
			}
		});
	}
};