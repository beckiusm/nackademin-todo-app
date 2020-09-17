
const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.DB;
let mongoDatabase;

switch (process.env.ENVIRONMENT) {
case 'development':
case 'test':
	const {MongoMemoryServer} = require('mongodb-memory-server');
	mongoDatabase = new MongoMemoryServer();
	break;
case 'release':
	mongoDatabase = {
		getUri: async () => 
			`${db}/todo`
	};
	break;
case 'staging':
	mongoDatabase = {
		getUri: async () => 
			`${db}/todoStage`
	};
	break;
}

async function connect(){
    
	let uri = await mongoDatabase.getUri();

	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	});
}

async function disconnect(){
	if(process.env.ENVIRONMENT == 'test' || process.env.ENVIRONMENT == 'development'){
		await mongoDatabase.stop();
	}
	await mongoose.disconnect();
}

module.exports = {
	connect, disconnect
};