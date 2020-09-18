const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
	title: String,
	userID: String
});

const List = mongoose.model('List', listSchema);
const itemModel = require('./itemModel.js');

module.exports = {
	getLists: async (userID) => {
		try {
			const list =  await List.find({userID: userID});
			return (list);
		} catch (error) {
			throw new Error(error.message);		}
	},

	getList: async (id) => {
		try {
			const list = await List.find({_id: id});
			const items = await itemModel.getItemsFromList(id);
			return ({
				list,
				items
			});
		} catch (error) {
			return (error);
		}
	},

	createList: async (title, userID) => {
		try {
			const list = await List.create({
				title: title,
				userID: userID
			});
			return list._doc;
		} catch (error) {
			return (error);
		}
	},

	updateList: async (id, title) => {
		try {
			return await List.findByIdAndUpdate(id, {title}, {new: true});
		} catch (error) {
			return (error);
		}
	},

	deleteList: async (id) => {
		try {
			const list = (await List.deleteOne({_id: id})).deletedCount;
			const items = await itemModel.deleteAllItems(id);
			return ({list, items});
		} catch (error) {
			return (error);
		}
	},

	deleteUserLists: async (id) => {
		try {
			const lists = await List.find({userID: id});
			let itemsDeleted = 0;
			for(let i = 0; i < lists.length; i++) {
				let items = await itemModel.deleteAllItems(lists[i]._id);
				itemsDeleted += items;
			}
			const list = (await List.deleteMany({userID: id})).deletedCount;
			return ({list, items: itemsDeleted});
		} catch (error) {
			return error;
		}
	},

	clear: async () => {
		return await List.deleteMany({});
	},
};