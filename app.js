const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;

//run server
app.listen(port, () => console.log(`Running app on port ${port}`));

//db
const Datastore = require('nedb-promise'), db = new Datastore(({ filename: './database.db', autoload: true }));
exports.db = db;

//serve static files
app.use(express.static('public'));

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router
const router = require('./routes/router');
app.use('/api', router);