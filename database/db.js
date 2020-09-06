require('dotenv').config();
const Datastore = require('nedb-promise');
const db = {};

switch (process.env.ENVIRONMENT) {
case 'dev':
	db.items = new Datastore({ filename: __dirname + '/items.db', autoload: true });
	db.lists = new Datastore({ filename: __dirname + '/lists.db', autoload: true });
	db.users = new Datastore({ filename: __dirname + '/users.db', autoload: true });
	break;
case 'test':
	db.items = new Datastore({ filename: __dirname + '/testItems.db', autoload: true });
	db.lists = new Datastore({ filename: __dirname + '/testLists.db', autoload: true });
	db.users = new Datastore({ filename: __dirname + '/testUsers.db', autoload: true });
	break;
}

exports.db = db;