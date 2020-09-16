const chai = require('chai');
chai.should();
const db = require('../database/db').db;
const userModel = require('../models/userModel');
const listModel = require('../models/listModel');
const itemModel = require('../models/itemModel');
const moment = require('moment');

function randString(string = '') {
	return string + Math.random().toString(20).substr(2, 6);
}
function randNumber() {
	return Math.floor(Math.random() * 6) + 1;
}
function randBool() {
	return Math.random() >= 0.5;
}

describe('todo model tests', () => {
	beforeEach(async function () {
		await db.users.remove({}, {multi: true});
		await db.items.remove({}, {multi: true});
		await db.lists.remove({}, {multi: true});
		this.currentTest.user = await userModel.createUser(randString(), randString());
	});
	it('should create a todolist', async function () {
		// arrange
		const user = this.test.user;
		// act
		const title = randString();
		const todoList = await listModel.createList(title, user._id);
		// assert
		todoList.title.should.equal(title);
		todoList.should.have.keys(['title', 'userID', '_id']);
	});
	it('should return all lists', async function () {
		// arrange 
		const user = this.test.user;
		for (let i = randNumber(); i < 10; i++) {
			await listModel.createList(randString(), user._id);
		}
		// act
		const todoLists = await listModel.getLists(user._id);
		// assert
		todoLists.should.be.an('array');
		todoLists[0].should.have.keys(['title', 'userID', '_id']);
	});
	it('should return list and items', async function () {
		// arrange 
		const user = this.test.user;
		const testList = await listModel.createList(randString(), user._id);
		for (let i = randNumber(); i < 10; i++) {
			await itemModel.createItem(randString(), randBool(), moment().format(), testList._id);
		}
		// act
		const todoList = await listModel.getList(testList._id);
		// assert
		todoList.should.have.keys(['list', 'items']);
		todoList.items.should.be.an('array');
		todoList.items[0].should.have.keys(['title', 'done', 'created', 'listID', '_id']);
	});
	it('should update a todolist', async function () {
		// arrange
		const user = this.test.user;
		const todoList = await listModel.createList(randString(), user._id);
		// act
		const newTitle = randString();
		await listModel.updateList(todoList._id, newTitle);
		// assert
		const updatedList = await listModel.getList(todoList._id);
		updatedList.list.title.should.equal(newTitle);
	});
	it('should delete a todolist', async function () {
		// arrange
		const user = this.test.user;
		const todoList = await listModel.createList(randString(), user._id);
		for (let i = randNumber(); i < 10; i++) {
			await itemModel.createItem(randString(), randBool(), moment().format(), todoList._id);
		}
		const list = await listModel.getList(todoList._id);
		// act
		const deletedList = await listModel.deleteList(todoList._id);
		// assert
		deletedList.list.should.equal(1);
		deletedList.items.should.equal(list.items.length);
	});
	it('should test', () => {
		let test = true;
		test.should.equal(true);
		test.should.equal(true);
	});
});