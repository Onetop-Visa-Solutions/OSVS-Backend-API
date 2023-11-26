const express = require('express');
const app = express();
const morgan = require('morgan');
const { countryRoute, serviceRoute } = require('./routes');

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

// Custom Middleware - Collect User Info
app.use((req, res, next) => {
  // Extract user information
  const userInfo = {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    device: req.get('Device'),
  };

  // Store user information in the request object
  req.userInfo = userInfo;

  next();
});

// Route to collect user info
app.get('/userinfo', (req, res) => {
  const { ip, userAgent, device } = req.userInfo;

  // Respond with user information
  res.json({
    ip,
    userAgent,
    device,
  });
});
// ROUTES MOUNTING Middleware
app.use('/api/v1/services', serviceRoute);
app.use('/api/v1/country', countryRoute);

module.exports = app;
