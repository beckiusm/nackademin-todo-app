const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const moment = require('moment');

// serve static files
app.use('/', express.static('public'));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router
const router = require('./routes/router');
app.use('/api', router);

// view engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	request('http://localhost:3000/api/getItems', (err, response, body) => {
		res.render('index', {
			data: JSON.parse(body),
			moment: moment
		});
	});
	
});

module.exports = app;
