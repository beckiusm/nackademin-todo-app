const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'random123';
const db = require('../app').db;

exports.createUser = async (req, res) => {
	const { username, password } = req.body;
	const existingUser = await db.find({username});
	if (existingUser.length === 0) {
		if (req.user.role === 'admin') {
			bcrypt.hash(password, 10, async (error, hashedPassword) => {
				try {
					await userModel.createUser(username, hashedPassword);
					res.json('Created user succesfully').status(200);
				} catch (error) {
					res.json({ error: error.message });
				}
			});
		} res.sendStatus(401);
	} else {
		res.json({error: 'username already exists'});
	}

};

exports.loginUser = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await userModel.loginUser(username);
		bcrypt.compare(password, user[0].password, (err, result) => {
			if(!result) {
				res.json('wrong password');
			} else {
				console.log(user);
				const token = jwt.sign(user[0], secret);
				res.json(
					{ 
						message: 'login success',
						token: token
					}
				).status(200); 
			}
		});
	} catch (error) {
		res.json({ error: 'username not found' });
	}
};


