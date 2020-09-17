const app = require('./app.js');
const port = process.env.PORT;
const db = require('./database/db');
db.connect().then( () => 
    app.listen(port, () => console.log(`Running app on port ${port}`));
);
// run server
