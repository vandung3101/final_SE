const express = require('express');
// const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const methodOverride = require('method-override')
const handlebars = require('express-handlebars');
const handlebarsHelpers = require('./app/lib/handlebars-helpers');
const app = express();
const port = 80;

const route = require('./routes/index');
const db = require('./config/db');

const credentials = require('./config/credentials');

const initAdmin = require('./config/admin')

// Connect to db
db.connect();

// Cookie parser
app.use(cookieParser((credentials.cookieSecret)))
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}))
app.use(bodyParser.urlencoded({ extended: true }));

// Http request
// app.use(morgan('combined'));
app.use(methodOverride('_method'))

// Use public path
app.use(express.static(path.join(__dirname, 'public')));

// Template engine
var hbs = handlebars.create({ extname: '.hbs', helpers: handlebarsHelpers });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));



// Route
route(app);

initAdmin.createAdminAccount();

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})