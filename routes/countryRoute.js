const express = require('express');
const countryController = require('../controllers/countryController');

//Router
const router = express.Router();

//Middleware

router.route('/country-stats').get(countryController.getCountryStats);
//Routes
router
  .route('/')
  .get(countryController.getAllCountries)
  .post(countryController.createCountry); // This api will be called on the root route
router
  .route('/:id') // Needs the id parameter to be specified on the main tour router's route
  .get(countryController.getCountry)
  .patch(countryController.updateCountry)
  .delete(countryController.deleteCountry);

module.exports = router;
