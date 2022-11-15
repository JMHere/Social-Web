const express = require('express')
const routes = require('./Routes/routes');
const app = express();

// Pug things here
const pug = require('pug');
const path = require('path');

// setup the pug view engine and where to find the pug files
app.set('view engine', 'pug');
app.set('Views', path.join(__dirname, '/Views'));

// setup location for public files
app.use(express.static(path.join(__dirname, '/Style')));

app.get('/', routes.index);

app.listen(3000);