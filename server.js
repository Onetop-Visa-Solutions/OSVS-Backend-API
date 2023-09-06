const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');

const app = require('./app');

const DB_URL = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB_URL)
  .then(() => console.log('DB connection established successfully'));

//SERVER
const port = process.env.PORT || 5000;
app.listen(port, 'localhost', () => {
  console.log(`Server listening on ${port}`);
});
