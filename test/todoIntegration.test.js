const app = require('../app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
const db = require('../database/db').db;
const userModel = require('../models/userModel');
const listModel = require('../models/listModel.js');
const { request } = chai;

function randString(string = '') {
	return string + Math.random().toString(20).substr(2, 6);
}
function randNumber() {
	return Math.floor(Math.random() * 6) + 1;
}
function randBool() {
	return Math.random() >= 0.5;
}

describe('list integration test', () => {
	beforeEach(async function () {
		await db.users.remove({}, {multi: true});
		await db.items.remove({}, {multi: true});
		await db.lists.remove({}, {multi: true});
		const uname = randString();
		const pword = randString();
		this.currentTest.user = await userModel.createUser(uname, pword);
		this.currentTest.admin = await userModel.createUser('adminUser', 'adminPw', 'admin');
		this.currentTest.token = await userModel.loginUser(uname, pword);
		this.currentTest.adminToken = await userModel.loginUser('adminUser', 'adminPw');
	});
	it('should create list', async function () {
		const fields = {title: randString()};
		request(app)
			.post('/api/lists')
			.set('Authorization', `Bearer ${this.test.token}`)
			.set('Content-Type', 'application/json')
			.send(fields)
			.end((err, res) => {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.have.keys(['title', 'userID', '_id']);
			});
	});
	it('should get list and its items', async function () {
		const list = await listModel.createList(randString(), this.test.user._id);
		request(app)
			.get(`/api/lists/${list._id}`)
			.set('Authorization', `Bearer ${this.test.token}`)
			.set('Content-Type', 'application/json')
			.end((err, res) => {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.have.keys(['items', 'list']);
			});
	});
	it('should get all lists', async function () {
		for (let i = randNumber(); i < 10; i++) {
			await listModel.createList(randString(), this.test.user._id);
		}
		const lists = await listModel.getLists(this.test.user._id);
		request(app)
			.get('/api/lists')
			.set('Authorization', `Bearer ${this.test.token}`)
			.set('Content-Type', 'application/json')
			.end((err, res) => {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.an('array');
				res.body.length.should.equal(lists.length);
			});
	});
	it('should update list', async function () {
		const list = await listModel.createList(randString(), this.test.user._id);
		const fields = {title: randString()};
		request(app)
			.patch(`/api/lists/${list._id}`)
			.set('Authorization', `Bearer ${this.test.token}`)
			.set('Content-Type', 'application/json')
			.send(fields)
			.end((err, res) => {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.have.keys(['message', 'list']);
			});
	});
	it('should delete list', async function () {
		const list = await listModel.createList(randString(), this.test.admin._id);
		request(app)
			.delete(`/api/lists/${list._id}`)
			.set('Authorization', `Bearer ${this.test.adminToken}`)
			.set('Content-Type', 'application/json')
			.end((err, res) => {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.have.keys(['message']);
			});
	});
});