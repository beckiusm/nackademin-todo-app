const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	title: String,
	done: Boolean,
	created: Date,
	listID: String
});

const Item = mongoose.model('Item', itemSchema);

module.exports = {
	getItems: async () => {
		try {
			return await Item.find({});
		} catch (error) {
			return(error);
		}
	},

	getItemsFromList: async (id) => {
		try {
			return await Item.find({listID: id});
		} catch (error) {
			return(error);
		}
	},

	getItem: async (id) => {
		try {
			return await Item.findOne({_id: id});
		} catch (error) {
			return (error);
		}
	},

	createItem: async (title, done, date, listID) => {
		try {
			const item = Item.create({
				title: title,
				done: done,
				created: date,
				listID: listID
			});
			return item._doc;
		} catch (error) {
			return (error);
		}
	},


	updateItem: async (id, title, done, date) => {
		try {
			return await Item.findByIdAndUpdate(
				id, 
				{
					title: title,
					done: done,
					updated: date
				}, 
				{new: true}
			);
		} catch (error) {
			return (error);
		}
	},

	deleteItem: async (id) => {
		try {
			return await Item.deleteOne({_id: id});
		} catch (error) {
			return (error);
		}
	},

	deleteAllItems: async (listID) => {
		try {
			return await (await Item.deleteMany({listID: listID})).deletedCount;
		} catch (error) {
			return (error);
		}
	},

	clear: async () => {
		return await Item.deleteMany({});
	},
};
