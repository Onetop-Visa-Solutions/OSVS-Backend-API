const express = require('express');
const serviceController = require('../../controllers/controller/servicesController');

//Router
const router = express.Router();

//Routes
router
  .route('/')
  .get(serviceController.getServices)
  .post(serviceController.createService); // This api will be called on the root route
router
  .route('/:id')
  .get(serviceController.getService)
  .patch(serviceController.updateService)
  .delete(serviceController.deleteService);

module.exports = router;
