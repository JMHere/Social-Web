const express = require('express');
const routes = require('./Routes/routes');
const bodyParser = require('body-parser');
const app = express();

// Pug things here
const pug = require('pug');
const path = require('path');

// setup the pug view engine and where to find the pug files
const urlencodedParser = bodyParser.urlencoded({extended: true});
app.set('view engine', 'pug');
app.set('Views', path.join(__dirname, '/Views'));


// setup location for public files
app.use(express.static(path.join(__dirname, '/Style')));

app.get('/', routes.index);
app.post('/create', urlencodedParser, routes.createUser);
app.get('/account', routes.form)
app.post('/login', urlencodedParser, routes.login);
app.get('/search', urlencodedParser, routes.search)
app.get('/searchaccount', routes.searchForm)
app.get('/delete/:id', routes.delete);

app.listen(3000);