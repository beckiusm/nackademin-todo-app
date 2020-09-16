
const mongoose = require('mongoose');
require('dotenv').config();

let mongoDatabase;

switch (process.env.ENVIRONMENT) {
case 'development':
case 'test':
	const {MongoMemoryServer} = require('mongodb-memory-server');
	mongoDatabase = new MongoMemoryServer();
	break;
case 'production':
case 'staging':
	mongoDatabase = {
		// mongodb+srv://user:password@host/dbname
		getUri: async () => 
			'localhost:27017/todo'
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