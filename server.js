const express = require('express');
const app = express();

let bodyParser = require('body-parser');

global.__basedir = __dirname;

const db = require('./app/config/db.config.js');
// Force : true will drop the table if it already exists
db.sequelize.sync();

let router = require('./app/routers/router.js');
app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);

const server = app.listen(8080, function (){
    let host = server.address().address
    let port = server.address().port
    console.log("App listening at http://localhost:%s", port);
});
