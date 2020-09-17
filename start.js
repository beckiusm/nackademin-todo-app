const app = require('./app.js');
const port = process.env.PORT;
const db = require('./database/db');
db.connect().then( () => 
	app.listen( process.env.PORT || 5000, () => console.log('It\'s running birch'))
);
// run server
app.listen(port, () => console.log(`Running app on port ${port}`));