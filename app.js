const express = require('express');
const app = express();
const morgan = require('morgan');
const countryRouter = require('./routes/countryRoute');

//MIDDLEWARE
//THIRD-PARTY middleware
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`)); //Static Files Serving

// CUSTOM Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); // We can set request properties like thi one to send on requests
  next();
});

// ROUTES MOUNTING Middleware
app.use('/api/v1/country', countryRouter);

module.exports = app;
