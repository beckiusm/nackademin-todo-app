const app = require('./app.js');
const port = process.env.PORT;
// run server
app.listen(port, () => console.log(`Running app on port ${port}`));