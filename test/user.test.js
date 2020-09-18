const chai = require('chai');
chai.should();
const db = require('../database/db');
const userModel = require('../models/userModel');
const listModel = require('../models/listModel');
const itemModel = require('../models/itemModel');
const moment = require('moment');
const mongoose = require('mongoose');

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
	before( async function () {
		await db.connect();
	});
	after( async function () {
		await db.disconnect();
	});
	beforeEach(async function () {
		await userModel.clear();
		await itemModel.clear();
		await listModel.clear();
		this.currentTest.user = await userModel.createUser(randString(), randString(), 'admin');
	});
	it('delete a user', async function () {
		const user = this.test.user;
		for (let i = 0; i < 5; i++) {
			let todoList = await listModel.createList(randString(), user._id);
			for (let x = 0; x < 8; x++) {
				await itemModel.createItem(randString(), randBool(), moment().format(), todoList._id);
			}
		}
		const deletedUser = await userModel.deleteUser(user._id);
		deletedUser.user.should.equal(1);
		deletedUser.list.list.should.equal(5);
		deletedUser.list.items.should.equal(40);
	});
	it('return userinfo', async function () {
		const user = this.test.user;
		for (let i = randNumber(); i < 10; i++) {
			let todoList = await listModel.createList(randString(), user._id);
			for (let i = randNumber(); i < 10; i++) {
				await itemModel.createItem(randString(), randBool(), moment().format(), todoList._id);
			}
		}
		const userInfo = await userModel.getUserInfo(user._id);
		const list = userInfo[1].list[0]._doc;
		const items = userInfo[1].items[0]._doc;
		list.should.have.keys(['title', 'userID', '_id', '__v']);
		items.should.have.keys(['title', 'done', 'created', 'listID', '_id', '__v']);
	});
});