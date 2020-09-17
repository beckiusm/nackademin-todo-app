const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;

const userSchema = new mongoose.Schema({
	username: {type: String, unique: true },
	password: String,
	role: String
});

const User = mongoose.model('User', userSchema);

module.exports = {
	createUser: async function (username, password, role = 'user') {
		const hashedPassword = await bcrypt.hashSync(password, 10);
		try {
			const user = await User.create({username, password: hashedPassword, role});
			return user._doc;

		} catch (error) {
			return (error);
		}
	},

	loginUser: async function (username, password) {
		try {
			const user = await User.findOne({username: username});
			const result = await bcrypt.compareSync(password, user.password);
			if (!result) {
				return { error: { message: 'wrong password'} };
			} else {
				const token = jwt.sign(user.toJSON(), secret);
				return token;
			}
		} catch (error) {
			return (error);
		}
	},
	
	clear: async () => {
		return await User.deleteMany({});
	},

};