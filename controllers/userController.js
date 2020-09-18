const userModel = require('../models/userModel');

exports.createUser = async (req, res) => {
	const { username, password, role } = req.body;
	try {
		await userModel.createUser(username, password, role);
		res.json('Created user succesfully').status(200);
	} catch (error) {
		res.json({ error: error.message }).status(400);
	}
};

exports.loginUser = async (req, res) => {
	const { username, password } = req.body;
	try {
		const token = await userModel.loginUser(username, password);
		res.json(
			{ 
				message: 'login success',
				token: token
			}
		).status(200); 
	} catch (error) {
		res.json({ error: 'username not found' }).status(400);
	}
};

exports.deleteUser = async (req, res) => {
	const id = req.user._id;
	try {
		const token = await userModel.deleteUser(id);
		res.json(
			{ 
				message: 'user has been deleted'
			}
		).status(200); 
	} catch (error) {
		res.json({ error: 'something went wrong' }).status(400);
	}
};

exports.getUserInfo = async (req, res) => {
	const id = req.user._id;
	try {
		const userInfo = await userModel.getUserInfo(id);
		res.json(
			{ 
				message: 'here is your user data',
				result: userInfo
			}
		).status(200); 
	} catch (error) {
		res.json({ error: 'username not found' }).status(400);
	}
};




