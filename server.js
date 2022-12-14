// load .env data into process.env
require('dotenv').config();
// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use('/thankyou',express.static('thankyou'));
app.use('/restaurants', express.static('restaurants'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const menuApiRoutes = require('./routes/menu_items-api');
const twilioRoutes = require('./routes/twilio-api');
const usersRoutes = require('./routes/users');
const usersOrdersRoutes = require('./routes/user_orders-api');

// Restaurant route - JW
const restaurantsRoutes = require('./routes/restaurant-api');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/', menuApiRoutes);
app.use('/twilio', twilioRoutes);
app.use('/users', usersRoutes);
app.use('/restaurants', restaurantsRoutes);
app.use('/', usersOrdersRoutes);

// Note: mount other resources here, using the same pattern above

app.get('/login/:id', (req, res) => {
  // using encrypted cookies
  req.session.user_id = req.params.id;

  // or using plain-text cookies
  res.cookie('user_id', req.params.id);

  // send the user somewhere
  res.redirect('/');
});

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

///App
