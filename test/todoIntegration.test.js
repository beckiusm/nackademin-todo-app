const app = require('../app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
const db = require('../database/db').db;
const userModel = require('../models/userModel');
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
		this.currentTest.token = await userModel.loginUser(uname, pword);
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
});